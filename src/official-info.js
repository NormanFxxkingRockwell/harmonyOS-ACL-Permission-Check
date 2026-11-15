// Extract facts from the stored official text. This module makes no eligibility decisions.
const normalize = value => String(value ?? '').replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
const cleanLabel = value => value.replace(/[：:]\s*$/, '').trim();
const metadataAlreadyShown = new Set(['权限级别', '授权方式', '起始版本']);

export function officialFacts(permission) {
  const sections = [];
  let current = { label: '权限说明', lines: [] };
  const finish = () => {
    let text = normalize(current.lines.join('\n'));
    if (current.label === '权限说明') {
      const description = normalize(permission.description);
      if (description && text.startsWith(description)) text = text.slice(description.length).trim();
    }
    if (text && !metadataAlreadyShown.has(current.label)) sections.push({label: current.label, text});
  };
  for (const line of normalize(permission.details).split('\n')) {
    // Both **支持设备**：value and **申请条件：** value occur in the official snapshot.
    const heading = line.match(/^\*\*([^*\n]+)\*\*\s*[：:]?\s*(.*)$/);
    if (heading) {
      finish();
      current = {label: cleanLabel(heading[1]), lines: [heading[2]]};
    } else {
      current.lines.push(line);
    }
  }
  finish();
  return sections;
}

const binaryPermissions = new Set([
  'ohos.permission.kernel.IGNORE_LIBRARY_VALIDATION',
  'ohos.permission.kernel.EXEMPT_ANONYMOUS_EXECUTABLE_MEMORY',
  'ohos.permission.INHERIT_PARENT_PERMISSION'
]);

// This describes the official declaration format, not whether an application qualifies.
export function configKind(permission) {
  if (binaryPermissions.has(permission.name)) return 'binary';
  if (permission.name === 'ohos.permission.ACCESS_DDK_DRIVERS') return 'value';
  return 'hap';
}

export function officialPermissionUrl(permission) {
  const url = new URL(permission.source);
  url.pathname = url.pathname.replace(/\.md$/, '').replace(/\/$/, '');
  url.hash = permission.name.toLowerCase().replace(/\./g, '');
  return url.href;
}
