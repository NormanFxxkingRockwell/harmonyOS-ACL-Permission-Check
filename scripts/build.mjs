import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
await mkdir('dist/data', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
await copyFile('data/permissions.json', 'dist/data/permissions.json');
await writeFile('dist/.nojekyll', '');
const data = JSON.parse(await readFile('dist/data/permissions.json', 'utf8'));
console.log(`Static build ready: dist/ · ${data.permissions.length} official permission records`);
