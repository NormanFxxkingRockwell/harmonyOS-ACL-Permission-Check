import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { initialState, evaluate, makeConfig } from '../src/rules.js';
import { mdmControllerPermission } from '../src/relations.js';
import { requirementEdges } from '../src/relations.js';
import { permissionReview, relationDefinitions, permissionGroups, unmappedUserGrantPermissions } from '../src/relations-data.js';
import { domainFor } from '../src/domains.js';

const catalog = JSON.parse(await readFile(new URL('../data/permissions.json', import.meta.url), 'utf8')).permissions;
const full = name => `ohos.permission.${name}`;
const run = (selected = [], overrides = {}) => evaluate({ ...initialState(), selected, ...overrides }, catalog);
const extra = (shortNames, overrides = {}) => {
  const names = shortNames.map(full);
  return run([], { extraPermissions: names, confirmedQualifications: names, ...overrides });
};
const declared = result => makeConfig(result).moduleFragment.module.requestPermissions.map(p => p.name);
const permission = (result, shortName) => result.permissions.find(p => p.name === full(shortName));
const group = (result, id) => result.authorizationPlan.groups.find(group => group.id === id);

test('逐项复核台账完整覆盖290项，90条关系均有明确官方来源且不引用废弃权限',()=>{
  const names=new Set(catalog.map(p=>p.name));
  assert.equal(permissionReview.length,290);
  assert.equal(new Set(permissionReview.map(p=>p.name)).size,290);
  for(const review of permissionReview){assert.ok(names.has(review.name));assert.equal(review.domain,domainFor(review.name));assert.ok(review.note);assert.match(review.source,/^https:\/\/developer\.huawei\.com\//);}
  assert.equal(relationDefinitions.length,90);
  assert.equal(new Set(relationDefinitions.map(r=>r.id)).size,90);
  for(const relation of relationDefinitions){assert.match(relation.source,/^https:\/\/developer\.huawei\.com\//);for(const name of relation.permissions)assert.ok(names.has(name),name);}
});

test('官方组映射覆盖27项，剩余3项明确未知而不是虚构为单独权限组',()=>{
  const mapped=permissionGroups.flatMap(group=>group.permissions);
  assert.equal(mapped.length,27);assert.equal(new Set(mapped).size,27);
  const userGrant=catalog.filter(p=>p.grant.includes('user_grant')).map(p=>p.name).sort();
  assert.equal(userGrant.length,30);
  assert.deepEqual([...mapped,...unmappedUserGrantPermissions].sort(),userGrant);
});

test('整套权限组合在不同设备下均不会生成缺少必需配套的声明',()=>{
  const extraPermissions=catalog.map(p=>p.name);
  for(const device of ['Phone','PC/2in1','Tablet','Wearable','TV','Car']){
    const result=run([],{extraPermissions,confirmedQualifications:extraPermissions,type:'mdm',developerType:'enterprise',device,api:'26.0.1'});
    const config=new Set(declared(result));
    for(const edge of requirementEdges)if(config.has(edge.from))assert.ok(config.has(edge.to),`${device}: ${edge.from} -> ${edge.to}`);
  }
});

test('只选择前置权限不会反向提示必须申请依赖它的高层能力',()=>{
  const result=extra(['APPROXIMATELY_LOCATION','ACCESS_BLUETOOTH','USE_FLOAT_BALL']);
  assert.deepEqual(result.relationships.filter(r=>r.type==='requires'),[]);
  for(const unwanted of ['LOCATION','LOCATION_IN_BACKGROUND','AUTO_RESTORE_MAIN_WINDOW','PERSISTENT_BLUETOOTH_PEERS_MAC'])assert.ok(!result.permissions.some(p=>p.name===full(unwanted)));
});

test('只声明MDM管理权限不增加业务权限，也不等于静默策略已经下发', () => {
  const result = extra(['ENTERPRISE_MANAGE_USER_GRANT_PERMISSION'], {
    type: 'mdm', managedByMdm: true, mdmGroupPolicies: { camera: 'GRANTED' }
  });
  assert.deepEqual(result.permissions.map(p => p.name), [mdmControllerPermission]);
  assert.deepEqual(result.authorizationPlan.policies, []);
  assert.equal(result.authorizationPlan.planningOnly, true);
  assert.equal(permission(result, 'ENTERPRISE_MANAGE_USER_GRANT_PERMISSION').authorization.policy, 'DEFAULT');
});

test('普通分发业务App可规划外部MDM授予，但不声明管控端的管理权限', () => {
  const result = run(['photo'], {
    type: 'normal', managedByMdm: true, mdmGroupPolicies: { camera: 'GRANTED' }
  });
  assert.deepEqual(result.authorizationPlan.policies, [{
    group: 'camera', permissions: [full('CAMERA')], managedState: 'GRANTED', managedStateValue: 0
  }]);
  assert.deepEqual(declared(result), [full('CAMERA')]);
  assert.equal(permission(result, 'CAMERA').authorization.policy, 'GRANTED');
  assert.match(permission(result, 'CAMERA').authorization.display, /计划.*部署后核验/);
});

test('DEFAULT、GRANTED、DENIED三种策略有不同含义，均不改变权限声明需求', () => {
  for (const policy of ['DEFAULT', 'GRANTED', 'DENIED']) {
    const result = run(['photo'], { managedByMdm: true, mdmGroupPolicies: { camera: policy } });
    assert.deepEqual(declared(result), [full('CAMERA')]);
    assert.equal(group(result, 'camera').requestedState, policy);
    assert.equal(permission(result, 'CAMERA').authorization.policy, policy);
    if (policy === 'DEFAULT') {
      assert.equal(result.authorizationPlan.policies.length, 0);
      assert.match(permission(result, 'CAMERA').authorization.display, /用户授权/);
    } else {
      assert.equal(result.authorizationPlan.policies[0].managedStateValue, policy === 'GRANTED' ? 0 : -1);
    }
  }
});

test('权限组策略只包括App已声明的同组成员，不把整个组补进声明', () => {
  const readOnly = run(['calendar'], { managedByMdm: true, mdmGroupPolicies: { calendar: 'GRANTED' } });
  assert.deepEqual(declared(readOnly), [full('READ_CALENDAR')]);
  assert.deepEqual(group(readOnly, 'calendar').permissions, [full('READ_CALENDAR')]);
  const readWrite = run(['calendar', 'calendar-write'], {
    managedByMdm: true, mdmGroupPolicies: { calendar: 'GRANTED' }
  });
  assert.deepEqual(new Set(group(readWrite, 'calendar').permissions), new Set([full('READ_CALENDAR'), full('WRITE_CALENDAR')]));
  assert.equal(readWrite.authorizationPlan.policies.length, 1);
  assert.ok(!declared(readWrite).includes(full('READ_WHOLE_CALENDAR')));
  assert.ok(!declared(readWrite).includes(full('WRITE_WHOLE_CALENDAR')));
});

test('manual_settings不会被MDM user_grant策略覆盖', () => {
  const result = extra(['CONTROL_DEVICE'], {
    device: 'PC/2in1', managedByMdm: true,
    mdmGroupPolicies: { camera: 'GRANTED', 'unmapped:ohos.permission.CONTROL_DEVICE': 'GRANTED' }
  });
  assert.equal(permission(result, 'CONTROL_DEVICE').eligible, true);
  assert.equal(permission(result, 'CONTROL_DEVICE').authorization.policy, 'DEFAULT');
  assert.match(permission(result, 'CONTROL_DEVICE').authorization.display, /系统设置/);
  assert.deepEqual(result.authorizationPlan.groups, []);
  assert.deepEqual(result.authorizationPlan.policies, []);
});

test('三项未有官方组映射的新权限不推测组，也不生成静默策略', () => {
  for (const shortName of ['FLOAT_VIEW', 'GET_ALL_BUNDLE_INFO', 'DIRECT_CALL']) {
    const name = full(shortName);
    const result = extra([shortName], {
      api: '26.0.1', device: shortName === 'GET_ALL_BUNDLE_INFO' ? 'PC/2in1' : 'Phone',
      managedByMdm: true, mdmGroupPolicies: { [`unmapped:${name}`]: 'GRANTED' }
    });
    assert.equal(permission(result, shortName).eligible, true, shortName);
    const selectedGroup = result.authorizationPlan.groups.find(group => group.permissions.includes(name));
    assert.equal(selectedGroup.mappingConfirmed, false);
    assert.equal(selectedGroup.ready, false);
    assert.equal(permission(result, shortName).authorization.policy, 'DEFAULT');
    assert.deepEqual(result.authorizationPlan.policies, []);
    assert.match(selectedGroup.problems.join(' '), /官方资料尚未明确/);
  }
});

test('后台定位保留前台位置声明及特殊设置流程，不直接生成该组静默计划', () => {
  const result = run(['location'], {
    background: 'permission', managedByMdm: true, mdmGroupPolicies: { location: 'GRANTED' }
  });
  assert.deepEqual(new Set(declared(result)), new Set([full('APPROXIMATELY_LOCATION'), full('LOCATION_IN_BACKGROUND')]));
  assert.equal(group(result, 'location').ready, false);
  assert.match(group(result, 'location').problems.join(' '), /前台定位授权、再到系统设置/);
  assert.equal(permission(result, 'LOCATION_IN_BACKGROUND').authorization.policy, 'DEFAULT');
  assert.match(permission(result, 'LOCATION_IN_BACKGROUND').authorization.display, /先前台授权，再到设置开启/);
  assert.deepEqual(result.authorizationPlan.policies, []);
});

test('MDM部署计划受API20和支持设备限制，普通权限本身不因此被删除', () => {
  for (const overrides of [{ api: '19' }, { device: 'Wearable' }, { device: 'TV' }, { device: 'Car' }]) {
    const result = run(['photo'], {
      managedByMdm: true, mdmGroupPolicies: { camera: 'GRANTED' }, ...overrides
    });
    assert.deepEqual(declared(result), [full('CAMERA')]);
    assert.ok(result.authorizationPlan.contextProblems.length > 0);
    assert.equal(group(result, 'camera').ready, false);
    assert.deepEqual(result.authorizationPlan.policies, []);
  }
});

test('关闭受管环境后忽略历史GRANTED和DENIED设置', () => {
  const result = run(['photo', 'record'], {
    managedByMdm: false, mdmGroupPolicies: { camera: 'GRANTED', microphone: 'DENIED' }
  });
  assert.equal(result.authorizationPlan.enabled, false);
  assert.deepEqual(result.authorizationPlan.policies, []);
  assert.ok(result.authorizationPlan.groups.every(group => group.requestedState === 'DEFAULT' && !group.ready));
  assert.ok(result.permissions.every(permission => permission.authorization.policy === 'DEFAULT'));
  assert.deepEqual(new Set(declared(result)), new Set([full('CAMERA'), full('MICROPHONE')]));
});

test('明确共同声明依赖分别补齐，其他同类权限不自动打包', () => {
  for (const [parent, child] of [
    ['LOCATION', 'APPROXIMATELY_LOCATION'],
    ['LOCATION_IN_BACKGROUND', 'APPROXIMATELY_LOCATION'],
    ['AUTO_RESTORE_MAIN_WINDOW', 'USE_FLOAT_BALL'],
    ['PERSISTENT_BLUETOOTH_PEERS_MAC', 'ACCESS_BLUETOOTH']
  ]) {
    const result = extra([parent]);
    assert.deepEqual(new Set(result.permissions.map(permission => permission.name)), new Set([full(parent), full(child)]));
    assert.equal(permission(result, child).autoAdded, true);
    assert.ok(permission(result, child).requiredBy.includes(full(parent)));
    assert.ok(permission(result, parent).eligible, parent);
    assert.ok(permission(result, child).eligible, child);
  }
});

test('来源权限被阻塞时派生权限不泄漏配置，独立明确选择的权限仍保留', () => {
  const unconfirmed = run([], { extraPermissions: [full('LOCATION')] });
  assert.equal(permission(unconfirmed, 'LOCATION').eligible, false);
  assert.equal(permission(unconfirmed, 'APPROXIMATELY_LOCATION').eligible, false);
  assert.deepEqual(declared(unconfirmed), []);
  const wrongDevice = extra(['AUTO_RESTORE_MAIN_WINDOW'], { device: 'TV' });
  assert.ok(wrongDevice.permissions.every(permission => !permission.eligible));
  assert.deepEqual(declared(wrongDevice), []);
  const explicit = run([], {
    extraPermissions: [full('LOCATION'), full('APPROXIMATELY_LOCATION')],
    confirmedQualifications: [full('APPROXIMATELY_LOCATION')]
  });
  assert.equal(permission(explicit, 'LOCATION').eligible, false);
  assert.equal(permission(explicit, 'APPROXIMATELY_LOCATION').eligible, true);
  assert.deepEqual(declared(explicit), [full('APPROXIMATELY_LOCATION')]);
});

test('图库读取与媒体位置同申时合并图库用途文案，但不附加设备定位', () => {
  const result = extra(['READ_IMAGEVIDEO', 'MEDIA_LOCATION']);
  assert.ok(!result.permissions.some(permission => [full('LOCATION'), full('APPROXIMATELY_LOCATION')].includes(permission.name)));
  const config = makeConfig(result);
  const read = config.moduleFragment.module.requestPermissions.find(permission => permission.name === full('READ_IMAGEVIDEO'));
  const value = config.stringFragment.string.find(string => `$string:${string.name}` === read.reason).value;
  assert.match(value, /地理位置信息/);
  assert.equal(config.moduleFragment.module.requestPermissions.length, 2);
});
