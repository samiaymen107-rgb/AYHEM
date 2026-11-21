import { execFileSync } from "node:child_process";

const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "buffer" })
  .toString("utf8")
  .split("\0")
  .filter(Boolean);

const failures = [];
for (const path of tracked) {
  const pathBytes = Buffer.byteLength(path, "utf8");
  if (pathBytes > 200) failures.push(`path exceeds 200 UTF-8 bytes (${pathBytes}): ${path}`);
  for (const segment of path.split("/")) {
    const segmentBytes = Buffer.byteLength(segment, "utf8");
    if (segmentBytes > 150) failures.push(`path component exceeds 150 UTF-8 bytes (${segmentBytes}): ${path}`);
  }
}

if (failures.length) {
  for (const failure of failures) console.error(failure);
  process.exitCode = 1;
} else {
  console.log(`Repository path integrity passed: ${tracked.length} tracked paths checked.`);
}
