const m = window.m = window.m || {};

(function (m, $, undefined) {
// Used in user-page.html, log-in.html, changePwd.html, verify.html
m.$window = $(window);
m.$document = $(document);

m.catUriList = [];
m.userRecos = {};
m.recoDefs = {};
m.timeout = {};
m.maxShowReco = 20;

m.fsTimezone = [];
m.fsTimezone[0] = m.fsTimezone[1] = [];
m.fsTimezone.catsSplit = [];
m.fsTimezone[0].k = m.fsTimezone[1].k = -1;
m.fsTimezone.fullList = [];

m.fsGotoCats = [];
m.fsGotoCats[0] = m.fsGotoCats[1] = [];
m.fsGotoCats.catsSplit = [];
m.fsGotoCats[0].k = m.fsGotoCats[1].k = -1;
m.fsGotoCats.fullList = [];

m.fsCat = [];
m.fsCat[0] = m.fsCat[1] = [];
m.fsCat.catsSplit = [];
m.fsCat[0].k = m.fsCat[1].k = -1;
m.fsCat.fullList = [];

m.fsMRCat = [];
m.fsMRCat[0] = m.fsMRCat[1] = [];
m.fsMRCat.catsSplit = [];
m.fsMRCat[0].k = m.fsMRCat[1].k = -1;
m.fsMRCat.fullList = [];

m.fsGo = [];
m.fsGo[0] = m.fsGo[1] = [];
m.fsGo.fullList = [];
m.fsGo.shuffledOnce = false;

m.fsToRs = [];
m.fsToRs[0] = m.fsToRs[1] = [];
m.fsToRs.fixed = false;
m.fsToRs.lastIndex = -2;
m.fsToRs.currentIndex = -1;
m.fsToRs.fullList = [];
m.fsToRs.shuffled = [];
m.fsToRs.shuffledOnce = false;
m.fsToRs.skip = false;
m.fsToRs.oneLoop = false;
m.fsToRs.loop = false;

m.YtPlayer = null;
m.YtAPILoaded = Boolean($("#youtube-API").length);

m.neighbors = {};
m.neighborsRecos = {};
m.recoms = {};
m.recomsSorted = {};
m.recomsPlusRandomSorted = {};

m.mdInPRL = false;
	// mouse down in Point Range Left
m.mdInPRR = false;
	// mouse down in Point Range Right
m.mdInPRL1 = false;
	// mouse down in Point Range1 Left
m.mdInPRR1 = false;
	// mouse down in Point Range1 Right
m.PRmax = 10.0;
m.fullPts = 10.0;

m.sW = screen.width;
m.sH = screen.height;
if (m.sW < m.sH) {
	m.sW = screen.height;
	m.sH = screen.width;
}

m.getSearchVars = function (searchStr) {
	let vars = [];
	if (searchStr !== null && searchStr !== undefined && typeof searchStr === "string" && searchStr.length !== 0) {
		if (searchStr.startsWith("?")) { searchStr = searchStr.substring(1); }
		let j = searchStr.indexOf("#");
		if (j !== -1) { searchStr = searchStr.substring(0, j); }
		let splits = searchStr.replace(/&amp;/ig, "&").replace(/\+/g, "%20").split("&");
		for (let i = 0; i < splits.length; i++) {
			let key = splits[i];
			let val = "";
			let k = key.indexOf("=");
			if (k !== -1) {
				val = decodeURIComponent(key.substring(k + 1));
				key = key.substring(0, k);
			}
			key = decodeURIComponent(key);
			vars[i] = vars[key] = { key, val };
		}
	}
	return vars;
};

m.arrayToSearch = function (searchVars) {
	let res = "";
	for (let i = 0; i < searchVars.length; i++) {
		res += `&${encodeURIComponent(searchVars[i].key)}=${encodeURIComponent(searchVars[i].val)}`;
	}
	if (res.length > 1) {
		return `?${res.substring(1)}`;
	}
	else {
		return "";
	}
};

/*	:: cookies.js :: Slightly edited by kipid at 2023-10-25.
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
m.expire = 365 * 24 * 60 * 60;
	// max-age in seconds.
m.docCookies = {
	hasItem: function (sKey) {
		return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	}
	, getItem: function (sKey) {
		return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	}
	, removeItem: function (sKey, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	}
	, setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
		let sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
				case Number:
					sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
					break;
				case String:
					sExpires = "; expires=" + vEnd;
					break;
				case Date:
					sExpires = "; expires=" + vEnd.toUTCString();
					break;
			}
		}
		document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
		return true;
	}
	, keys: function () {
		let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		// for (let nIdx=0;nIdx<aKeys.length;nIdx++) { aKeys[nIdx]=decodeURIComponent(aKeys[nIdx]); }
		return aKeys;
	}
};

////////////////////////////////////////////////////
// Local storage
////////////////////////////////////////////////////
m.localStorage = {
	setItem: function (key, val) {
		localStorage.setItem(key, val);
		return true;
	}
	, getItem: function (key) {
		return localStorage.getItem(key);
	}
	, removeItem: function (key) {
		localStorage.removeItem(key);
		return true;
	}
	, clear: function () {
		localStorage.clear();
		return true;
	}
};

m.saveSSN = function () {
	if (m.docCookies.hasItem("salt")) {
		m.localStorage.setItem("salt", m.docCookies.getItem("salt"));
		m.docCookies.removeItem("salt", "/", "recoeve.net", true);
	}
	if (m.docCookies.hasItem("session")) {
		m.localStorage.setItem("session", m.docCookies.getItem("session"));
		m.docCookies.removeItem("session", "/", "recoeve.net", true);
	}
};
m.saveSSN();

m.pathOfCat = function (cat, mode, lang, hashURI, args) {
	let argsSearch = "";
	if (args) {
		for (const prop in args) {
			if (prop !== "cat" && prop !== "lang") {
				argsSearch += `&${encodeURIComponent(prop)}=${encodeURIComponent(
					args[prop]
				)}`;
			}
		}
	}
	return `${m.userPath}${mode ? `/mode/${mode}` : ""}?${cat !== null && cat !== undefined ? `cat=${encodeURIComponent(cat)}` : ""}${argsSearch}${hashURI ? `#${encodeURIComponent(hashURI)}` : ""}`;
};
m.pathOfNeighbor = function (user_id, cat, mode, lang, hashURI, args) {
	let argsSearch = "";
	if (args) {
		for (const prop in args) {
			if (prop !== "cat" && prop !== "lang") {
				argsSearch += `&${encodeURIComponent(prop)}=${encodeURIComponent(
					args[prop]
				)}`;
			}
		}
	}
	return `/user/${user_id}${mode ? `/mode/${mode}` : ""}?${cat !== null && cat !== undefined ? `cat=${encodeURIComponent(cat)}` : ""}${argsSearch}${hashURI ? `#${encodeURIComponent(hashURI)}` : ""}`;
};
m.pathOfRecoStat = function (uri, lang, hash, args) {
	let argsSearch = "";
	if (args) {
		for (const prop in args) {
			argsSearch += `&${prop}=${encodeURIComponent(args[prop])}`;
		}
	}
	return `/recostat?uri=${encodeURIComponent(uri)}${argsSearch}${hash ? `#${encodeURIComponent(hash)}` : ""}`;
};

////////////////////////////////////////////////////
// URI rendering :: http link itself, videos, images, maps.
////////////////////////////////////////////////////
m.ptnURI = [];
m.ptnURL = /https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+/ig;
m.ptnFILE = /file:\/\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+/ig;
m.ptnTag = /<\w+[\s\S]+>/ig;
m.ptnVal = /^([0-9]+(?:\.[0-9]+)?)\/([0-9]+(?:\.[0-9]+)?)$/;
m.decomposeURI = function (uri) {
	uri = String(uri);
	uri = uri.split(/\s\t\n/)[0];
	const res = { uri, uriHost: null, pathname: null, search: null, hash: null }; // uriHost, pathname, search, hash
	if (uri.length > 4 && uri.substring(0, 4).toLowerCase() === "http") {
		let k = 4;
		if (uri.charAt(k) == 's' || uri.charAt(k) == 'S') {
			k++;
		}
		if (uri.startsWith("://", k)) {
			k += 3;
			let l = uri.indexOf("/", k);
			if (l > 0) {
				res.uriHost = uri.substring(k, l);
				let m = uri.indexOf("?", l);
				if (m > 0) {
					res.pathname = uri.substring(l, m);
					let n = uri.indexOf("#", m);
					if (n > 0) {
						res.search = uri.substring(m, n);
						res.hash = uri.substring(n);
					}
					else {
						res.search = uri.substring(m);
						res.hash = "";
					}
				}
				else {
					res.search = "";
					let n = uri.indexOf("#", l);
					if (n > 0) {
						res.pathname = uri.substring(l, n);
						res.hash = uri.substring(n);
					}
					else {
						res.pathname = uri.substring(l);
						res.hash = "";
					}
				}
			}
			else {
				res.pathname = "";
				let m = uri.indexOf("?", k);
				if (m > 0) {
					res.uriHost = uri.substring(k, m);
					let n = uri.indexOf("#", m);
					if (n > 0) {
						res.search = uri.substring(m, n);
						res.hash = uri.substring(n);
					}
					else {
						res.search = uri.substring(m);
						res.hash = "";
					}
				}
				else {
					res.search = "";
					let n = uri.indexOf("#", k);
					if (n > 0) {
						res.uriHost = uri.substring(k, n);
						res.hash = uri.substring(n);
					}
					else {
						res.uriHost = uri.substring(k);
						res.hash = "";
					}
				}
			}
		}
	}
	if (res.uriHost) { res.uriHost = res.uriHost.toLowerCase(); }
	return res;
};

////////////////////////////////////////////////////
// hash encrypt
////////////////////////////////////////////////////
m.pad = function (str, max) {
	str = str.toString();
	return (str.length < max) ? m.pad("0" + str, max) : str;
};
m.hash1 = function (str) {
	let h = -17 - str.length;
	for (let i = 0; i < str.length; i++) {
		h += str.charCodeAt(i);
		h += (h << 10);
		h ^= (h >>> 6);
	}
	h += (((h >>> 0) % 1318489) << 7);
	h += (h << 3);
	h ^= (h >>> 11);
	h += (h << 15);
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash2 = function (str) {
	let h = str.length + 1;
	let tmp;
	for (let i = 0; i < str.length; i++) {
		h += str.charCodeAt(i);
		tmp = (str.charCodeAt(str.length - 1 - i) << 11) ^ h;
		h += (h << 16) ^ tmp;
		h ^= (h >>> 7);
		h += (h << 11);
	}
	h += (((h >>> 0) % 918679) << 11);
	h ^= h << 3;
	h += h >>> 5;
	h ^= h << 4;
	h += h >>> 17;
	h ^= h << 25;
	h += h >>> 6;
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash3 = function (str) {
	let h = -1023 + str.length;
	for (let i = 0; i < str.length; i++) {
		h ^= (h << 5) + (h >>> 2) + str.charCodeAt(i);
	}
	h ^= h << 15;
	h += h << 15;
	h += (((h >>> 0) % 1299451) << 2);
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash4 = function (str) {/* RS Hash Function */
	let b = 378551;
	let a = 63689;
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		let q = 0;
		for (let j = 0; j < 32; j++) {
			if (a & (1 << j)) {
				q = (q + (h << j)) >>> 0;
			}
		}
		h = (q + str.charCodeAt(i)) >>> 0;
		// h=h*a+str.charCodeAt(i);
		q = 0;
		for (let j = 0; j < 32; j++) {
			if (b & (1 << j)) {
				q = (q + (a << j)) >>> 0;
			}
		}
		a = q;
			// a=a*b;
	}
	return m.pad(h.toString(16), 8);
};
m.hash5 = function (str) {/* JS Hash Function */
	let h = 1315423911;
	for (let i = 0; i < str.length; i++) {
		h ^= ((h << 5) + str.charCodeAt(i) + (h >> 2)) >>> 0;
	}
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash6 = function (str) {/* ELF Hash Function */
	let h = 0;
	let x = 0;
	for (let i = 0; i < str.length; i++) {
		h = ((h << 4) + str.charCodeAt(i)) >>> 0;
		if ((x = h & 0xf0000000) != 0) {
			h ^= (x >> 24);
		}
		h &= ~x;
	}
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash7 = function (str) {/* BKDR Hash Function */
	let a = 131;
		// 31 131 1313 13131 131313 etc..
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		let q = 0;
		for (let j = 0; j < 32; j++) {
			if (a & (1 << j)) {
				q = (q + (h << j)) >>> 0;
			}
		}
		h = (q + str.charCodeAt(i)) >>> 0;
		// h=h*a+str.charCodeAt(i);
	}
	return m.pad(h.toString(16), 8);
};
m.hash8 = function (str) {/* SDBM Hash Function */
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = (str.charCodeAt(i) + (h << 6) + (h << 16) - h) >>> 0;
	}
	return m.pad(h.toString(16), 8);
};
m.hash9 = function (str) {/* DJB Hash Function */
	let h = 5381;
	for (let i = 0; i < str.length; i++) {
		h = (((h << 5) + h) + str.charCodeAt(i)) >>> 0;
	}
	return m.pad(h.toString(16), 8);
};
m.hash10 = function (str) {/* DEK Hash Function */
	let h = str.length;
	for (let i = 0; i < str.length; i++) {
		h = ((h << 5) ^ (h >> 27)) ^ str.charCodeAt(i);
	}
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash11 = function (str) {/* BP Hash Function */
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		h = h << 7 ^ str.charCodeAt(i);
	}
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash12 = function (str) {/* FNV Hash Function */
	let a = 0x811C9DC5;
	let h = 0;
	for (let i = 0; i < str.length; i++) {
		let q = 0;
		for (let j = 0; j < 32; j++) {
			if (a & (1 << j)) {
				q = (q + (h << j)) >>> 0;
			}
		}
		h = q >>> 0;
		// h=h*a;
		h ^= str.charCodeAt(i);
	}
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.hash13 = function (str) {/* AP Hash Function */
	let h = 0xAAAAAAAA;
	for (let i = 0; i < str.length; i++) {
		if ((i & 1) == 0) {
			h ^= ((h << 7) ^ str.charCodeAt(i) * (h >> 3));
		}
		else {
			h ^= (~((h << 11) + str.charCodeAt(i) ^ (h >> 5)));
		}
	}
	h = h >>> 0;
	return m.pad(h.toString(16), 8);
};
m.encrypt = function (salt, pwd, iter) {
	iter = pwd.length + 131 + ((iter && iter.constructor == Number && iter >= 0) ? iter : 0);;
	pwd = salt + pwd;
	let h1 = m.hash1(pwd);
	let h2 = m.hash2(pwd);
	let h3 = m.hash3(pwd);
	let h4 = m.hash4(pwd);
	let h5 = m.hash5(pwd);
	let h6 = m.hash6(pwd);
	let h7 = m.hash7(pwd);
	let h8 = m.hash8(pwd);
	let h9 = m.hash9(pwd);
	let h10 = m.hash10(pwd);
	let h11 = m.hash11(pwd);
	let h12 = m.hash12(pwd);
	let h13 = m.hash13(pwd);
	let tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
	for (let i = 0; i < iter; i++) {
		tmp1 = h13 + h12 + h11 + h10 + h9 + salt + h8 + h7 + h6 + h5 + h4 + h3 + h2 + h1;
		tmp2 = h1 + h3 + salt + h2;
		tmp3 = salt + h2 + h8 + h1 + h3;
		tmp4 = h7 + salt + h5;
		tmp5 = h4 + salt + h8;
		tmp6 = h10 + h13 + salt + h6;
		tmp7 = h6 + h1 + h9 + salt;
		tmp8 = h9 + salt + h10;
		tmp9 = h7 + salt + h12;
		tmp10 = h11 + salt + h5;
		tmp11 = h4 + salt + h13 + h2;
		tmp12 = h11 + salt + h6;
		tmp13 = h4 + h12 + salt + h8;
		h1 = m.hash1(tmp1);
		h2 = m.hash2(tmp2);
		h3 = m.hash3(tmp3);
		h4 = m.hash4(tmp4);
		h5 = m.hash5(tmp5);
		h6 = m.hash6(tmp6);
		h7 = m.hash7(tmp7);
		h8 = m.hash8(tmp8);
		h9 = m.hash9(tmp9);
		h10 = m.hash10(tmp10);
		h11 = m.hash11(tmp11);
		h12 = m.hash12(tmp12);
		h13 = m.hash13(tmp13);
	}
	return h1 + h2 + h3 + h4 + h5 + h6 + h7 + h8 + h9 + h10 + h11 + h12 + h13;
};
m.iterFull = 10000;
m.iterSessionFull = 1000;

////////////////////////////////////////////////////
// Escape and Unescape HTML string.
////////////////////////////////////////////////////
m.escapeHTML = function (str) {
	if (!str || typeof str !== "string") { str = String(str); }
	return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
m.escapeOnlyTag = function (str) {
	if (!str || typeof str !== "string") { str = String(str); }
	return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
m.unescapeHTML = function (str) {
	if (!str || typeof str !== "string") { str = String(str); }
	return str.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
};
m.escapeAMP = function (str) {
	if (!str || typeof str !== "string") { str = String(str); }
	return str.replace(/%/g, '%25').replace(/&/g, '%26').replace(/#/g, '%23');
};
m.unescapeAMP = function (str) {
	if (!str || typeof str !== "string") { str = String(str); }
	return str.replace(/%23/g, '#').replace(/%26/g, '&').replace(/%25/g, '%');
};
m.escapeEncodePctg = function (str) {
	if (!str || typeof str !== "string") { str = String(str); }
	return str.replace(/([\!\@\#\$\%\^\&\*\[\]\{\}_\<\>\(\)\,\.\/\?\~])/g, "\\$1");
};
m.unescapeEncodePctg = function (str) {
	if (!str || typeof str !== "string") { str = String(str); }
	return str.replace(/\\([\!\@\#\$\%\^\&\*\[\]\{\}_\<\>\(\)\,\.\/\?\~])/g, "$1");
};

////////////////////////////
// String to Array
////////////////////////////
m.encloseStr = function (str) {
	if (!str || typeof str !== "string") {
		str = String(str);
	}
	if (str.charAt(0) === '"' || /[\n\t]/.test(str)) {
		return `"${str.replace(/"/g, '""')}"`;
	} return str;
};
m.strToJSON = function (str, colMap = true, rowMap = false) {
	return new Promise(function (resolve, reject) {
		if (!str || typeof str !== "string") {
			str = String(str);
		}
		if (str.charAt(str.length - 1) !== "\n") {
			str += "\n";
		}
		const ret = [];
		const delimiter = /([^\t\n]*)([\t\n])/g;
		const lastQuote = /[^"](?:"")*"([\t\n])/g;
		let exec;
		let start = 0;
		let row = -1, col = -1, delim = "\n";
		let strElem = "";
		function increaseRC(delim) {
			if (delim === '\t') {
				col++; return true;
			}
			else if (delim === '\n') {
				row++; col = 0; ret.push([]); return true;
			} return false;
		}
		while (start < str.length && increaseRC(delim)) {
			if ((str.substring(start, start + 1)) === '"') {
				lastQuote.lastIndex = start + 1;
				if ((exec = lastQuote.exec(str)) !== null) {
					strElem = str.substring(start + 1, lastQuote.lastIndex - 2);
					delim = exec[1];
					start = delimiter.lastIndex = lastQuote.lastIndex;
				}
				else {
					strElem = str.substring(start + 1);
					delim = "";
					start = str.length;
				}
				strElem = strElem.replace(/""/g, '"');
			}
			else {
				if ((exec = delimiter.exec(str)) !== null) {
					strElem = exec[1];
					delim = exec[2];
					start = delimiter.lastIndex;
				}
				else {
					strElem = str.substring(start);
					delim = "";
					start = str.length;
				}
			}
			ret[row][col] = strElem;
		}
		if (colMap) {
			const firstColSize = ret[0].length;
			for (let i = 0; i < ret.length; i++) {
				let jMax = ret[i].length > firstColSize ? firstColSize : ret[i].length;
				for (let j = 0; j < firstColSize; j++) {
					let key = ret[0][j];
					if (j < jMax) {
						ret[i][key] = ret[i][j];
					}
					else {
						ret[i][key] = "";
					}
				}
			}
		}
		if (rowMap) {
			for (let i = 0; i < ret.length; i++) {
				let key = ret[i][0];
				ret[key] = ret[i];
			}
		}
		resolve(ret);
	});
};
m.csvToJSON = function (str, colMap = true, rowMap = false) {
	return new Promise(function (resolve, reject) {
		if (!str || typeof str !== "string") {
			str = String(str);
		}
		let rows = str.split("\n");
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].substring(0, 1) === '"' && rows[i].substring(rows[i].length - 1) === '"') {
				rows[i] = rows[i].substring(1, rows[i].length - 1).split('","');
			}
			else {
				rows[i] = rows[i].split(",");
			}
		}
		if (colMap) {
			const firstColSize = rows[0].length;
			for (let i = 0; i < rows.length; i++) {
				let jMax = rows[i].length > firstColSize ? firstColSize : rows[i].length;
				for (let j = 0; j < jMax; j++) {
					let key = rows[0][j];
					if (key !== undefined) {
						rows[i][key] = rows[i][j];
					}
				}
			}
		}
		if (rowMap) {
			for (let i = 0; i < rows.length; i++) {
				let key = rows[i][0];
				if (key !== undefined) {
					rows[key] = rows[i];
				}
			}
		}
		resolve(rows);
	});
};
m.arrayToTableHTML = function (txtArray, escapeTag = true, colgroup = []) {
	return new Promise((resolve, reject) => {
		if (!txtArray || txtArray.constructor !== Array) {
			return "";
		}
		let tableStr = `<table style="background:black; color:white; border:1px solid white; width:100%"><tbody>`;
		for (const widthPctg of colgroup) {
			tableStr += `<colgroup>${widthPctg ? `<col width="${widthPctg}%"/>` : `<col/>`}</colgroup>`;
		}
		for (let row = 0; row < txtArray.length; row++) {
			tableStr += "<tr>";
			for (let col = 0; col < txtArray[0].length; col++) {
				tableStr += `<td>${txtArray[row][col] ? (escapeTag ? m.escapeOnlyTag(txtArray[row][col]) : String(txtArray[row][col])).replace(/\n/g, '<br/>') : ""}</td>`;
			}
			tableStr += "</tr>";
		}
		tableStr += "</tbody></table>";
		resolve(tableStr);
	});
};
m.memoCalcCorrectRatio = function (str) {
	let totalCount = 0;
	let correctCount = 0;
	if (str && str?.length) {
		for (let i = 0; i < str.length; i++) {
			totalCount++;
			if (str.charAt(i)==="O") {
				correctCount++;
			}
		}
	}
	return totalCount === 0 ? 0 : correctCount/totalCount;
};
m.memoRGBColor = function (resultI) {
	let correctRatio = resultI.Correct/resultI.Try;
	let recentCorrectRatio = m.memoCalcCorrectRatio(resultI.Recentest);
	let r = parseInt(128*(1.0-correctRatio) + 127*recentCorrectRatio);
	let g = parseInt(128*correctRatio + 127*recentCorrectRatio);
	let b = parseInt(127*recentCorrectRatio);
	return `rgb(${r},${g},${b})`;
};
m.memoArrayToTableHTML = function (txtArray, escapeTag = true) {
	if (!txtArray || txtArray.constructor !== Array) {
		return "";
	}
	let tableStr = `<table style="background:white; color:black; border:1px solid white; width:100%"><tbody>`;
	tableStr += `<colgroup><col width="5%"/></colgroup>
<colgroup><col width="15%"/></colgroup>
<colgroup><col width="55%"/></colgroup>
<colgroup><col width="5%"/></colgroup>
<colgroup><col width="5%"/></colgroup>
<colgroup><col width="15%" style="font-family:monospace"/></colgroup>`;
	tableStr += `<tr style="background:white">`;
	if (txtArray?.[0]?.length) {
		for (let col = 0; col < txtArray[0].length; col++) {
			tableStr += `<td>${(escapeTag ? m.escapeOnlyTag(txtArray[0][col]) : txtArray[0][col]).replace(/\n/g, '<br/>')}</td>`;
		}
	}
	tableStr += "</tr>";
	if (txtArray?.length) {
		for (let row = 1; row < txtArray.length; row++) {
			tableStr += `<tr style="background:${m.memoRGBColor(txtArray[row])}">`;
			if (txtArray?.[row]?.length) {
				for (let col = 0; col < txtArray[0].length; col++) {
					tableStr += `<td>${txtArray[row][txtArray[0][col]] || txtArray[row][txtArray[0][col]] === 0 ? (escapeTag ? m.escapeOnlyTag(txtArray[row][txtArray[0][col]]) : txtArray[row][txtArray[0][col]]).replace(/\n/g, '<br/>') : ""}</td>`;
				}
			}
			tableStr += "</tr>";
		}
	}
	tableStr += "</tbody></table>";
	return tableStr;
};
m.JSONtoStr = function (json) {
	return new Promise((resolve, reject) => {
		if (!json || json.constructor !== Array) {
			return "";
		}
		let res = m.encloseStr(json[0][0]);
		for (let j = 1; j < json[0].length; j++) {
			res += "\t" + m.encloseStr(json[0][j]);
		}
		for (let i = 1; i < json.length; i++) {
			res += "\n" + m.encloseStr(json[i][json[0][0]]);
			let jMax = json[0].length;
				// < json[i].length ? json[0].length : json[i].length;
			for (let j = 1; j < jMax; j++) {
				res += "\t" + (json[i][json[0][j]] ? m.encloseStr(json[i][json[0][j]]) : "");
			}
		}
		resolve(res);
	});
};
m.JSONtoStrRev = function (json) {
	let res = m.encloseStr(json[0][0]);
	for (let j = 1; j < json[0].length; j++) {
		res += "\t" + m.encloseStr(json[0][j]);
	}
	for (let i = json.length - 1; i > 0; i--) {
		res += "\n" + m.encloseStr(json[i][json[0][0]]);
		let jMax = (json[0].length < json[i].length) ? json[0].length : json[i].length;
		for (let j = 1; j < jMax; j++) {
			res += "\t" + m.encloseStr(json[i][json[0][j]]);
		}
	}
	return Promise.resolve(res);
};

////////////////////////////////////////////////////
// Heap sort.
////////////////////////////////////////////////////
m.heapify = function (arr, key, sorted, n, i) {
	let largest = i;
	let l = 2 * i + 1;
	let r = 2 * i + 2;
	if (l < n && arr[sorted[l]][key] > arr[sorted[largest]][key]) {
		largest = l;
	}
	if (r < n && arr[sorted[r]][key] > arr[sorted[largest]][key]) {
		largest = r;
	}
	if (largest != i) {
		let swap = sorted[i];
		sorted[i] = sorted[largest];
		sorted[largest] = swap;
		m.heapify(arr, key, sorted, n, largest);
	}
};
m.heapsort = function (arr, key, sorted, upto) {
	let n = sorted.length;
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		m.heapify(arr, key, sorted, n, i);
	}
	upto = Number(upto);
	if (isNaN(upto)) {
		upto = n;
	} else {
		upto = upto > n ? n : upto;
	}
	let until = n - upto;
	for (let i = n - 1; i >= until; i--) {
		let temp = sorted[0];
		sorted[0] = sorted[i];
		sorted[i] = temp;
		m.heapify(arr, key, sorted, i, 0);
	}
	return until;
};
m.heapsortRest = function (arr, key, sorted, upto, n) {
	upto = upto > n ? n : upto;
	let until = n - upto;
	for (let i = n - 1; i >= until; i--) {
		let temp = sorted[0];
		sorted[0] = sorted[i];
		sorted[i] = temp;
		m.heapify(arr, key, sorted, i, 0);
	}
	return until;
};

//////////////////////////////////////////////
// Log in, Log out, To my page, delayedLogout
//////////////////////////////////////////////
m.a_log_in = function (e) {
	e.stopPropagation();
	e.preventDefault();
	let fullPath = m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
	let href = `/account/log-in?goto=${encodeURIComponent(fullPath)}`;
	m.$a_log_in.attr("href", href);
	if (e?.which === 2) {
		window.open(href, "_blank");
	}
	else {
		window.location.href = href;
	}
	return false;
};
m.log_out_do = function (args, err) {
	if (err) {
		m.$log_out_do_container.show();
		m.$log_out_do.html(err);
	}
	$.ajax({
		type: "POST", url: "/account/log-out.do", data: args
		, dataType: "text"
	}).fail(function (resp) {
		m.$log_out_do_container.show();
		m.$log_out_do.html(`[--Log-out has failed.--] ${resp}<br/><a target="_blank" href="/account/log-out?goto=${args.goto}">Click me to [--Log-out from Recoeve.net--]</a>`);
	}).done(function (resp) {
		m.$log_out_do_container.show();
		m.$log_out_do.html(resp);
		setTimeout(function () {
			window.location.href = args.href;
		}, m.wait);
	});
};
m.a_log_out = function (e) {
	e.stopPropagation();
	e.preventDefault();
	let fullPath = m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
	let href_log_out = `/account/log-out?goto=${encodeURIComponent(fullPath)}`;
	m.$a_log_out.attr("href", href_log_out);
	if (e?.which === 2) {
		window.open(href_log_out, "_blank");
	}
	else {
		m.$log_out_do_container.show();
		m.$log_out_do.html(`[--Log-out from Recoeve.net--]`);
		let href_log_in = `/account/log-in?goto=${encodeURIComponent(fullPath)}`;
		m.rmb_me(m.log_out_do, { href: href_log_in, goto: fullPath });
	}
	return false;
};
m.log_out_do_from_all = function (args, err) {
	if (err) {
		m.$log_out_do_container.show();
		m.$log_out_do.html(err);
	}
	$.ajax({
		type: "POST", url: "/account/log-out-from-all.do", data: args
		, dataType: "text"
	}).fail(function (resp) {
		m.$log_out_do_container.show();
		m.$log_out_do.html(`[--Log-out has failed.--] ${resp}<br/><a target="_blank" href="/account/log-out-from-all?goto=${args.goto}">Click me to [--Log-out at all devices from Recoeve.net--]</a>`);
	}).done(function (resp) {
		m.$log_out_do_container.show();
		m.$log_out_do.html(resp);
		setTimeout(function () {
			window.location.href = args.href;
		}, m.wait);
	});
};
m.a_log_out_from_all = function (e) {
	e.stopPropagation();
	e.preventDefault();
	let fullPath = m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
	let href_log_out_from_all = `/account/log-out-from-all?goto=${encodeURIComponent(fullPath)}`;
	m.$a_log_out_from_all.attr("href", href_log_out_from_all);
	if (e?.which === 2) {
		window.open(href_log_out_from_all, "_blank");
	}
	else {
		m.$log_out_do_container.show();
		m.$log_out_do.html(`[--Log-out at all devices from Recoeve.net--]`);
		let href_log_in = `/account/log-in?goto=${encodeURIComponent(fullPath)}`;
		m.rmb_me(m.log_out_do_from_all, { href: href_log_in, goto: fullPath });
	}
	return false;
};
m.a_to_my_page = function (e) {
	e.stopPropagation();
	e.preventDefault();
	let fullPath = m.pathOfNeighbor(m.myId, m.currentCat, m.recoMode, null, m.hashURI, m.args);
	m.$a_to_my_page.attr("href", fullPath);
	if (e?.which === 2) {
		window.open(fullPath, "_blank");
	}
	else {
		window.location.href = fullPath;
	}
	return false;
};
m.delayedLogOut = function (msg, delayTime = 27, $result) {
	let delay = delayTime && delayTime.constructor === Number ? delayTime : 27;
	clearInterval(m.setIntervalDeleyedLogOut);
	m.setIntervalDeleyedLogOut = setInterval(function () {
		m.$error.html(`${msg}<br/>[--You may be not logged-in: 0--]${encodeURIComponent(m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args))}[--You may be not logged-in: 1--] ${delay} [--You may be not logged-in: 2--] [--Or try again, or refresh the page and try again.--]`);
		$result?.html(m.$error.html());
		delay--;
	}, 1000);
	clearTimeout(m.setTimeoutDeleyedLogOut);
	m.setTimeoutDeleyedLogOut = setTimeout(function () {
		window.location.href = `/account/log-out?goto=${encodeURIComponent(m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args))}`;
	}, delay * 1000);
};

////////////////////////////////////////////////////
// val, points, stars
////////////////////////////////////////////////////
m.val = function (val) {
	let res = { valid: false, str: "", val: -1 };
	if (val === null || val === undefined) {
		return res;
	}
	else if (typeof val !== "string") {
		return res;
	}
	res.str = val;
	if (val.length === 0) {
		res.valid = true;
		res.val = -1;
	}
	else {
		let exec = m.ptnVal.exec(val);
		if (exec !== null) {
			res.numStr = exec[1];
			res.num = Number(exec[1]);
			res.divisorStr = exec[2];
			res.divisor = Number(exec[2]);
			res.valid = (res.num >= 0 && res.num <= res.divisor);
			if (res.valid) {
				res.val = res.num / res.divisor;
			}
			else {
				res.val = -1;
			}
		}
	}
	return res;
};
{
	let r = 12;
		// outer radius of star
	let r0 = 6;
		// inner radius of star
	let pad = 1;
		// padding of star
	let pad0 = 9;
		// left/right pad
	let thetas = [];
	let coss = [];
	let sins = [];
	for (let i = 0; i < 10; i++) {
		thetas.push(-Math.PI / 2 + 2 * Math.PI / 10 * i);
		coss.push(Math.cos(thetas[i]));
		sins.push(Math.sin(thetas[i]));
	}
	let str = `${pad0},0 `;
	let yc = pad + r;
	let xc = pad0 + pad + r;
	for (let k = 0; k < 5; k++, xc += 2 * r + pad) {
		str += `${xc},0 `;
		for (let i = 0; i < 10; i++) {
			let rp = (i % 2 === 0) ? r : r0;
			str += `${(xc + rp * coss[i]).toFixed(1)},${(yc + rp * sins[i]).toFixed(1)} `;
		}
		str += `${xc},${pad} ${xc},0 `;
	}
	xc -= r;
	yc += r * sins[4] + pad;
	str += `${xc},0 ${xc},${yc.toFixed(1)} ${pad0},${yc.toFixed(1)}`;
	m.starsWidth = xc - pad0 - 2;
	m.stars = function (val) {
		if (!val || typeof val !== "number" || isNaN(val)) { val = -1; }
		if (val < 0) { val = 0; }
		else if (val > 1) { val = 1; }
		return `<div class="stars-container" style="width:${xc + pad0}px; height:${yc.toFixed(1)}px"><div class="bar" style="left:${pad0 + 1}px; width:${(m.starsWidth * val).toFixed(1)}px"></div><svg class="out-stars"><polygon points="${str}"/></svg></div>`;
	}
}

m.recoDefs[""] = {
	uri: "", defTitles: [[""]], defCats: [[""]], defDescs: [[""]], defs: true, heads: [{name:"default", text:"Empty URI."}], down: true
};
m.recoDefs[""].heads["default"] = m.recoDefs[""].heads[0];

////////////////////////////////////////////////////
// CatList rendering
////////////////////////////////////////////////////
m.catsToString = function (cats) {
	if (cats === undefined || cats === null) {
		return "[--Unknown--]";
	}
	return String(cats);
};
m.getDepthOfTabs = function (str) {
	let n = 0;
	while (n < str.length && str.charAt(n) === "\t") {
		n++;
	}
	return n;
};
m.getSuperCat = function (cat) {
	if (cat && cat.constructor === String) {
		let i = cat.lastIndexOf("--");
		if (i !== -1) {
			return cat.substring(0, i);
		}
	}
	return null;
};
m.ExpCol = function (elem) {
	const $elem = $(elem);
	const $baseCat = $elem.next(".baseCat");
	const cat = m.unescapeHTML($baseCat.find(".list-index-id").html());
	const $next = $elem.parent().next();
	if ($next.is(":visible")) {
		$next.hide();
		$elem.html("▶");
		m.catList[cat].subCatExpanded = false;
	}
	else {
		$next.show();
		$elem.html("▼");
		m.catList[cat].subCatExpanded = true;
	}
};
m.strCatListToJSON = function (strCatList, catList = m.catList) {
		// * catList[i] = catList[cat] = { i, cat, baseCat, depth }
	return new Promise(function (resolve, reject) {
		let list = strCatList.trim().split("\n");
		if (strCatList.trim().length === 0) {
			list = [];
		}
		list.unshift("");
			// * cat= : empty cat = [--Uncategorized--].
		catList.splice(0, catList.length);
		Object.keys(catList).forEach(key => delete catList[key]);
		let superCats = [];
		let k = 0;
		catList[k] = catList[""] = { i: k, cat: "[--Uncategorized--]", baseCat: "[--Uncategorized--]", depth: 0 };
		k++;
		for (let i = 1; i < list.length; i++) {
			let baseCat = list[i].trim().replace(/^[\-]+/, "").replace(/[\-]+$/, "");
			let depth = m.getDepthOfTabs(list[i]);
			superCats.splice(depth, superCats.length - depth, baseCat);
			let cat = superCats.join("--");
			if (!catList[cat]) {
				catList[k] = catList[cat] = { i: k, cat, baseCat, depth };
				k++;
			}
		}
		resolve();
	});
};

m.catsToA = function (cats) {
	if (!cats || cats.constructor !== String || cats.trim().length === 0) {
		return `<a class="move-cat${m.currentCat === "" ? ` currentCat` : ""}" onmouseup="m.triggerOpenCat(event)"><span class="list-index-id"></span>[--Uncategorized--]</a>`;
	}
	let arrayHTML = [];
	let list = cats.split(";");
	for (let i = 0; i < list.length; i++) {
		let cat = list[i];
		arrayHTML.push(
			`<a class="move-cat${m.currentCat === cat ? ` currentCat` : ""}" onmouseup="m.triggerOpenCat(event)"><span class="list-index-id">${m.escapeOnlyTag(cat)}</span>${m.escapeOnlyTag(cat)}</a>`
		);
	}
	return arrayHTML.join(" ; ");
};

m.myCatList = [{ cat: "", }];
m.catList = m.myPage ? m.myCatList : [{ cat: "", }];
m.myFSCatList = [{ cat: "", }];
m.myRecos = m.myPage ? m.userRecos : {};
m.myRecos[""] = {uri: "", has: true, down: true, title: "", cats: "", desc: "", cmt: "", val: m.val("10.0/10")};

m.getCatListChanged = function () {
	m.$change_catList_order_ok.hide();
	m.$change_catList_order_cancel.hide();
	let $cats = m.$catList.find(".cat").not(`#cat-`);
	$cats.removeClass("edit");
	$cats.find(".edit-bar").remove();
	let catListChanged = "\n";
	for (let i = 0; i < $cats.length; i++) {
		let cat = decodeURIComponent(m.unescapeEncodePctg($cats.eq(i).attr("id").substring(4)));
		for (let j = 0; j < m.catList[cat].depth; j++) {
			catListChanged += "\t";
		}
		catListChanged += m.catList[cat].baseCat + "\n";
	}
	return catListChanged;
};

////////////////////////////////////////////////////
// Show recos
////////////////////////////////////////////////////
m.getConciseURI = function (uri) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST", url: "/reco/getConciseURI", data: uri.trim(), dataType: "text"
		}).fail(function (resp) {
			reject(resp);
		}).done(function (resp) {
			resolve(resp);
		})
	});
};
m.recoDowned = function (urisStr, recos) {
	let uris = urisStr.trim().split("\n");
	for (let k = 0; k < uris.length; k++) {
		let uri = uris[k];
		let r = recos[uri];
		if (!r) { r = recos[uri] = { uri }; }
		r.down = true;
			// User's or My reco on the uri is downloaded.
	}
};
// * conciseURIs are disabled.
m.recoToEve = function (resp, recos, cat) {
	return new Promise(async function (resolve, reject) {
		resp = resp.replace(/%2520/gi, "%20");
		try {
			resp = Object(await m.strToJSON(resp));
		}
		catch (err) {
			resp = [];
			console.error(err);
		}
		console.log(resp);
		for (let k = 1; k < resp.length; k++) {
			let respK = resp[k];
			let uri = respK.uri;
			let toDo = String(respK.do);
			let r = recos[uri];
			if (!r) { r = recos[uri] = { uri }; }
			r.down = true;
			r.has = true;
				// * User has a reco on the uri.
			for (let prop in respK) {
				if (isNaN(String(prop))) {
					prop = String(prop);
					r[prop] = String(respK[prop]);
					if (prop === "has") {
						r[prop] = Boolean(r[prop]);
							// ! r.has must be true (or "yes") or false (or "")
					}
				}
			}
			if (toDo === "delete") {
				r.deleted = true;
			}
			else {
				r.deleted = false;
			}
			r.descR = m.renderStrDescCmt(r.desc);
				// R for rendered.
			r.cmtR = m.renderStrDescCmt(r.cmt);
				// R for rendered.
			if (r.val === undefined || r.val === null || typeof r.val === "string") {
				r.val = m.val(String(r.val));
			}
		}
		let fs = m.fsGo;
		let fsFL = fs.fullList;
		if (recos === m.userRecos) {
			for (let k = 1; k < resp.length; k++) {
				let respK = resp[k];
				let uri = respK.uri;
				let r = recos[uri];
				let catsSplit = m.catsToString(m.formatCats(r?.cats)).split(";");
				if (!fsFL[uri]) {
					fsFL[fsFL.length] = fsFL[uri] = { i: fsFL.length, catsSplit, uri, r, catAndI: {}, txt: m.splitHangul(`${r?.cats} :: ${r?.title}`), html: m.escapeOnlyTag(r?.title) };
				}
				else {
					fsFL[fsFL[uri].i] = fsFL[uri] = { ...fsFL[uri], catsSplit, uri, r, txt: m.splitHangul(`${r?.cats} :: ${r?.title}`), html: m.escapeOnlyTag(r?.title) };
						// * i and catAndI is preserved.
					if (!fsFL[uri].catAndI) {
						fsFL[uri].catAndI = {};
					}
				}
			}
			m.beInCurrentCat = false;
			if (!cat && cat !== "") {
					// * If (!cat&&cat!==""), only resp[1] (one reco/edit/delete) is there in most cases.
				let catsSplit = m.catsToString(r?.cats).split(";");
				for (let i = catsSplit.length - 1; i >= 0; i--) {
					let catI = catsSplit[i];
					if (catI === m.currentCat) {
						m.beInCurrentCat = true;
						break;
					}
				}
				// ! cat = m.beInCurrentCat ? m.currentCat : catsSplit[0];
					// Must not asign!
			}
			if (m.beInCurrentCat) {
				if (!m.catUriList[m.currentCat]?.has) {
					try {
						await m.getUriList("cat\n" + (m.currentCat === "" ? "\tp" : m.currentCat));
					}
					catch (err) {
						console.error(err);
					}
				}
				for (let k = 1; k < resp.length; k++) {
					let respK = resp[k];
					let uri = respK.uri;
					fsFL[uri].catAndI[m.currentCat] = { cat: m.currentCat, i: m.catUriList[m.currentCat].uris[uri]?.i ?? m.catUriList[m.currentCat].uris.length };
				}
				fs.shuffledOnce=true;
				try {
					await m.reTriggerFS(fs);
				}
				catch (err) {
					console.error(err);
				}
			}
			else if (cat || cat === "") {
				if (!m.catUriList[cat]?.has) {
					try {
						await m.getUriList("cat\n" + (cat === "" ? "\tp" : cat));
					}
					catch (err) {
						console.error(err);
					}
				}
				for (let k = 1; k < resp.length; k++) {
					let respK = resp[k];
					let uri = respK.uri;
					let r = recos[uri];
					fsFL[uri].catAndI[cat] = { cat, i: m.catUriList[cat].uris[uri]?.i ?? m.catUriList[cat].uris.length };
				}
				fs.shuffledOnce=true;
				try {
					await m.reTriggerFS(fs);
				}
				catch (err) {
					console.error(err);
				}
			}
			if (m.catUriList[cat]?.uris) {
				let uris = m.catUriList[cat].uris;
				for (let k = 0; k < uris.length; k++) {
					let uri = String(uris[k]);
					let r = recos[uri];
					if (!r) {
						r = recos[uri] = { uri, down: true, has: false };
					}
					r.i = k;
				}
			}
		}
		resolve();
	});
};

////////////////////////////////////////////
// Show reco, Fill reco/defs
////////////////////////////////////////////
m.showReco = async function (r) {
	if (r.has) {
		if (r.deleted) {
			m.$button_reco.show();
			m.$button_edit.hide();
			m.$button_del.hide();
			m.$button_back.show();
		}
		else {
			m.$button_reco.hide();
			m.$button_edit.show();
			m.$button_del.show();
			m.$button_back.show();
		}
	}
	else {
		m.$button_reco.show();
		m.$button_edit.hide();
		m.$button_del.hide();
		m.$button_back.hide();
	}
	if (r.has) {
		let recoHTML = await m.recoHTML(r, true, true);
		m.$my_reco.html(recoHTML);
			// need to be edit.
		let $edit = m.$my_reco.find(".button.edit").remove();
	}
	else {
		m.$my_reco.html("");
	}
};
m.fillRecoInNewReco = function (r, fillDefs) {
	if (r.has) {
		m.$input_title.val(r.title);
		m.$input_cats.val(r.cats);
		m.$input_desc.val(r.desc);
		m.$input_cmt.val(r.cmt);
		m.$input_val.val(r.val.str);
		m.$input_val.trigger("keyup.change-point");
	}
	else if (fillDefs) {
		let recoDef = m.recoDefs[r?.uri];
		if (recoDef?.defTitles?.[0]?.[0]) {
			m.$input_title.val(recoDef.defTitles[0][0]);
		}
		if (recoDef?.defCats[0]?.[0]) {
			m.$input_cats.val(recoDef.defCats[0][0]);
		}
		if (recoDef?.defDescs[0]?.[0]) {
			m.$input_desc.val(recoDef.defDescs[0][0]);
		}
	}
	let uri = r?.uri;
	let myR = m.myRecos[uri];
	if (!myR) { myR = m.myRecos[uri] = { uri }; }
	if (myR.has) {
		if (myR.deleted) {
			m.$button_reco.show();
			m.$button_edit.hide();
			m.$button_del.hide();
			m.$button_back.show();
		}
		else {
			m.$button_reco.hide();
			m.$button_edit.show();
			m.$button_del.show();
			m.$button_back.show();
		}
	}
	else {
		m.$button_reco.show();
		m.$button_edit.hide();
		m.$button_del.hide();
		m.$button_back.hide();
	}
};
m.emptifyRecoInNewReco = function () {
	m.localStorage.clear();
	m.$input_uri.val("");
	m.formatURIAndGetAndShowDefsAndRecoInNewReco(true, false);
		// * (noFormatURI, fillDefs)
};
m.getFullURI = function (shortURI) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST", url: "/BlogStat/getFullURI", data: shortURI, dataType: "text"
		}).fail(function (resp) {
			reject(resp);
		}).done(function (resp) {
			resolve(resp);
		});
	});
};

