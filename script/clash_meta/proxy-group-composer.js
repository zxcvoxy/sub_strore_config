

var content = $content;

/**
1.
proxy-providers订阅
proxy-providers:
  provider1:
    <<: *p
    url: ""
2.
proxy-groups节点选择下的proxies
proxy-groups:
  - name: 节点选择
    type: select
    proxies:
      - 直连
      - 其它地区
      - provider1-group

3.
proxy-groups每个订阅的分组
  - name: provider1-group
    type: select
    use:
      - provider1

 */

let subs = $substore.cache.subs;

// 1.
// 生成 providers 配置
const providersContent = subs.map(sub => 
    `  ${sub.name}:\n    <<: *p\n    url: "${sub.url}"`
).join('\n');
  
// 替换原配置中的占位符
content = content.replace(
    / {2}provider1:\n(\s*)<<: \*p\n(\s*)url: ""/,
    providersContent
);

// 2. 生成分组配置
const groupProxies = subs.map(sub => `      - ${sub.name}-group`).join('\n');
content = content.replace(
  /proxies:\n([\S\s]*)      - provider1-group/,
  `proxies:\n$1${groupProxies}`
);

// 3. 生成使用关系
const useGroups = subs.map(sub => 
    `  - name: ${sub.name}-group\n    type: select\n    use:\n      - ${sub.name}`
).join('\n\n');

content = content.replace(
  /.*- name: provider1-group[\s\S]*- provider1/,  
  `\n${useGroups}\n`
);

// JSON
$content = content

