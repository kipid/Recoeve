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