m.processChunk = async function (chunk, recoDef) {
	const titles = await m.strToJSON(chunk.trim(), false, false);
	if (titles?.length && titles[0]?.[0] && titles[0]?.[1]) {
		for (let i = 0; i < titles.length; i++) {
			if (titles[i]?.[0]?.startsWith("Error:")) {
				console.log(titles[i][0]);
				if (titles[i][0].startsWith("Error: No valid session. Please try again.: ")) {
					try {
						// m.getH1(recoDef.uri);
					}
					catch (err) {
						console.error(err);
					}
				}
				continue;
			}
			const headText = decodeURIComponent(titles[i]?.[1]?.trim().replace(/[\s\t\n\r]+/g, " "));
			recoDef.heads[String(titles[i][0])] = {
				name: String(titles[i][0]),
				text: headText
			};
			recoDef.heads.push(recoDef.heads[String(titles[i][0])]);
		}

		// Remove duplicates
		recoDef.heads = recoDef.heads.filter((head, index, self) =>
			index === self.findIndex((t) => t.text === head.text)
		);
	}
};
m.updateDefTitlesDOM = function (recoDef) {
	let defTitlesHTML = "";

	// Process recoDef.heads
	for (let head of recoDef.heads) {
		if (head.text && head.text !== "undefined") {
			defTitlesHTML += `<div class="def-title def-h1">${m.escapeOnlyTag(head.text)}</div>`;
		}
	}

	// Process defTitles
	for (let i = 0; i < Math.min(7, recoDef.defTitles.length); i++) {
		let title = recoDef.defTitles[i][0].trim().replace(/[\s\t\n\r]+/g, " ");
		if (title.length && title != "undefined" && !recoDef.heads.some(head => head.text === title)) {
			defTitlesHTML += `<div class="def-title">${m.escapeOnlyTag(title)}</div>`;
		}
	}

	m.$def_titles.html(defTitlesHTML);

	const $defTitles = m.$def_titles.find(".def-title");
	m.$def_titles.off("click.def").on("click.def", function (e) {
		$defTitles.removeClass("selected");
		const $target = $(e.target);
		if ($target.hasClass("def-title")) {
			$target.addClass("selected");
			m.$input_title.val(m.unescapeHTML($target.html()));
		}
	});
};
m.getH1 = function (uri) {
	return new Promise(function (resolve, reject) {
		if (m.recoDefs?.[uri]?.heads?.length) {
			m.updateDefTitlesDOM(m.recoDefs[uri]);
			resolve();
		}
		else {
			fetch("/reco/getH1", {
				method: "POST",
				headers: {
					"Content-Type": "text/plain"
				},
				body: uri
			})
			.then(async (resp) => {
				const reader = resp.body.getReader();
				const textDecoder = new TextDecoder();
				const recoDef = m.recoDefs[uri];
				let allChunks = '';
				let processedTitlesCount = 0;

				while (true) {
					const { done, value } = await reader.read();

					const chunk = textDecoder.decode(value, { stream: true });
					allChunks += chunk;

					console.log('chunk:', chunk);
					await m.processChunk(chunk, recoDef);
					m.updateDefTitlesDOM(recoDef);

					if (done) {
						break;
					}
				}

				m.updateDefTitlesDOM(recoDef);
				resolve(allChunks);
			})
			.catch(err => {
				console.error("Error in getH1:", err);
				reject(err);
			});
		}
	});
};
m.showDefs = function (uri) {
	return new Promise(async function (resolve, reject) {
		uri = String(uri).trim();
		let recoDef = m.recoDefs[uri];
		if (!recoDef) { recoDef = m.recoDefs[uri] = { uri, heads:[], defTitles: [[""]], defCats: [[""]], defDescs: [[""]], down: false }; }
		try {
			m.getH1(uri);
		}
		catch (err) {
			console.error(err);
		}
		let defCats = m.recoDefs[uri].defCats;
		let defCatsHTML = `<div class="def-cat replace-cat">[--Indifferent--]</div> <div class="def-cat replace-cat">[--Later--]</div> <div class="def-cat replace-cat">[--Stashed--]</div> <div id="add-cat" class="def-cat add-txt">;</div> <div id="sub-cat" class="def-cat add-txt">--</div> <div id="delete-cat" class="def-cat delete-cat">[--Delete--]</div><br/>`;
		for (let i = 0; i < defCats.length; i++) {
			let cat = defCats[i][0].trim();
			if (cat.length !== 0) {
				defCatsHTML += `<div class="def-cat replace-cat">${m.escapeOnlyTag(cat)}</div> `;
			}
		}
		m.$def_cats.html(defCatsHTML);
		let $defCats = m.$def_cats.find(".def-cat");
		let $replaceCats = m.$def_cats.find(".replace-cat");
		$replaceCats.on("click", function (e) {
			let $this = $(this);
			let fs = m.fsCat;
			$defCats.removeClass("selected");
			$this.addClass("selected");
			let k = fs.k;
			fs.catsSplit[k] = m.unescapeHTML($this.html()).trim();
			fs.$fs.val(fs.catsSplit.join(";"));
			let sStart = 0;
			for (let i = 0; i < k; i++) {
				sStart += fs.catsSplit[i].length + 1;
			}
			let sEnd = sStart + fs.catsSplit[k].length;
			fs.$fs.focus();
			fs.$fs[0].setSelectionRange(sEnd, sEnd);
		});
		let $addTxts = m.$def_cats.find(".add-txt");
		$addTxts.on("click", function (e) {
			let $this = $(this);
			$defCats.removeClass("selected");
			$this.addClass("selected");
			let sStart = m.$input_cats[0].selectionStart;
			let sEnd = m.$input_cats[0].selectionEnd;
			let inputValue = m.$input_cats.val();
			let inserted = m.unescapeHTML($this.html());
			m.$input_cats.val(`${inputValue.substring(0, sStart)}${inserted}${inputValue.substring(sEnd)}`);
			let l = m.$input_cats.val().length;
			m.$input_cats.focus();
			sEnd = sStart + inserted.length;
			m.$input_cats[0].setSelectionRange(sEnd, sEnd);
			m.$input_cats.trigger("keyup.fs");
		});
		let $deleteCat = m.$def_cats.find(".delete-cat");
		$deleteCat.on("click", function (e) {
			let $this = $(this);
			let fs = m.fsCat;
			$defCats.removeClass("selected");
			$this.addClass("selected");
			let k = fs.k;
			fs.catsSplit.splice(k, 1);
			fs.$fs.val(fs.catsSplit.join(";"));
			let sStart = 0;
			for (let i = 0; i < k; i++) {
				sStart += fs.catsSplit[i].length + 1;
			}
			let sEnd = fs.catsSplit.length === k ? sStart - 1 : sStart;
			fs.$fs.focus();
			fs.$fs[0].setSelectionRange(sEnd, sEnd);
			m.$input_cats.trigger("keyup.fs");
		});

		let defDescs = m.recoDefs[uri].defDescs;
		let defDescsHTML = "";
		for (let i = 0; i < defDescs.length; i++) {
			let desc = defDescs[i][0].trim();
			if (desc.length !== 0) {
				if (desc.length <= 100) {
					defDescsHTML += `<div class="def-desc">${m.escapeOnlyTag(desc)}<data class="none">${m.escapeOnlyTag(desc)}</data></div>`;
				}
				else {
					defDescsHTML += `<div class="def-desc">${m.escapeOnlyTag(desc.substring(0, 50))} ... ${m.escapeOnlyTag(desc.substring(desc.length - 50))}<data class="none">${m.escapeOnlyTag(desc)}</data></div>`;
				}
			}
		}
		m.$def_descs.html(defDescsHTML);
		let $defDesc = m.$def_descs.find(".def-desc");
		$defDesc.on("click", function (e) {
			$defDesc.removeClass("selected");
			let $this = $(this);
			$this.addClass("selected");
			m.$input_desc.val(m.unescapeHTML($this.find("data.none").html()));
		});
		resolve();
	});
};
m.getAndFillRecoInNewReco = function (r, fillDefs) {
	return new Promise(function (resolve, reject) {
		if (r.down) {
			m.fillRecoInNewReco(r, fillDefs);
			resolve();
		}
		else {
			let getRecosStr = "uri" + "\n" + m.encloseStr(r.uri);
			if (m.myIndex) {
				$.ajax({
					type: "POST", url: `/user/${m.myId}/get-Recos`, data: getRecosStr.replace(/%20/gi, "%2520")
					, dataType: "text"
				}).done(async function (resp) { // User reco 가 없으면 head 만 보냄.
					m.recoDowned(r.uri, m.myRecos);
					await m.recoToEve(resp, m.myRecos, m.currentCat);
					m.fillRecoInNewReco(r, fillDefs);
					resolve();
				});
			}
			else {
				resolve();
			}
		}
	});
};
m.getAndShowDefsInNewReco = function (r) {
	return new Promise(function (resolve, reject) {
		let uri = r.uri;
		if (m.recoDefs[uri]?.down) {
			m.showDefs(uri);
			resolve();
		}
		else {
			m.showDefs("");
			$.ajax({
				type: "POST", url: "/reco/defs", data: uri
				, dataType: "text"
			}).done(async function (resp) {
				let defs = Object(await m.strToJSON(resp));
				let recoDefs = m.recoDefs[uri];
				if (!recoDefs) {
					recoDefs = m.recoDefs[uri] = { uri, heads:[], down: false };
				}
				recoDefs.down = true;
				if (defs[1]) {
					recoDefs.defCats = Object(await m.strToJSON(defs[1]["def-cats"], false));
					recoDefs.defTitles = Object(await m.strToJSON(defs[1]["def-titles"], false));
					recoDefs.defDescs = Object(await m.strToJSON(defs[1]["def-descs"], false));
					m.showDefs(uri);
				}
				resolve();
			});
		}
	});
};
m.formatNOfPoints = function (n) {
	if (n < 1_000) {
		return "" + n;
	}
	else if (n < 1_000_000) {
		return (n / 1_000.0).toFixed(2) + "K";
	}
	else if (n < 1_000_000_000) {
		return (n / 1_000_000.0).toFixed(2) + "M";
	}
	else if (n < 1_000_000_000_000) {
		return (n / 1_000_000_000.0).toFixed(2) + "B";
	}
};
m.formatURIFully = function (uri, uriRendered, keepOriginal) {
	return new Promise(async function (resolve, reject) {
		if (!uri || typeof uri !== "string" || !uri.length ) {
			resolve("");
		}
		if (keepOriginal) {
			m.uri = uri;
		}
		uri = await m.formatURI(uri, keepOriginal);
			// * (uri, keepOriginal)
		if (!uriRendered) {
			uriRendered = await uriRendering(uri, true);
				// * (uri, toA, inListPlay, descR)
		}
		let from = uriRendered?.from;
		m.lastURI = uri = uriRendered?.uri;
		console.log("uriRendered: ", uriRendered);
		switch (from) {
			case "youtube":
				uri = `https://www.youtube.com/watch?v=${uriRendered.videoId}`;
				break;
			case "youtube-list":
				uri = `https://www.youtube.com/watch?list=${uriRendered.list}`;
				break;
			case "instagram":
				uri = `https://www.instagram.com/p/${uriRendered.imgId}/`;
				break;
			case "tiktok":
				uri = `https://www.tiktok.com/@${uriRendered.userId}/video/${uriRendered.videoId}`;
				break;
			case "weverse":
				uri = `https://weverse.io/${uriRendered.singer}/artist/${uriRendered.videoId}`;
				break;
			case "naver":
				uri = `https://tv.naver.com/v/${uriRendered.videoId}`;
				break;
			case "vlive":
				uri = `https://www.vlive.tv/video/${uriRendered.videoId}`;
				break;
			case "kakao":
				uri = `https://tv.kakao.com/v/${uriRendered.videoId}`;
				break;
			case "ted":
				uri = `https://www.ted.com/talks/${uriRendered.videoId}`;
				break;
			case "dailymotion":
				uri = `https://www.dailymotion.com/video/${uriRendered.videoId}`;
				break;
			case "sogirl": case "topgirl":
				uri = uriRendered.newURI;
				break;
		}
		if (!keepOriginal && m.getUTF8Length(uri) > 255) {
			try {
				uri = await m.getConciseURI(uri);
				m.$input_uri.val(uri);
				resolve(uri);
			}
			catch (err) {
				console.error(err);
			}
		}
		else if (keepOriginal) {
			m.$input_uri.val(m.uri);
			resolve(m.uri);
		}
		else {
			m.$input_uri.val(uri);
			resolve(uri);
		}
	});
};
m.formatURIAndGetAndShowDefsAndRecoInNewReco = function (noFormatURI, fillDefs, keepOriginal) {
	return new Promise(async function (resolve, reject) {
		let uriRendered = await uriRendering(m.$input_uri.val(), true);
			// * (uri, toA, inListPlay, descR)
		let originalURI = await m.formatURIFully(m.$input_uri.val(), uriRendered, keepOriginal);
			// * (uri, uriRendered, keepOriginal)
		let uri = noFormatURI ? originalURI : await m.formatURIFully(originalURI, uriRendered, keepOriginal);
			// * (uri, uriRendered, keepOriginal)
		m.$show_URI.html(uriRendered.html.replace(/\sdelayed-src=/gi, " src="));
		let r = m.myRecos[uri];
		if (!r) {
			r = m.myRecos[uri] = { uri };
			if (m.myIndex) {
				await m.getRecos([uri], m.myRecos);
			}
		}
		if (!(r && r.has)) {
			r = m.userRecos[uri];
			if (!r) {
				r = m.userRecos[uri] = { uri };
				if (m.userIndex) {
					await m.getRecos([uri], m.userRecos);
				}
			}
		}
		await m.getAndFillRecoInNewReco(r, fillDefs);
		await m.getAndShowDefsInNewReco(r);
		await m.reNewAndReOn();
		if (originalURI !== uri) {
			let desc = m.$input_desc.val();
			let descR = m.renderStrDescCmt(desc);
			if (descR["#originaluri"]) {
				descR["#originaluri"].key = "#originalURI";
				descR["#originaluri"].val = `\n${originalURI}\n`;
			}
			else {
				descR["#originaluri"] = { key: "#originalURI", val: `\n${originalURI}\n` };
				descR.splice(0, 0, descR["#originaluri"]);
				for (let i = 0; i < descR.length; i++) {
					descR[i].i = i;
				}
			}
			m.$input_desc.val(m.descCmtRToString(descR));
		}
		if (uriRendered.uriHash) {
			let desc = m.$input_desc.val();
			let descR = m.renderStrDescCmt(desc);
			if (descR["#uriwithhash"]) {
				descR["#uriwithhash"].key = "#URIwithHash";
				descR["#uriwithhash"].val += `\n${originalURI + uriRendered.uriHash}\n`;
			}
			else {
				descR["#uriwithhash"] = { key: "#URIwithHash", val: `\n${originalURI + uriRendered.uriHash}\n` };
				descR.splice(0, 0, descR["#uriwithhash"]);
				for (let i = 0; i < descR.length; i++) {
					descR[i].i = i;
				}
			}
			m.$input_desc.val(m.descCmtRToString(descR));
		}
		m.lastURI = uri;
		resolve();
	});
};

