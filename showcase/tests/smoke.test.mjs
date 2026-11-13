import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const html=read('../index.html'), js=read('../studio.js'), css=read('../studio.css');
test('project links and attribution',()=>{
 assert.match(html,/npmjs.com\/package\/@cecilialabs\/d3-wordcloud-react/);
 assert.match(html,/github.com\/cecil-ia-labs\/d3-wordcloud-react/);
 assert.match(html,/Chris Zhou/);
});
test('clearly separates SVG preview from actual D3 runtime',()=>{
 assert.match(html,/does not run the package.s actual D3 collision algorithm/);
 assert.match(js,/not the d3-wordcloud-react engine/);
});
test('working studio controls and local SVG export',()=>{
 for(const id of ['dataset','palette','limit','rotation','seed','regenerate','export','word-svg']) assert.ok(html.includes('id="'+id+'"'));
 assert.match(js,/function redraw\(/);
 assert.match(js,/new XMLSerializer\(\)/);
 assert.match(js,/URL\.createObjectURL/);
});
test('showroom adapts to narrow screens',()=>assert.match(css,/@media\(max-width:610px\)/));