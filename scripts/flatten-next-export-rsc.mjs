import { promises as fs } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.join(process.cwd(), 'out');

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function listDirectories(rootDir) {
  const directories = [];
  const queue = [rootDir];

  while (queue.length > 0) {
    const currentDir = queue.shift();
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);
      directories.push(fullPath);
      queue.push(fullPath);
    }
  }

  return directories;
}

async function listFiles(rootDir) {
  const files = [];
  const queue = [rootDir];

  while (queue.length > 0) {
    const currentDir = queue.shift();
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        queue.push(fullPath);
        continue;
      }

      files.push(fullPath);
    }
  }

  return files;
}

async function flattenDirectory(nextDirPath) {
  const parentDir = path.dirname(nextDirPath);
  const nextDirName = path.basename(nextDirPath);
  const nestedFiles = await listFiles(nextDirPath);
  let created = 0;
  let skipped = 0;

  for (const filePath of nestedFiles) {
    const relativePath = path.relative(nextDirPath, filePath).split(path.sep).join('.');
    const aliasFilename = `${nextDirName}.${relativePath}`;
    const aliasPath = path.join(parentDir, aliasFilename);

    if (await pathExists(aliasPath)) {
      skipped += 1;
      continue;
    }

    await fs.copyFile(filePath, aliasPath);
    created += 1;
  }

  return { created, skipped };
}

async function main() {
  if (!(await pathExists(OUT_DIR))) {
    console.error('Could not find out/ directory. Run `next build` first.');
    process.exit(1);
  }

  const allDirs = await listDirectories(OUT_DIR);
  const targetDirs = allDirs.filter((dirPath) => path.basename(dirPath).startsWith('__next.'));

  let totalCreated = 0;
  let totalSkipped = 0;

  for (const targetDir of targetDirs) {
    const { created, skipped } = await flattenDirectory(targetDir);
    totalCreated += created;
    totalSkipped += skipped;
  }

  console.log(
    `Flattened static RSC aliases: ${totalCreated} created, ${totalSkipped} already existed, ${targetDirs.length} source directories processed.`
  );
}

main().catch((error) => {
  console.error('Failed to flatten static RSC aliases.');
  console.error(error);
  process.exit(1);
});
