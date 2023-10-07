window.m={};
(function (m, $, undefined) {
// user-page.html, log-in.html, changePwd.html
$window=$(window);
$document=$(document);
$.fn.exists=function () { return this.length!==0; };

m.getSearchVars=function (searchStr) {
	let vars=[];
	if (searchStr!==null&&searchStr!==undefined&&searchStr.constructor===String&&searchStr.length!==0) {
		if (searchStr.startsWith("?")) { searchStr=searchStr.substring(1); }
		let j=searchStr.indexOf("#");
		if (j!==-1) { searchStr=searchStr.substring(0,j); }
		let splits=searchStr.replace(/&amp;/ig,"&").replace(/\+/g,"%20").split("&");
		for (let i=0;i<splits.length;i++) {
			let key=splits[i];
			let value="";
			let k=key.indexOf("=");
			if (k!==-1) {
				value=decodeURIComponent(key.substring(k+1));
				key=key.substring(0,k);
			}
			key=decodeURIComponent(key);
			vars[i]=vars[key]={key:key, val:value};
		}
	}
	return vars;
};

m.pathOfCat=function (cat, mode, lang, hashURI, args) {
	let argsSearch="";
	if (args) {
		for (const prop in args) {
			argsSearch+=`&${prop}=${encodeURIComponent(args[prop])}`;
		}
	}
	return `${m.userPath}${mode?`/mode/${mode}`:''}?${(cat!==null&&cat!==undefined)?`cat=${encodeURIComponent(cat)}`:""}${lang?`&lang=${lang}`:""}${argsSearch}${hashURI?`#${encodeURIComponent(hashURI)}`:""}`;
};
m.pathOfNeighbor=function (user_id, cat, mode, lang, hashURI, args) {
	let argsSearch="";
	if (args) {
		for (const prop in args) {
			argsSearch+=`&${prop}=${args[prop]}`;
		}
	}
	return `/user/${user_id}${mode?`/mode/${mode}`:''}?${(cat!==null&&cat!==undefined)?`cat=${encodeURIComponent(cat)}`:""}${lang?`&lang=${lang}`:""}${argsSearch}${hashURI?`#${encodeURIComponent(hashURI)}`:""}`;
};

/*	:: cookies.js :: Slightly edited by kipid at 2023-06-06.
|*|
|*|	A complete cookies reader/writer framework with full unicode support.
|*|
|*|	https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|	This framework is released under the GNU Public License, version 3 or later.
|*|	http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|	Syntaxes:
|*|	* docCookies.setItem(name, value[, end[, path[, domain[, secure]]]]) // end :: Number: max-age in seconds
|*|	* docCookies.getItem(name)
|*|	* docCookies.removeItem(name[, path], domain)
|*|	* docCookies.hasItem(name)
|*|	* docCookies.keys()
 */
m.docCookies={
	hasItem:function(sKey) {
		return (new RegExp("(?:^|;\\s*)"+encodeURIComponent(sKey).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=")).test(document.cookie);
	}
	, getItem:function(sKey) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(sKey).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null;
	}
	, removeItem:function(sKey, sPath, sDomain, bSecure) {
		if (!sKey||/^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		document.cookie=encodeURIComponent(sKey)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(sDomain?"; domain="+sDomain:"")+(sPath?"; path="+sPath:"")+(bSecure?"; secure":"");
		return true;
	}
	, setItem:function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey||/^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		let sExpires="";
		if (vEnd) { switch (vEnd.constructor) {
			case Number:
				sExpires=vEnd===Infinity?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+vEnd;
				break;
			case String:
				sExpires="; expires="+vEnd;
				break;
			case Date:
				sExpires="; expires="+vEnd.toUTCString();
				break;
		}}
		document.cookie=encodeURIComponent(sKey)+"="+encodeURIComponent(sValue)+sExpires+(sDomain?"; domain="+sDomain:"")+(sPath?"; path="+sPath:"")+(bSecure?"; secure":"");
		return true;
	}
	, keys:function() {
		let aKeys=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/);
		// for (let nIdx=0;nIdx<aKeys.length;nIdx++) { aKeys[nIdx]=decodeURIComponent(aKeys[nIdx]); }
		return aKeys;
	}
};

m.saveSSN=function () {
	if (m.docCookies.hasItem("salt")) {
		m.saltSSN=m.docCookies.getItem("salt");
		m.docCookies.removeItem("salt", "/", false, true);
	}
	if (m.docCookies.hasItem("session")) {
		m.session=m.docCookies.getItem("session");
		m.docCookies.removeItem("session", "/", false, true);
	}
};



////////////////////////////////////////////////////
// Local storage
////////////////////////////////////////////////////
m.localStorage={
	setItem:function (key, val) {
		localStorage.setItem(encodeURIComponent(key), encodeURIComponent(val));
		return true;
	}
	, getItem:function (key) {
		return decodeURIComponent(localStorage.getItem(encodeURIComponent(key)));
	}
	, removeItem:function (key) {
		localStorage.removeItem(encodeURIComponent(key));
		return true;
	}
	, clear:function () {
		localStorage.clear();
		return true;
	}
};

////////////////////////////////////////////////////
// hash encrypt
////////////////////////////////////////////////////
m.pad=function(str, max) {
	str=str.toString();
	return (str.length<max)?m.pad("0"+str,max):str;
};
m.hash1=function(str) {
	let h=-17-str.length;
	for (let i=0;i<str.length;i++) {
		h+=str.charCodeAt(i);
		h+=(h<<10);
		h^=(h>>>6);
	}
	h+=(((h>>>0)%1318489)<<7);
	h+=(h<<3);
	h^=(h>>>11);
	h+=(h<<15);
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash2=function(str) {
	let h=str.length+1;
	let tmp;
	for (let i=0;i<str.length;i++) {
		h+=str.charCodeAt(i);
		tmp=(str.charCodeAt(str.length-1-i)<<11)^h;
		h+=(h<<16)^tmp;
		h^=(h>>>7);
		h+=(h<<11);
	}
	h+=( ((h>>>0)%918679)<<11 );
	h^=h<<3;
	h+=h>>>5;
	h^=h<<4;
	h+=h>>>17;
	h^=h<<25;
	h+=h>>>6;
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash3=function(str) {
	let h=-1023+str.length;
	for (let i=0;i<str.length;i++) {
		h^=(h<<5)+(h>>>2)+str.charCodeAt(i);
	}
	h^=h<<15;
	h+=h<<15;
	h+=( ((h>>>0)%1299451)<<2 );
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash4=function(str) {/* RS Hash Function */
	let b=378551;
	let a=63689;
	let h=0;
	for (let i=0;i<str.length;i++) {
		let q=0;
		for (let j=0;j<32;j++) {
			if (a&(1<<j)) {
				q=(q+(h<<j))>>>0;
			}
		}
		h=(q+str.charCodeAt(i))>>>0;
			// h=h*a+str.charCodeAt(i);
		q=0;
		for (let j=0;j<32;j++) {
			if (b&(1<<j)) {
				q=(q+(a<<j))>>>0;
			}
		}
		a=q; // a=a*b;
	}
	return m.pad(h.toString(16), 8);
};
m.hash5=function(str) {/* JS Hash Function */
	let h=1315423911;
	for (let i=0;i<str.length;i++) {
		h^=((h<<5)+str.charCodeAt(i)+(h>>2))>>>0;
	}
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash6=function(str) {/* ELF Hash Function */
	let h=0;
	let x=0;
	for (let i=0;i<str.length;i++) {
		h=((h<<4)+str.charCodeAt(i))>>>0;
		if ((x=h&0xf0000000)!=0) {
			h^=(x>>24);
		}
		h&=~x;
	}
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash7=function(str) {/* BKDR Hash Function */
	let a=131; // 31 131 1313 13131 131313 etc..
	let h=0;
	for (let i=0;i<str.length;i++) {
		let q=0;
		for (let j=0;j<32;j++) {
			if (a&(1<<j)) {
				q=(q+(h<<j))>>>0;
			}
		}
		h=(q+str.charCodeAt(i))>>>0;
			// h=h*a+str.charCodeAt(i);
	}
	return m.pad(h.toString(16), 8);
};
m.hash8=function(str) {/* SDBM Hash Function */
	let h=0;
	for (let i=0;i<str.length;i++) {
		h=(str.charCodeAt(i)+(h<<6)+(h<<16)-h)>>>0;
	}
	return m.pad(h.toString(16), 8);
};
m.hash9=function(str) {/* DJB Hash Function */
	let h=5381;
	for (let i=0;i<str.length;i++) {
		h=(((h<<5)+h)+str.charCodeAt(i))>>>0;
	}
	return m.pad(h.toString(16), 8);
};
m.hash10=function(str) {/* DEK Hash Function */
	let h=str.length;
	for (let i=0;i<str.length;i++) {
		h=((h<<5)^(h>>27))^str.charCodeAt(i);
	}
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash11=function(str) {/* BP Hash Function */
	let h=0;
	for (let i=0;i<str.length;i++) {
		h=h<<7^str.charCodeAt(i);
	}
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash12=function(str) {/* FNV Hash Function */
	let a=0x811C9DC5;
	let h=0;
	for (let i=0;i<str.length;i++) {
		let q=0;
		for (let j=0;j<32;j++) {
			if (a&(1<<j)) {
				q=(q+(h<<j))>>>0;
			}
		}
		h=q>>>0;
			// h=h*a;
		h^=str.charCodeAt(i);
	}
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.hash13=function(str) {/* AP Hash Function */
	let h=0xAAAAAAAA;
	for(let i=0;i<str.length;i++) {
		if ((i&1)==0) {
			h^=((h<<7)^str.charCodeAt(i)*(h>>3));
		}
		else {
			h^=(~((h<<11)+str.charCodeAt(i)^(h>>5)));
		}
	}
	h=h>>>0;
	return m.pad(h.toString(16), 8);
};
m.encrypt=function(salt, pwd, iter) {
	iter=pwd.length+131+((iter&&iter.constructor==Number&&iter>=0)?iter:0);;
	pwd=salt+pwd;
	let h1=m.hash1(pwd);
	let h2=m.hash2(pwd);
	let h3=m.hash3(pwd);
	let h4=m.hash4(pwd);
	let h5=m.hash5(pwd);
	let h6=m.hash6(pwd);
	let h7=m.hash7(pwd);
	let h8=m.hash8(pwd);
	let h9=m.hash9(pwd);
	let h10=m.hash10(pwd);
	let h11=m.hash11(pwd);
	let h12=m.hash12(pwd);
	let h13=m.hash13(pwd);
	let tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
	for (let i=0;i<iter;i++) {
		tmp1=h13+h12+h11+h10+h9+salt+h8+h7+h6+h5+h4+h3+h2+h1;
		tmp2=h1+h3+salt+h2;
		tmp3=salt+h2+h8+h1+h3;
		tmp4=h7+salt+h5;
		tmp5=h4+salt+h8;
		tmp6=h10+h13+salt+h6;
		tmp7=h6+h1+h9+salt;
		tmp8=h9+salt+h10;
		tmp9=h7+salt+h12;
		tmp10=h11+salt+h5;
		tmp11=h4+salt+h13+h2;
		tmp12=h11+salt+h6;
		tmp13=h4+h12+salt+h8;
		h1=m.hash1(tmp1);
		h2=m.hash2(tmp2);
		h3=m.hash3(tmp3);
		h4=m.hash4(tmp4);
		h5=m.hash5(tmp5);
		h6=m.hash6(tmp6);
		h7=m.hash7(tmp7);
		h8=m.hash8(tmp8);
		h9=m.hash9(tmp9);
		h10=m.hash10(tmp10);
		h11=m.hash11(tmp11);
		h12=m.hash12(tmp12);
		h13=m.hash13(tmp13);
	}
	return h1+h2+h3+h4+h5+h6+h7+h8+h9+h10+h11+h12+h13;
};
m.iterFull=10000;
m.iterSessionFull=1000;



////////////////////////////////////////////////////
// Escape and Unescape HTML string.
////////////////////////////////////////////////////
m.escapeHTML=function (str) {
	if (!str||str.constructor!==String) { return ""; }
	return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};
m.unescapeHTML=function (str) {
	if (!str||str.constructor!==String) { return ""; }
	return str.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&');
};



////////////////////////////
// String to Array
////////////////////////////
m.encloseStr=function (str) {
	if (!str || str.constructor!==String) { return ''; }
	if (str.charAt(0)==='"' || /[\n\t]/.test(str)) {
		return `"${str.replace(/"/g,'""')}"`;
	} return str;
};
m.strToJSON=function (str, colMap=true, rowMap=false) {
	if (!str||str.constructor!==String) {
		return Promise.resolve(str);
	}
	if (str.charAt(str.length-1)!=="\n") {
		str+="\n";
	}
	const ret=[];
	const delimiter=/([^\t\n]*)([\t\n])/g;
	const lastQuote=/[^"](?:"")*"([\t\n])/g;
	let exec;
	let start=0;
	let row=-1, col=-1, delim="\n";
	let strElem="";
	function increaseRC(delim) {
		if (delim==='\t') {
			col++; return true;
		}
		else if (delim==='\n') {
			row++; col=0; ret.push([]); return true;
		} return false;
	}
	while (start<str.length&&increaseRC(delim)) {
		if ((str.substring(start, start+1))==='"') {
			lastQuote.lastIndex=start+1;
			if ((exec=lastQuote.exec(str))!==null) {
				strElem=str.substring(start+1, lastQuote.lastIndex-2);
				delim=exec[1];
				start=delimiter.lastIndex=lastQuote.lastIndex;
			}
			else {
				strElem=str.substring(start+1);
				delim="";
				start=str.length;
			}
			strElem=strElem.replace(/""/g,'"');
		}
		else {
			if ((exec=delimiter.exec(str))!==null) {
				strElem=exec[1];
				delim=exec[2];
				start=delimiter.lastIndex;
			}
			else {
				strElem=str.substring(start);
				delim="";
				start=str.length;
			}
		}
		ret[row][col]=strElem;
	}
	if (colMap) {
		const firstColSize=ret[0].length;
		for (let i=0;i<ret.length;i++) {
			let jMax=ret[i].length;
			for (let j=0;j<firstColSize;j++) {
				let key=ret[0][j];
				if (j>=jMax) {
					ret[i][key]="";
				}
				else {
					ret[i][key]=ret[i][j];
				}
			}
		}
	}
	if (rowMap) {
		for (let i=0;i<ret.length;i++) {
			let key=ret[i][0];
			ret[key]=ret[i];
		}
	}
	return Promise.resolve(ret);
};
m.csvToJSON=function (str, colMap=true, rowMap=false) {
	if (!str||str.constructor!==String) {
		return Promise.resolve(str);
	}
	let rows=str.split("\n");
	for (let i=0;i<rows.length;i++) {
		if (rows[i].substring(0,1)==='"'&&rows[i].substring(rows[i].length-1)==='"') {
			rows[i]=rows[i].substring(1,rows[i].length-1).split('","');
		}
		else {
			rows[i]=rows[i].split(",");
		}
	}
	if (colMap) {
		const firstColSize=rows[0].length;
		for (let i=0;i<rows.length;i++) {
			let jMax=rows[i].length;
			if (jMax>firstColSize) { jMax=firstColSize; }
			for (let j=0;j<jMax;j++) {
				let key=rows[0][j];
				if (key!==undefined) {
					rows[i][key]=rows[i][j];
				}
			}
		}
	}
	if (rowMap) {
		for (let i=0;i<rows.length;i++) {
			let key=rows[i][0];
			if (key!==undefined) {
				rows[key]=rows[i];
			}
		}
	}
	return Promise.resolve(rows);
};



////////////////////////////////////////////////////
// Heap sort.
////////////////////////////////////////////////////
m.heapify=function (arr, key, sorted, n, i) {
	let largest=i;
	let l=2*i+1;
	let r=2*i+2;
	if (l<n&&arr[sorted[l]][key]>arr[sorted[largest]][key]) {
		largest=l;
	}
	if (r<n&&arr[sorted[r]][key]>arr[sorted[largest]][key]) {
		largest=r;
	}
	if (largest!=i) {
		let swap=sorted[i];
		sorted[i]=sorted[largest];
		sorted[largest]=swap;
		m.heapify(arr, key, sorted, n, largest);
	}
};
m.heapsort=function (arr, key, sorted, upto) {
	let n=arr.length;
	for (let i=Math.floor(n/2)-1;i>=0;i--) {
		m.heapify(arr, key, sorted, n, i);
	}
	if (upto) {
		upto=upto>n?n:upto;
	}
	else {
		upto=n;
	}
	let until=n-upto;
	for (let i=n-1;i>=until;i--) {
		let temp=sorted[0];
		sorted[0]=sorted[i];
		sorted[i]=temp;
		m.heapify(arr, key, sorted, i, 0);
	}
	return until;
};
m.heapsortRest=function (arr, key, sorted, upto, n) {
	upto=upto>n?n:upto;
	let until=n-upto;
	for (let i=n-1;i>=until;i--) {
		let temp=sorted[0];
		sorted[0]=sorted[i];
		sorted[i]=temp;
		m.heapify(arr, key, sorted, i, 0);
	}
	return until;
};



////////////////////////////////////////////////////
// Delayed Loading.
////////////////////////////////////////////////////
m.delayPad=1024;
m.wait=1024;
m.$delayedElems=$("[delayed-src], [delayed-bgimage], .to-be-executed");
m.previous=Date.now();
$.fn.inView=function () {
	if (this.is(":visible")) {
		let viewportHeight=window.innerHeight;
		let scrollTop=$window.scrollTop();
		let elemTop=this.offset().top-m.delayPad;
		let elemBottom=elemTop+this.height()+m.delayPad;
		return (scrollTop+viewportHeight>elemTop)&&(scrollTop<elemBottom);
	}
	else {
		return false;
	}
};
$.fn.delayedLoad=function () {
	let done=false;
	if (this.inView()) {
		if (this.hasClass("to-be-executed")) {
			this.removeClass("to-be-executed");
			this.trigger("click");
			done=true;
		}
		// divs with background-image
		if (this.attr("delayed-bgimage")) {
			this.css("background-image", "url("+this.attr("delayed-bgimage")+")");
			this.removeAttr("delayed-bgimage");
			done=true;
		}
		// iframes or images
		if (this.attr("delayed-src")) {
			this.attr("src", this.attr("delayed-src"));
			this.removeAttr("delayed-src");
			done=true;
		}
		// MathJax Process TODO: update MathJax
		// if (typeof MathJax!=='undefined'&&this.is(".MathJax_Preview")) {
		// 	MathJax.Hub.Queue(["Process", MathJax.Hub, this.next()[0]]);
		// 	done=true;
		// }
	}
	return done;
};
m.delayedLoadAll=function () {
	m.$delayedElems.each(function () {
		if ($(this).delayedLoad()) {
			m.$delayedElems=m.$delayedElems.not(this);
		}
	});
	if (m.$delayedElems.length>0) {
		$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
	}
	else {
		$window.off("scroll.delayedLoad");
	}
	m.previous=Date.now();
};
m.delayedLoadByScroll=function () {
	$window.off("scroll.delayedLoad");
	let now=Date.now();
	let passed=now-m.previous;
	if (passed>m.wait) {
		m.delayedLoadAll();
	}
	else {
		m.delayedLoadSetTimeout=setTimeout(function () {
			m.delayedLoadAll();
		}, m.wait*1.1-passed);
	}
};
$window.on("scroll.delayedLoad", m.delayedLoadByScroll);



/* Remember user */
m.sW=screen.width;
m.sH=screen.height;
if (m.sW<m.sH) {
	m.sW=screen.height;
	m.sH=screen.width;
}
m.str_rmb_me='log\tsW\tsH\n'
	+'web\t'+m.sW+'\t'+m.sH;
m.rmb_me=function (callback, args, saveNewRecoInputs) {
return new Promise(function (resolve, reject) {
	if (saveNewRecoInputs) {
		m.localStorage.setItem("uri", m.formatURI($input_uri[0].value));
		m.localStorage.setItem("title", m.formatTitle($input_title[0].value.trim()));
		m.localStorage.setItem("cats", m.formatCats($input_cats[0].value.trim()));
		m.localStorage.setItem("desc", $input_desc[0].value.trim());
		m.localStorage.setItem("cmt", $input_cmt[0].value.trim());
		let val=m.val($input_val[0].value.trim());
		if (val.valid) {
			m.localStorage.setItem("points", val.str);
		}
	}
	let SSNencrypt=function (callback, args) {
		$.ajax({
			type:"GET", url:"/sessionIter"
			, dataType:"text"
		}).done(function (resp) {
			console.log(resp);
			let iter=Number(resp);
			if (isNaN(iter)) {
				callback(args, resp);
			}
			else {
				m.docCookies.setItem("SSN", m.encrypt(m.saltSSN, m.session.substring(3,11), iter), 3, "/", false, true);
				callback(args, null); // null means no error.
				resolve();
				// m.docCookies.removeItem("SSN", "/", false, true);
			}
		});
	};
	if (m.docCookies.hasItem('tCreate')) {
		if (m.docCookies.hasItem("salt")||m.docCookies.hasItem("session")) {
			m.saveSSN();
		}
		if (m.saltSSN&&m.session) {
			SSNencrypt(callback, args);
			resolve();
			return;
		}
	}
	if (m.docCookies.hasItem('rmbdI')) {
		$.ajax({
			type:"POST", url:"/account/log-in/remember-me.do", data:m.str_rmb_me
			, dataType:"text"
		}).done(function (resp) {
			console.log("rmb_do : "+resp);
			setTimeout(function () {
				console.log(`${resp}, tCreate:${m.docCookies.hasItem('tCreate')}`);
				if (resp==="Rmbd"&&m.docCookies.hasItem('tCreate')) {
					m.saveSSN();
					if (m.saltSSN&&m.session) {
						SSNencrypt(callback, args);
					}
					else {
						callback(args, resp);
					}
				}
				else {
					callback(args, resp);
				}
				resolve();
			}, 1000);
		});
	}
	else {
		callback(args, "Error: No rmbdI cookie.");
		resolve();
	}
});
};



////////////////////////////////////////////////////
// Hangul (Korean) split and map to English
// KE : Korean Expanded
////////////////////////////////////////////////////
m.jamoKE=["ㄱ", "ㄱㄱ", "ㄱㅅ", "ㄴ", "ㄴㅈ", "ㄴㅎ", "ㄷ", "ㄷㄷ", "ㄹ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅁ", "ㅂ", "ㅂㅂ", "ㅂㅅ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅈㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅗㅏ", "ㅗㅐ", "ㅗㅣ", "ㅛ", "ㅜ", "ㅜㅓ", "ㅜㅔ", "ㅜㅣ", "ㅠ", "ㅡ", "ㅡㅣ", "ㅣ"];
m.jamo=["ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄸ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅃ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];

m.mapKE={"q":"ㅂ", "Q":"ㅃ", "w":"ㅈ", "W":"ㅉ", "e":"ㄷ", "E":"ㄸ", "r":"ㄱ", "R":"ㄲ", "t":"ㅅ", "T":"ㅆ", "y":"ㅛ", "Y":"ㅛ", "u":"ㅕ", "U":"ㅕ", "i":"ㅑ", "I":"ㅑ", "o":"ㅐ", "O":"ㅒ", "p":"ㅔ", "P":"ㅖ", "a":"ㅁ", "A":"ㅁ", "s":"ㄴ", "S":"ㄴ", "d":"ㅇ", "D":"ㅇ", "f":"ㄹ", "F":"ㄹ", "g":"ㅎ", "G":"ㅎ", "h":"ㅗ", "H":"ㅗ", "j":"ㅓ", "J":"ㅓ", "k":"ㅏ", "K":"ㅏ", "l":"ㅣ", "L":"ㅣ", "z":"ㅋ", "Z":"ㅋ", "x":"ㅌ", "X":"ㅌ", "c":"ㅊ", "C":"ㅊ", "v":"ㅍ", "V":"ㅍ", "b":"ㅠ", "B":"ㅠ", "n":"ㅜ", "N":"ㅜ", "m":"ㅡ", "M":"ㅡ"};
for (let p in m.mapKE) {
	m.mapKE[m.mapKE[p]]=p;
}

m.rChoKE=["ㄱ", "ㄱㄱ", "ㄴ", "ㄷ", "ㄷㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅂㅂ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅈㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
m.rCho=["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

m.rJungKE=["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅗㅏ", "ㅗㅐ", "ㅗㅣ", "ㅛ", "ㅜ", "ㅜㅓ", "ㅜㅔ", "ㅜㅣ", "ㅠ", "ㅡ", "ㅡㅣ", "ㅣ"];
m.rJung=["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];

m.rJongKE=["", "ㄱ", "ㄱㄱ", "ㄱㅅ", "ㄴ", "ㄴㅈ", "ㄴㅎ", "ㄷ", "ㄹ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅁ", "ㅂ", "ㅂㅅ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
m.rJong=["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

m.splitHangul=function (str) {
	let res=[];
	res.originalStr=str;
	res.splitted3="";
	res.splitted="";
	res.pCho=[]; // position of word-start or 초성
	let p=0;
	res.pCho[p]=true;
	if (!str||str.constructor!==String) {
		return res;
	}
	let cho, jung, jong;
	for (let i=0;i<str.length;i++) {
		let c=str.charAt(i)
		let n=str.charCodeAt(i);
		if (n>=0x3131&&n<=0x3163) {
			n-=0x3131;
			res[i]={"char":c, "splitted3":c, "splitted":m.jamoKE[n]};
			res.pCho[p]=true;
		}
		else if (n>=0xAC00&&n<=0xD7A3) {
			n-=0xAC00;
			jong=n%28;
			jung=( (n-jong)/28 )%21;
			cho=( ((n-jong)/28)-jung )/21;
			res[i]={"char":c
				, "splitted3":m.rCho[cho]+m.rJung[jung]+m.rJong[jong]
				, "splitted":m.rChoKE[cho]+m.rJungKE[jung]+m.rJongKE[jong]};
			res.pCho[p]=true;
		}
		else {
			res[i]={"char":c, "splitted3":c, "splitted":c};
			if (i>0&&/[^a-zA-Z0-9]$/.test(res[i-1].splitted)&&/[a-zA-Z0-9]/.test(c)) {
				res.pCho[p]=true;
			}
		}
		p+=res[i].splitted.length;
		res.splitted3+=res[i].splitted3;
		res.splitted+=res[i].splitted;
	}
	return res;
};



RegExp.quote=function (str) {
	return str.replace(/[.?*+^$[\]\\{}()|-]/g, "\\$&").replace(/\s/g, "[\\s\\S]");
};
m.arrayRegExs=function (ptnSH) {
	let str=ptnSH.splitted;
	let res=[];
	for (let i=0;i<str.length;i++) {
		let c=str.charAt(i);
		let mapKE=m.mapKE[c];
		if (mapKE) {
			res.push( new RegExp("["+c+mapKE+"]", "ig") );
		}
		else {
			res.push( new RegExp(RegExp.quote(c), "ig") );
		}
	}
	return res;
};
m.highlightStrFromIndices=function (strSplitted, indices) {
	let res="";
	for (let i=0, j=1, k=0, p1=0, p2=0;j<=indices.length;i=j,j++) {
		while (j<indices.length&&indices[j-1].end===indices[j].start) {
			j++;
		}
		for (;k<strSplitted.length;k++) {
			p1=p2;
			p2=p1+strSplitted[k].splitted.length;
			if (p2<=indices[i].start) {
				strSplitted[k].matched=false;
			}
			else if (p1<indices[j-1].end) {
				strSplitted[k].matched=true;
			}
			else {
				if (j===indices.length) {
					for (;k<strSplitted.length;k++) {
						strSplitted[k].matched=false;
					}
				}
				p2=p1;
				break;
			}
		}
	}
	for (let i=0;i<strSplitted.length;) {
		if (strSplitted[i].matched) {
			res+='<span class="bold">';
			while (i<strSplitted.length&&strSplitted[i].matched) {
				res+=m.escapeHTML(strSplitted[i].char);
				i++;
			}
			res+='</span>';
		}
		else {
			while (i<strSplitted.length&&!strSplitted[i].matched) {
				res+=m.escapeHTML(strSplitted[i].char);
				i++;
			}
		}
	}
	return res;
};
m.matchScoreFromIndices=function (strSH, ptnSH, indices) {
	let res=0;
	for (let i=0;i<indices.length;i++) {
		if (strSH.pCho[indices[i].start])
			res+=10;
	}
	for (let i=1;i<indices.length;i++) {
		let diff=indices[i].start-indices[i-1].start;
		if (diff<5) res+=8*(5-diff);
	}
	return res;
};
m.fuzzySearch=function (ptnSH, fs) {
	if (ptnSH.splitted===fs[0].ptnSH.splitted) {
		return fs[0];
	}
	else if (ptnSH.splitted.indexOf(fs[0].ptnSH.splitted)!==-1) {
		fs[1]=fs[0];
	}
	else if (fs[1]&&ptnSH.splitted.indexOf(fs[1].ptnSH.splitted)!==-1) {
		if (ptnSH.splitted===fs[1].ptnSH.splitted) {
			return fs[1];
		}
	}
	else {
		fs[1]=null;
	}
	let list=[];
	if (fs[1]&&fs[1].sorted) {
		let sorted=fs[1].sorted;
		for (let i=0;i<sorted.length;i++) {
			list.push(fs.fullList[fs[1][sorted[i]].i]);
		}
	}
	else {
		if (fs.shuffled) {
			let shuffled=fs.shuffled;
			for (let i=0;i<shuffled.length;i++) {
				list.push(fs.fullList[shuffled[i].i]);
			}
		}
		else {
			let l=fs.fullList.length;
			for (let i=0;i<l;i++) {
				list.push(fs.fullList[l-1-i]);
			}
		}
	}
	fs[0]=[];
	fs[0].ptnSH=ptnSH;
	let regExs=m.arrayRegExs(ptnSH);
	let regExsReversed=[];
	for (let i=0;i<regExs.length;i++) {
		regExsReversed[i]=regExs[regExs.length-1-i];
	}
	for (let i=0;i<list.length;i++) {
		let listI=list[i];
	if (regExs.length>0) {
		let txt=listI.txt;
		let txtS=txt.splitted;
		let txtSReversed=txtS.split("").reverse().join("");
		regExs[0].lastIndex=0;
		let exec=regExs[0].exec(txtS);
		let matched=(exec!==null);
		let indices=[];
		if (matched) {
			indices[0]={start:exec.index, end:regExs[0].lastIndex};
		}
		for (let j=1;matched&&(j<regExs.length);j++) {
			regExs[j].lastIndex=regExs[j-1].lastIndex;
			exec=regExs[j].exec(txtS);
			matched=(exec!==null);
			if (matched) {
				indices[j]={start:exec.index, end:regExs[j].lastIndex};
			}
		}
		let maxMatchScore=0;
		if (matched) {
			maxMatchScore=m.matchScoreFromIndices(txt, ptnSH, indices);
			let indicesMMS=[]; // indices of max match score
			for (let p=0;p<indices.length;p++) {
				indicesMMS[p]=indices[p]; // hard copy of indices
			}
			if (txt.length<512) {
				for (let k=indices.length-2;k>=0;) {
					regExs[k].lastIndex=indices[k].start+1;
					exec=regExs[k].exec(txtS);
					matched=(exec!==null);
					if (matched) {
						indices[k]={start:exec.index, end:regExs[k].lastIndex};
					}
					for (let j=k+1;matched&&(j<regExs.length);j++) {
						regExs[j].lastIndex=regExs[j-1].lastIndex;
						exec=regExs[j].exec(txtS);
						matched=(exec!==null);
						if (matched) {
							indices[j]={start:exec.index, end:regExs[j].lastIndex};
						}
					}
					if (matched) {
						let matchScore=m.matchScoreFromIndices(txt, ptnSH, indices);
						if (matchScore>maxMatchScore) {
							maxMatchScore=matchScore;
							indicesMMS=[];
							for (let p=0;p<indices.length;p++) {
								indicesMMS[p]=indices[p]; // hard copy of indices
							}
						}
						k=indices.length-2;
					}
					else {
						k--;
					}
				}
			}
			else {
				// Reverse match and compare only two results.
				regExsReversed[0].lastIndex=0;
				exec=regExsReversed[0].exec(txtSReversed);
				matched=(exec!==null);
				let indicesReversed=[];
				if (matched) {
					indicesReversed[0]={start:exec.index, end:regExsReversed[0].lastIndex};
				}
				for (let j=1;matched&&(j<regExsReversed.length);j++) {
					regExsReversed[j].lastIndex=regExsReversed[j-1].lastIndex;
					exec=regExsReversed[j].exec(txtSReversed);
					matched=(exec!==null);
					if (matched) {
						indicesReversed[j]={start:exec.index, end:regExsReversed[j].lastIndex};
					}
				}
				if (matched) {
					indices=[];
					for (let j=0;j<indicesReversed.length;j++) {
						let iR=indicesReversed[indicesReversed.length-1-j];
						indices[j]={start:(txtSReversed.length-iR.end), end:(txtSReversed.length-iR.start)};
					}
					let matchScore=m.matchScoreFromIndices(txt, ptnSH, indices);
					if (matchScore>maxMatchScore) {
						maxMatchScore=matchScore;
						indicesMMS=indices;
					}
				}
			}
			fs[0].push({i:listI.i, maxMatchScore:maxMatchScore, highlight:m.highlightStrFromIndices(txt, indicesMMS)});
		}
	}
	else {
		fs[0].push({i:listI.i, maxMatchScore:0});
	}}
	let sorted=fs[0].sorted=[];
	for (let i=0;i<fs[0].length;i++) {
		// sorted[i]=fs[0].length-1-i;
		// sorted[i]=i;
		sorted.push(i);
	}
	for (let i=1;i<sorted.length;i++) {
		let temp=sorted[i];
		let j=i;
		for (;(j>0)&&(fs[0][sorted[j-1]].maxMatchScore<fs[0][temp].maxMatchScore);j--) {
			sorted[j]=sorted[j-1];
		}
		sorted[j]=temp;
	}
	return fs[0];
};



////////////////////////////////////////////////////
// URI rendering :: http link itself, videos, images, maps.
////////////////////////////////////////////////////
m.ptnURI=[];
m.ptnURL=/^https?:\/\/\S+/i;
m.ptnTag=/^<\w+[\s\S]+>$/i;
m.ptnVal=/^([0-9]+(?:\.[0-9]+)?)\/([0-9]+(?:\.[0-9]+)?)$/;

m.uriToA=function (uri) {
	if (!uri||uri.constructor!==String) { return ""; }
	let exec=m.ptnURL.exec(uri);
	if (exec!==null) {
		return `<a target="_blank" href="${exec[0]}">${m.escapeHTML(decodeURIComponent(uri))}</a>`;
	}
	else {
		return m.escapeHTML(uri);
	}
};
m.videoZIndex=10000;
m.togglePosition=function (elem) {
	let $elem=$(elem);
	let $parent=$elem.parents(".rC");
	if ($parent.hasClass("fixed")) {
		$parent.removeClass("fixed");
		$parent.css("z-index", 0);
		window.scrollTo(0, $parent.offset().top);
		$elem.text("▲ [--stick to the left top--]");
		m.fsToRs.fixed=false;
	}
	else {
		$parent.addClass("fixed");
		$parent.css("z-index", m.videoZIndex--);
		window.scrollBy(0, -$parent.height());
		$elem.text("▲ [--return to the original position--]");
		m.fsToRs.fixed=true;
	}
};
m.rC=function (elemStr, option, id, noPc) {
	return `<div class="rC${(option?` ${option}`:'')}"${!!id?` id="${id}"`:""}><div class="rSC">${elemStr}</div>${noPc?"":`<div class="pc"><span onclick="m.togglePosition(this)">▲ [--stick to the left top--]</span></div>`}</div>`;
};
m.YTiframe=function (v, inListPlay) {
	return m.rC(`<iframe delayed-src="https://www.youtube.com/embed/${v}?origin=https://recoeve.net" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null));
};

let ptnURI;
ptnURI=m.ptnURI["www.youtube.com"]=m.ptnURI["youtube.com"]=m.ptnURI["youtu.be"]=m.ptnURI["m.youtube.com"]={};
ptnURI.regEx=/^(?:watch|embed\/([\w-]+))(\?\S+)?/i;
ptnURI.regEx1=/^shorts\/([\w-]+)/i;
ptnURI.regEx2=/^([\w-]+)(\?\S+)?/i;
ptnURI.regEx3=/^watch(\?\S+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["www.youtube.com"].regEx.exec(uriRest);
	if (exec!==null) {
		let vars=null;
		if (exec[2]) { vars=m.getSearchVars(exec[2]); }
		let v=null;
		if (exec[1]) {
			v=exec[1];
		}
		else if (vars&&vars.v) {
			v=vars.v.val;
		}
		if (v) {
			let list=vars?.list?.val;
			return resolve({html:(toA?`<a target="_blank" href="https://www.youtube.com/watch?v=${v}${list?`&list=${list}`:""}">https://www.youtube.com/watch?v=${v}${list?`&list=${list}`:""}</a><br>`:"")+m.YTiframe(v, inListPlay), from:"youtube", videoId:v, list});
		}
	}
	else {
		exec=m.ptnURI["www.youtube.com"].regEx1.exec(uriRest);
		if (exec!==null) {
			let v=exec[1];
			if (v) {
				return resolve({html:(toA?`<a target="_blank" href="https://www.youtube.com/watch?v=${v}">https://www.youtube.com/watch?v=${v}</a><br>`:"")+m.YTiframe(v, inListPlay), from:"youtube", videoId:v});
			}
		}
		else {
			exec=m.ptnURI["youtu.be"].regEx2.exec(uriRest);
			if (exec!==null) {
				let v=exec[1];
				let vars=null;
				if (exec[2]) {
					vars=m.getSearchVars(exec[2]);
				}
				let list=vars?.list?.val;
				return resolve({html:(toA?`<a target="_blank" href="https://www.youtube.com/watch?v=${v}${list?`&list=${list}`:""}">https://www.youtube.com/watch?v=${v}${list?`&list=${list}`:""}</a><br>`:"")+m.YTiframe(v, inListPlay), from:"youtube", videoId:v, list});
			}
			else {
				exec=m.ptnURI["m.youtube.com"].regEx3.exec(uriRest);
				if (exec!==null) {
					let vars=m.getSearchVars(exec[1]);
					let v=vars?.v?.val;
					if (v) {
						let list=vars?.list?.val;
						return resolve({html:(toA?`<a target="_blank" href="https://www.youtube.com/watch?v=${v}${list?`&list=${list}`:""}">https://www.youtube.com/watch?v=${v}${list?`&list=${list}`:""}</a><br>`:"")+m.YTiframe(v, inListPlay), from:"youtube", videoId:v});
					}
				}
			}
		}
	}
	return resolve(false);
});
};

ptnURI=m.ptnURI["instagram.com"]=m.ptnURI["www.instagram.com"]={};
ptnURI.regEx=/^(?:p|tv|reel)\/([\w-]+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["instagram.com"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://www.instagram.com/p/${exec[1]}/">https://www.instagram.com/p/${exec[1]}/</a><br>`:"")+m.rC(`<div class="center"><iframe delayed-src="https://www.instagram.com/p/${exec[1]}/embed" frameborder="0" scrolling="auto" allowtransparency="true"></iframe></div>`, "instagram", null, true), from:"instagram", imgId:exec[1]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI["www.tiktok.com"]={};
ptnURI.regEx=/^@(\S+)\/video\/([0-9]+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["www.tiktok.com"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://www.tiktok.com/@${exec[1]}/video/${exec[2]}">https://www.tiktok.com/@${exec[1]}/video/${exec[2]}</a><br>`:"")+m.rC(`<div class="center"><iframe sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin" delayed-src="https://www.tiktok.com/embed/v2/${exec[2]}?referrer=${encodeURIComponent(window.location.href)}" frameborder="no" scrolling="auto"></iframe></div>`, "tiktok", null, true), from:"tiktok", userId:exec[1], videoId:exec[2]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI["vt.tiktok.com"]={};
ptnURI.regEx=/^(\w+)\//i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["vt.tiktok.com"].regEx.exec(uriRest);
	if (exec!==null) {
		let shortURI=`https://vt.tiktok.com/${exec[1]}/`;
		$.ajax({
			type:"POST", url:"https://recoeve.net/BlogStat/getFullURI", data:shortURI, dataType:"text"
		}).fail(function (resp) {
			resolve(resp);
			// throw new Error("Failed to expand TikTok URL");
		}).done(async function (resp) {
			let uriRendered=await uriRendering(resp, toA, inListPlay);
			uriRendered.newURI=resp;
			resolve(uriRendered);
		});
	}
});
};

ptnURI=m.ptnURI["tv.naver.com"]={};
ptnURI.regEx=/^(?:v|embed)\/([0-9]+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["tv.naver.com"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://tv.naver.com/v/${exec[1]}">https://tv.naver.com/v/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://tv.naver.com/embed/${exec[1]}?autoPlay=false" frameborder="no" scrolling="auto" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"naver", videoId:exec[1]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI["weverse.io"]={};
ptnURI.regEx=/^(\S+)\/artist\/([0-9\-]+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["weverse.io"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://weverse.io/${exec[1]}/artist/${exec[2]}">https://weverse.io/${exec[1]}/artist/${exec[2]}</a><br>`:"")+m.rC(`<iframe src="https://weverse.io/${exec[1]}/artist/${exec[2]}" frameborder="no" scrolling="auto" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"weverse", singer:exec[1] ,videoId:exec[2]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI["tv.kakao.com"]=m.ptnURI["entertain.daum.net"]={};
ptnURI.regEx=/(?:v|cliplink)\/([0-9]+)/i;
ptnURI.regEx1=/video\/([0-9]+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["tv.kakao.com"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" frameborder="0" scrolling="auto" allowfullscreen></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"kakao", videoId:exec[1]});
	}
	else {
		exec=m.ptnURI["entertain.daum.net"].regEx1.exec(uriRest);
		if (exec!==null) {
			return resolve({html:(toA?`<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" frameborder="0" scrolling="auto" allowfullscreen></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"kakao", videoId:exec[1]});
		}
		else {
			return resolve(false);
		}
	}
});
};

ptnURI=m.ptnURI["tvpot.daum.net"]={};
ptnURI.regEx=/^v\/([\w-]+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["tvpot.daum.net"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://tvpot.daum.net/v/${exec[1]}">https://tvpot.daum.net/v/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://videofarm.daum.net/controller/video/viewer/Video.html?vid=${exec[1]}${exec[1].length<15?'$':''}&play_loc=undefined" frameborder="0" scrolling="auto"></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"daum", videoId:exec[1]});
	}
	return resolve(false);
});
};

ptnURI=m.ptnURI["vimeo.com"]={};
ptnURI.regEx=/^([0-9]+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["vimeo.com"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://vimeo.com/${exec[1]}">https://vimeo.com/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://player.vimeo.com/video/${exec[1]}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"vimeo", videoId:exec[1]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI["www.dailymotion.com"]={};
ptnURI.regEx=/video\/(\w+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["www.dailymotion.com"].regEx.exec(uriRest);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="https://www.dailymotion.com/video/${exec[1]}">https://www.dailymotion.com/video/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://www.dailymotion.com/embed/video/${exec[1]}" frameborder="0" allowfullscreen></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"dailymotion", videoId:exec[1]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI["www.ted.com"]=m.ptnURI["embed.ted.com"]={};
ptnURI.regEx=/^talks\/(\S+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["www.ted.com"].regEx.exec(uriRest);
	if (exec!==null) {
		uriRest=uriRest.substring(6);
		let k=uriRest.indexOf("?");
		let vars=null;
		if (k!==-1) {
			vars=m.getSearchVars(uriRest.substring(k));
			uriRest=uriRest.substring(0,k);
		}
		let v=uriRest;
		if (vars?.language) {
			uriRest="lang/"+vars.language.val+"/"+uriRest;
		}
		return resolve({html:(toA?`<a target="_blank" href="https://www.ted.com/${exec[1]}">https://www.ted.com/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://embed.ted.com/talks/${uriRest}" frameborder="0" scrolling="auto" allowfullscreen></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:"ted", videoId:v});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI["w.soundcloud.com"]={};
ptnURI.regEx=/^player\/(\?\S+)/i;
ptnURI.toIframe=function (uriRest, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI["w.soundcloud.com"].regEx.exec(uriRest);
	if (exec!==null) {
		let vars=m.getSearchVars(exec[1]);
		let lastPath="player/?";
		for (let i=0;i<vars.length;i++) {
			if (vars[i].key==="auto_play") {
				lastPath+="auto_play=false&";
			}
			else {
				lastPath+=vars[i].key+"="+vars[i].val+"&";
			}
		}
		return resolve({html:(toA?`<a target="_blank" href="https://w.soundcloud.com/${exec[1]}">https://w.soundcloud.com/${exec[1]}</a><br>`:"")+m.rC(`<iframe delayed-src="https://w.soundcloud.com/${lastPath.substring(0,lastPath.length-1)}" scrolling="auto" frameborder="no"></iframe>`, (inListPlay&&m.fsToRs.fixed?"fixed soundcloud":"soundcloud")), from:"soundcloud", videoId:vars?.url?.val});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI[0]={};
ptnURI.regEx=/^https?:\/\/\S+\.(?:jpg|jpeg|bmp|gif|png|webp|svg|tif)(?=$|\?|\s)/i;
ptnURI.toIframe=function (uri, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI[0].regEx.exec(uri);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="${exec[0]}">${m.escapeHTML(decodeURIComponent(uri))}</a><br>`:"")+m.rC(`<div class="center"><img delayed-src="${exec[0]}"/></div>`, (inListPlay&&m.fsToRs.fixed?"fixed eveElse":"eveElse")), from:'image', src:exec[0]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI[1]={};
ptnURI.regEx=/^https?:\/\/\S+\.(?:mp4|ogg|webm)(?=$|\?|\s)/i;
ptnURI.toIframe=function (uri, inListPlay, toA) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI[1].regEx.exec(uri);
	if (exec!==null) {
		return resolve({html:(toA?`<a target="_blank" href="${exec[0]}">${m.escapeHTML(decodeURIComponent(uri))}</a><br>`:"")+m.rC(`<video controls preload="auto" delayed-src="${exec[0]}"></video>`, (inListPlay&&m.fsToRs.fixed?"fixed":null)), from:'video', src:exec[0]});
	}
	else {
		return resolve(false);
	}
});
};

ptnURI=m.ptnURI[2]={};
ptnURI.regEx=/^https?:\/\/kr[\d]+\.sogirl\.so(\/\S*)?/i;
ptnURI.regEx1=/^https?:\/\/kr[\d]+\.sogirl\.co(\/\S*)?/i;
ptnURI.toIframe=function (uri, inListPlay) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI[2].regEx.exec(uri);
	if (exec!==null) {
		return resolve({html:`<a target="_blank" href="https://kr56.sogirl.so${exec[1]?exec[1]:"/"}">${m.escapeHTML(decodeURIComponent(`https://kr56.sogirl.so${exec[1]?exec[1]:"/"}`))}</a>`, from:'sogirl', src:exec[1]});
	}
	else {
		exec=m.ptnURI[2].regEx1.exec(uri);
		if (exec!==null) {
			return resolve({html:`<a target="_blank" href="https://kr56.sogirl.so${exec[1]?exec[1]:"/"}">${m.escapeHTML(decodeURIComponent(`https://kr56.sogirl.so${exec[1]?exec[1]:"/"}`))}</a>`, from:'sogirl', src:exec[1]});
		}
		else {
			return resolve(false);
		}
	}
});
};

ptnURI=m.ptnURI[3]={};
ptnURI.regEx=/^https?:\/\/kr[\d]+\.topgirl\.co(?:(\/[\s\S]*))?/i;
ptnURI.toIframe=function (uri, inListPlay) {
return new Promise(function (resolve, reject) {
	let exec=m.ptnURI[3].regEx.exec(uri);
	if (exec!==null) {
		return resolve({html:`<a target="_blank" href="https://kr25.topgirl.co${exec[1]?exec[1]:"/"}">${m.escapeHTML(decodeURIComponent(`https://kr25.topgirl.co${exec[1]?exec[1]:"/"}`))}</a>`, from:'topgirl', src:exec[1]});
	}
	else {
		return resolve(false);
	}
});
};

window.uriRendering=function (uri, toA, inListPlay) {
return new Promise(async function (resolve, reject) {
	if (uri?.constructor===String) {
		if (uri.length>6) {
			if (uri.substring(0,4).toLowerCase()==="http") {
				let k=4;
				if (uri.charAt(k).toLowerCase()==='s') {
					k++;
				}
				if (uri.substring(k,k+3)==="://") {
					k+=3;
					let l=uri.indexOf('/',k);
					let uriHost=null;
					let uriRest='';
					if (l===-1) {
						uriHost=uri.substring(k);
					}
					else {
						uriHost=uri.substring(k,l);
						uriRest=uri.substring(l+1);
					}
					if (m.ptnURI[uriHost]) {
						let promise=m.ptnURI[uriHost].toIframe(uriRest, inListPlay, toA);
						let result=await promise;
						promise.then(function (result) {
							if (result!==false&&(!result.list)) {
								return resolve(result);
							}
						});
					}
				}
			}
			for (let i=0;i<m.ptnURI.length;i++) {
				let promise=m.ptnURI[i].toIframe(uri, inListPlay, toA); // img or video
				let result=await promise;
				promise.then(function (result) {
					if (result!==false) {
						return resolve(result);
					}
				});
			}
			if (toA) {
				return resolve({html:m.uriToA(uri)});
			}
		}
		else {
			return resolve({html:m.escapeHTML(uri)});
		}
	}
	return resolve({html:""});
});
};



////////////////////////////////////////////////////
// slide element.
////////////////////////////////////////////////////
m.slideToggle=function (elem) {
	let $elem=$(elem);
	$elem.addClass("disabled");
	$elem.parent().next().slideToggle(1000);
	setTimeout(function () {
		$elem.removeClass("disabled");
	}, 1000);
};
m.slideUp=function (elem) {
	let $elem=$(elem).parent().parent();
	$elem.slideUp(1000);
	window.scrollBy(0,-$elem.outerHeight());
	// $body.animate({scrollTop:'-='+$elem.height()}, 1000);
};
})(window.m, jQuery);