

var content = $content;

let subs = $substore.cache.subs;
let files= $substore.cache.files;
let baseUrlObj = files.filter( x => x.name == `baseUrl`)[0];
let baseUrl = baseUrlObj.content;
let append1 = "";
let append2 = "  use:\n";
for (let sub of subs ) {
  let url = baseUrl + `${sub.name}?target=ClashMeta`
  append1 = append1 + `  ${sub.name}:
    <<: *p
    url: "${url}"` + "\n";

  append2 = append2 + `  - ${sub.name}` + "\n";;
}

content = content.replace(`  provider1:
    <<: *p
    url: ""`,append1 );
content = content.replace(`  use:
  - provider1`,append2 )
// JSON
$content = content 
// $content = JSON.stringify({baseUrl }, null, 2)
// { $content, $files } will be passed to the next operator 
// $content is the final content of the file