////////////////////////////////////////////////////
// Delayed Loading.
////////////////////////////////////////////////////
m.delayPad = m.delayPad || 512;
m.wait = m.wait || 1024;
m.$delayedElems = $("#nothing");
m.previous = Date.now();
$.fn.inView = function () {
	if (this.is(":visible")) {
		let viewportHeight = window.innerHeight;
		let scrollTop = m.$window.scrollTop();
		let elemTop = this.offset().top - m.delayPad;
		let elemBottom = elemTop + this.height() + m.delayPad;
		return (scrollTop + viewportHeight > elemTop) && (scrollTop < elemBottom);
	}
	else {
		return false;
	}
};
$.fn.delayedLoad = function () {
	let done = false;
	if (this.inView()) {
		if (this.hasClass("to-be-executed")) {
			this.removeClass("to-be-executed");
			this.trigger("click");
			done = true;
		}
		// divs with background-image
		if (this.attr("delayed-bgimage")) {
			this.css("background-image", "url(" + this.attr("delayed-bgimage") + ")");
			this.removeAttr("delayed-bgimage");
			done = true;
		}
		// iframes or images
		if (this.attr("delayed-src")) {
			this.attr("src", this.attr("delayed-src"));
			this.removeAttr("delayed-src");
			done = true;
		}
		// MathJax Process :: TODO: update MathJax (maybe typesetPromise?)
		// if (typeof MathJax!=='undefined'&&this.is(".MathJax_Preview")) {
		// 	MathJax.Hub.Queue(["Process", MathJax.Hub, this.next()[0]]);
		// 	done=true;
		// }
	}
	return done;
};
m.delayedLoadAll = function () {
	return new Promise(async function (resolve, reject) {
		if (m.$delayedElems.length > 0) {
			m.$delayedElems.each(function () {
				if ($(this).delayedLoad()) {
					m.$delayedElems = m.$delayedElems.not(this);
				}
			});
			m.$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
		}
		else {
			m.$window.off("scroll.delayedLoad");
		}
		m.previous = Date.now();
		resolve();
	});
};
m.delayedLoadByScroll = function () {
	return new Promise(async function (resolve, reject) {
		m.$window.off("scroll.delayedLoad");
		let now = Date.now();
		let passed = now - m.previous;
		if (passed > m.wait) {
			await m.delayedLoadAll();
			resolve();
		}
		else {
			clearTimeout(m.setTimeoutDelayedLoad);
			m.setTimeoutDelayedLoad = setTimeout(async function () {
				await m.delayedLoadAll();
				resolve();
			}, m.wait * 1.5 - passed);
		}
	});
};
m.$window.on("scroll.delayedLoad", m.delayedLoadByScroll);

/* Remember user */
m.str_rmb_me = `log\tsW\tsH\nweb\t${m.sW}\t${m.sH}`;
m.rmb_me = function (callback, args, saveNewRecoInputs) {
	return new Promise(async function (resolve, reject) {
		if (saveNewRecoInputs) {
			const uri = await m.formatURIFully(m.$input_uri.val());
				// * (uri, uriRendered, keepOriginal)
			m.localStorage.setItem("uri", uri);
			m.localStorage.setItem("title", m.formatTitle(m.$input_title.val().trim()));
			m.localStorage.setItem("cats", m.formatCats(m.$input_cats.val().trim()));
			m.localStorage.setItem("desc", m.$input_desc.val().trim());
			m.localStorage.setItem("cmt", m.$input_cmt.val().trim());
			m.localStorage.setItem("points", m.$input_val.val().trim());
		}
		const SSNencrypt = function (callback, args) {
			return new Promise(async (resolve, reject) => {
				$.ajax({
					type: "GET", url: "/sessionIter"
					, dataType: "text"
				}).done(async function (resp) {
					console.log("sessionIter: ", resp);
					let iter = Number(resp);
					if (isNaN(iter)) {
						try {
							await callback(args, resp);
						}
						catch (err) {
							console.error(err);
						}
						m.docCookies.removeItem("tCreate");
						m.localStorage.removeItem("session");
						m.localStorage.removeItem("salt");
						if (m.docCookies.hasItem('rmbdI')) {
							$.ajax({
								type: "POST", url: "/account/log-in/remember-me.do", data: m.str_rmb_me
								, dataType: "text"
							}).done(function (resp) {
								console.log("rmb_do : " + resp);
								setTimeout(async function () {
									console.log(`${resp}, tCreate:${m.docCookies.hasItem('tCreate')}`);
									if (resp.startsWith("Rmbd") && m.docCookies.hasItem('tCreate')) {
										m.saveSSN();
										if (m.localStorage.getItem("salt") && m.localStorage.getItem("session")) {
											await SSNencrypt(callback, args);
										}
										else {
											try {
												await callback(args, resp);
													// ! No salt and session => Error.
											}
											catch (err) {
												console.error(err);
											}
										}
										resolve();
									}
									else {
										try {
											await callback(args, resp);
												// ! Not Rmbd => Error.
										}
										catch (err) {
											console.error(err);
										}
										resolve();
									}
								}, m.wait);
							});
						}
						else {
							try {
								await callback(args, "Error: No rmbdI cookie.");
									// ! No rmbdI cookie => Error.
							}
							catch (err) {
								console.error(err);
							}
							resolve();
						}
					}
					else {
						m.docCookies.setItem("SSN", m.encrypt(m.localStorage.getItem("salt"), m.localStorage.getItem("session").substring(3, 11), Number(iter))
							// * (salt, pwd, iter)
							, 3, "/", false, true);
						try {
							await callback(args, null);
								// * null means no error.
						}
						catch (err) {
							console.error(err);
						}
						resolve();
					}
				});
			});
		};
		if (m.docCookies.hasItem('tCreate')) {
			if (m.docCookies.hasItem("salt") || m.docCookies.hasItem("session")) {
				m.saveSSN();
					// cookie to localStorage.
			}
			if (m.localStorage.getItem("salt") && m.localStorage.getItem("session")) {
				SSNencrypt(callback, args);
				return;
			}
		}
		if (m.docCookies.hasItem('rmbdI')) {
			$.ajax({
				type: "POST", url: "/account/log-in/remember-me.do", data: m.str_rmb_me
				, dataType: "text"
			}).done(function (resp) {
				console.log("rmb_do : " + resp);
				setTimeout(function () {
					console.log(`${resp}, tCreate:${m.docCookies.hasItem('tCreate')}`);
					if (resp.startsWith("Rmbd") && m.docCookies.hasItem('tCreate')) {
						m.saveSSN();
						if (m.localStorage.getItem("salt") && m.localStorage.getItem("session")) {
							SSNencrypt(callback, args);
						}
						else {
							callback(args, resp);
								// ! No salt and session => Error.
							resolve();
						}
					}
					else {
						callback(args, resp);
							// ! Not Rmbd => Error.
						resolve();
					}
				}, m.wait);
			});
		}
		else {
			callback(args, "Error: No rmbdI cookie.");
				// ! No rmbdI cookie => Error.
			resolve();
		}
	});
};

