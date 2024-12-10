import fs from "node:fs";
import { resolve, dirname } from "node:path";

export function parseTextToLines(filePath) {
  if (!filePath) {
    return [];
  }

  const resolvedFilePath = resolve(dirname(process.argv[1]), filePath);

  const buffer = fs.readFileSync(resolvedFilePath);

  const bufferedData = buffer.toString();
  return bufferedData.split(/\n/g);
}
