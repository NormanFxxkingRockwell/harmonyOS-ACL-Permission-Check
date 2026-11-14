import { copyA } from './copy-catalog-a.js';
import { copyB } from './copy-catalog-b.js';

export const permissionCopies = { ...copyA, ...copyB };
export function permissionCopy(permission) {
  const copy = permissionCopies[permission.name];
  if (!copy) throw new Error(`Missing scenario copy: ${permission.name}`);
  return copy;
}
export const purposeFromQuestion = question => question.replace(/^是否(?:需要)?/, '').replace(/？$/, '');
