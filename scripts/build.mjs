import { mkdir, cp, readFile, writeFile, readdir, rm, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const output = path.resolve(root, 'dist');
if (path.relative(root, output) !== 'dist') throw new Error('Unexpected build output path');
try {
  if (await realpath(output) !== output) throw new Error('Build output must not be a symbolic link');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const html = await readFile('index.html', 'utf8');
const permissions = await readFile('data/permissions.json');
const hash = createHash('sha256').update(html).update(permissions);
for (const filename of (await readdir('src')).sort()) {
  hash.update(filename).update(await readFile(path.join('src', filename)));
}
const version = hash.digest('hex').slice(0, 12);
const release = path.join(output, 'releases', version);

// Version the complete module graph and its data, not just the entry script.
// Relative imports and the module-relative data URL stay within this release.
await rm(output, { recursive: true, force: true });
await mkdir(path.join(release, 'data'), { recursive: true });
await cp('src', path.join(release, 'src'), { recursive: true });
await writeFile(path.join(release, 'data/permissions.json'), permissions);
await writeFile(path.join(output, 'index.html'), html
  .replaceAll('./src/', `./releases/${version}/src/`)
  .replace('</head>', `  <meta name="build-version" content="${version}" />\n</head>`));
await writeFile(path.join(output, '.nojekyll'), '');
console.log(`Static build ready: dist/ · ${JSON.parse(permissions).permissions.length} permissions · release ${version}`);