////////////////////////////////////////////////////
// Fuzzy Search :: Hangul (Korean) split and map to English, KE : Korean Expanded
////////////////////////////////////////////////////
m.fsLength = m.fsLength || 300;
m.jamoKE = ["ㄱ", "ㄱㄱ", "ㄱㅅ", "ㄴ", "ㄴㅈ", "ㄴㅎ", "ㄷ", "ㄷㄷ", "ㄹ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅁ", "ㅂ", "ㅂㅂ", "ㅂㅅ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅈㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅗㅏ", "ㅗㅐ", "ㅗㅣ", "ㅛ", "ㅜ", "ㅜㅓ", "ㅜㅔ", "ㅜㅣ", "ㅠ", "ㅡ", "ㅡㅣ", "ㅣ"];
m.jamo = ["ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄸ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅃ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];

m.mapKE = { "q": "ㅂ", "Q": "ㅃ", "w": "ㅈ", "W": "ㅉ", "e": "ㄷ", "E": "ㄸ", "r": "ㄱ", "R": "ㄲ", "t": "ㅅ", "T": "ㅆ", "y": "ㅛ", "Y": "ㅛ", "u": "ㅕ", "U": "ㅕ", "i": "ㅑ", "I": "ㅑ", "o": "ㅐ", "O": "ㅒ", "p": "ㅔ", "P": "ㅖ", "a": "ㅁ", "A": "ㅁ", "s": "ㄴ", "S": "ㄴ", "d": "ㅇ", "D": "ㅇ", "f": "ㄹ", "F": "ㄹ", "g": "ㅎ", "G": "ㅎ", "h": "ㅗ", "H": "ㅗ", "j": "ㅓ", "J": "ㅓ", "k": "ㅏ", "K": "ㅏ", "l": "ㅣ", "L": "ㅣ", "z": "ㅋ", "Z": "ㅋ", "x": "ㅌ", "X": "ㅌ", "c": "ㅊ", "C": "ㅊ", "v": "ㅍ", "V": "ㅍ", "b": "ㅠ", "B": "ㅠ", "n": "ㅜ", "N": "ㅜ", "m": "ㅡ", "M": "ㅡ" };
for (let p in m.mapKE) {
	m.mapKE[m.mapKE[p]] = p;
}

m.rChoKE = ["ㄱ", "ㄱㄱ", "ㄴ", "ㄷ", "ㄷㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅂㅂ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅈㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
m.rCho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

m.rJungKE = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅗㅏ", "ㅗㅐ", "ㅗㅣ", "ㅛ", "ㅜ", "ㅜㅓ", "ㅜㅔ", "ㅜㅣ", "ㅠ", "ㅡ", "ㅡㅣ", "ㅣ"];
m.rJung = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];

m.rJongKE = ["", "ㄱ", "ㄱㄱ", "ㄱㅅ", "ㄴ", "ㄴㅈ", "ㄴㅎ", "ㄷ", "ㄹ", "ㄹㄱ", "ㄹㅁ", "ㄹㅂ", "ㄹㅅ", "ㄹㅌ", "ㄹㅍ", "ㄹㅎ", "ㅁ", "ㅂ", "ㅂㅅ", "ㅅ", "ㅅㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
m.rJong = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

m.splitHangul = function (str) {
	let res = [];
	res.originalStr = str;
	res.splitted3 = "";
	res.splitted = "";
	res.pCho = [];
		// position of word-start or 초성
	let p = 0;
	res.pCho[p] = true;
	if (!str || typeof str !== "string") {
		return res;
	}
	let cho, jung, jong;
	for (let i = 0; i < str.length; i++) {
		let c = str.charAt(i)
		let n = str.charCodeAt(i);
		if (n >= 0x3131 && n <= 0x3163) { // 자음, 모음 형태의 한글 : "ㄱ", "ㄲ", "ㅏ", "ㅢ", and so on.
			n -= 0x3131;
			res[i] = { "char": c, "splitted3": c, "splitted": m.jamoKE[n] };
			res.pCho[p] = true;
		}
		else if (n >= 0xAC00 && n <= 0xD7A3) { // 완성형 한글 : "가", "각", and so on.
			n -= 0xAC00;
			jong = n % 28;
			jung = ((n - jong) / 28) % 21;
			cho = (((n - jong) / 28) - jung) / 21;
			res[i] = {
				"char": c
				, "splitted3": m.rCho[cho] + m.rJung[jung] + m.rJong[jong]
				, "splitted": m.rChoKE[cho] + m.rJungKE[jung] + m.rJongKE[jong]
			};
			res.pCho[p] = true;
		}
		else {
			res[i] = { "char": c, "splitted3": c, "splitted": c };
			if (i > 0 && /[^a-zA-Z0-9]$/.test(res[i - 1].splitted) && /[a-zA-Z0-9]/.test(c)) {
				res.pCho[p] = true;
			}
		}
		p += res[i].splitted.length;
		res.splitted3 += res[i].splitted3;
		res.splitted += res[i].splitted;
	}
	return res;
};

RegExp.quote = function (str) {
	return str.replace(/[.?*+^$[\]\\{}()|-]/g, "\\$&").replace(/\s/g, "[\\s\\S]");
};
m.spaceRegExpStr = (new RegExp(RegExp.quote(" "), "ig")).toString();
m.arrayRegExs = function (ptnSH) {
	let str = ptnSH.splitted;
	let res = [];
	for (let i = 0; i < str.length; i++) {
		let c = str.charAt(i);
		let mapKE = m.mapKE[c];
		if (mapKE) {
			res.push(new RegExp("[" + c + mapKE + "]", "ig"));
		}
		else {
			res.push(new RegExp(RegExp.quote(c), "ig"));
		}
	}
	return res;
};
m.highlightStrFromIndices = function (strSplitted, indices) {
	let res = "";
	for (let i = 0, j = 1, k = 0, p1 = 0, p2 = 0; j <= indices.length; i = j, j++) {
		while (j < indices.length && indices[j - 1].end === indices[j].start) {
			j++;
		}
		for (; k < strSplitted.length; k++) {
			p1 = p2;
			p2 = p1 + strSplitted[k].splitted.length;
			if (p2 <= indices[i].start) {
				strSplitted[k].matched = false;
			}
			else if (p1 < indices[j - 1].end) {
				strSplitted[k].matched = true;
			}
			else {
				if (j === indices.length) {
					for (; k < strSplitted.length; k++) {
						strSplitted[k].matched = false;
					}
				}
				p2 = p1;
				break;
			}
		}
	}
	for (let i = 0; i < strSplitted.length;) {
		if (strSplitted[i].matched) {
			res += '<span class="bold">';
			while (i < strSplitted.length && strSplitted[i].matched) {
				res += m.escapeOnlyTag(strSplitted[i].char);
				i++;
			}
			res += '</span>';
		}
		else {
			while (i < strSplitted.length && !strSplitted[i].matched) {
				res += m.escapeOnlyTag(strSplitted[i].char);
				i++;
			}
		}
	}
	return res;
};
m.matchScoreFromIndices = function (strSH, ptnSH, indices) {
	let res = 0;
	for (let i = 0; i < indices.length; i++) {
		if (strSH.pCho[indices[i].start])
			res += 15;
	}
	for (let i = 1; i < indices.length; i++) {
		let diff = indices[i].start - indices[i - 1].start;
		if (diff < 5) res += 8 * (5 - diff);
	}
	return res;
};
m.fuzzySearch = function (ptnSH, fs) {
	return new Promise((resolve, reject) => {
		if (!fs.shuffledOnce) {
			if (ptnSH.splitted === fs[0].ptnSH.splitted) {
				resolve(fs[0]);
			}
			else if (ptnSH.splitted.indexOf(fs[0].ptnSH.splitted) === 0) {
				fs[1] = fs[0];
			}
			else if (fs[1] && ptnSH.splitted.indexOf(fs[1].ptnSH.splitted) === 0) {
				if (ptnSH.splitted === fs[1].ptnSH.splitted) {
					resolve(fs[1]);
				}
			}
			else {
				fs[1] = null;
			}
		}
		let list = [];
		if (fs.shuffledOnce && fs.shuffled && fs.shuffled.length > 0) {
			let shuffled = fs.shuffled;
			for (let i = shuffled.length - 1; i >= 0; i--) {
					// * Newest to the top from the bottom. Max index to the top.
				list.push(fs.fullList[shuffled[i].i]);
			}
		}
		else if (fs[1]?.sorted?.length >= 0) {
			let sorted = fs[1].sorted;
			for (let i = 0; i < sorted.length; i++) {
				list.push(fs.fullList[fs[1][sorted[i]].i]);
			}
		}
		else {
			for (let i = fs.fullList.length - 1; i >= 0; i--) {
					// * Newest to the top from the bottom. Max index to the top.
				list.push(fs.fullList[i]);
			}
			if (fs === m.fsGo && fs.shuffledOnce) {
				for (let i = fs.fullList.length - 1; i >= 0; i--) {
						// * Newest to the top from the bottom. Max index to the top.
					let uri = fs.fullList[i].uri;
					if (!fs.fullList[uri].catAndI) {
						fs.fullList[uri].catAndI = {};
					}
					fs.fullList[uri].catAndI[m.currentCat] = { cat: m.currentCat, i: m.catUriList[m.currentCat].uris[uri]?.i ?? m.catUriList[m.currentCat].uris.length }
				}
			}
		}
		fs[0] = [];
		fs[0].ptnSH = ptnSH;
		let regExs = m.arrayRegExs(ptnSH);
		let regExsReversed = [];
		for (let i = 0; i < regExs.length; i++) {
			regExsReversed[i] = regExs[regExs.length - 1 - i];
		}
		for (let i = 0; i < list.length; i++) {
			let listI = list[i];
			let txt = listI?.txt;
			if (regExs.length > 0 && txt) {
				let txtS = txt.splitted;
				let txtSReversed = txtS.split("").reverse().join("");
				regExs[0].lastIndex = 0;
				let exec = regExs[0].exec(txtS);
				let matched = (exec !== null);
				let indices = [];
				if (matched) {
					indices[0] = { start: exec.index, end: regExs[0].lastIndex };
				}
				for (let j = 1; matched && (j < regExs.length); j++) {
					regExs[j].lastIndex = regExs[j - 1].lastIndex;
					exec = regExs[j].exec(txtS);
					matched = (exec !== null);
					if (matched) {
						indices[j] = { start: exec.index, end: regExs[j].lastIndex };
					}
				}
				let maxMatchScore = 0;
				if (matched) {
					maxMatchScore = m.matchScoreFromIndices(txt, ptnSH, indices);
					let indicesMMS = [...indices];
						// indices of max match score
					if (txt.length < m.fsLength) {
						for (let k = indices.length - 1; k >= 0;) {
							if (regExs[k].toString() === m.spaceRegExpStr) {
								k--;
								continue;
							}
							regExs[k].lastIndex = indices[k].start + 1;
							exec = regExs[k].exec(txtS);
							matched = (exec !== null);
							if (matched) {
								indices[k] = { start: exec.index, end: regExs[k].lastIndex };
							}
							for (let j = k + 1; matched && (j < regExs.length); j++) {
								regExs[j].lastIndex = regExs[j - 1].lastIndex;
								exec = regExs[j].exec(txtS);
								matched = (exec !== null);
								if (matched) {
									indices[j] = { start: exec.index, end: regExs[j].lastIndex };
								}
							}
							if (matched) {
								let matchScore = m.matchScoreFromIndices(txt, ptnSH, indices);
								if (matchScore > maxMatchScore) {
									maxMatchScore = matchScore;
									indicesMMS = [...indices];
								}
								k = indices.length - 2;
							}
							else {
								k--;
							}
						}
					}
					else { // ! Reverse match and compare only two results.
						regExsReversed[0].lastIndex = 0;
						exec = regExsReversed[0].exec(txtSReversed);
						matched = (exec !== null);
						let indicesReversed = [];
						if (matched) {
							indicesReversed[0] = { start: exec.index, end: regExsReversed[0].lastIndex };
						}
						for (let j = 1; matched && (j < regExsReversed.length); j++) {
							regExsReversed[j].lastIndex = regExsReversed[j - 1].lastIndex;
							exec = regExsReversed[j].exec(txtSReversed);
							matched = (exec !== null);
							if (matched) {
								indicesReversed[j] = { start: exec.index, end: regExsReversed[j].lastIndex };
							}
						}
						if (matched) {
							indices = [];
							for (let j = 0; j < indicesReversed.length; j++) {
								let iR = indicesReversed[indicesReversed.length - 1 - j];
								indices[j] = { start: (txtSReversed.length - iR.end), end: (txtSReversed.length - iR.start) };
							}
							let matchScore = m.matchScoreFromIndices(txt, ptnSH, indices);
							if (matchScore > maxMatchScore) {
								maxMatchScore = matchScore;
								indicesMMS = indices;
							}
						}
					}
					fs[0].push({ i: listI.i, maxMatchScore: maxMatchScore, highlight: m.highlightStrFromIndices(txt, indicesMMS) });
				}
			}
			else {
				fs[0].push({ i: listI?.i, maxMatchScore: 0 });
			}
		}
		let sorted = fs[0].sorted = [];
		for (let i = 0; i < fs[0].length; i++) {
			sorted.push(i);
		}
		for (let i = 1; i < sorted.length; i++) {
			let temp = sorted[i];
			let j = i;
			for (; (j > 0) && (fs[0][sorted[j - 1]].maxMatchScore < fs[0][temp].maxMatchScore); j--) {
				sorted[j] = sorted[j - 1];
			} // Desc sorting. Stable sort.
			sorted[j] = temp;
		}
		fs.shuffledOnce = false;
		resolve(fs[0]);
	});
};

////////////////////////////////////////////////////
// Fuzzy Search prepare
////////////////////////////////////////////////////
m.fsTimezone[0].ptnSH = m.fsTimezone[1].ptnSH
	= m.fsGotoCats[0].ptnSH = m.fsGotoCats[1].ptnSH
	= m.fsCat[0].ptnSH = m.fsCat[1].ptnSH
	= m.fsMRCat[0].ptnSH = m.fsMRCat[1].ptnSH
	= m.fsGo[0].ptnSH = m.fsGo[1].ptnSH
	= m.fsToRs[0].ptnSH = m.fsToRs[1].ptnSH = m.splitHangul("$!@#");
m.reTriggerFS = function (fs) {
	return new Promise(async function (resolve, reject) {
		fs[1] = null;
		fs[0].ptnSH = m.splitHangul("$!@#");
		if (fs === m.fsToRs) {
			fs.$fs.off("keyup.fs");
			fs.$fs.on("keyup.fs", async function (e) {
				await fs.fsOn(e);
				resolve();
			});
			await fs.$fs.trigger("keyup.fs");
		}
		else {
			await fs.$fs.trigger("keyup.fs");
			resolve();
		}
	});
};

///////////////////////////////////////////
// Fuzzy Search on Titles (Go and ToRs)
///////////////////////////////////////////
m.onKeydownInFS0 = function (e, shortKey, fs) {
	clearTimeout(m.setTimeoutTargetOn0);
	e.stopPropagation();
	let $target = $(e.target);
	let $fsl = fs.$fsl;
	let $fsLis = $fsl.find(".list-item");
	switch (e.code) {
		case 'Tab': // Tab=9
			e.preventDefault();
			$target.off("keyup.fs cut.fs paste.fs click.fs");
			$fsLis.eq(0)?.trigger("click");
			break;
		case 'Escape': // ESC=27
			e.preventDefault();
			$target.off("keyup.fs cut.fs paste.fs click.fs");
			switch (shortKey) {
				case 'T':
					m.ToRsOn = false;
					m.fsToRs.$fs_container.hide();
					m.$out_focus.focus();
					m.$button_ToR.removeClass("enabled");
					break;
				case 'G':
					m.GoOn = false;
					m.fsGo.$fs_container.hide();
					m.$out_focus.focus();
					m.$button_Go.removeClass("enabled");
					break;
			}
			if (!m.doNotPushHistory) {
				window.history.pushState(
					{ cat: m.currentCat, mode: m.recoMode, gotoCatsOn: m.gotoCatsOn, goOn: m.goOn, ToRsOn: m.ToRsOn, newRecoOn: m.newRecoOn },
					"", m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI)
				);
			}
			m.doNotPushHistory = false;
			break;
		case 'ArrowUp': // up=38
		case 'ArrowDown': // down=40
			e.preventDefault();
			$target.off("keyup.fs cut.fs paste.fs click.fs");
			let $liSelected = $fsl.find(".list-item.selected").eq(0);
			let $liTo = null;
			if ($liSelected.length) {
				if (e.code === 'ArrowUp') {
					$liTo = $liSelected.prev();
				}
				else {
					$liTo = $liSelected.next();
				}
				if ($liTo.length) {
					$liTo.eq(0).trigger("click");
					if ($liTo.offset().top < $fsl.offset().top + 2) { // $liTo at upside of scroll.
						$fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top - $fsl.offset().top - 2);
					}
					else if ($liTo.offset().top + $liTo.outerHeight() > $fsl.offset().top + $fsl.height() + 2) { // $liTo at downside of scroll.
						$fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top + $liTo.outerHeight() - $fsl.offset().top - $fsl.height() - 2);
					}
				}
			}
			else {
				if ($fsLis.length) {
					if (e.code === 'ArrowUp') {
						$liTo = $fsLis.last();
						$fsl.scrollTop($fsl[0].scrollHeight);
					}
					else {
						$liTo = $fsLis.first();
						$fsl.scrollTop(0);
					}
					$liTo.eq(0).trigger("click");
				}
			}
			break;
	}
	fs.$fs.focus();
	m.setTimeoutTargetOn0 = setTimeout(async function () {
		await m.reNewFSsOn();
	}, 4 * m.wait);
};

///////////////////////////////////////////
// Fuzzy Search on Cats, MRCats, Timezone
///////////////////////////////////////////
m.onKeydownInFS = function (e, fs) {
	clearTimeout(m.setTimeoutTargetOn);
	e.stopPropagation();
	let $fsl = fs.$fsl;
	let $fs_container = fs.$fs_container;
	let $target = $(e.target);
	let catsTxt = $target.val();
	let sEnd = $target[0].selectionEnd;
	fs.catsSplit = catsTxt.split(";");
	let l = catsTxt.length;
	let lastK = fs.k;
	fs.k = 0;
	for (let i = fs.catsSplit.length - 1; i >= 0; i--) {
		l -= fs.catsSplit[i].length + 1;
		if (l < sEnd) {
			fs.k = i;
			break;
		}
	} // Picking cat index k of the current selectionEnd.
	let $fsLis = $fsl.find(".list-item");
	let $liSelected = $fsl.find(".list-item.selected").eq(0);
	switch (e.code) {
		case 'Tab': // Tab=9
			e.preventDefault();
			$target.off("keyup.fs cut.fs paste.fs click.fs");
			$fsLis.eq(0)?.trigger("click");
			break;
		case 'Escape': // ESC=27
			e.preventDefault();
			$fs_container.hide();
			if (fs === m.fsCat) {
			}
			else if (fs === m.fsGotoCats) {
				$button_goto_cats.removeClass("enabled");
			}
			else if (fs === m.fsMRCat) {
				$button_multireco_mode.removeClass("enabled");
			}
			else if (fs === m.fsTimezone) {
				$choose_timezone.removeClass("enabled");
			}
			break;
		case 'ArrowUp': // up=38
		case 'ArrowDown': // down=40
			e.preventDefault();
			$target.off("keyup.fs cut.fs paste.fs click.fs");
			let $liTo = null;
			if ($liSelected.length) {
				if (e.code === 'ArrowUp') {
					$liTo = $liSelected.prev();
				}
				else {
					$liTo = $liSelected.next();
				}
				if ($liTo.length) {
					$liTo.eq(0).trigger("click");
					if ($liTo.offset().top < $fsl.offset().top + 52) { // $liTo at upside of scroll.
						$fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top - $fsl.offset().top - 52);
					}
					else if ($liTo.offset().top + $liTo.outerHeight() > $fsl.offset().top + $fsl.height() - 52) { // $liTo at downside of scroll.
						$fsl.scrollTop($fsl.scrollTop() + $liTo.offset().top + $liTo.outerHeight() - $fsl.offset().top - $fsl.height() + 52);
					}
				}
			}
			else {
				if ($fsLis.length) {
					if (e.code === 'ArrowUp') {
						$liTo = $fsLis.last();
						$fsl.scrollTop($fsl[0].scrollHeight);
					}
					else {
						$liTo = $fsLis.first();
						$fsl.scrollTop(0);
					}
					$liTo.eq(0).trigger("click");
				}
			}
			break;
	}
	fs.$fs.focus();
	m.setTimeoutTargetOn = setTimeout(async function () {
		await m.reNewFSsOn();
	}, 4 * m.wait);
};

