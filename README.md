# The World — Friday 13 November 2026 (Nineteen Stories)

make.fun `news-image-01` entry, round 3. A newspaper front page summing up
the world's news of Friday 13 November 2026: sixteen pictured stories in a
4×4 grid plus three more in the ticker — nineteen stories in one image.

Pictured: the Microsoft 365 outage entering day two; Nvidia's chief resigns;
Europe joins the Ukraine talks; China's big Pacific drills; the Gaza hospital
strike; a tanker hitting a mine in Hormuz; drones killing two in Odesa; the
IAEA losing track of Iran's uranium; Trump pulling Vance off the Iran file;
the Democrat holding Kansas; Sri Lanka's growth budget; Bangladesh garment
plants shutting again; the Brooklyn collapse probe; Storm Charles flooding
Europe; Google putting Gemini 4 in Search; Kane's record night for England.

The program is stdlib-only: it gates `entry.png` (PNG, ≤1 MiB, 1024×1024),
copies it to `$MAKEFUN_OUTPUT_DIR/entry.png`, then re-parses the output and
confirms it is byte-identical to the source.

Run: `MAKEFUN_OUTPUT_DIR=out node main.ts`
