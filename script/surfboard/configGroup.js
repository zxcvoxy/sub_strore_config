var content = $content;

let subs = $substore.cache.subs;
let files= $substore.cache.files;
let baseUrlObj = files.filter( x => x.name == `baseUrl`)[0];
let baseUrl = baseUrlObj.content;

let proxy_group_name_anchor = "";
let proxy_group_anchor = "";

let proxy_group_name_anchor_array=[];

for (let sub of subs ) {
  let name = sub.name
  let url = baseUrl + `${name}?target=Surfboard`

  proxy_group_anchor = proxy_group_anchor + `${name}_group= select, policy-path=${url}\n`;
  proxy_group_name_anchor_array.push(`${name}_group`);
}
proxy_group_name_anchor = proxy_group_name_anchor_array.join(",");


content = content.replace("proxy_group_anchor = select, policy-path=__________",proxy_group_anchor )
content = content.replaceAll("proxy_group_name_anchor",proxy_group_name_anchor )

// JSON
$content = content ;