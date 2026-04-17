#!/usr/bin/env python3

from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path


ZOOM_DIR_RE = re.compile(r".*_(\d+)$")
TILE_FILE_RE = re.compile(r"^(\d+)_(\d+)(\.[A-Za-z0-9]+)$")


def extract_zoom(zoom_dir_name: str) -> int | None:
    """
    Extract zoom from a GeoWebCache CRS/zoom directory name, e.g.:
    EPSG_900913_12 -> 12
    """
    match = ZOOM_DIR_RE.match(zoom_dir_name)
    if not match:
        return None
    return int(match.group(1))


def extract_tile_coords(filename: str) -> tuple[int, int, str] | None:
    """
    Extract x, y, extension from a tile filename, e.g.:
    002047_002733.png -> (2047, 2733, ".png")
    """
    match = TILE_FILE_RE.match(filename)
    if not match:
        return None

    x_str, y_str, ext = match.groups()
    return int(x_str), int(y_str), ext


def copy_tiles(layer_dir: Path, tms_dir: Path, dry_run: bool = False) -> int:
    """
    Walk a GeoWebCache layer directory and copy tiles into TMS layout:
    <tms_dir>/<z>/<x>/<y>.<ext>
    """
    copied = 0

    for zoom_dir in layer_dir.iterdir():
        if not zoom_dir.is_dir():
            continue

        zoom = extract_zoom(zoom_dir.name)
        if zoom is None:
            print(f"Skipping unrecognised zoom directory: {zoom_dir}")
            continue

        for tile_file in zoom_dir.rglob("*"):
            if not tile_file.is_file():
                continue

            coords = extract_tile_coords(tile_file.name)
            if coords is None:
                continue

            x, y, ext = coords
            dest = tms_dir / str(zoom) / str(x) / f"{y}{ext}"

            print(f"{tile_file} -> {dest}")
            if not dry_run:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(tile_file, dest)

            copied += 1

    return copied


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Copy GeoWebCache tiles into a standard TMS directory structure."
    )
    parser.add_argument(
        "layer_dir",
        type=Path,
        help="Path to the GeoWebCache layer directory, e.g. /data/gwc/sit_prod_agg_bomb",
    )
    parser.add_argument(
        "tms_dir",
        type=Path,
        help="Path to the output TMS root directory",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be copied without writing files",
    )

    args = parser.parse_args()

    if not args.layer_dir.exists() or not args.layer_dir.is_dir():
        raise SystemExit(f"Layer directory does not exist or is not a directory: {args.layer_dir}")

    count = copy_tiles(args.layer_dir, args.tms_dir, dry_run=args.dry_run)
    print(f"\nDone. {'Would copy' if args.dry_run else 'Copied'} {count} tile(s).")


if __name__ == "__main__":
    main()