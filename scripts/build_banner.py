"""Render the profile banner as self-contained SVGs (text converted to paths).

GitHub serves README images through a proxy that cannot load web fonts, so every
glyph is drawn as a path. The result looks identical on every OS, in both themes.

Usage:  pip install fonttools uharfbuzz && python scripts/build_banner.py
Edit TEXT below, run again, commit assets/banner-*.svg.
"""

from pathlib import Path
from urllib.request import urlretrieve
from xml.sax.saxutils import escape

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".cache" / "fonts"
FONT_BASE = "https://raw.githubusercontent.com/google/fonts/main/ofl"
FONTS = {
    "bold": f"{FONT_BASE}/bevietnampro/BeVietnamPro-Bold.ttf",
    "medium": f"{FONT_BASE}/bevietnampro/BeVietnamPro-Medium.ttf",
    "mono": f"{FONT_BASE}/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf",
}

TEXT = {
    "name": "Dương Minh Hoàng",
    "role": "Mobile & Full-stack Developer",
    "stack": "Kotlin Multiplatform  /  Next.js  /  Java",
    "meta": "FPT University, Hà Nội",
    "status": "Open to internship opportunities",
}

THEMES = {
    "dark": {"bg": "#0d1117", "border": "#30363d", "fg": "#f0f6fc", "muted": "#9198a1",
             "accent": "#34d399", "dot": "#30363d"},
    "light": {"bg": "#ffffff", "border": "#d0d7de", "fg": "#1f2328", "muted": "#59636e",
              "accent": "#047857", "dot": "#d0d7de"},
}

W, H = 1280, 320


class Face:
    def __init__(self, path: Path):
        blob = hb.Blob.from_file_path(str(path))
        self.hb_font = hb.Font(hb.Face(blob))
        self.tt = TTFont(path)
        self.glyphs = self.tt.getGlyphSet()
        self.upem = self.tt["head"].unitsPerEm

    def path(self, text: str, x: float, y: float, size: float, tracking: float = 0) -> tuple[str, float]:
        """Return (svg path data, advance width) for text with its baseline at (x, y)."""
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb_font, buf, {"kern": True, "liga": True})
        scale = size / self.upem
        order = self.tt.getGlyphOrder()
        pen = SVGPathPen(self.glyphs)
        cursor = 0.0
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            gx = x + (cursor + pos.x_offset) * scale
            gy = y - pos.y_offset * scale
            # Font units are y-up; SVG is y-down.
            self.glyphs[order[info.codepoint]].draw(TransformPen(pen, (scale, 0, 0, -scale, gx, gy)))
            cursor += pos.x_advance + tracking * self.upem
        return pen.getCommands(), cursor * scale


def load_fonts() -> dict[str, Face]:
    CACHE.mkdir(parents=True, exist_ok=True)
    faces = {}
    for key, url in FONTS.items():
        target = CACHE / f"{key}.ttf"
        if not target.exists():
            urlretrieve(url, target)
        faces[key] = Face(target)
    return faces


def dot_grid(color: str) -> str:
    """Dot pattern on the right, faded in from the left by a gradient mask."""
    dots = []
    for row in range(0, H // 20 + 1):
        for col in range(0, 30):
            cx = W - 24 - col * 20
            cy = 16 + row * 20
            if cy < H - 8:
                dots.append(f'<circle cx="{cx}" cy="{cy}" r="1.6"/>')
    return f'<g fill="{color}" mask="url(#fade)">{"".join(dots)}</g>'


def render(theme: dict[str, str], f: dict[str, Face]) -> str:
    x = 72
    name, _ = f["bold"].path(TEXT["name"], x, 138, 68, tracking=-0.02)
    role, _ = f["medium"].path(TEXT["role"], x, 190, 30, tracking=-0.01)
    stack, _ = f["mono"].path(TEXT["stack"], x, 232, 19)
    meta, meta_w = f["medium"].path(TEXT["meta"], x, 278, 18)
    status_x = x + meta_w + 40
    status, _ = f["medium"].path(TEXT["status"], status_x + 18, 278, 18)
    title = escape(f'{TEXT["name"]}. {TEXT["role"]}. {TEXT["meta"]}.', {'"': "&quot;"})
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="{title}">
<title>{title}</title>
<defs>
<linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
<stop offset="0.35" stop-color="#fff" stop-opacity="0"/>
<stop offset="1" stop-color="#fff" stop-opacity="1"/>
</linearGradient>
<mask id="fade"><rect width="{W}" height="{H}" fill="url(#g)"/></mask>
<clipPath id="card"><rect x="1" y="1" width="{W - 2}" height="{H - 2}" rx="16"/></clipPath>
</defs>
<rect x="1" y="1" width="{W - 2}" height="{H - 2}" rx="16" fill="{theme["bg"]}" stroke="{theme["border"]}" stroke-width="2"/>
<g clip-path="url(#card)">{dot_grid(theme["dot"])}</g>
<rect x="{x}" y="56" width="40" height="4" rx="2" fill="{theme["accent"]}"/>
<path d="{name}" fill="{theme["fg"]}"/>
<path d="{role}" fill="{theme["accent"]}"/>
<path d="{stack}" fill="{theme["muted"]}"/>
<path d="{meta}" fill="{theme["muted"]}"/>
<circle cx="{status_x + 5}" cy="272" r="5" fill="{theme["accent"]}"/>
<path d="{status}" fill="{theme["fg"]}"/>
</svg>
"""


def main() -> None:
    faces = load_fonts()
    out = ROOT / "assets"
    out.mkdir(exist_ok=True)
    for name, theme in THEMES.items():
        (out / f"banner-{name}.svg").write_text(render(theme, faces), encoding="utf-8")
        print(f"wrote assets/banner-{name}.svg")


if __name__ == "__main__":
    main()
