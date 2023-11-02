let vars=m.getSearchVars(m.initialSearch);
let cat=m.currentCat="[Music/Break]--K-Pop";
m.triggerOpenCat(null, m.currentCat, $(`#cat-${m.escapeEncodePctg(encodeURIComponent(m.currentCat))}`)[0]);



let $cat=$(`#cat-${m.escapeEncodePctg(encodeURIComponent(cat))}`);
$cat.addClass("selected");



$("#gotoCats-228").trigger("click");

$(`#gotoCats-${m.fsGotoCats.fullList["[Recoeve]--홍보"].i}`).trigger("click");



let cat=m.currentCat="[Music/Break]--K-Pop";
let $elem=$(`#cat-${m.escapeEncodePctg(encodeURIComponent(cat))}`);
let elem=$elem[0];
$elem.trigger({type:'mouseup', which:1}, cat, elem);




m.fsCat.fullList[0];
m.fsToRs.fullList[0];
m.fsGotoCats.fullList[0];




$("#gotoCats-230").trigger("click");


let fs=m.fsGotoCats;
fs.fullList["[Music/Break]--K-Pop"].down=true;
fs.fullList["[Music/Break]--K-Pop"].i;
let fsRes=m.fsGotoCats[0];
let fsSortedI=fsRes[fsRes.sorted[0]];
let fsFLk=fs.fullList[fsSortedI.i];
`<div class="list-item${fsFLk?.cat===m.currentCat?" selected":""}${fsFLk?.down?" down":""}${fsFLk?.deleted?" deleted":""}" id="gotoCats-${fsFLk.i}" onclick="m.completeCatAndOpenCat(event)"><span class="list-index-id">${m.escapeOnlyTag(fsFLk.cat)}</span>${fs.fullList[fsSortedI.i].html}${(fsSortedI.highlight!==undefined?`<div class="highlighted"><span class="maxMatchScore">${fsSortedI.maxMatchScore}</span> :: ${fsSortedI.highlight}</div>`:'')}</div>`;
