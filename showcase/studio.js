// Original static preview. This is not the d3-wordcloud-react engine or its collision algorithm.
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const datasets={
research:[['research',95],['discovery',86],['science',82],['knowledge',77],['simulation',71],['experiment',68],['evidence',64],['model',58],['hypothesis',55],['method',51],['open source',48],['geometry',44],['analysis',41],['physics',38],['data',36],['systems',34],['reproducibility',32],['curiosity',30],['collaboration',28],['theory',26],['prototype',24],['measure',21],['publication',19],['future',17]],
engineering:[['typescript',95],['react',89],['interface',84],['software',78],['testing',74],['design',70],['components',66],['api',63],['performance',59],['refactor',56],['frontend',52],['javascript',48],['quality',45],['documentation',42],['accessibility',39],['tooling',36],['bundles',34],['open source',32],['automation',29],['workflow',27],['build',25],['release',23],['maintain',19],['code',16]],
arts:[['language',95],['imagine',87],['meaning',80],['poetry',76],['words',72],['story',69],['visual',66],['compose',63],['culture',60],['color',55],['letter',52],['rhythm',49],['narrative',46],['type',43],['art',40],['form',37],['design',34],['metaphor',32],['texture',29],['syntax',26],['gesture',23],['expression',20],['wonder',18],['creative',16]]
};
const palettes={violet:['#6e41b3','#a249c8','#ed608b','#554181','#e58bb9'],sunset:['#db4482','#ff8755','#ed6f65','#a84e94','#f0ad5e'],graphite:['#342f48','#575267','#8a8696','#5a4a6a','#a59ea9']};
let palette='violet';
function rng(seed){let state=(seed>>>0)||1;return ()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};}
function redraw(){
 const data=datasets[$('dataset').value].slice(0,Number($('limit').value)),random=rng(Number($('seed').value)*1759+19),orientation=$('rotation').value;
 $('count').textContent=String(data.length);$('seed-value').textContent=String($('seed').value).padStart(2,'0');
 const svg=$('word-svg');svg.replaceChildren();const title=document.createElementNS(NS,'title');title.textContent='Illustrative word cloud: '+$('dataset').selectedOptions[0].textContent;svg.append(title);
 data.forEach(([word,weight],i)=>{
  // A deterministic, bounded elliptical spiral for showroom illustration only.
  const theta=i*2.39996323+random()*.14,rad=29+Math.sqrt(i)*53;
  const x=400+Math.cos(theta)*rad*1.08,y=255+Math.sin(theta)*rad*.66;
  const angle=orientation==='flat'?0:orientation==='vertical'?(i%3===0?90:0):(i%9===0?-90:i%6===0?90:0);
  const fontSize=Math.round(13+weight*.40),node=document.createElementNS(NS,'text');
  node.textContent=word;node.setAttribute('text-anchor','middle');node.setAttribute('dominant-baseline','central');node.setAttribute('transform','translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+angle+')');node.setAttribute('font-size',String(fontSize));node.setAttribute('font-weight',i<5?'850':'650');node.setAttribute('fill',palettes[palette][i%5]);
  const hint=document.createElementNS(NS,'title');hint.textContent=word+' · weight '+weight;node.append(hint);svg.append(node);
 });
 $('state').textContent=data.length+' WORDS';$('render-desc').textContent='SEED '+$('seed').value+' / '+palette.toUpperCase();
}
for(const id of ['dataset','limit','rotation','seed'])$(id).addEventListener('input',redraw);
document.querySelectorAll('[data-palette]').forEach(button=>button.addEventListener('click',()=>{palette=button.dataset.palette;document.querySelectorAll('[data-palette]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));redraw();}));
$('regenerate').addEventListener('click',()=>{$('seed').value=String(Number($('seed').value)%99+1);redraw()});
$('export').addEventListener('click',()=>{const svg=$('word-svg').cloneNode(true);svg.setAttribute('xmlns',NS);svg.setAttribute('width','800');svg.setAttribute('height','510');svg.setAttribute('style','background:#fff;');const xml=new XMLSerializer().serializeToString(svg),blob=new Blob([xml],{type:'image/svg+xml;charset=utf-8'}),link=document.createElement('a'),url=URL.createObjectURL(blob);link.href=url;link.download='cecil-ia-wordcloud-preview.svg';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),0)});
async function copyText(content,button){const original=button.textContent;try{await navigator.clipboard.writeText(content);button.textContent='Copied!';}catch{button.textContent='Copy manually';}setTimeout(()=>button.textContent=original,1500)}
$('copy-install').addEventListener('click',e=>copyText('npm install @cecilialabs/d3-wordcloud-react',e.currentTarget));
$('copy-example').addEventListener('click',e=>copyText($('example-code').textContent,e.currentTarget));
redraw();