////////////////////////////////////////////////////
// YouTube API
////////////////////////////////////////////////////
m.timeToSeconds = function (time) {
	let secondToSeek = 0;
	let exec = /(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/.exec(time);
	if (exec !== null) {
		let hour = exec[1];
		let minute = exec[2];
		let second = exec[3];
		if (hour && !isNaN(hour)) {
			secondToSeek += Number(hour) * 3600;
		}
		if (minute && !isNaN(minute)) {
			secondToSeek += Number(minute) * 60;
		}
		if (second && !isNaN(second)) {
			secondToSeek += Number(second);
		}
	}
	return secondToSeek;
};
m.seekToVideo = function (second, minute, hour) {
	let secondToSeek = 0;
	if (hour && !isNaN(hour)) {
		secondToSeek += Number(hour) * 3600;
	}
	if (minute && !isNaN(minute)) {
		secondToSeek += Number(minute) * 60;
	}
	if (second && !isNaN(second)) {
		secondToSeek += Number(second);
	}
	if (m.listPlayFrom === "youtube" || m.listPlayFrom === "youtube-list") {
		m.YtPlayer.seekTo(secondToSeek, true);
	}
	else if (m.listPlayFrom === "video") {
		$("#video")[0].currentTime = secondToSeek;
	}
};
m.fsToRs.getAndPlayVideo = function (cue, inListPlay = true) {
	return new Promise(async function (resolve, reject) {
		clearTimeout(m.setTimeoutPlayNext);
		clearTimeout(m.setTimeoutCueOrLoadUri);
		try {
			let fs = m.fsToRs;
			let i = fs.currentIndex;
			fs.$fsLis = fs.$fsl.find(".list-item");
			fs.$fsLis.removeClass("selected");
			if (typeof i === "string" && i.startsWith("from-recoms-")) {
				$(`#toR-${i}`).addClass("selected");
				let iToNumber = Number(i.substring(12));
				let uri = m.recoms[m.currentCat][iToNumber].uri;
				let recoHTML = await m.recomHTML(m.userRecos[uri], inListPlay);
					// * (r, inListPlay, additionalClass)
				m.$reco_playing.html(String(recoHTML));
				let uriRendered = await uriRendering(uri, false, inListPlay, m.userRecos[uri]?.descR);
					// * (uri, toA, inListPlay, descR)
				m.recoURIPlaying = uri;
				if (m.lastRecoURIPlaying !== m.recoURIPlaying) {
					try {
						await m.cueOrLoadUri(cue, uriRendered, inListPlay);
							// * (cue, uriRendered, inListPlay)
					}
					catch (err) {
						console.error(err);
					}
					await m.reNewAndReOn();
				}
				resolve();
			}
			else if (!isNaN(i) && 0 <= i && i < fs.fullList.length) {
				$(`#toR-${i}`).addClass("selected");
				let r = fs.fullList[i].r;
				let recoHTML = await m.recoHTML(r, inListPlay, true, false);
					// * (r, inListPlay, inRange, inRecoms, additionalClass)
				m.$reco_playing.html(String(recoHTML));
				let uriRendered = await uriRendering(r?.uri, false, inListPlay, r?.descR);
					// * (uri, toA, inListPlay, descR)
				m.recoURIPlaying = r?.uri;
				if (m.lastRecoURIPlaying !== m.recoURIPlaying) {
					try {
						await m.cueOrLoadUri(cue, uriRendered, inListPlay);
							// * (cue, uriRendered, inListPlay)
					}
					catch (err) {
						console.error(err);
					}
					await m.reNewAndReOn();
				}
				resolve();
			}
			else {
				m.$reco_playing.html('');
				m.$eveElse.html('');
				m.$youtube.html('');
				m.$eveElse_container.hide();
				m.$rC_youtube_container.hide();
				resolve();
			}
		}
		catch (err) {
			console.error(err);
			reject(err);
		}
		resolve();
	});
};
m.fsToRs.pauseVideo = function () {
	if (m.$video?.[0]?.tagName === "VIDEO") {
		m.$video?.[0]?.pause();
	}
	if (m.YtPlayer?.pauseVideo) {
		m.YtPlayer.pauseVideo();
	}
};
m.fsToRs.playNext = function (increment, cue, first, byKeyboard = false) {
	return new Promise(async (resolve, reject) => {
		clearTimeout(m.setTimeoutPlayNext);
		clearTimeout(m.setTimeoutCueOrLoadUri);
		let fs = m.fsToRs;
		fs.$fsLis = fs.$fsl.find(".list-item");
		if (increment === undefined || increment === null || typeof increment !== "number") { increment = -1; }
		if (first) {
			let $toR0 = fs.$fsLis.eq(0);
			if ($toR0.length) {
				fs.lastIndex = -2;
				let k = $toR0.attr("id").substring(4);
				if (!isNaN(k)) {
					k = Number(k);
				}
				fs.currentIndex = k;
				if (m.countSetTimeoutPlayNext === undefined || m.countSetTimeoutPlayNext >= 8) {
					m.countSetTimeoutPlayNext = 0;
				}
				m.countSetTimeoutPlayNext++;
				if (fs.fullList[fs.currentIndex]?.r?.has) {
					m.fsScrollToSelected(fs, $toR0);
					try {
						await fs.getAndPlayVideo(true);
							// * (cue, inListPlay = true)
					}
					catch (err) {
						console.error(err);
					}
				}
				else if (m.countSetTimeoutPlayNext < 8) {
					fs.$fs.val("");
					(m.reTriggerFS(fs))
						.then(() => {
							fs.playNext(increment, cue, first);
						})
						.catch(err => console.error(err));
				}
			}
			else {
				fs.lastIndex = -2;
				fs.currentIndex = -1;
				m.$reco_playing.html('');
				m.$eveElse.html('');
				m.$youtube.html('');
				if (fs.pauseVideo) {
					fs.pauseVideo();
				}
				m.$eveElse_container.hide();
				m.$rC_youtube_container.hide();
				if (m.countSetTimeoutPlayNext === undefined || m.countSetTimeoutPlayNext >= 8) {
					m.countSetTimeoutPlayNext = 0;
				}
				m.countSetTimeoutPlayNext++;
				if (m.countSetTimeoutPlayNext < 8) {
					fs.$fs.val("");
					(m.reTriggerFS(fs))
						.then(() => {
							fs.playNext(increment, cue, first);
						})
						.catch(err => console.error(err));
				}
			}
			return;
		}
		let $selected = fs.$fsLis.filter(".selected");
		let $next = null;
		if ($selected.length) {
			if (increment < 0) {
				$next = $selected.next();
				if ((!$next.length) && fs.loop) {
					$next = fs.$fsLis.eq(0);
				}
			}
			else {
				$next = $selected.prev();
				if ((!$next.length) && fs.loop) {
					$next = fs.$fsLis.last();
				}
			}
		}
		else {
			$next = fs.$fsLis.eq(0);
		}
		if ($next?.length) {
			$next.trigger("click");
			m.fsScrollToSelected(fs, $next);
		}
		else if (byKeyboard) {
			m.playLi({ target: fs.$fsLis.filter(".selected")[0], byKeyboard })
		}
		else {
			if (m.countSetTimeoutPlayNext === undefined || m.countSetTimeoutPlayNext >= 2) {
				m.countSetTimeoutPlayNext = 0;
			}
			m.countSetTimeoutPlayNext++;
			if (m.countSetTimeoutPlayNext < 2) {
				console.log("setTimeout :: fs.playNext(increment, cue, first);");
				setTimeout(function () {
					fs.playNext(increment, cue, first);
				}, m.wait);
			}
			return;
		}
		m.countSetTimeoutPlayNext = 0;
	});
};
m.goDirectlyToHash = function (hashURI) { // Decoded hashURI without "#".
	m.hashURI = hashURI;
	window.location.hash = `#${m.hashURI}`;
	m.$window.scrollTop($(window.location.hash).offset().top);
		// For when hash is not changed.
	if (!m.initialOpen && !m.doNotPushHistory) {
		window.history.replaceState(
			{ cat: m.currentCat, mode: m.recoMode, gotoCatsOn: m.gotoCatsOn, goOn: m.goOn, ToRsOn: m.ToRsOn, newRecoOn: m.newRecoOn },
			"", m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI)
		);
	}
};
m.gotoHash = function (hashURI) { // Decoded hashURI without "#".
	if (hashURI && m.userIndex) {
		m.fsGo.tryN = 0;
		m.firstLiGotoLiClicked = false;
		clearInterval(m.setIntervalFsGo);
		m.setIntervalFsGo = setInterval(async function (setIntervalFsGo = m.setIntervalFsGo) {
			m.fsGo.tryN++;
			if (m.fsGo.tryN > m.initialMaxTries) {
				clearInterval(m.setIntervalFsGo);
				m.fsGo.tryN = 0;
				return;
			}
			console.log(`m.setIntervalFsGo triggered!: ${setIntervalFsGo},\nm.fsGo.tryN: ${m.fsGo.tryN};`);
			if (m.fsGo.fullList[hashURI]) {
				let k = m.fsGo.fullList[hashURI]?.i;
				let fsFLk = m.fsGo.fullList[k];
				let $liK = $(`#li-${k}`);
				if ($liK.length) {
					if (m.firstLiGotoLiClicked) {
						clearInterval(setIntervalFsGo);
						m.fsGo.tryN = 0;
						m.firstLiGotoLiClicked = false;
					}
					m.hashURI = hashURI;
					console.log(`$(\`#li-${k}\`).trigger("click");`)
					await $(`#li-${k}`).trigger("click");
					m.fsScrollToSelected(m.fsGo, m.fsGo.$fsl.find(".selected"));
					m.firstLiGotoLiClicked = true;
				}
				else {
					m.$fuzzy_search_list.prepend(`<div id="li-${k}" class="list-item${fsFLk.selected ? " selected" : ""}${fsFLk.r?.deleted ? " deleted" : ""}" style="display:block"><span class="list-index">${k}</span><span class="list-index-id">${m.escapeOnlyTag(fsFLk.r?.uri)}</span>${fsFLk.html}</div>`);
					$liK = $(`#li-${k}`);
					if ($liK.length) {
						if (m.firstLiGotoLiClicked) {
							clearInterval(setIntervalFsGo);
							m.fsGo.tryN = 0;
							m.firstLiGotoLiClicked = false;
						}
						m.hashURI = hashURI;
						console.log(`$(\`#li-${k}\`).trigger("click");`)
						await $(`#li-${k}`).trigger("click");
						m.fsScrollToSelected(m.fsGo, m.fsGo.$fsl.find(".selected"));
						m.firstLiGotoLiClicked = true;
					}
				}
			}
			else if (m.fsGo.tryN < m.initialMaxTries) {
				let $elem = $(`#${m.escapeEncodePctg(encodeURIComponent(hashURI))}`);
				if ($elem.length) {
					clearInterval(setIntervalFsGo);
					m.fsGo.tryN = 0;
					m.hashURI = hashURI;
					window.location.hash = `#${m.escapeEncodePctg(encodeURIComponent(m.hashURI))}`;
					if (!m.initialOpen && !m.doNotPushHistory) {
						window.history.replaceState(
							{ cat: m.currentCat, mode: m.recoMode, gotoCatsOn: m.gotoCatsOn, goOn: m.goOn, ToRsOn: m.ToRsOn, newRecoOn: m.newRecoOn },
							"", m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args)
						);
					}
					m.$window.scrollTop($elem.offset().top);
				}
			}
			else {
				clearInterval(setIntervalFsGo);
				m.fsGo.tryN = 0;
				console.log(`gotoHash has failed!: `, hashURI);
			}
		}, m.wait);
	}
};
m.finalizeInitialOpen = async function () {
	console.log(`m.finalizeInitialOpen() called.\nm.initialOpen: ${m.initialOpen}`)
	if (m.initialOpen) {
		m.initialOpen = false;
		try {
			m.gotoHash(m.initialHashURI);
			await m.reTriggerFS(m.fsToRs);
			await m.reTriggerFS(m.fsCat);
			await m.reTriggerFS(m.fsMRCat);
			await m.reTriggerFS(m.fsGotoCats);
			await m.reTriggerFS(m.fsTimezone);
			await m.reTriggerFS(m.fsGo);
		}
		catch (err) {
			console.error(err);
		}
	}
}
m.fsToRs.prepareRecoListPlay = function (ytAPINeeded, cue, uriRendered, inListPlay) {
	return new Promise(async (resolve, reject) => {
		let fs = m.fsToRs;
		if (!m.YtAPILoaded) {
			if (ytAPINeeded) {
				let fs = m.fsToRs;
				function onYouTubeIframeAPIReady() {
					m.YtPlayer = new YT.Player("youtube-player", {
						events: {
							'onReady': function (e) {
								let p = e.target;
								if (uriRendered.from === "youtube") {
									if (cue) {
										p.cueVideoById(uriRendered.config);
									}
									else {
										p.loadVideoById(uriRendered.config);
									}
								}
								else if (uriRendered.from === "youtube-list") {
									if (cue) {
										p.cuePlaylist({ listType: "playlist", list: uriRendered.list });
									}
									else {
										p.loadPlaylist({ listType: "playlist", list: uriRendered.list });
									}
								}
							}
							, 'onError': function (e) {
								if (fs.skip) {
									clearTimeout(m.setTimeoutPlayNext);
									m.setTimeoutPlayNext = setTimeout(function () {
										if (fs.skip) { fs.playNext(); }
									}, 8 * m.wait);
								}
							}
							, 'onStateChange': function (e) {
								if (e.data === YT.PlayerState.ENDED) {
									if (fs.oneLoop) {
										m.YtPlayer.seekTo(0, true);
									}
									else {
										fs.playNext();
									}
								}
								else if (e.data === YT.PlayerState.CUED) {}
							}
						}
					});
				}
				if (!$("#youtube-API").length) {
					let ytAPI = `<script id="youtube-API" src="https://www.youtube.com/iframe_api"></` + `script>`;
						// Avoid closing script
					m.$scripts.append(ytAPI);
				}
				m.YtAPILoaded = true;
			}
		}
		if (!ytAPINeeded || typeof YT !== 'undefined' && YT.loaded && YT.Player) {
			console.log(`YT is ready! and await m.doFSToRs();`);
			await m.doFSToRs();
		}
		resolve();
	});
};
m.cueOrLoadUri = function (cue, uriRendered, inListPlay) {
	return new Promise(async (resolve, reject) => {
		clearTimeout(m.setTimeoutCueOrLoadUri);
		if (inListPlay && m.lastRecoURIPlaying !== m.recoURIPlaying) {
			let fs = m.fsToRs;
			let from = uriRendered.from;
			m.listPlayFrom = from;
			if (from === "youtube") {
				m.$eveElse.html('');
				m.$eveElse_container.hide();
				m.$rC_youtube_container.show();
				fs.$playing = m.$rC_youtube_container;
				if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
					if (m.YtPlayer) {
						let config = {
							...uriRendered.config,
							videoId: uriRendered.videoId
						};
						if (cue && m.YtPlayer.cueVideoById) {
							m.YtPlayer.cueVideoById(config);
							m.lastRecoURIPlaying = m.recoURIPlaying;
							fs.lastIndex = fs.currentIndex;
							m.lastCat = m.currentCat;
							resolve();
						}
						else if (m.YtPlayer.loadVideoById) {
							m.YtPlayer.loadVideoById(config);
							m.lastRecoURIPlaying = m.recoURIPlaying;
							fs.lastIndex = fs.currentIndex;
							m.lastCat = m.currentCat;
							resolve();
						}
						else {
							reject(`m.YtPlayer is not ready.`);
						}
					}
					else if (typeof YT !== 'undefined' && YT.loaded && YT.Player) {
						m.YtPlayer = new YT.Player("youtube-player", {
							videoId: uriRendered.videoId
							, playerVars: uriRendered.config
							, events: {
								'onError': function (e) {
									if (fs.skip) {
										clearTimeout(m.setTimeoutPlayNext);
										m.setTimeoutPlayNext = setTimeout(function () {
											if (fs.skip) {fs.playNext();}
										}, 8 * m.wait);
									}
								}
								, 'onStateChange': function (e) {
									if (e.data === YT.PlayerState.ENDED) {
										if (fs.oneLoop) {
											m.YtPlayer.seekTo(0, true);
										}
										else {
											fs.playNext();
										}
									}
									else if (e.data === YT.PlayerState.CUED) {}
								}
							}
						});
						m.lastRecoURIPlaying = m.recoURIPlaying;
						fs.lastIndex = fs.currentIndex;
						m.lastCat = m.currentCat;
						resolve();
					}
					else {
						try {
							await fs.prepareRecoListPlay(true, cue, uriRendered, inListPlay);
								// * (ytAPINeeded, cue, uriRendered, inListPlay)
						}
						catch (err) {
							console.error(err);
						}
						resolve();
					}
				}
			}
			else if (from === "youtube-list") {
				m.$eveElse.html('');
				m.$eveElse_container.hide();
				m.$rC_youtube_container.show();
				fs.$playing = m.$rC_youtube_container;
				if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
					if (m.YtPlayer) {
						let config = {
							videoId: uriRendered.videoId
							, ...uriRendered.config
						};
						if (cue && m.YtPlayer.cuePlaylist) {
							m.YtPlayer.cuePlaylist({ listType: "playlist", list: uriRendered.list });
							m.lastRecoURIPlaying = m.recoURIPlaying;
							fs.lastIndex = fs.currentIndex;
							m.lastCat = m.currentCat;
							resolve();
						}
						else if (m.YtPlayer.loadPlaylist) {
							m.YtPlayer.loadPlaylist({ listType: "playlist", list: uriRendered.list });
							m.lastRecoURIPlaying = m.recoURIPlaying;
							fs.lastIndex = fs.currentIndex;
							m.lastCat = m.currentCat;
							resolve();
						}
						else {
							reject(`m.YtPlayer is not ready.`);
						}
					}
					else if (typeof YT !== 'undefined' && YT.loaded && YT.Player) {
						m.YtPlayer = new YT.Player("youtube-player", {
							events: {
								'onReady': function (e) {
									let p = e.target;
									if (cue) {
										p.cuePlaylist({ listType: "playlist", list: uriRendered.list });
									}
									else {
										p.loadPlaylist({ listType: "playlist", list: uriRendered.list });
									}
								}
								, 'onError': function (e) {
									if (fs.skip) {
										clearTimeout(m.setTimeoutPlayNext);
										m.setTimeoutPlayNext = setTimeout(function () {
											if (fs.skip) { fs.playNext(); }
										}, 8 * m.wait);
									}
								}
								, 'onStateChange': function (e) {
									if (e.data === YT.PlayerState.ENDED) {
										if (fs.oneLoop) {
											m.YtPlayer.seekTo(0, true);
										}
										else {
											fs.playNext();
										}
									}
									else if (e.data === YT.PlayerState.CUED) {}
								}
							}
						});
						m.lastRecoURIPlaying = m.recoURIPlaying;
						fs.lastIndex = fs.currentIndex;
						m.lastCat = m.currentCat;
						resolve();
					}
					else {
						try {
							await fs.prepareRecoListPlay(true, cue, uriRendered, inListPlay);
								// * (ytAPINeeded, cue, uriRendered, inListPlay)
						}
						catch (err) {
							console.error(err);
						}
						resolve();
					}
				}
			}
			else if (from === "video") {
				m.$youtube.html('');
				m.$eveElse_container.show();
				m.$rC_youtube_container.hide();
				fs.$playing = m.$eveElse_container;
				let config = uriRendered.config;
				if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
					m.$eveElse.replaceWith(m.rC(`<video id="video" controls preload="metadata" src="${uriRendered.src}${config.hash ? config.hash : ""}"></video>`, (inListPlay && m.fsToRs.fixed ? "fixed eveElse" : "eveElse"), "eveElse"));
						// * (elemStr, option, id, noPc)
					fs.lastIndex = fs.currentIndex;
					m.lastCat = m.currentCat;
					m.lastRecoURIPlaying = m.recoURIPlaying;
					m.$eveElse = $("#eveElse");
					m.$video = $("#video");
				}
				m.$video?.on("ended", function (event) {
					if (fs.oneLoop) {
						m.$video?.[0]?.play();
					}
					else {
						fs.playNext();
					}
				});
				m.$video?.on("pause", function (event) {
					if (event.target.currentTime >= config?.end) {
						if (fs.oneLoop) {
							m.$video?.[0]?.play();
						}
						else {
							fs.playNext();
						}
					}
				});
				if (!cue) {
					m.$video?.[0]?.play();
				}
				resolve();
			}
			else {
				fs.pauseVideo();
				m.$youtube.html('');
				m.$eveElse.html('');
				m.$eveElse_container.show();
				m.$rC_youtube_container.hide();
				fs.$playing = m.$eveElse_container;
				if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat || m.lastRecoURIPlaying !== m.recoURIPlaying) {
					m.$eveElse.html(String(uriRendered.html).replace(/\sdelayed\-src\=/g, " src="));
					fs.lastIndex = fs.currentIndex;
					m.lastCat = m.currentCat;
					m.lastRecoURIPlaying = m.recoURIPlaying;
				}
				if ((!cue) && fs.skip) {
					clearTimeout(m.setTimeoutPlayNext);
					m.setTimeoutPlayNext = setTimeout(function () {
						if (fs.skip) {
							fs.playNext(-1, false);
						}
					}, 8 * m.wait);
				}
				resolve();
			}
		}
	});
};

