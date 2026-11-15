// Advice never removes selected permissions. Developers choose their implementation.
const guide = slug => `https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/${slug}`;
export const permissionAlternatives = {
  READ_IMAGEVIDEO: { text:'若只访问用户手动选中的照片或视频，可用 PhotoViewPicker，不声明此权限。该权限的直接读取用途限于克隆备份、相册整理、自动生成视频等官方场景；官方明确手选素材场景不应申请。', url:guide('photoaccesshelper-photoviewpicker') },
  WRITE_IMAGEVIDEO: { text:'若由用户主动保存指定图片或视频，可使用 SaveButton 或 showAssetsCreationDialog 保存确认弹窗，不声明此权限。', url:guide('photoaccesshelper-savebutton') },
  READ_AUDIO: { text:'若只访问用户选中的音频，可使用 AudioViewPicker，不声明此权限。直接批量读取的申请用途限于克隆、备份、同步等官方场景；单纯播放声音不需要此权限。', url:guide('select-user-file#选择音频类文件') },
  WRITE_AUDIO: { text:'若由用户选择音频保存位置，可用 AudioViewPicker 的保存接口，不声明此权限。直接批量写入仍需符合官方申请场景。', url:guide('save-user-file#保存音频类文件') },
  READ_CONTACTS: { text:'若只获取用户选中的联系人，可使用系统联系人选择器，不声明此权限。直接批量读取的申请用途限于克隆、备份、同步等官方场景。', url:guide('contacts-intro#使用picker选择联系人') },
  READ_PASTEBOARD: { text:'若由用户点击粘贴，可用系统 PasteButton，不声明此权限。直接读取仍需符合对应设备的官方申请条件。', url:guide('pastebutton') },
  READ_WRITE_USER_FILE: { text:'若只需用户指定的文件，可使用 DocumentViewPicker 获取所选文件的访问授权，不声明此权限。此权限本身仅面向电脑上的 IDE 或其他开发调测工具。', url:guide('select-user-file') }
};
export function alternativeFor(permission) {
  return permissionAlternatives[permission.name.replace('ohos.permission.','')];
}
