import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { permissionCopies, permissionCopy } from '../src/scenario-copy.js';
import { scenes, initialState, evaluate, makeConfig } from '../src/rules.js';
const catalog = JSON.parse(await readFile(new URL('../data/permissions.json', import.meta.url), 'utf8')).permissions;
test('所有在用权限都有功能提问和最小例子，没有遗留或虚构权限', () => {
  assert.deepEqual(Object.keys(permissionCopies).sort(), catalog.map(p => p.name).sort());
  for (const permission of catalog) {
    const copy = permissionCopy(permission);
    assert.match(copy.question, /^是否需要.+？$/, permission.name);
    assert.match(copy.example, /^例如[：:]/, permission.name);
    assert.ok(copy.question.length < 100, permission.name);
  }
  assert.equal(scenes.length, 41);
  for (const scene of scenes) assert.match(scene.title, /^是否.+？$/);
});
test('配置里的用途说明不会把向导问句原样拼进去', () => {
  const result = evaluate({...initialState(), selected:['photo','record']}, catalog);
  for (const permission of result.permissions) assert.doesNotMatch(permission.reasons.join(''), /是否需要|？/);
  for (const entry of makeConfig(result).stringFragment.string) assert.doesNotMatch(entry.value, /是否需要|？/);
});