////////////////////////////////////////////////////
// New Reco or Edit
////////////////////////////////////////////////////
m.getUTF8Length = function (s) {
	let len = 0;
	for (let i = 0; i < s.length; i++) {
		let code = s.charCodeAt(i);
		if (code <= 0x7f) {
			len += 1;
		}
		else if (code <= 0x7ff) {
			len += 2;
		}
		else if (code >= 0xd800 && code <= 0xdfff) {
			// Surrogate pair: These take 4 bytes in UTF-8 and 2 chars in UCS-2
			// (Assume next char is the other [valid] half and just skip it)
			len += 4; i++;
		}
		else if (code < 0xffff) {
			len += 3;
		}
		else {
			len += 4;
		}
	}
	return len;
};
m.ptnPureNumber = /^\d+$/;
m.formatURI = function (uri, keepOriginal) {
	return new Promise(async function (resolve, reject) {
		if (uri && typeof uri === "string") {
			uri = uri.trim().replace(/[\s\t\n]+/g, " ");
			let exec = m.ptnTag.exec(uri);
			if (exec !== null) {
				try {
					let $uri = $(uri);
					let src = $uri.attr("src");
					if (src) {
						uri = src;
					}
					else {
						src = $uri.find("[src]").attr("src");
						if (src) { uri = src; }
					}
				}
				catch (err) {
					console.error(err);
				}
			}
			exec = m.ptnPureNumber.exec(uri);
			if (exec !== null) {
				uri = "Number: " + uri;
			}
			if (!keepOriginal && m.getUTF8Length(uri) > 255) {
				resolve(m.unescapeHTML((await m.getConciseURI(uri)).trim()));
			}
			resolve(m.unescapeHTML(uri).trim());
		}
		resolve("");
	});
};
m.formatTitle = function (title) {
	return title.trim().replace(/[\t\r\n]/g, " ");
};
m.formatCats = function (cats) {
	if (!cats || typeof cats !== "string" || cats.trim().length === 0) {
		return "";
	}
	cats = cats.trim().replace(/[\t\r\n]/g, " ").replace(/[\"\'\`]+/ig, "");
	let catsSplit = cats.split(";");
	for (let i = 0; i < catsSplit.length; i++) {
		let levels = catsSplit[i].split("--");
		for (let j = 0; j < levels.length; j++) {
			levels[j] = levels[j].replace(/^[\s\-]+/, "").replace(/[\s\-]+$/, "");
			if (levels[j].length === 0) {
				levels.splice(j, 1);
				j--;
			}
		}
		catsSplit[i] = "";
		let k = 0;
		for (; k < levels.length; k++) {
			if (levels[k].length !== 0) {
				catsSplit[i] = levels[k];
				break;
			}
		}
		for (k++; k < levels.length; k++) {
			if (levels[k].length !== 0) {
				catsSplit[i] += "--" + levels[k];
			}
		}
	}
	let catsMap = {};
	catsMap[catsSplit[0]] = true;
	cats = catsSplit[0];
	for (let i = 1; i < catsSplit.length; i++) {
		if (catsMap[catsSplit[i]]) {
			continue;
		}
		else {
			catsMap[catsSplit[i]] = true;
			cats += ";" + catsSplit[i];
		}
	}
	return cats;
};
m.catsContainsAllAnotCats = function (cats0, cats1) {
	let cats0Split = m.formatCats(cats0).split(";");
	let cats1Split = m.formatCats(cats1).split(";");
	let setOfCats0 = {};
	for (let i = 0; i < cats0Split.length; i++) {
		setOfCats0[cats0Split[i]] = true;
	}
	let contains = true;
	for (let i = 0; i < cats1Split.length; i++) {
		contains = contains && Boolean(setOfCats0[cats1Split[i]]);
		if (!contains) {
			break;
		}
	}
	return contains;
};

m.uriToA = function (uri) {
	if (!uri || typeof uri !== "string") {
		uri = String(uri);
	}
	// * m.ptnURL = /https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+/ig;
	m.ptnURL.lastIndex = 0;
	let exec = m.ptnURL.exec(uri);
	if (exec !== null) {
		return `<a target="_blank" href="${exec[0]}">${m.escapeOnlyTag(decodeURIComponent(uri).replace(/[\n\s\t\r]/g, " "))}</a>`;
	}
	else {
		exec = m.ptnFILE.exec(uri);
		if (exec !== null) {
			return `<a target="_blank" href="${exec[0]}">${m.escapeOnlyTag(decodeURIComponent(uri).replace(/[\n\s\t\r]/g, " "))}</a>`;
		}
		else {
			return m.escapeOnlyTag(uri);
		}
	}
};
m.videoZIndex = 10000;
m.togglePosition = function (elem) {
	let $elem = $(elem);
	let $parent = $elem.parents(".rC");
	if ($parent.hasClass("fixed")) {
		$parent.removeClass("fixed");
		$parent.css("z-index", 0);
		window.scrollTo(0, $parent.offset().top);
		$elem.text("▲ [--stick to the left top--]");
		m.fsToRs.fixed = false;
	}
	else {
		window.scrollBy({ left: 0, top: -$parent.height(), behavior: "smooth" });
		$parent.addClass("fixed");
		let $z = $parent.find(".z-index");
		let zIndex = m.videoZIndex;
		if ($z.length) {
			zIndex = parseInt($z.html());
		}
		else {
			$elem.before(`<span class="none z-index">${m.videoZIndex}</span>`);
			m.videoZIndex--;
		}
		$parent.css("z-index", zIndex);
		$elem.text("▲ [--return to the original position--]");
		m.fsToRs.fixed = true;
	}
};
m.rC = function (elemStr, option, id, noPc) {
	return `<div class="rC${(option ? ` ${option}` : '')}"${!!id ? ` id="${id}"` : ""}><div class="rSC">${elemStr}</div>${noPc ? "" : `<div class="pc"><span onclick="m.togglePosition(this)">▲ [--stick to the left top--]</span></div>`}</div>`;
};
m.YTiframe = function (v, inListPlay, config, list) {
	if (list && typeof list === "string") {
		return m.rC(`<iframe delayed-src="https://www.youtube.com/embed/videoseries?list=${list}&origin=${window.location.origin}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null))
	}
	return m.rC(`<iframe delayed-src="https://www.youtube.com/embed/${v}?origin=${window.location.origin}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null));
};

let ptnURI;
ptnURI = m.ptnURI["www.youtube.com"] = m.ptnURI["youtube.com"] = m.ptnURI["youtu.be"] = m.ptnURI["m.youtube.com"] = {};
ptnURI.regEx = /^(?:watch|embed|live|shorts|playlist)\/?([\w\-\_]+)?(\?[^\"\'\`\<\>\[\]\s\t\n\r]+)?/i;
ptnURI.regEx0 = /^(\w+)\/?(\?[^\"\'\`\<\>\[\]\s\t\n\r]+)?/i;
ptnURI.regEx1 = /^(@?[^\"\'\`\<\>\[\]\s\t\n\r]+)?/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA, descR) {
	return new Promise(function (resolve, reject) {
		let config = {};
		if (descR) {
			if (descR["#start"]?.val) {
				config.startSeconds = config.start = m.timeToSeconds(descR["#start"].val.trim());
			}
			if (descR["#end"]?.val) {
				config.endSeconds = config.end = m.timeToSeconds(descR["#end"].val.trim());
			}
		}
		let exec = m.ptnURI["www.youtube.com"].regEx.exec(uriRest);
		if (exec !== null) {
			let vars = null;
			if (exec[2]) { vars = m.getSearchVars(exec[2]); }
			let v = null;
			let list = null;
			if (exec[1]) {
				v = exec[1];
			}
			if (vars?.v?.val) {
				v = vars.v.val;
			}
			if (vars?.list?.val) {
				list = vars?.list?.val;
			}
			if (list) {
				resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?list=${list}">https://www.youtube.com/watch?list=${list}</a><br/>` : "") + m.YTiframe(v, inListPlay, config, list), from: "youtube-list", list, config });
			}
			if (v) {
				resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}">https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}</a><br/>` : "") + m.YTiframe(v, inListPlay, config), from: "youtube", videoId: v, list, config });
			}
		}
		else {
			exec = m.ptnURI["youtu.be"].regEx0.exec(uriRest);
			if (exec !== null) {
				let vars = null;
				if (exec[2]) { vars = m.getSearchVars(exec[2]); }
				let v = null;
				let list = null;
				if (exec[1]) {
					v = exec[1];
				}
				if (vars?.v?.val) {
					v = vars.v.val;
				}
				if (vars?.list?.val) {
					list = vars.list.val;
				}
				if (list) {
					resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?list=${list}">https://www.youtube.com/watch?list=${list}</a><br/>` : "") + m.YTiframe(v, inListPlay, config, list), from: "youtube-list", list, config });
				}
				resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}">https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}</a><br/>` : "") + m.YTiframe(v, inListPlay, config), from: "youtube", videoId: v, list, config });
			}
			else {
				exec = m.ptnURI["www.youtube.com"].regEx1.exec(uriRest);
				if (exec !== null) {
					resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/${exec[0]}">https://www.youtube.com/${exec[0]}</a>` : ``), from: "-youtube-link"})
				}
			}
		}
		reject(false);
	});
};

ptnURI = m.ptnURI["docs.google.com"] = {};
ptnURI.regEx = /^spreadsheets\/d\/e\/([\w\-\_]+)/i;
ptnURI.regEx1 = /^spreadsheets\/d\/([\w\-\_]+)/i
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["docs.google.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml">https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml</a><br/>` : "") + m.rC(`<iframe delayed-src="https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml?widget=true&headers=false"></iframe>`), from: "docs-google", docId: exec[1] });
		}
		else {
			let exec = m.ptnURI["docs.google.com"].regEx1.exec(uriRest);
			if (exec !== null) {
				resolve({ html: (toA ? `<a target="_blank" href="https://docs.google.com/${uriRest}">https://docs.google.com/${uriRest}</a>` : ``), from: "-docs-google", docId: exec[1] })
			}
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["instagram.com"] = m.ptnURI["www.instagram.com"] = {};
ptnURI.regEx = /^(?:p|tv|reel)\/([\w\-\_]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["instagram.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://www.instagram.com/p/${exec[1]}/">https://www.instagram.com/p/${exec[1]}/</a><br/>` : "") + m.rC(`<div class="center"><iframe delayed-src="https://www.instagram.com/p/${exec[1]}/embed" allowtransparency="true"></iframe></div>`, "instagram", null, true), from: "instagram", imgId: exec[1] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["imgur.com"] = m.ptnURI["www.imgur.com"] = {};
ptnURI.regEx = /^a\/([\w\-\_]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["imgur.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://imgur.com/a/${exec[1]}">https://imgur.com/a/${exec[1]}</a><br/>` : "") + m.rC(`<div class="center"><iframe delayed-src="https://imgur.com/a/${exec[1]}/embed?pub=true&context=false" allowtransparency="true"></iframe></div>`, "imgur", null, true), from: "imgur", imgId: exec[1] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["www.tiktok.com"] = {};
ptnURI.regEx = /^@(\S+)\/video\/([0-9]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["www.tiktok.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://www.tiktok.com/@${exec[1]}/video/${exec[2]}">https://www.tiktok.com/@${exec[1]}/video/${exec[2]}</a><br/>` : "") + m.rC(`<div class="center"><iframe sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin" delayed-src="https://www.tiktok.com/embed/v2/${exec[2]}?referrer=${escape(window.location.host)}"></iframe></div>`, "tiktok", null, true), from: "tiktok", userId: exec[1], videoId: exec[2] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["vt.tiktok.com"] = {};
ptnURI.regEx = /^(\w+)\//i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["vt.tiktok.com"].regEx.exec(uriRest);
		if (exec !== null) {
			let shortURI = `https://vt.tiktok.com/${exec[1]}/`;
			$.ajax({
				type: "POST", url: "/BlogStat/getFullURI", data: shortURI, dataType: "text"
			}).fail(function (resp) {
				resolve(resp);
			}).done(async function (resp) {
				let uriRendered = await uriRendering(resp, toA, inListPlay);
					// * (uri, toA, inListPlay, descR)
				uriRendered.newURI = resp;
				resolve(uriRendered);
			});
		}
	});
};

ptnURI = m.ptnURI["serviceapi.rmcnmv.naver.com"] = {};
ptnURI.regEx = /^\S+/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["serviceapi.rmcnmv.naver.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://serviceapi.rmcnmv.naver.com/${exec[0]}">https://serviceapi.rmcnmv.naver.com/${exec[0]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://serviceapi.rmcnmv.naver.com/${exec[0]}" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "naver", videoId: exec[0] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["tv.naver.com"] = {};
ptnURI.regEx = /^(?:v|embed)\/([0-9]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["tv.naver.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://tv.naver.com/v/${exec[1]}">https://tv.naver.com/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://tv.naver.com/embed/${exec[1]}?autoPlay=false" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "naver", videoId: exec[1] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["weverse.io"] = {};
ptnURI.regEx = /^(\S+)\/artist\/([0-9\-]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["weverse.io"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://weverse.io/${exec[1]}/artist/${exec[2]}">https://weverse.io/${exec[1]}/artist/${exec[2]}</a><br/>` : "") + m.rC(`<iframe src="https://weverse.io/${exec[1]}/artist/${exec[2]}" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "weverse", singer: exec[1], videoId: exec[2] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["tv.kakao.com"] = m.ptnURI["entertain.daum.net"] = {};
ptnURI.regEx = /(?:v|cliplink)\/([0-9]+)/i;
ptnURI.regEx1 = /video\/([0-9]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["tv.kakao.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "kakao", videoId: exec[1] });
		}
		else {
			exec = m.ptnURI["entertain.daum.net"].regEx1.exec(uriRest);
			if (exec !== null) {
				resolve({ html: (toA ? `<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "kakao", videoId: exec[1] });
			}
			else {
				reject(false);
			}
		}
	});
};

ptnURI = m.ptnURI["tvpot.daum.net"] = {};
ptnURI.regEx = /^v\/([\w\-\_]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["tvpot.daum.net"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://tvpot.daum.net/v/${exec[1]}">https://tvpot.daum.net/v/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://videofarm.daum.net/controller/video/viewer/Video.html?vid=${exec[1]}${exec[1].length < 15 ? '$' : ''}&play_loc=undefined"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "daum", videoId: exec[1] });
		}
		reject(false);
	});
};

ptnURI = m.ptnURI["vimeo.com"] = {};
ptnURI.regEx = /^([0-9]+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["vimeo.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://vimeo.com/${exec[1]}">https://vimeo.com/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://player.vimeo.com/video/${exec[1]}" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "vimeo", videoId: exec[1] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["www.dailymotion.com"] = {};
ptnURI.regEx = /video\/(\w+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["www.dailymotion.com"].regEx.exec(uriRest);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="https://www.dailymotion.com/video/${exec[1]}">https://www.dailymotion.com/video/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://www.dailymotion.com/embed/video/${exec[1]}" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "dailymotion", videoId: exec[1] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["namu.wiki"] = {};
ptnURI.regEx = /w\/(.*)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["namu.wiki"].regEx.exec(uriRest);
		if (exec !== null) {
			let pathname = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
			resolve({ html: `<a target="_blank" href="https://namu.wiki/w/${pathname}">https://namu.wiki/w/${m.escapeOnlyTag(decodeURIComponent(pathname))}</a>`, from: "namu.wiki", pathname });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["www.ted.com"] = m.ptnURI["embed.ted.com"] = {};
ptnURI.regEx = /^talks\/(\S+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["www.ted.com"].regEx.exec(uriRest);
		if (exec !== null) {
			uriRest = uriRest.substring(6);
			let k = uriRest.indexOf("?");
			let vars = null;
			if (k !== -1) {
				vars = m.getSearchVars(uriRest.substring(k));
				uriRest = uriRest.substring(0, k);
			}
			let v = uriRest;
			if (vars?.language) {
				uriRest = "lang/" + vars.language.val + "/" + uriRest;
			}
			resolve({ html: (toA ? `<a target="_blank" href="https://www.ted.com/${exec[1]}">https://www.ted.com/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://embed.ted.com/talks/${uriRest}" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "ted", videoId: v });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["w.soundcloud.com"] = {};
ptnURI.regEx = /^player\/(\?\S+)/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["w.soundcloud.com"].regEx.exec(uriRest);
		if (exec !== null) {
			let vars = m.getSearchVars(exec[1]);
			let lastPath = "player/?";
			for (let i = 0; i < vars.length; i++) {
				if (vars[i].key === "auto_play") {
					lastPath += "auto_play=false&";
				}
				else {
					lastPath += vars[i].key + "=" + vars[i].val + "&";
				}
			}
			resolve({ html: (toA ? `<a target="_blank" href="https://w.soundcloud.com/${exec[1]}">https://w.soundcloud.com/${exec[1]}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://w.soundcloud.com/${lastPath.substring(0, lastPath.length - 1)}"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed soundcloud" : "soundcloud")), from: "soundcloud", videoId: vars?.url?.val });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI["gall.dcinside.com"] = {};
ptnURI.regEx = /\/movie\/share_movie(\?\S+)/i;
ptnURI.regEx1 = /\/poll\/vote(\?\S+)/i;
// https://gall.dcinside.com/board/poll/vote?no=710233
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["gall.dcinside.com"].regEx.exec(uriRest);
		if (exec !== null) {
			let vars = m.getSearchVars(exec[1]);
			let v = vars.no?.val;
			if (v) {
				resolve({ html: (toA ? `<a target="_blank" href="https://gall.dcinside.com/board/movie/share_movie?no=${v}">https://gall.dcinside.com/board/movie/share_movie?no=${v}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://gall.dcinside.com/board/movie/share_movie?no=${v}"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : "")), from: "dcinside", videoId: v });
			}
			else {
				resolve({ html: `<a target="_blank" href="https://gall.dcinside.com/${uriRest}">https://gall.dcinside.com/${m.escapeOnlyTag(decodeURIComponent(uriRest))}</a>` });
			}
		}
		else {
			exec = m.ptnURI["gall.dcinside.com"].regEx1.exec(uriRest);
			if (exec !== null) {
				let vars = m.getSearchVars(exec[1]);
				let no = vars.no?.val;
				if (no) {
					resolve({ html: (toA ? `<a target="_blank" href="https://gall.dcinside.com/board/poll/vote?no=${no}">https://gall.dcinside.com/board/poll/vote?no=${no}</a><br/>` : "") + m.rC(`<iframe src="https://gall.dcinside.com/board/poll/vote?no=${no}"></iframe>`), from: "dcinside", voteId: no })
				}
			}
		}
		reject(false);
	});
};

ptnURI = m.ptnURI["v.qq.com"] = {};
ptnURI.regEx = /([\w\d]+)\/([\w\d]+).html$/i;
ptnURI.toIframe = function (uriRest, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI["v.qq.com"].regEx.exec(uriRest);
		if (exec !== null) {
			let v = exec[2];
			if (v) {
				resolve({ html: (toA ? `<a target="_blank" href="https://v.qq.com/${uriRest}">https://v.qq.com/${uriRest}</a><br/>` : "") + m.rC(`<iframe delayed-src="https://v.qq.com/txp/iframe/player.html?vid=${v}"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : "")), from: "qq", videoId: v, newURI: `https://v.qq.com/${uriRest}` });
			}
		}
		reject(false);
	});
};

ptnURI = m.ptnURI[0] = {};
ptnURI.regEx = /^(https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:jpg|jpeg|bmp|gif|png|webp|svg|tif))(?=$|\?|\s)/i;
ptnURI.toIframe = function (uri, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI[0].regEx.exec(uri);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="${exec[1]}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br/>` : "") + `<div class="center"><img delayed-src="${exec[1]}"/></div>`, from: 'image', src: exec[1] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI[1] = {};
ptnURI.regEx = /^https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:mp4|ogg|webm|avif|avi)(?=$|\?|\s)/i;
ptnURI.toIframe = function (uri, inListPlay, toA, descR) {
	return new Promise(function (resolve, reject) {
		let config = {};
		if (descR) {
			if (descR["#start"]?.val) {
				config.start = m.timeToSeconds(descR["#start"].val.trim());
			}
			if (descR["#end"]?.val) {
				config.end = m.timeToSeconds(descR["#end"].val.trim());
			}
			if (config.start || config.end) {
				config.hash = `${config.start ? `#t=${config.start}` : "#t=0"}${config.end ? `,${config.end}` : ""}`;
			}
		}
		let exec = m.ptnURI[1].regEx.exec(uri);
		if (exec !== null) {
			resolve({ html: (toA ? `<a target="_blank" href="${exec[0]}${config.hash ? config.hash : ""}">${m.escapeOnlyTag(decodeURIComponent(`${uri}${config.hash ? config.hash : ""}`))}</a><br/>` : "") + m.rC(`<video controls preload="metadata" delayed-src="${exec[0]}${config.hash ? config.hash : ""}"></video>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: 'video', src: exec[0], config });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI[2] = {};
ptnURI.regEx = /^https?:\/\/kr[\d]+\.sogirl\.so(\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]*)?/i;
ptnURI.regEx1 = /^https?:\/\/kr[\d]+\.sogirl\.co(\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]*)?/i;
ptnURI.toIframe = function (uri, inListPlay) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI[2].regEx.exec(uri);
		if (exec !== null) {
			resolve({ html: `<a target="_blank" href="https://kr69.sogirl.so${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`, from: 'sogirl', src: exec[1] });
		}
		else {
			exec = m.ptnURI[2].regEx1.exec(uri);
			if (exec !== null) {
				resolve({ html: `<a target="_blank" href="https://kr69.sogirl.so${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr69.sogirl.so${exec[1] ? exec[1] : ""}`, from: 'sogirl', src: exec[1] });
			}
			else {
				reject(false);
			}
		}
	});
};

ptnURI = m.ptnURI[3] = {};
ptnURI.regEx = /^https?:\/\/kr[\d]+\.topgirl\.co(\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]*)?/i;
ptnURI.toIframe = function (uri, inListPlay) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI[3].regEx.exec(uri);
		if (exec !== null) {
			resolve({ html: `<a target="_blank" href="https://kr32.topgirl.co${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr32.topgirl.co${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr32.topgirl.co${exec[1] ? exec[1] : ""}`, from: 'topgirl', src: exec[1] });
		}
		else {
			reject(false);
		}
	});
};

ptnURI = m.ptnURI[4] = {};
ptnURI.regEx = /^file:\/\/\/([^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:jpg|jpeg|bmp|gif|png|webp|svg|tif))(?=$|\?|\s)/i;
ptnURI.regEx1 = /^file:\/\/\/([^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:mp4|ogg|webm|avi))(?=$|\?|\s)/i;
ptnURI.regEx2 = /^file:\/\/\/([^\s\t\n\r\"\'\`\<\>\{\}\[\]]+\.(?:pdf|html|htm))(?=$|\?|\s)/i;
ptnURI.toIframe = function (uri, inListPlay, toA) {
	return new Promise(function (resolve, reject) {
		let exec = m.ptnURI[4].regEx.exec(uri);
		let href = null;
		if (exec !== null) {
			href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
			uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
			resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a>` + m.rC(`<div class="center"><img delayed-src="${href}"/></div>`, (inListPlay && m.fsToRs.fixed ? "fixed eveElse" : "eveElse")), from: 'file-image', src: href });
		}
		else {
			exec = m.ptnURI[4].regEx1.exec(uri);
			if (exec !== null) {
				href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
				uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
				resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br/>` + m.rC(`<video controls preload="metadata" delayed-src="${href}"></video>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: 'file-video', src: href });
			}
			else {
				exec = m.ptnURI[4].regEx2.exec(uri);
				if (exec !== null) {
					href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
					uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
					resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br/>` + m.rC(`<iframe delayed-src="${href}"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: 'file-pdf', src: href });
				}
			}
			reject(false);
		}
	});
};

window.uriRendering = function (uri, toA, inListPlay, descR) {
	return new Promise(async function (resolve, reject) {
		const { uriHost, pathname, search, hash } = m.decomposeURI(uri);
		const uriRest = (pathname ? pathname.substring(1) : "") + search;
		if (uriHost) {
			if (m.ptnURI[uriHost]) {
				try {
					let result = await m.ptnURI[uriHost]?.toIframe(uriRest, inListPlay, toA, descR)
					if (Boolean(result) !== false) {
						resolve({ ...result, uri, uriHost, pathname, search, hash });
					}
				}
				catch (err) {
					// console.error("toIframe rejected: ", err);
				} // ! if error, reject(false);
			}
			for (let i = 0; i < m.ptnURI.length; i++) {
				try {
					let result = await m.ptnURI[i]?.toIframe(uri, inListPlay, toA, descR);
					if (Boolean(result) !== false) {
						resolve({ ...result, uri, uriHost, pathname, search, hash });
					}
				}
				catch (err) {
					// console.error("toIframe rejected: ", err);
				} // ! if error, reject(false);
			}
			if (toA) {
				resolve({ html: m.uriToA(uri), uri, uriHost, pathname, search, hash });
			}
		}
		else {
			resolve({ html: m.escapeOnlyTag(uri), uri, uriHost, pathname, search, hash });
		}
		resolve({ html: "", uri, uriHost, pathname, search, hash });
	});
};
window.relatedRendering = function (str) {
	return new Promise(async function (resolve, reject) {
		if (!str || typeof str !== "string") {
			str = String(str);
		}
		// * m.ptnURL = /https?:\/\/[^\s\t\n\r\"\'\`\<\>\{\}\[\]]+/ig;
		m.ptnURL.lastIndex = 0;
		let exec = m.ptnURL.exec(str);
		let start = 0;
		let res = "";
		while (exec !== null) {
			res += m.escapeOnlyTag(str.substring(start, exec.index));
			let uriRendered = await uriRendering(await m.formatURI(exec[0], true), true, false);
				// * (uri, toA, inListPlay, descR)
			res += uriRendered.html;
			start = m.ptnURL.lastIndex;
			exec = m.ptnURL.exec(str);
		}
		res += m.escapeOnlyTag(str.substring(start));
		resolve(res);
	});
};

///////////////////////////////////////////////
// * SNS sharing
///////////////////////////////////////////////
m.notifyCopied = function (copied) {
	m.$notify_copied.show();
	m.$textarea_copied.val(copied);
};
m.shareCurrentPage = function (service) {
	let title = `${m.currentCat} of ${m.userId}'s Recoeve.net`;
	let href = "";
	let desc = title;
	m.args = {};
	let argName = "PRL";
	if (m.docCookies.hasItem(argName)) {
		m.args[argName] = m.docCookies.getItem(argName);
	}
	argName = "PRR";
	if (m.docCookies.hasItem(argName)) {
		m.args[argName] = m.docCookies.getItem(argName);
	}
	if (m.$table_of_recos_container.is(":visible")) {
		m.args["ToR"] = m.$table_of_recos.val();
	}
	let recoeveURI =
		window.location.origin +
		m.pathOfCat(m.currentCat, m.recoMode, null, m.hashURI, m.args);
	switch (service) {
		case "link":
			let written = `${title}\n${recoeveURI}\n\n${m.escapeOnlyTag(
				decodeURIComponent(recoeveURI)
			)}`;
			navigator.clipboard.writeText(written).then(
				function () {
					m.notifyCopied(written);
				},
				function (err) {
					m.notifyCopied(`[--Could not copy text--]: ${err}`);
				}
			);
			return false;
		case "tag":
			let written1 = `${title}:<br/>\n<a target="_blank" href="${recoeveURI}">${m.escapeOnlyTag(decodeURIComponent(recoeveURI))}</a>`;
			navigator.clipboard.writeText(written1).then(
				function () {
					m.notifyCopied(written1);
				},
				function (err) {
					m.notifyCopied(`[--Could not copy text--]: ${err}`);
				}
			);
			return false;
		case "recoeve":
			href = `https://recoeve.net/reco?uri=${encodeURIComponent(recoeveURI)}&title=${encodeURIComponent(title)}&cats=${encodeURIComponent(m.currentCat)}`;
			break;
		case "X":
			href = `https://X.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(recoeveURI)}`;
			break;
		case "facebook":
			href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recoeveURI)}`;
			break;
		case "whatsapp":
			href = `https://wa.me/?text=${encodeURIComponent(title)}%0A${encodeURIComponent(recoeveURI)}`;
			break;
		case "kakao":
			Kakao.Share.sendDefault({
				objectType: "feed",
				content: {
					title: m.escapeOnlyTag(title),
					description: desc ? m.escapeOnlyTag(desc) : "",
					imageUrl: "", // No image.
					link: {
						mobileWebUrl: recoeveURI,
						webUrl: recoeveURI,
					},
				},
			});
			return false;
	}
	window.open(href, "_blank");
	return false;
};
m.shareSNS = function (elem, service) {
	let $elem = $(elem);
	let $reco = $elem.parents(".reco");
	let uri = m.unescapeHTML($reco.find(".textURI").html());
	let decodedURI = m.escapeOnlyTag(decodeURIComponent(uri));
	let r = m.userRecos[uri];
	let title = r.title;
	let desc = r.desc;
	let href = "";
	let recoeveURI = window.location.origin + m.pathOfCat(m.currentCat, m.recoMode, null, uri);
	switch (service) {
		case "link":
			$elem.trigger("focus");
			let written = `${title}\n${recoeveURI}\n\n${m.escapeOnlyTag(decodeURIComponent(recoeveURI))}\n\n${uri}${uri !== decodedURI ? `\n${decodedURI}` : ``}`;
			navigator.clipboard.writeText(written).then(
				function () {
					m.notifyCopied(written);
				},
				function (err) {
					m.notifyCopied(`[--Could not copy text--]: ${err}`);
				}
			);
			return false;
		case "tag":
			$elem.trigger("focus");
			let written1 = `${title}:<br/>\n<a target="_blank" href="${recoeveURI}">${m.escapeOnlyTag(decodeURIComponent(recoeveURI))}</a><br/>\n<br/>\n<a target="_blank" href="${uri}">${decodedURI}</a>`;
			navigator.clipboard.writeText(written1).then(
				function () {
					m.notifyCopied(written1);
				},
				function (err) {
					m.notifyCopied(`[--Could not copy text--]: ${err}`);
				}
			);
			return false;
		case "recoeve":
			href = `/reco?uri=${encodeURIComponent(uri)}&title=${encodeURIComponent(title)}&cats=${encodeURIComponent(m.currentCat)}`;
			break;
		case "X":
			href = `https://X.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(recoeveURI)}`;
			break;
		case "facebook":
			href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recoeveURI)}`;
			break;
		case "whatsapp":
			href = `https://wa.me/?text=${encodeURIComponent(title)}%0A${encodeURIComponent(recoeveURI)}`;
			break;
		case "kakao":
			Kakao.Share.sendDefault({
				objectType: "feed",
				content: {
					title: m.escapeOnlyTag(title),
					description: desc ? m.escapeOnlyTag(desc) : "",
					imageUrl: "", // No image.
					link: {
						mobileWebUrl: recoeveURI,
						webUrl: recoeveURI,
					},
				},
			});
			return;
	}
	window.open(href, "_blank");
	return false;
};

////////////////////////////////////////////////////
// slide element.
////////////////////////////////////////////////////
m.slideToggle = function (elem) {
	let $elem = $(elem);
	$elem.addClass("disabled");
	$elem.parent().next().slideToggle(1000);
	setTimeout(function () {
		$elem.removeClass("disabled");
	}, 1000);
};
m.slideUp = function (elem) {
	let $elem = $(elem).parent().parent();
	$elem.slideUp(1000);
	// window.scrollBy(0,-$elem.outerHeight());
	window.scrollBy({ left: 0, top: -$elem.outerHeight(), behavior: "smooth" });
};

////////////////////////////////////////////////////
// Show recos
////////////////////////////////////////////////////
m.ptnDescCmt = /^#\S+/;
	// \w=[A-Za-z0-9_]
m.renderStrDescCmt = function (str) {
	let res = [];
	let strSplitted = str.trim().split("\n");
	for (let i = 0; i < strSplitted.length; i++) {
		strSplitted[i] = strSplitted[i].replace(/[\s\t\n\r]+$/, "");
			// trim only last blanks.
	}
	let k = 0;
	let key = "";
	let listOfValues = [];
	for (let i = 0; i < strSplitted.length; i++) {
		let match = strSplitted[i].match(/^#\S*/);
		if (match === null) {
			listOfValues.push(strSplitted[i]);
		}
		else {
			if (!res[key.toLowerCase()]) {
				res[k] = res[key.toLowerCase()] = { i: k, key, val: listOfValues.join("\n") };
				k++;
			}
			key = match[0]
			listOfValues = [];
			listOfValues.push(strSplitted[i].substring(match[0].length));
		}
	}
	res[k] = res[key.toLowerCase()] = { i: k, key, val: listOfValues.join("\n") };
		// * Last asign manually.
	res[""].val = res[""].val.trim();
	if (!res[""].val) {
		res.splice(0, 1);
		delete res[""];
		for (let i = 0; i < res.length; i++) {
			res[i].i = i;
		}
	}
	return res;
};
m.descCmtRToString = function (descCmtR) {
	let res = "";
	for (let i = 0; i < descCmtR.length; i++) {
		res += `${descCmtR[i].key}\n${descCmtR[i].val.trim()}\n\n\n\n`;
	}
	return res.trim();
};
m.memorizing = function (elem) {
	$('#memo-container').show();
	m.dict.memoSetting(elem);
}
m.descCmtRToHTML = function (descR) {
	return new Promise(async function (resolve, reject) {
		let res = `<div class="desc">`;
		for (let l = 0; l < descR.length; l++) {
			let key = m.escapeOnlyTag(descR[l].key);
			let val = m.escapeOnlyTag(descR[l].val);
			switch (key.toLowerCase()) {
				case "#start": case "#start:":
				case "#end": case "#end:":
					res += `<div class="value"><span class="key">${key}</span> ${val.replace(/(?:  |\t)/g, "&nbsp; ").replace(/\n/g, "<br/>").replace(/\s+/g, " ").trim().replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`)}</div>`;
					break;
				case "#lyrics": case "#lyrics:":
				case "#lyric": case "#lyric:":
				case "#가사": case "#가사:":
					res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">▼ [--Toggle lyrics--]</div></div>
<div class="lyricsC" style="display:none">
<div class="lyricsArrow"></div>
<div class="lyrics">${val.trim().replace(/(?:  |\t)/g, "&nbsp; ").replace(/\n/g, "<br/>").replace(/\s+/g, " ").trim().replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`)}</div>
<div class="right"><div class="button" onclick="m.slideUp(this)">▲ [--Hide lyrics--]</div></div>
</div>
</div>`;
					break;
				case "#dictionary": case "#dictionary:":
				case "#사전": case "#사전:": {
					let valToJSON = await m.strToJSON(val.trim());
					res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">▼ [--Toggle dictionary--]</div> <div class="button memorizing" onclick="m.memorizing(this)">[--Memorizing--]</div></div>
<div class="lyricsC" style="display:none">
<div class="lyricsArrow"></div>
<div class="lyrics">${(await m.arrayToTableHTML(valToJSON, true)).replace(/(?:  |\t)/g, "&nbsp; ")}</div>
<div class="right"><div class="button" onclick="m.slideUp(this)">▲ [--Hide dictionary--]</div></div>
</div>
</div>`;
					break;
				}
				case "#memorizing-result": {
					let valToJSON = await m.strToJSON(val.trim());
					res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">▼ [--Toggle memorizing result--]</div></div>
<div class="lyricsC" style="display:none">
<div class="lyricsArrow"></div>
<div class="lyrics">${m.memoArrayToTableHTML(valToJSON, true).replace(/(?:  |\t)/g, "&nbsp; ")}</div>
<div class="right"><div class="button" onclick="m.slideUp(this)">▲ [--Hide memorizing result--]</div></div>
</div>
</div>`;
					break;
				}
				case "#related": case "#related:":
				case "#originaluri": case "#originaluri:":
				case "#uriwithhash": case "#uriwithhash:":
				case "#": case "": default:
					res += `<div class="value"><span class="key">${key}</span> `;
					let relateds = val.split("\n");
					for (let p = 0; p < relateds.length; p++) {
						try {
							res += String(await relatedRendering(relateds[p])).replace(/(?:  |\t)/g, "&nbsp; ");
						}
						catch (err) {
							console.error(err);
						}
						res += '<br/>';
					}
					res += `</div>`;
					break;
			}
		}
		res += `</div>`;
		resolve(res);
	});
};
m.stashReco = function (event) {
	let $target = $(event.target);
	let $reco = $target.parents(".reco");
	let $result = $reco.find(".result");
	if (!m.myIndex) {
		m.delayedLogOut("You are not logged-in.", 60 * 60 * 24, $result);
		return;
	}
	else {
		let inRecoms = true;
		let valStr = "";
			// $reco.find(".str").html();
		let uri = m.unescapeHTML($reco.find(".textURI").html());
		let strHeads = "uri\tdo\tval";
		let strContents = `${m.encloseStr(uri)}\toverwrite\t`;
			// Empty val.
		let r = m.myRecos[uri];
		let recoDef = m.recoDefs[uri];
		if (!r) {
			if (recoDef?.defTitles?.[0]?.[0]) {
				strHeads += "\ttitle";
				strContents += `\t${m.encloseStr(recoDef.defTitles[0][0])}`;
			}
			if (recoDef?.defDescs?.[0]?.[0]) {
				strHeads += "\tdesc";
				strContents += `\t${m.encloseStr(recoDef.defDescs[0][0])}`;
			}
		}
		let cats = "[--Stashed--]";
		strHeads += "\tcats";
		strContents += `\t${cats}`;
		$result?.html(`Stashing... The cats on this URI is "${m.escapeOnlyTag(cats)}".`);
		m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
	}
};
m.recomHTML = function (r, inListPlay, additionalClass) {
	return new Promise(async function(resolve, reject) {
		if (r?.has) {
			let recoHTML = await m.recoHTML(r, inListPlay, true, true, additionalClass);
			resolve(String(recoHTML));
		}
		let recoDef = m.recoDefs[r?.uri];
		if (r?.uri && !recoDef) {
			try {
				await m.getMultiDefs(r?.uri);
				recoDef = m.recoDefs[r?.uri];
			}
			catch (err) {
				console.error(err);
			}
		}
		let res = `<div class="reco recom${additionalClass ? ` ${additionalClass}` : ``}"${inListPlay ? `` : ` id="recom-${m.recoms[m.currentCat][r?.uri]?.i}"`}>
<div class="edit button fRight" onclick="m.editOrRecoToMine(this, true)">+</div>
<div class="textURI">${m.escapeOnlyTag(r?.uri)}</div>
<div class="uri cBoth"><a class="button button-recostat" target="_blank" href="/recostat?uri=${encodeURIComponent(r?.uri)}">RecoStat</a>${m.uriToA(r?.uri)}</div>`;
		if (recoDef?.defTitles[0] && recoDef.defTitles[0][0]) {
			res += `<div class="title">${m.escapeOnlyTag(recoDef.defTitles[0][0])}</div>`;
		}
		res += `<div class="cats">${m.catsToA(m.currentCat)}</div>`;
		if (!inListPlay) {
			let uriRendered = await uriRendering(r?.uri, false, inListPlay, r?.descR);
				// * (uri, toA, inListPlay, descR)
			res += uriRendered.html;
		}
		let recomsI = m.recoms[m.currentCat][r?.uri];
		if (recomsI?.valsStat) {
			let valsStat = recomsI.valsStat;
			let dx = 100.0 / (m.valsStatN + 2);
			res += `<div class="rC" style="padding:0 .5em"><div class="rSC"><div><svg class="vals-stat" width="100%" height="100%">`;
			for (let k = 0; k <= m.valsStatN; k++) {
				let h = 79.0 * valsStat[k] / valsStat.max;
				res += `<rect class="column" x="${dx * (k + 0.5)}%" y="${80 - h}%" width="${dx}%" height="${h}%"></rect>`;
			}
			res += `<line class="bar" x1="1%" y1="80%" x2="99%" y2="80%"/>`;
			for (let k = 0; k <= m.valsStatN; k++) {
				let x = dx * (k + 1);
				res += `<line class="bar" x1="${x}%" y1="78%" x2="${x}%" y2="82%"/>`;
			}
			res += `<text class="tick" text-anchor="middle" x="${dx}%" y="90%">0`
			for (let k = 2; k <= m.valsStatN; k += 2) {
				res += `<tspan text-anchor="middle" x="${dx * (k + 1)}%" y="90%">${k / 2}</tspan>`;
			}
			res += `</text>`;
			res += `<text class="max-simSum" x="0%" y="10%">${(valsStat.max / 10000.0).toFixed(2)}</text>`;
			let x_expected = (2.0 * recomsI.avgVal + 1.0) * dx;
			res += `<line class="expected" x1="${x_expected}%" y1="1%" x2="${x_expected}%" y2="83%"/><text class="expected" text-anchor="middle" x="${x_expected}%" y="96%" >${recomsI.avgValStr}</text></svg></div></div></div>`;
		}
		if (m.myPage) {
			res += `<div class="cBoth"></div><div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div><div class="cBoth button fLeft" style="margin:3em 0 1em" onclick="m.stashReco(event)">[--Stash--]</div>`;
		}
		res += `<div class="cBoth"></div><div class="result" style="margin:.5em 0"></div>`;
		if (recoDef?.defDescs[0] && recoDef.defDescs[0][0]) {
			let descR = m.renderStrDescCmt(recoDef.defDescs[0][0]);
			res += await m.descCmtRToHTML(descR);
		}
		if (recomsI?.cmtsHTML) {
			res += recomsI.cmtsHTML;
		}
		res += `</div>`;
		resolve(res);
	});
};
m.recoHTML = function (r, inListPlay, inRange, inRecoms, additionalClass) {
	return new Promise(async function(resolve, reject) {
		let res = "";
		res += `<div class="reco${additionalClass ? ` ${additionalClass}` : ``}${inRange ? `` : ` none`}"${inListPlay ? `` : ` id="reco${inRecoms ? `m-${m.recoms[m.currentCat][r?.uri]?.i}"` : `-${m.fsToRs.fullList[r?.uri]?.i}"`}`}><img class="SNS-img" src="/CDN/link.png" onclick="return m.shareSNS(this,'link')"><img class="SNS-img" src="/CDN/icon-Tag.png" onclick="return m.shareSNS(this,'tag')"><img class="SNS-img" src="/CDN/icon-Recoeve.png" onclick="return m.shareSNS(this,'recoeve')"><img class="SNS-img" src="/CDN/icon-X.png" onclick="return m.shareSNS(this,'X')"><img class="SNS-img" src="/CDN/icon-Facebook.png" onclick="return m.shareSNS(this,'facebook')"><img class="SNS-img" src="/CDN/icon-Kakao.png" onclick="return m.shareSNS(this,'kakao')"/><img class="SNS-img" src="/CDN/icon-Whatsapp.png" onclick="return m.shareSNS(this,'whatsapp')"/>
${m.myIndex ? `<div class="button edit fRight${r.deleted ? " deleted" : ""}" onclick="m.editOrRecoToMine(this)">${m.myPage ? '[--Edit--]' : '[--Reco to mine--]'}</div>` : ''}
<div class="textURI">${m.escapeOnlyTag(r?.uri)}</div>
<div class="uri cBoth"><a class="button button-recostat" target="_blank" href="/recostat?uri=${encodeURIComponent(r?.uri)}">RecoStat</a>${m.uriToA(r?.uri)}</div>
<div class="title">${m.escapeOnlyTag(r?.title)}</div>
<div class="cats">${m.catsToA(r.cats)}</div>`
		if (!inListPlay) {
			let uriRendered = await uriRendering(r?.uri, false, inListPlay, r?.descR);
				// * (uri, toA, inListPlay, descR)
			res += uriRendered.html;
		}
		res += `<div class="cBoth"></div>`;
		if (r.val?.str) {
			res += `<div class="val">${m.stars(r.val.val)} <span class="str">${m.escapeOnlyTag(r?.val.str)}</span></div>`;
		}
		else {
			res += `<div class="val">${m.stars(0)} <span class="str"> </span></div>`;
		}
		res += `<div class="cBoth"></div>`;
		if (m.myPage) {
			if (r.val?.str) {
				res += `<div class="my-point">${m.stars(r.val.val)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str">${m.escapeOnlyTag(r?.val.str)}</span></div>`;
			}
			else {
				res += `<div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div>`;
			}
		}
		else if (m.myRecos[r?.uri]) {
			let mR = m.myRecos[r?.uri];
			if (mR.has) {
				res += `<div class="my-point">${m.stars(mR.val.val)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str">${m.escapeOnlyTag(mR.val.str)}</span></div>`;
			}
			else {
				res += `<div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div>`;
			}
		}
		else {
			res += `<div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div>`;
		}
		res += `<div class="cBoth"></div><div class="result" style="margin:.5em 0"></div>`;
		if (r.desc) {
			let descR = r.descR;
			res += await m.descCmtRToHTML(descR);
		}
		if (r.cmt && r.cmt.length !== 0) {
			res += `<div class="cmt">${await m.descCmtRToHTML(r.cmtR)}</div>`;
		}
		if (r.tFirst && r.tLast && r.tFirst !== r.tLast) {
			res += `<div class="tFirst">Lastly Editted at ${m.toLocalTime(r.tLast)}</div><div class="cBoth"></div>`;
			res += `<div class="tLast">Firstly Recoed at ${m.toLocalTime(r.tFirst)}</div><div class="cBoth"></div>`;
		}
		else if (r.tLast) {
			res += `<div class="tLast">Firstly Recoed at ${m.toLocalTime(r.tLast)}</div><div class="cBoth"></div>`;
		}
		res += `</div>`;
		resolve(res);
	});
};
m.reco_pointChange_do = function (args, err) { // args : {strHeads, strContents, $result, uri, cats, valStr, inRecoms}
	if (err) {
		m.delayedLogOut(err, 60 * 60 * 24, args.$result);
		return;
	}
	let fs = m.fsGo;
	let uri = args.uri;
	$.ajax({
		type: "POST", url: "/reco/do", data: (args.strHeads + "\n" + args.strContents).replace(/%20/gi,"%2520")
		, dataType: "text"
	}).fail(function (resp) {
		clearInterval(m.setIntervalDeleyedLogOut);
		clearTimeout(m.setTimeoutDeleyedLogOut);
		if (args.inRecoms) {
			args.$result?.html(`[--Reco failed.--]: ${resp}`);
		}
		else {
			args.$result?.html(`[--Failed change.--]: ${resp}`);
		}
	}).done(async function (resp) {
		clearInterval(m.setIntervalDeleyedLogOut);
		clearTimeout(m.setTimeoutDeleyedLogOut);
		let res = Object(await m.strToJSON(resp));
		let result = String(res[1]?.result);
		let uri = res[1]?.uri;
		if (result.startsWith("changed")) {
			m.myRecos[uri].val = m.val(args.valStr);
			m.changeCats_UriList(m.myRecos[uri].cats, args.cats, uri);
			if (m.myRecos[uri].cats !== args.cats) {
				m.myRecos[uri].cats = args.cats;
			}
			m.myRecos[uri].tLast = res[1]?.tLast;
			args.$result?.html(res[1].result);
			m.refresh(args.cats, "changed", uri);
		}
		else if (result.startsWith("recoed")) {
			let r = m.myRecos[uri];
			let recoDef = m.recoDefs[uri];
			if (!r) {
				r = m.myRecos[uri] = { uri, has: true, down: true, val: m.val(args.valStr) };
			}
			r.uri = uri;
			r.has = true;
			r.down = true;
			r.val = m.val(args.valStr);
			r.tFirst = res[1]?.tLast;
			r.tLast = res[1]?.tLast;
			if (args.title) {
				r.title = args.title;
			}
			else if (recoDef?.defTitles?.[0]?.[0]) {
				r.title = recoDef.defTitles[0][0];
			}
			else {
				r.title = "";
			}
			r.cats = args.cats;
			if (args.desc) {
				r.desc = args.desc;
			}
			else if (recoDef?.defDescs?.[0]?.[0]) {
				r.desc = recoDef.defDescs[0][0];
			}
			else {
				r.desc = "";
			}
			r.descR = m.renderStrDescCmt(r.desc);
			if (await m.putCats_UriToLists(r.cats, uri)) {
				await m.catListToHTML();
			}
			m.refresh(r.cats, "recoed", uri);
		}
		else {
			m.delayedLogOut(result, 60 * 60 * 24, args.$result);
		}
	});
};
m.recoByOnlyStars = function ($str, uri, $result, inRecoms) {
	if (!m.myIndex) {
		m.delayedLogOut("You are not logged-in.", 60 * 60 * 24, $result);
		return;
	}
	let valStr = "";
	if (typeof $str === "string") {
		valStr = $str;
	}
	else {
		valStr = $str.html();
	}
	if (m.myPage) {
		if (inRecoms) {
			let strHeads = "uri\tdo\tval";
			let strContents = `${m.encloseStr(uri)}\treco\t${m.encloseStr(valStr)}`;
			let r = m.myRecos[uri];
			let recoDef = m.recoDefs[uri];
			if (recoDef?.defTitles?.[0]?.[0]) {
				strHeads += "\ttitle";
				strContents += `\t${m.encloseStr(recoDef.defTitles[0][0])}`;
			}
			if (recoDef?.defDescs?.[0]?.[0]) {
				strHeads += "\tdesc";
				strContents += `\t${m.encloseStr(recoDef.defDescs[0][0])}`;
			}
			strHeads += "\tcats";
			let cats = "";
			if (m.recoMode === "multireco") {
				m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
				cats = m.$multireco_input_cats.val();
			}
			else {
				cats = m.formatCats(m.currentCat);
			}
			strContents += `\t${m.encloseStr(cats)}`;
			$result?.html(`Recoing... The cats on this URI is "${m.escapeOnlyTag(cats)}".`);
			m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
		}
		else if (valStr !== m.myRecos[uri]?.val?.str) {
			let strHeads = "uri\tdo\tval";
			let strContents = `${m.encloseStr(uri)}\tchange\t${m.encloseStr(valStr)}`;
			let cats = "";
			let catsChanged = true;
			if (m.recoMode === "multireco") {
				m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
				cats = m.$multireco_input_cats.val();
				if (m.myRecos[uri].cats && m.catsContainsAllAnotCats(m.myRecos[uri].cats, cats)) {
					cats = m.formatCats(m.myRecos[uri].cats);
					catsChanged = false;
				}
			}
			else if (m.myRecos[uri].cats || m.myRecos[uri].cats === "") {
				cats = m.formatCats(m.myRecos[uri].cats);
				catsChanged = false;
			}
			else {
				cats = m.formatCats(m.currentCat);
			}
			if (catsChanged) {
				strHeads += "\tcats";
				strContents += `\t${m.encloseStr(cats)}`;
			}
			$result.html(`[--Changing your points.--]${catsChanged ? ` The cats on this URI is "${m.escapeOnlyTag(cats)}".` : ""}`);
			m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
		}
	}
	else {
		if (m.myRecos[uri].has) {
			if (m.myRecos[uri].val?.str !== valStr) {
				let strHeads = "uri\tdo\tval";
				let strContents = `${m.encloseStr(uri)}\tchange\t${m.encloseStr(valStr)}`;
				let cats = "";
				let catsChanged = true;
				if (m.recoMode === "multireco") {
					m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
					cats = m.$multireco_input_cats.val();
					if (m.myRecos[uri].cats && m.catsContainsAllAnotCats(m.myRecos[uri].cats, cats)) {
						cats = m.formatCats(m.myRecos[uri].cats);
						catsChanged = false;
					}
				}
				else if (m.myRecos[uri].cats) {
					cats = m.formatCats(m.myRecos[uri].cats);
					catsChanged = false;
				}
				else {
					cats = m.formatCats(m.currentCat);
				}
				if (catsChanged) {
					strHeads += "\tcats";
					strContents += `\t${m.encloseStr(cats)}`;
				}
				$result.html(`[--Changing your points.--]${catsChanged ? ` The cats on this URI is changed to "${m.escapeOnlyTag(cats)}".` : ""}`);
				m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
			}
		}
		else {
			let strHeads = "uri\tdo\tval";
			let strContents = `${m.encloseStr(uri)}\treco\t${m.encloseStr(valStr)}`;
			let uR = m.userRecos[uri];
			if (uR) {
				if (uR.title) {
					strHeads += "\ttitle";
					strContents += "\t" + m.encloseStr(uR.title);
				}
				if (uR.desc) {
					strHeads += "\tdesc";
					strContents += "\t" + m.encloseStr(uR.desc);
				}
			}
			let cats = "";
			if (m.recoMode === "multireco") {
				m.$multireco_input_cats.val(m.formatCats(m.$multireco_input_cats.val()));
				cats = m.$multireco_input_cats.val();
			}
			else {
				cats = m.formatCats(m.currentCat);
			}
			strHeads += "\tcats";
			strContents += `\t${m.encloseStr(cats)}`;
			let strRecoDo = strHeads + "\n" + strContents;
			$result.html("[--Recoing to your recoeve.net.--]");
			m.rmb_me(m.reco_do, { strRecoDo, cats, uri, $result }, true);
		}
	}
};
m.starsOnClick = function (e) {
	let $target = $(e.target);
	let $reco = $target.parents(".reco");
	if (!$target.hasClass("stars-container")) {
		$target = $target.parents(".stars-container");
	}
	let uri = m.unescapeHTML($reco.find(".textURI").html());
	clearTimeout(m.timeout[uri]);
	let $result = $reco.find(".result");
	$result.html("");
	let $bar = $target.find(".bar");
	let barW = $bar.width();
	let $str = $target.siblings(".str");
	let w = e.clientX - $bar.offset().left + m.$window.scrollLeft();
	if (w < -15) {
		w = -1;
	}
	else if (w < 0) {
		w = 0;
	}
	else if (w > m.starsWidth) {
		w = m.starsWidth;
	}
	if (w !== barW) {
		barW = w;
		if (w < 0) {
			$str.html("");
			w = 0;
		}
		else {
			$str.html(m.escapeOnlyTag((w / m.starsWidth * m.fullPts).toFixed(1) + "/" + m.fullPts));
		}
		$bar.css({ width: w });
	}
	m.timeout[uri] = setTimeout(function () {
		m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
	}, 2 * m.wait);
};
m.starsOnTouchMove = function (e) {
	e.preventDefault();
	e.stopPropagation();
	let $target = $(e.target);
	if (!$target.hasClass("stars-container")) {
		$target = $target.parents(".stars-container");
	}
	let $reco = $target.parents(".reco");
	let uri = m.unescapeHTML($reco.find(".textURI").html());
	clearTimeout(m.timeout[uri]);
	let $result = $reco.find(".result");
	$result.html("");
	let $bar = $target.find(".bar");
	let barW = $bar.width();
	let $str = $target.siblings(".str");
	m.$html.on("mousemove.mdInStars touchmove.mdInStars", function (e) {
		window.getSelection().removeAllRanges();
		e.preventDefault();
		e.stopPropagation();
		let x = (e.type === 'touchmove') ? e.originalEvent.touches[0].clientX : e.clientX;
		let w = x - $bar.offset().left + m.$window.scrollLeft();
		if (w < -15) {
			w = -1;
		}
		else if (w < 0) {
			w = 0;
		}
		else if (w > m.starsWidth) {
			w = m.starsWidth;
		}
		if (w !== barW) {
			barW = w;
			if (w < 0) {
				$str.html("");
				w = 0;
			}
			else {
				$str.html((w / m.starsWidth * m.fullPts).toFixed(1) + "/" + m.fullPts);
			}
			$bar.css({ width: w });
		}
	});
	return { $str, uri, $result, $reco };
};
m.starsOnUpClick = function (e) {
	e.preventDefault();
	e.stopPropagation();
	let $target = $(e.target);
	let $reco = $target.parents(".reco");
	let uri = m.unescapeHTML($reco.find(".textURI").html());
	clearTimeout(m.timeout[uri]);
	let $result = $reco.find(".result");
	$result.html("");
	let $str = $target.siblings(".str");
	let $star = $reco.find(".my-point>.stars-container");
	let val = m.val($str.html());
	if (val.valid) {
		if (val.val === -1) {
			$str.html("10.0/10");
		}
		else {
			val.num += 0.1;
			if (val.num > val.divisor) {
				val.num = val.divisor;
			}
			$str.html(`${val.num.toFixed(1)}/${val.divisor}`);
		}
	} else {
		$str.html("10.0/10");
	}
	val = m.val($str.html());
	$star.find(".bar").css({ width: m.starsWidth * val.val });
	m.timeout[uri] = setTimeout(function () {
		m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
	}, 2 * m.wait);
};
m.starsOnDownClick = function (e) {
	e.preventDefault();
	e.stopPropagation();
	let $target = $(e.target);
	let $reco = $target.parents(".reco");
	let uri = m.unescapeHTML($reco.find(".textURI").html());
	clearTimeout(m.timeout[uri]);
	let $result = $reco.find(".result");
	$result.html("");
	let $str = $target.siblings(".str");
	let $star = $reco.find(".my-point>.stars-container");
	let val = m.val($str.html());
	if (val.valid) {
		if (val.val === -1) {
			$str.html("0.0/10");
		}
		else {
			val.num -= 0.1;
			if (val.num < 0) {
				val.num = 0;
			}
			$str.html(`${val.num.toFixed(1)}/${val.divisor}`);
		}
	} else {
		$str.html("0.0/10");
	}
	val = m.val($str.html());
	$star.find(".bar").css({ width: m.starsWidth * val.val });
	m.timeout[uri] = setTimeout(function () {
		m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
	}, 2 * m.wait);
};
m.reNewAndReOn = async function () {
	m.$delayedElems = $("[delayed-src], [delayed-bgimage], .to-be-executed");
	m.$window.off("scroll.delayedLoad");
	m.$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
	m.$window.trigger("scroll.delayedLoad");
	m.$fdList = $("#right-top-log-in, #change-style, #foot, #head, #headPlay, #playlist-container, .numbers-of-recos, .reco, .to-be-executed");
	let $stars = $(".my-point>.stars-container");
	$stars.off("click.mdInStars");
	$stars.on("click.mdInStars", m.starsOnClick);
	$stars.off("mousedown.mdInStars touchstart.mdInStars");
	m.$html.off("mouseup.mdInStars touchend.mdInStars mousemove.mdInStars touchmove.mdInStars");
	$stars.on("mousedown.mdInStars touchstart.mdInStars", function (e) {
		let { $str, uri, $result, $reco } = m.starsOnTouchMove(e);
		m.$html.on("mouseup.mdInStars touchend.mdInStars", function (e) {
			e.preventDefault();
			e.stopPropagation();
			m.$html.off("mouseup.mdInStars touchend.mdInStars mousemove.mdInStars touchmove.mdInStars");
			m.timeout[uri] = setTimeout(function () {
				m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
			}, m.wait);
		});
	});
	const $ups = $(".my-point>.up");
	const $downs = $(".my-point>.down");
	$ups.off("click.ud");
	$downs.off("click.ud");
	$ups.on("click.ud", m.starsOnUpClick);
	$downs.on("click.ud", m.starsOnDownClick);
	m.reNewFSsOn();
};

m.pathname = m.initialPathname;
if (m.initialPathname === "/reco") {
	m.newRecoOn = true;
}
if (m.initialPathname.substring(0, 6) !== "/user/") {
	// e.g. path=/ or /reco?... or /account/log-in with sessionPassed
	m.pathname = "/user/" + m.myId;
}

m.pathnameSplit = m.pathname.split("/");
if (m.userId !== decodeURIComponent(m.pathnameSplit[2])) {
	console.log(
		`Error: userId is not matched.: ${m.userId}!==${decodeURIComponent(m.pathnameSplit[2])}`
	);
}

m.myPage = m.myIndex === m.userIndex;
m.userPath = `/user/${encodeURIComponent(m.userId)}`;
m.recoMode =
	m.pathnameSplit[3] === "mode" && m.pathnameSplit[4]
		? m.pathnameSplit[4]
		: "";

m.hashURI = m.initialHashURI;
if (m.initialHashURI > 0) {
	let ampIndex = m.initialHashURI.indexOf("&");
	if (ampIndex >= 0) {
		m.hashURI = m.initialHashURI = m.initialHashURI.substring(0, ampIndex);
	}
	m.hashURI = decodeURIComponent(m.initialHashURI.replace(/\+/g, "%20"));
}

m.searchVars = m.getSearchVars(m.initialSearch);
m.currentCat = m.searchVars.cat?.val ?? "";
$("head").append(
	`<link rel="canonical" href="https://recoeve.net${m.pathOfCat(m.currentCat)}" />`
);
for (let prop in m.searchVars) {
	m.args[m.searchVars[prop].key] = m.searchVars[prop].val;
}
if (m.args.cat) {
	delete m.args.cat;
}
if (m.args.lang) {
	delete m.args.lang;
}

m.lang = null;
if (m.searchVars?.lang) {
	m.lang = m.searchVars.lang.val;
	m.docCookies.setItem("lang", m.lang, Infinity, "/", false, true);
}
else if (m.docCookies.hasItem("lang")) {
	m.lang = m.docCookies.getItem("lang");
}

////////////////////////////////////////////
// Main codes
////////////////////////////////////////////
m.kakaoTries = 0;
m.kakaoInitDo = function () {
	if (typeof Kakao !== "undefined" || m.kakaoTries++ > 15) {
		clearInterval(m.kakaoInit);
		if (!Kakao.isInitialized()) {
			Kakao.init("f076e37310bc101c5c50c9e2714b59ca");
		}
	}
};
m.kakaoInit = setInterval(m.kakaoInitDo, 2 * m.wait);

//////////////////////////////////////
// Fuzzy search on Cat :: Initialize m.fsCat, m.fsMRCat, m.fsGotoCats
//////////////////////////////////////
m.catListToHTML = function () {
	return new Promise(async function (resolve, reject) {
		let cL = m.catList;
		let cat = cL[0].cat;
		let catListHTML = `<div id="cat-" key="cat-" class="cat${m.fsGotoCats?.fullList[cat]?.selected ? " selected" : ""}" style="margin-left:0em"><span key="EC-" class="noEC"></span><a key="baseCat-" class="baseCat${m.fsGotoCats?.fullList[cat]?.down ? " down" : ""}"><span key="list-id-" class="list-index-id"></span>[--Uncategorized--]</a></div>`;
		let i = 1;
		for (; i < cL.length - 1; i++) {
			cat = cL[i].cat;
			let beforeDepth = cL[i - 1].depth;
			let currentDepth = cL[i].depth;
			let afterDepth = cL[i + 1].depth;
			if (beforeDepth < currentDepth) {
				// open subCat
				catListHTML += `<div key="subCat-${encodeURIComponent(cat)}" class="subCat" style="display:${cL[cat].subCatExpanded ? "block" : "none"}">`;
			}
			else {
				for (let j = currentDepth; j < beforeDepth; j++) {
					// close subCats
					catListHTML += `</div>`;
				}
			}
			catListHTML += `<div id="cat-${encodeURIComponent(cat)}" key="cat-${encodeURIComponent(cat)}" class="cat${m.fsGotoCats?.fullList[cat]?.selected ? " selected" : ""}" style="margin-left:${cL[i]?.depth}em">`;
			if (currentDepth < afterDepth) {
				catListHTML += `<span key="EC-${encodeURIComponent(cat)}" class="EC" onclick="m.ExpCol(this,m.catList['${cat}'])">${cL[i].subCatExpanded ? "▼" : "▶"}</span>`;
			}
			else {
				catListHTML += `<span key="EC-${encodeURIComponent(cat)}" class="noEC"></span>`;
			}
			catListHTML += `<a key="baseCat-${encodeURIComponent(cat)}" class="baseCat${m.fsGotoCats?.fullList[cat]?.down ? " down" : ""}"><span key="list-id-${encodeURIComponent(cat)}" class="list-index-id">${m.escapeOnlyTag(cat)}</span>${m.escapeOnlyTag(cL[i].baseCat)}</a></div>`;
		}
		if (cL.length > 1) {
			cat = cL[i].cat;
			let beforeDepth = cL[i - 1].depth;
			let currentDepth = cL[i].depth;
			if (beforeDepth < currentDepth) {
				// open subCat
				catListHTML += `<div key="subCat-${encodeURIComponent(cat)}" class="subCat" style="display:${cL[cat].subCatExpanded ? "block" : "none"}">`;
			}
			else {
				for (let j = currentDepth; j < beforeDepth; j++) {
					// close subCats
					catListHTML += `</div>`;
				}
			}
			catListHTML += `<div id="cat-${encodeURIComponent(cat)}" key="cat-${encodeURIComponent(cat)}" class="cat${m.fsGotoCats?.fullList[cat]?.selected ? " selected" : ""}" style="margin-left:${cL[i].depth}em"><span key="EC-${encodeURIComponent(cat)}" class="noEC"></span><a key="baseCat-${encodeURIComponent(cat)}" class="baseCat${m.fsGotoCats?.fullList[cat]?.down ? " down" : ""}"><span key="list-id-${encodeURIComponent(cat)}" class="list-index-id">${m.escapeOnlyTag(cat)}</span>${m.escapeOnlyTag(cL[i].baseCat)}</a></div>`;
			for (let j = 0; j < currentDepth; j++) {
				// close subCats
				catListHTML += `</div>`;
			}
		}
		m.$catList.html(catListHTML);
		resolve();
	});
};

m.putCatToFSFullList = function (i, cat, catList) {
	if (catList === m.myFSCatList) {
		if (!m.fsCat.fullList[cat]) {
			m.fsCat.fullList[i] = m.fsCat.fullList[cat] = { i, txt: m.splitHangul(cat), cat, html: m.escapeOnlyTag(cat) };
		}
		else {
			m.fsCat.fullList[i] = m.fsCat.fullList[cat];
		}
		if (!m.fsMRCat.fullList[cat]) {
			m.fsMRCat.fullList[i] = m.fsMRCat.fullList[cat] = { i, txt: m.splitHangul(cat), cat, html: m.escapeOnlyTag(cat) };
		}
		else {
			m.fsMRCat.fullList[i] = m.fsMRCat.fullList[cat];
		}
	}
	else if (catList === m.catList) {
		if (!m.fsGotoCats.fullList[cat]) {
			m.fsGotoCats.fullList[i] = m.fsGotoCats.fullList[cat] = { i, txt: m.splitHangul(cat), cat, html: m.escapeOnlyTag(cat) };
		}
		else {
			m.fsGotoCats.fullList[i] = m.fsGotoCats.fullList[cat];
		}
	}
};
m.completeCat = function (event) {
	let $elem = $(event.target);
	let cat = m.unescapeHTML($elem.find(".list-index-id").html());
	let fs = m.fsCat;
	fs.$fsLis = fs.$fsl.find(".list-item");
	fs.$fsLis.removeClass("selected");
	$elem.addClass("selected");
	let k = fs.k;
		// index of cat on sEnd.
	fs.catsSplit[k] = cat;
	fs.$fs[0].value = fs.catsSplit.join(";");
	let sStart = 0;
	for (let i = 0; i < k; i++) {
		sStart += fs.catsSplit[i].length + 1;
	}
	let sEnd = sStart + fs.catsSplit[k].length;
	fs.$fs.trigger("focus");
	fs.$fs[0].setSelectionRange(sEnd, sEnd);
};
m.completeMRCat = function (event) {
	let $elem = $(event.target);
	let cat = m.unescapeHTML($elem.find(".list-index-id").html());
	let fs = m.fsMRCat;
	fs.$fsLis = fs.$fsl.find(".list-item");
	fs.$fsLis.removeClass("selected");
	$elem.addClass("selected");
	let k = fs.k;
		// index of cat on sEnd.
	fs.catsSplit[k] = cat;
	m.$multireco_input_cats[0].value = fs.catsSplit.join(";");
	let sStart = 0;
	for (let i = 0; i < k; i++) {
		sStart += fs.catsSplit[i].length + 1;
	}
	let sEnd = sStart + fs.catsSplit[k].length;
	m.$multireco_input_cats.trigger("focus");
	m.$multireco_input_cats[0].setSelectionRange(sEnd, sEnd);
};
})(window.m, jQuery);
