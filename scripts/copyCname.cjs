const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const cnamePath = path.join(root, "CNAME");
const distCnamePath = path.join(root, "dist", "CNAME");

if (!fs.existsSync(cnamePath)) {
  console.log("No CNAME file found in project root. Skipping copy.");
  process.exit(0);
}

try {
  const data = fs.readFileSync(cnamePath);
  fs.mkdirSync(path.join(root, "dist"), { recursive: true });
  fs.writeFileSync(distCnamePath, data);
  console.log("CNAME copied to dist/CNAME");
} catch (err) {
  console.error("Failed to copy CNAME:", err);
  process.exit(1);
}
