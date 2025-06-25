# 微信分享配置指南

## 当前问题
微信内置浏览器对于网页分享有特殊要求，仅通过 meta 标签可能无法完全控制分享内容。

## 解决方案

### 方案一：使用微信 JS-SDK（推荐）

1. **注册微信公众号**
   - 需要注册一个微信公众号（订阅号或服务号）
   - 在公众号后台配置 JS 安全域名为 `mcp-eda.com`

2. **获取必要参数**
   - AppID
   - AppSecret
   - 生成签名所需的 access_token 和 jsapi_ticket

3. **在页面中添加微信 JS-SDK**
   ```html
   <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
   <script>
   wx.config({
     debug: false,
     appId: '你的AppID',
     timestamp: '时间戳',
     nonceStr: '随机字符串',
     signature: '签名',
     jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
   });

   wx.ready(function () {
     // 自定义分享给朋友
     wx.updateAppMessageShareData({
       title: 'MCP-EDA Hub - AI驱动的EDA工具集成平台',
       desc: '将Yosys、Verilator、Verible等工具无缝集成到AI工作流中',
       link: 'https://mcp-eda.com',
       imgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop&crop=center',
       success: function () {
         console.log('分享设置成功');
       }
     });

     // 自定义分享到朋友圈
     wx.updateTimelineShareData({
       title: 'MCP-EDA Hub - AI驱动的EDA工具集成平台',
       link: 'https://mcp-eda.com',
       imgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop&crop=center',
       success: function () {
         console.log('朋友圈分享设置成功');
       }
     });
   });
   </script>
   ```

### 方案二：优化 Meta 标签（当前方案）

我们已经添加了以下优化：
- 使用 HTTPS 的图片链接
- 添加正方形图片（500x500）适配微信
- 添加 itemprop 标签
- 添加 og:image:secure_url

### 方案三：使用第三方服务

可以考虑使用第三方服务如：
- ShareSDK
- 友盟分享
- MobTech

## 测试建议

1. **清除微信缓存**
   - 微信会缓存分享信息，修改后需要清除缓存
   - 在微信中打开：`debugx5.qq.com`
   - 点击"清除缓存"

2. **使用微信开发者工具测试**
   - 下载微信开发者工具
   - 使用"公众号网页调试"功能

3. **添加时间戳参数**
   - 分享链接时添加时间戳：`https://mcp-eda.com?t=时间戳`
   - 强制微信重新获取页面信息

## 临时解决方案

如果暂时无法配置微信 JS-SDK，可以：

1. 确保图片链接是 HTTPS
2. 图片大小不超过 300KB
3. 图片格式为 JPG（不是 PNG）
4. 图片尺寸为 500x500 或 300x300

## 注意事项

- 微信对非认证域名的分享有限制
- 部分功能需要微信认证的服务号
- 分享效果可能因微信版本而异