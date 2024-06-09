
var content = $content;

let subs = $substore.cache.subs;
let files= $substore.cache.files;
let baseUrlObj = files.filter( x => x.name == `baseUrl`)[0];
let baseUrl = baseUrlObj.content;

let proxyprivider = `proxy-providers:\n`;
let providerGroup = ``;
let provider1_select_ahchor = ``;

for (let sub of subs ) {
  let url = baseUrl + `${sub.name}?target=ClashMeta`

  proxyprivider = proxyprivider + `  ${sub.name}:
    url: "${url}"
    type: http
    interval: 86400
    health-check:
        enable: true
        interval: 3600
        url: https://www.gstatic.com/generate_204\n`;

  providerGroup  = providerGroup + `  - name: ${sub.name}-group
    type: select
    use:
      - ${sub.name}\n`
  provider1_select_ahchor = provider1_select_ahchor + `      - ${sub.name}-group\n`;
}

content = content.replace(`proxy-providers:
  provider1:
    url: ""
    type: http
    interval: 86400
    health-check:
        enable: true
        interval: 3600
        url: https://www.gstatic.com/generate_204`,proxyprivider );

content = content.replace(`  - name: provider1-group
    type: select
    use:
      - provider1`,providerGroup );

content = content.replace(`      - provider1_select_ahchor`,provider1_select_ahchor)

// JSON
$content = content 