// copyCname.js — copies CNAME → dist/CNAME after build
// so GitHub Pages preserves the custom domain on every deploy.
import { copyFileSync, existsSync } from "fs";

if (existsSync("CNAME")) {
  copyFileSync("CNAME", "dist/CNAME");
  console.log("✓ CNAME copied to dist/");
} else {
  console.warn("⚠ CNAME file not found, skipping.");
}
