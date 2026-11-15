import { relationDefinitions, permissionReview } from './relations-data.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const typeNames={requires:'这些权限要一起申请',conditional:'这些情况才需要',alternative:'也可以换一种做法',scope:'这些权限分别能做什么',authorization:'授权时还要注意什么'};

export function renderRelationshipDetails(name) {
  const facts=relationDefinitions.filter(relation=>relation.permissions.includes(name));
  const review=permissionReview.find(permission=>permission.name===name);
  return `<section class="detail-relations"><h3>使用时需要注意什么</h3>${review?`<p>${escape(review.note)}</p>`:''}${facts.map(relation=>`<details><summary>${escape(relation.title)} <small>${typeNames[relation.type]}</small></summary><p>${escape(relation.description)}</p><a href="${escape(relation.source)}" target="_blank" rel="noopener noreferrer">官方依据 ↗</a></details>`).join('')}</section>`;
}

// A reminder is enough: this wizard selects business permissions, not MDM policies.
export function renderAuthorizationHint(result) {
  if (!result.permissions.some(permission => permission.grant.includes('user_grant'))) return '';
  return `<p class="authorization-hint">企业设备提示：接入企业设备管理（MDM）后，管理员可统一允许或拒绝部分权限，无需用户在授权弹窗中确认；仍需完成权限声明和必要的官网申请。<a href="https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-enterprise-securitymanager/" target="_blank" rel="noopener noreferrer">查看配置说明 ↗</a></p>`;
}
