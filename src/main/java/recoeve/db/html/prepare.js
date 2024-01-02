window.m = window.m || {};
(function (m, $, undefined) {
	// user-page.html, log-in.html, changePwd.html
	$window = $(window);
	$document = $(document);

	window.awaitAll = async function (promises) {
		const results = await Promise.all(promises);
		return results;
	}

	m.getSearchVars = function (searchStr) {
		let vars = [];
		if (searchStr !== null && searchStr !== undefined && searchStr.constructor === String && searchStr.length !== 0) {
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

	m.pathOfCat = function (cat, mode, lang, hashURI, args) {
		let argsSearch = "";
		if (args) {
			for (const prop in args) {
				argsSearch += `&${prop}=${encodeURIComponent(args[prop])}`;
			}
		}
		return `${m.userPath}${mode ? `/mode/${mode}` : ''}?${(cat !== null && cat !== undefined) ? `cat=${encodeURIComponent(cat)}` : ""}${argsSearch}${lang ? `&lang=${lang}` : ""}${hashURI ? `#${encodeURIComponent(hashURI)}` : ""}`;
	};
	m.pathOfNeighbor = function (user_id, cat, mode, lang, hashURI, args) {
		let argsSearch = "";
		if (args) {
			for (const prop in args) {
				argsSearch += `&${prop}=${args[prop]}`;
			}
		}
		return `/user/${user_id}${mode ? `/mode/${mode}` : ''}?${(cat !== null && cat !== undefined) ? `cat=${encodeURIComponent(cat)}` : ""}${argsSearch}${lang ? `&lang=${lang}` : ""}${hashURI ? `#${encodeURIComponent(hashURI)}` : ""}`;
	};
	m.pathOfRecoStat = function (uri, lang, hash, args) {
		let argsSearch = "";
		if (args) {
			for (const prop in args) {
				argsSearch += `&${prop}=${encodeURIComponent(args[prop])}`;
			}
		}
		return `/recostat?uri=${encodeURIComponent(uri)}${argsSearch}${lang ? `&lang=${lang}` : ""}${hash ? `#${encodeURIComponent(hash)}` : ""}`
	}

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
	m.expire = 365 * 24 * 60 * 60; // max-age in seconds.
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

	m.saveSSN = function () {
		if (m.docCookies.hasItem("salt")) {
			m.saltSSN = m.docCookies.getItem("salt");
			m.docCookies.removeItem("salt", "/", false, true);
		}
		if (m.docCookies.hasItem("session")) {
			m.session = m.docCookies.getItem("session");
			m.docCookies.removeItem("session", "/", false, true);
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
			a = q; // a=a*b;
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
		let a = 131; // 31 131 1313 13131 131313 etc..
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
		if (!str || str.constructor !== String) { return ""; }
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	};
	m.escapeOnlyTag = function (str) {
		if (!str || str.constructor !== String) { return ""; }
		return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	};
	m.unescapeHTML = function (str) {
		if (!str || str.constructor !== String) { return ""; }
		return str.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
	};
	m.escapeAMP = function (str) {
		if (!str || str.constructor !== String) { return ""; }
		return str.replace(/%/g, '%25').replace(/&/g, '%26').replace(/#/g, '%23');
	};
	m.unescapeAMP = function (str) {
		if (!str || str.constructor !== String) { return ""; }
		return str.replace(/%23/g, '#').replace(/%26/g, '&').replace(/%25/g, '%');
	};
	m.escapeEncodePctg = function (str) {
		if (!str || str.constructor !== String) { return ""; }
		return str.replace(/([\!\@\#\$\%\^\&\*\(\)\[\]\{\}\_\<\>\,\.\/\?\~])/g, "\\$1");
	};

	////////////////////////////
	// String to Array
	////////////////////////////
	m.encloseStr = function (str) {
		if (!str || str.constructor !== String) { return ''; }
		if (str.charAt(0) === '"' || /[\n\t]/.test(str)) {
			return `"${str.replace(/"/g, '""')}"`;
		} return str;
	};
	m.strToJSON = function (str, colMap = true, rowMap = false) {
		if (!str || str.constructor !== String) {
			return Promise.resolve(str);
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
		return Promise.resolve(ret);
	};
	m.csvToJSON = function (str, colMap = true, rowMap = false) {
		if (!str || str.constructor !== String) {
			return Promise.resolve(str);
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
		return Promise.resolve(rows);
	};
	m.arrayToTableHTML = function (txtArray) {
		let tableStr = "<table>";
		for (let row = 0; row < txtArray.length; row++) {
			tableStr += "<tr>";
			for (let col = 0; col < txtArray[row].length; col++) {
				tableStr += `<td>${txtArray[row][col].replace(/\n/g, '<br>')}</td>`;
			}
			tableStr += "</tr>";
		}
		tableStr += "</table>";
		return tableStr;
	};
	m.JSONtoStr = function (JSON) {
		let res = m.encloseStr(JSON[0][0]);
		for (let j = 1; j < JSON[0].length; j++) {
			res += "\t" + m.encloseStr(JSON[0][j]);
		}
		for (let i = 1; i < JSON.length; i++) {
			res += "\n" + m.encloseStr(JSON[i][JSON[0][0]]);
			let jMax = JSON[0].length < JSON[i].length ? JSON[0].length : JSON[i].length;
			for (let j = 1; j < jMax; j++) {
				res += "\t" + m.encloseStr(JSON[i][JSON[0][j]]);
			}
		}
		return Promise.resolve(res);
	};
	m.JSONtoStrRev = function (JSON) {
		let res = m.encloseStr(JSON[0][0]);
		for (let j = 1; j < JSON[0].length; j++) {
			res += "\t" + m.encloseStr(JSON[0][j]);
		}
		for (let i = JSON.length - 1; i > 0; i--) {
			res += "\n" + m.encloseStr(JSON[i][JSON[0][0]]);
			let jMax = JSON[0].length < JSON[i].length ? JSON[0].length : JSON[i].length;
			for (let j = 1; j < jMax; j++) {
				res += "\t" + m.encloseStr(JSON[i][JSON[0][j]]);
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
		let n = arr.length;
		for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
			m.heapify(arr, key, sorted, n, i);
		}
		if (upto) {
			upto = upto > n ? n : upto;
		}
		else {
			upto = n;
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

	////////////////////////////////////////////////////
	// Delayed Loading.
	////////////////////////////////////////////////////
	m.delayPad = 512;
	m.wait = 1024;
	m.$delayedElems = $("[delayed-src], [delayed-bgimage], .to-be-executed");
	m.previous = Date.now();
	$.fn.inView = function () {
		if (this.is(":visible")) {
			let viewportHeight = window.innerHeight;
			let scrollTop = $window.scrollTop();
			let elemTop = this.offset().top - m.delayPad;
			let elemBottom = elemTop + this.height() + m.delayPad;
			return (scrollTop + viewportHeight >= elemTop) && (scrollTop <= elemBottom);
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
			// MathJax Process TODO: update MathJax
			// if (typeof MathJax!=='undefined'&&this.is(".MathJax_Preview")) {
			// 	MathJax.Hub.Queue(["Process", MathJax.Hub, this.next()[0]]);
			// 	done=true;
			// }
		}
		return done;
	};
	m.delayedLoadAll = function () {
		m.$delayedElems.each(function () {
			if ($(this).delayedLoad()) {
				m.$delayedElems = m.$delayedElems.not(this);
			}
		});
		if (m.$delayedElems.length > 0) {
			$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
		}
		else {
			$window.off("scroll.delayedLoad");
		}
		m.previous = Date.now();
	};
	m.delayedLoadByScroll = function () {
		$window.off("scroll.delayedLoad");
		let now = Date.now();
		let passed = now - m.previous;
		if (passed > m.wait) {
			m.delayedLoadAll();
		}
		else {
			m.delayedLoadSetTimeout = setTimeout(function () {
				m.delayedLoadAll();
			}, m.wait * 1.5 - passed);
		}
	};
	$window.on("scroll.delayedLoad", m.delayedLoadByScroll);

	/* Remember user */
	m.sW = screen.width;
	m.sH = screen.height;
	if (m.sW < m.sH) {
		m.sW = screen.height;
		m.sH = screen.width;
	}
	m.str_rmb_me = `log	sW	sH
web	${m.sW}	${m.sH}`;
	m.rmb_me = function (callback, args, saveNewRecoInputs) {
		return new Promise(function (resolve, reject) {
			if (saveNewRecoInputs) {
				m.localStorage.setItem("uri", m.formatURI($input_uri[0].value));
				m.localStorage.setItem("title", m.formatTitle($input_title[0].value.trim()));
				m.localStorage.setItem("cats", m.formatCats($input_cats[0].value.trim()));
				m.localStorage.setItem("desc", $input_desc[0].value.trim());
				m.localStorage.setItem("cmt", $input_cmt[0].value.trim());
				m.localStorage.setItem("points", $input_val[0].value.trim());
			}
			let SSNencrypt = function (callback, args) {
				$.ajax({
					type: "GET", url: "/sessionIter"
					, dataType: "text"
				}).done(function (resp) {
					console.log("sessionIter: ", resp);
					let iter = Number(resp);
					if (isNaN(iter)) {
						callback(args, resp);
						resolve();
					}
					else {
						m.docCookies.setItem("SSN", m.encrypt(m.saltSSN, m.session.substring(3, 11), iter), 3, "/", false, true);
						callback(args, null); // null means no error.
						// m.localStorage.clear();
						resolve();
						// m.docCookies.removeItem("SSN", "/", false, true);
					}
				});
			};
			if (m.docCookies.hasItem('tCreate')) {
				if (m.docCookies.hasItem("salt") || m.docCookies.hasItem("session")) {
					m.saveSSN();
				}
				if (m.saltSSN && m.session) {
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
							if (m.saltSSN && m.session) {
								SSNencrypt(callback, args);
							}
							else {
								callback(args, resp);
								resolve();
							}
						}
						else {
							callback(args, resp);
							resolve();
						}
					}, 1024);
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
		res.pCho = []; // position of word-start or 초성
		let p = 0;
		res.pCho[p] = true;
		if (!str || str.constructor !== String) {
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
		if (!fs.shuffledOnce) {
			if (ptnSH.splitted === fs[0].ptnSH.splitted) {
				return fs[0];
			}
			else if (ptnSH.splitted.indexOf(fs[0].ptnSH.splitted) >= 0) {
				fs[1] = fs[0];
			}
			else if (fs[1] && ptnSH.splitted.indexOf(fs[1].ptnSH.splitted) >= 0) {
				if (ptnSH.splitted === fs[1].ptnSH.splitted) {
					return fs[1];
				}
			}
			else {
				fs[1] = null;
			}
		}
		let list = [];
		if (fs.shuffledOnce && fs.shuffled && fs.shuffled.length > 0) {
			let shuffled = fs.shuffled;
			for (let i = shuffled.length - 1; i >= 0; i--) { // Newest bottom to the top. Max index to the top.
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
			for (let i = fs.fullList.length - 1; i >= 0; i--) { // Newest bottom to the top. Max index to the top.
				list.push(fs.fullList[i]);
			}
			if (fs === m.fsGo && fs.shuffledOnce) {
				for (let i = fs.fullList.length - 1; i >= 0; i--) { // Newest bottom to the top. Max index to the top.
					let uri = fs.fullList[i].uri;
					if (!fs.fullList[uri].catAndI) {
						fs.fullList[uri].catAndI = {};
					}
					fs.fullList[uri].catAndI[m.currentCat] = { cat: m.currentCat, i: m.fsToRs.fullList[uri]?.i ?? m.fsToRs.fullList.length - 1 }
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
					let indicesMMS = []; // indices of max match score
					for (let p = 0; p < indices.length; p++) {
						indicesMMS[p] = indices[p]; // hard copy of indices
					}
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
									indicesMMS = [];
									for (let p = 0; p < indices.length; p++) {
										indicesMMS[p] = indices[p]; // hard copy of indices
									}
								}
								k = indices.length - 2;
							}
							else {
								k--;
							}
						}
					}
					else {
						// Reverse match and compare only two results.
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
			// sorted[i]=fs[0].length-1-i;
			// sorted[i]=i;
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
		return fs[0];
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
		if (m.listPlayFrom === "youtube") {
			m.YtPlayer.seekTo(secondToSeek, true);
		}
		else if (m.listPlayFrom === "video") {
			$("#video").fastSeek(secondToSeek);
		}
	}
	m.cueOrLoadUri = function (cue, uriRendered, inListPlay) {
		if (inListPlay) {
			let fs = m.fsToRs;
			let from = String(uriRendered.from);
			m.listPlayFrom = from;
			if (from === "youtube") {
				$eveElse.html('');
				$eveElse_uri_rendered.hide();
				$rC_youtube_uri_rendered.show();
				fs.$playing = $rC_youtube_uri_rendered;
				console.log(`fs.lastIndex: ${fs.lastIndex}, fs.currentIndex: ${fs.currentIndex}\nm.lastCat: ${m.lastCat}, m.currentCat: ${m.currentCat}\ninListPlay: ${inListPlay}`);
				if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat) {
					if (m.YtPlayer) {
						let config = {
							videoId: uriRendered.videoId
							, playerVars: {}
						};
						let descR = m.userRecos[m.unescapeHTML($reco_playing.find(".reco>.textURI"))]?.descR;
						if (descR) {
							if (descR["#start"]?.val) {
								config.playerVars.start = m.timeToSeconds(descR["#start"].val.trim());
							}
							if (descR["#end"]?.val) {
								config.playerVars.end = m.timeToSeconds(descR["#end"].val.trim());
							}
						}
						if (cue && m.YtPlayer.cueVideoById) {
							m.YtPlayer.cueVideoById(config);
							fs.lastIndex = fs.currentIndex;
							m.lastCat = m.currentCat;
						}
						else if (m.YtPlayer.loadVideoById) {
							m.YtPlayer.loadVideoById(config);
							fs.lastIndex = fs.currentIndex;
							m.lastCat = m.currentCat;
						}
						else {
							clearTimeout(m.setTimeoutGetAndPlayVideo);
							m.setTimeoutGetAndPlayVideo = setTimeout(function () {
								fs.getAndPlayVideo(cue, inListPlay);
							}, m.wait);
							return;
						}
					}
					else if (YT?.Player) {
						m.YtPlayer = new YT.Player('youtube', {
							videoId: uriRendered.videoId, events: {
								'onError': function (e) {
									if (fs.skip) {
										clearTimeout(m.setTimeoutPlayListYT);
										m.setTimeoutPlayListYT = setTimeout(function () {
											if (fs.skip) { fs.playNext(); }
										}, 4 * m.wait);
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
								}
							}
						});
						fs.lastIndex = fs.currentIndex;
						m.lastCat = m.currentCat;
					}
					else {
						fs.prepareRecoListPlay(true);
					}
				}
			}
			else if (from === "video") {
				$youtube.html('');
				$eveElse_uri_rendered.show();
				$rC_youtube_uri_rendered.hide();
				fs.$playing = $eveElse_uri_rendered;
				if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat) {
					let descR = m.userRecos[m.unescapeHTML($reco_playing.find(".reco>.textURI"))]?.descR;
					let config = {
						videoId: uriRendered.src
					};
					if (descR) {
						if (descR["#start"]?.val) {
							config.start = m.timeToSeconds(descR["#start"].val.trim());
						}
						if (descR["#end"]?.val) {
							config.end = m.timeToSeconds(descR["#end"].val.trim());
						}
						if (config.start || config.end) {
							config.hash = `#${config.start ? config.start : "0"}${config.end ? `, ${config.end}` : ""}`;
						}
					}
					$eveElse.replaceWith(m.rC(`<video id="video" controls preload="auto" src="${uriRendered.src}${config.hash ? config.hash : ""}"></video>`, (inListPlay && m.fsToRs.fixed ? "fixed eveElse" : "eveElse"), "eveElse"));
					fs.lastIndex = fs.currentIndex;
					m.lastCat = m.currentCat;
				}
				$eveElse = $("#eveElse");
				$video = $("#video");
				$video.on("ended", function () {
					if (fs.oneLoop) {
						$video[0].play();
					}
					else {
						fs.playNext();
					}
				});
				if (!cue) {
					$video[0].play();
				}
			}
			else {
				fs.pauseVideo();
				$youtube.html('');
				$eveElse_uri_rendered.show();
				$rC_youtube_uri_rendered.hide();
				fs.$playing = $eveElse_uri_rendered;
				if (fs.lastIndex !== fs.currentIndex || m.lastCat !== m.currentCat) {
					$eveElse.html(uriRendered.html);
					fs.lastIndex = fs.currentIndex;
					m.lastCat = m.currentCat;
				}
				if ((!cue) && fs.skip) {
					clearTimeout(m.setTimeoutPlayList);
					m.setTimeoutPlayList = setTimeout(function () {
						if (fs.skip) {
							fs.playNext(-1, false);
						}
					}, 17 * m.wait);
				}
			}
		}
	};

	////////////////////////////////////////////////////
	// URI rendering :: http link itself, videos, images, maps.
	////////////////////////////////////////////////////
	m.ptnURI = [];
	m.ptnURL = /^https?:\/\/\S+/i;
	m.ptnFILE = /^file:\/\/\/\S+/i;
	m.ptnTag = /^<\w+[\s\S]+>/i;
	m.ptnVal = /^([0-9]+(?:\.[0-9]+)?)\/([0-9]+(?:\.[0-9]+)?)$/;

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
	m.formatURI = function (uri) {
		if (uri && uri.constructor === String) {
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
				} catch (err) {
					console.log(err);
				}
			}
			exec = m.ptnPureNumber.exec(uri);
			if (exec !== null) {
				uri = "Number: " + uri;
			}
			return m.unescapeHTML(uri).trim();
		}
		return "";
	};
	m.formatTitle = function (title) {
		return title.trim().replace(/[\t\r\n]/g, " ");
	};
	m.formatCats = function (cats) {
		if (!cats || cats.constructor !== String || cats.trim().length === 0) {
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
		let setOfCats0 = [];
		for (let i = 0; i < cats0Split.length; i++) {
			setOfCats0[cats0Split[i]] = true;
		}
		let contains = true;
		for (let i = 0; i < cats1Split.length; i++) {
			contains = contains && setOfCats0[cats1Split[i]];
			if (!contains) {
				break;
			}
		}
		return contains;
	};

	m.uriToA = function (uri) {
		if (!uri || uri.constructor !== String) { return ""; }
		let exec = m.ptnURL.exec(uri);
		if (exec !== null) {
			return `<a target="_blank" href="${exec[0]}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a>`;
		}
		else {
			exec = m.ptnFILE.exec(uri);
			if (exec !== null) {
				return `<a target="_blank" href="${exec[0]}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a>`;
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
	m.YTiframe = function (v, inListPlay, config) {
		return m.rC(`<iframe delayed-src="https://www.youtube.com/embed/${v}?origin=https%3A//recoeve.net${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null));
	};

	let ptnURI;
	ptnURI = m.ptnURI["www.youtube.com"] = m.ptnURI["youtube.com"] = m.ptnURI["youtu.be"] = m.ptnURI["m.youtube.com"] = {};
	ptnURI.regEx = /^(?:watch|embed|live|shorts)?\/?([\w\-]+)?(\?\S+)?/i;
	ptnURI.regEx1 = /^([\w\-]+)(\?\S+)?/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA, descR) {
		return new Promise(function (resolve, reject) {
			let config = {};
			if (descR) {
				if (descR["#start"]?.val) {
					config.start = m.timeToSeconds(descR["#start"].val.trim());
				}
				if (descR["#end"]?.val) {
					config.end = m.timeToSeconds(descR["#end"].val.trim());
				}
			}
			let exec = m.ptnURI["www.youtube.com"].regEx.exec(uriRest);
			if (exec !== null) {
				let vars = null;
				if (exec[2]) { vars = m.getSearchVars(exec[2]); }
				let v = null;
				if (exec[1]) {
					v = exec[1];
				}
				if (vars?.v?.val) {
					v = vars.v.val;
				}
				if (v) {
					let list = vars?.list?.val;
					return resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}">https://www.youtube.com/watch?v=${v}${config.start ? `&start=${config.start}` : ""}${config.end ? `&end=${config.end}` : ""}${list ? `&list=${list}` : ""}</a><br>` : "") + m.YTiframe(v, inListPlay, config), from: "youtube", videoId: v, list });
				}
			}
			else {
				exec = m.ptnURI["youtu.be"].regEx1.exec(uriRest);
				if (exec !== null) {
					let v = exec[1];
					let vars = null;
					let list = null;
					if (exec[2]) {
						vars = m.getSearchVars(exec[2]);
						if (vars?.list?.val) {
							list = vars.list.val;
						}
						if (vars?.v?.val) {
							v = vars.v.val;
						}
					}
					return resolve({ html: (toA ? `<a target="_blank" href="https://www.youtube.com/watch?v=${v}${list ? `&list=${list}` : ""}">https://www.youtube.com/watch?v=${v}${list ? `&list=${list}` : ""}</a><br>` : "") + m.YTiframe(v, inListPlay, config), from: "youtube", videoId: v, list });
				}
			}
			return reject(false);
		});
	};

	ptnURI = m.ptnURI["docs.google.com"] = {};
	ptnURI.regEx = /^spreadsheets\/d\/e\/([\w\-]+)\/pubhtml/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["docs.google.com"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml">https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml</a><br>` : "") + m.rC(`<iframe delayed-src="https://docs.google.com/spreadsheets/d/e/${exec[1]}/pubhtml?widget=true&headers=false" frameborder="0" scrolling="auto"></iframe>`), from: "docs-google", docId: exec[1] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI["instagram.com"] = m.ptnURI["www.instagram.com"] = {};
	ptnURI.regEx = /^(?:p|tv|reel)\/([\w\-]+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["instagram.com"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://www.instagram.com/p/${exec[1]}/">https://www.instagram.com/p/${exec[1]}/</a><br>` : "") + m.rC(`<div class="center"><iframe delayed-src="https://www.instagram.com/p/${exec[1]}/embed" frameborder="0" scrolling="auto" allowtransparency="true"></iframe></div>`, "instagram", null, true), from: "instagram", imgId: exec[1] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI["imgur.com"] = m.ptnURI["www.imgur.com"] = {};
	ptnURI.regEx = /^a\/([\w\-]+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["imgur.com"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://imgur.com/a/${exec[1]}">https://imgur.com/a/${exec[1]}</a><br>` : "") + m.rC(`<div class="center"><iframe delayed-src="https://imgur.com/a/${exec[1]}/embed?pub=true&context=false" frameborder="0" scrolling="auto" allowtransparency="true"></iframe></div>`, "imgur", null, true), from: "imgur", imgId: exec[1] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI["www.tiktok.com"] = {};
	ptnURI.regEx = /^@(\S+)\/video\/([0-9]+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["www.tiktok.com"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://www.tiktok.com/@${exec[1]}/video/${exec[2]}">https://www.tiktok.com/@${exec[1]}/video/${exec[2]}</a><br>` : "") + m.rC(`<div class="center"><iframe sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin" delayed-src="https://www.tiktok.com/embed/v2/${exec[2]}?referrer=${encodeURIComponent(window.location.href)}" frameborder="no" scrolling="auto"></iframe></div>`, "tiktok", null, true), from: "tiktok", userId: exec[1], videoId: exec[2] });
			}
			else {
				return reject(false);
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
					type: "POST", url: "https://recoeve.net/BlogStat/getFullURI", data: shortURI, dataType: "text"
				}).fail(function (resp) {
					resolve(resp);
					// throw new Error("Failed to expand TikTok URL");
				}).done(async function (resp) {
					let uriRendered = await uriRendering(resp, toA, inListPlay);
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
				return resolve({ html: (toA ? `<a target="_blank" href="https://serviceapi.rmcnmv.naver.com/${exec[0]}">https://serviceapi.rmcnmv.naver.com/${exec[0]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://serviceapi.rmcnmv.naver.com/${exec[0]}" frameborder="no" scrolling="auto" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "naver", videoId: exec[0] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI["tv.naver.com"] = {};
	ptnURI.regEx = /^(?:v|embed)\/([0-9]+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["tv.naver.com"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://tv.naver.com/v/${exec[1]}">https://tv.naver.com/v/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://tv.naver.com/embed/${exec[1]}?autoPlay=false" frameborder="no" scrolling="auto" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "naver", videoId: exec[1] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI["weverse.io"] = {};
	ptnURI.regEx = /^(\S+)\/artist\/([0-9\-]+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["weverse.io"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://weverse.io/${exec[1]}/artist/${exec[2]}">https://weverse.io/${exec[1]}/artist/${exec[2]}</a><br>` : "") + m.rC(`<iframe src="https://weverse.io/${exec[1]}/artist/${exec[2]}" frameborder="no" scrolling="auto" marginwidth="0" marginheight="0" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "weverse", singer: exec[1], videoId: exec[2] });
			}
			else {
				return reject(false);
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
				return resolve({ html: (toA ? `<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" frameborder="0" scrolling="auto" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "kakao", videoId: exec[1] });
			}
			else {
				exec = m.ptnURI["entertain.daum.net"].regEx1.exec(uriRest);
				if (exec !== null) {
					return resolve({ html: (toA ? `<a target="_blank" href="https://tv.kakao.com/v/${exec[1]}">https://tv.kakao.com/v/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://play-tv.kakao.com/embed/player/cliplink/${exec[1]}" frameborder="0" scrolling="auto" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "kakao", videoId: exec[1] });
				}
				else {
					return reject(false);
				}
			}
		});
	};

	ptnURI = m.ptnURI["tvpot.daum.net"] = {};
	ptnURI.regEx = /^v\/([\w\-]+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["tvpot.daum.net"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://tvpot.daum.net/v/${exec[1]}">https://tvpot.daum.net/v/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://videofarm.daum.net/controller/video/viewer/Video.html?vid=${exec[1]}${exec[1].length < 15 ? '$' : ''}&play_loc=undefined" frameborder="0" scrolling="auto"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "daum", videoId: exec[1] });
			}
			return reject(false);
		});
	};

	ptnURI = m.ptnURI["vimeo.com"] = {};
	ptnURI.regEx = /^([0-9]+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["vimeo.com"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://vimeo.com/${exec[1]}">https://vimeo.com/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://player.vimeo.com/video/${exec[1]}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "vimeo", videoId: exec[1] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI["www.dailymotion.com"] = {};
	ptnURI.regEx = /video\/(\w+)/i;
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["www.dailymotion.com"].regEx.exec(uriRest);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="https://www.dailymotion.com/video/${exec[1]}">https://www.dailymotion.com/video/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://www.dailymotion.com/embed/video/${exec[1]}" frameborder="0" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "dailymotion", videoId: exec[1] });
			}
			else {
				return reject(false);
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
				return resolve({ html: `<a target="_blank" href="https://namu.wiki/w/${pathname}">https://namu.wiki/w/${m.escapeOnlyTag(decodeURIComponent(pathname))}</a>`, from: "namu.wiki", pathname });
			}
			else {
				return reject(false);
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
				return resolve({ html: (toA ? `<a target="_blank" href="https://www.ted.com/${exec[1]}">https://www.ted.com/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://embed.ted.com/talks/${uriRest}" frameborder="0" scrolling="auto" allowfullscreen></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: "ted", videoId: v });
			}
			else {
				return reject(false);
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
				return resolve({ html: (toA ? `<a target="_blank" href="https://w.soundcloud.com/${exec[1]}">https://w.soundcloud.com/${exec[1]}</a><br>` : "") + m.rC(`<iframe delayed-src="https://w.soundcloud.com/${lastPath.substring(0, lastPath.length - 1)}" scrolling="auto" frameborder="no"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed soundcloud" : "soundcloud")), from: "soundcloud", videoId: vars?.url?.val });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI["gall.dcinside.com"] = {};
	ptnURI.regEx = /\/movie\/share_movie(\?\S+)/i;
	ptnURI.regEx1 = /\/poll\/vote(\?\S+)/i;
	https://gall.dcinside.com/board/poll/vote?no=710233
	ptnURI.toIframe = function (uriRest, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI["gall.dcinside.com"].regEx.exec(uriRest);
			if (exec !== null) {
				let vars = m.getSearchVars(exec[1]);
				let v = vars.no?.val;
				if (v) {
					return resolve({ html: (toA ? `<a target="_blank" href="https://gall.dcinside.com/board/movie/share_movie?no=${v}">https://gall.dcinside.com/board/movie/share_movie?no=${v}</a><br>` : "") + m.rC(`<iframe delayed-src="https://gall.dcinside.com/board/movie/share_movie?no=${v}" scrolling="auto" frameborder="no"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : "")), from: "dcinside", videoId: v });
				}
				else {
					return resolve({ html: `<a target="_blank" href="https://gall.dcinside.com/${uriRest}">https://gall.dcinside.com/${m.escapeOnlyTag(decodeURIComponent(uriRest))}</a>` });
				}
			}
			else {
				exec = m.ptnURI["gall.dcinside.com"].regEx1.exec(uriRest);
				if (exec !== null) {
					let vars = m.getSearchVars(exec[1]);
					let no = vars.no?.val;
					if (no) {
						return resolve({ html: (toA ? `<a target="_blank" href="https://gall.dcinside.com/board/poll/vote?no=${no}">https://gall.dcinside.com/board/poll/vote?no=${no}</a><br>` : "") + m.rC(`<iframe src="https://gall.dcinside.com/board/poll/vote?no=${no}" scrolling="auto"></iframe>`), from: "dcinside", voteId: no })
					}
				}
			}
			return reject(false);
		});
	};

	ptnURI = m.ptnURI[0] = {};
	ptnURI.regEx = /^(https?:\/\/\S+\.(?:jpg|jpeg|bmp|gif|png|webp|svg|tif))(?=$|\?|\s)/i;
	ptnURI.toIframe = function (uri, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI[0].regEx.exec(uri);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="${exec[1]}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br>` : "") + `<div class="center"><img delayed-src="${exec[1]}"/></div>`, from: 'image', src: exec[1] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI[1] = {};
	ptnURI.regEx = /^https?:\/\/\S+\.(?:mp4|ogg|webm|webp|avi)(?=$|\?|\s)/i;
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
					config.hash = `#${config.start ? config.start : "0"}${config.end ? `, ${config.end}` : ""}`;
				}
			}
			let exec = m.ptnURI[1].regEx.exec(uri);
			if (exec !== null) {
				return resolve({ html: (toA ? `<a target="_blank" href="${exec[0]}${config.hash ? config.hash : ""}">${m.escapeOnlyTag(decodeURIComponent(`${uri}${config.hash ? config.hash : ""}`))}</a><br>` : "") + m.rC(`<video controls preload="metadata" delayed-src="${exec[0]}${config.hash ? config.hash : ""}"></video>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: 'video', src: exec[0] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI[2] = {};
	ptnURI.regEx = /^https?:\/\/kr[\d]+\.sogirl\.so(\/\S*)?/i;
	ptnURI.regEx1 = /^https?:\/\/kr[\d]+\.sogirl\.co(\/\S*)?/i;
	ptnURI.toIframe = function (uri, inListPlay) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI[2].regEx.exec(uri);
			if (exec !== null) {
				return resolve({ html: `<a target="_blank" href="https://kr58.sogirl.so${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr58.sogirl.so${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr58.sogirl.so${exec[1] ? exec[1] : ""}`, from: 'sogirl', src: exec[1] });
			}
			else {
				exec = m.ptnURI[2].regEx1.exec(uri);
				if (exec !== null) {
					return resolve({ html: `<a target="_blank" href="https://kr58.sogirl.so${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr58.sogirl.so${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr58.sogirl.so${exec[1] ? exec[1] : ""}`, from: 'sogirl', src: exec[1] });
				}
				else {
					return reject(false);
				}
			}
		});
	};

	ptnURI = m.ptnURI[3] = {};
	ptnURI.regEx = /^https?:\/\/kr[\d]+\.topgirl\.co(\/\S*)?/i;
	ptnURI.toIframe = function (uri, inListPlay) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI[3].regEx.exec(uri);
			if (exec !== null) {
				return resolve({ html: `<a target="_blank" href="https://kr26.topgirl.co${exec[1] ? exec[1] : ""}">${m.escapeOnlyTag(decodeURIComponent(`https://kr26.topgirl.co${exec[1] ? exec[1] : ""}`))}</a>`, newURI: `https://kr26.topgirl.co${exec[1] ? exec[1] : ""}`, from: 'topgirl', src: exec[1] });
			}
			else {
				return reject(false);
			}
		});
	};

	ptnURI = m.ptnURI[4] = {};
	ptnURI.regEx = /^file:\/\/\/(\S+\.(?:jpg|jpeg|bmp|gif|png|webp|svg|tif))(?=$|\?|\s)/i;
	ptnURI.regEx1 = /^file:\/\/\/(\S+\.(?:mp4|ogg|webm|avi))(?=$|\?|\s)/i;
	ptnURI.regEx2 = /^file:\/\/\/(\S+\.(?:pdf|html|htm))(?=$|\?|\s)/i;
	ptnURI.toIframe = function (uri, inListPlay, toA) {
		return new Promise(function (resolve, reject) {
			let exec = m.ptnURI[4].regEx.exec(uri);
			let href = null;
			if (exec !== null) {
				href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
				uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
				return resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a>` + m.rC(`<div class="center"><img delayed-src="${href}"/></div>`, (inListPlay && m.fsToRs.fixed ? "fixed eveElse" : "eveElse")), from: 'file-image', src: href });
			}
			else {
				exec = m.ptnURI[4].regEx1.exec(uri);
				if (exec !== null) {
					href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
					uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
					return resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br>` + m.rC(`<video controls preload="metadata" delayed-src="${href}"></video>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: 'file-video', src: href });
				}
				else {
					exec = m.ptnURI[4].regEx2.exec(uri);
					if (exec !== null) {
						href = exec[1].replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
						uri = uri.replace(/\+/gi, "%20").replace(/%2B/gi, "%20");
						return resolve({ html: `<a target="_blank" href="${href}">${m.escapeOnlyTag(decodeURIComponent(uri))}</a><br>` + m.rC(`<iframe delayed-src="${href}"></iframe>`, (inListPlay && m.fsToRs.fixed ? "fixed" : null)), from: 'file-pdf', src: href });
					}
				}
				return reject(false);
			}
		});
	};

	window.uriRendering = function (uri, toA, inListPlay, descR) {
		return new Promise(async function (resolve, reject) {
			if (uri?.constructor === String) {
				if (uri.length > 6) {
					uri=m.unescapeHTML(uri);
					if (uri.substring(0, 4).toLowerCase() === "http") {
						let k = 4;
						if (uri.charAt(k).toLowerCase() === 's') {
							k++;
						}
						if (uri.substring(k, k + 3) === "://") {
							let uriAnalysed = new URL(uri);
							k += 3;
							let uriHost = uriAnalysed.host;
							let uriRest = uriAnalysed.pathname.substring(1) + uriAnalysed.search + uriAnalysed.hash;
							if (m.ptnURI[uriHost]) {
								try {
									let result = await m.ptnURI[uriHost]?.toIframe(uriRest, inListPlay, toA, descR);
									if (Boolean(result) !== false && (!result.list)) {
										return resolve(result);
									}
								}
								catch (error) {
									// continue.
								}
							}
						}
					}
					for (let i = 0; i < m.ptnURI.length; i++) {
						try {
							let result = await m.ptnURI[i].toIframe(uri, inListPlay, toA, descR); // img or video
							if (Boolean(result) !== false) {
								return resolve(result);
							}
						}
						catch (error) {
							// continue.
						}
					}
					if (toA) {
						return resolve({ html: m.uriToA(uri) });
					}
				}
				else {
					return resolve({ html: m.escapeOnlyTag(uri) });
				}
			}
			return resolve({ html: "" });
		});
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
	m.ptnDescCmt = /^#\S+/; // \w=[A-Za-z0-9_]
	m.renderStrDescCmt = function (str) {
		let res = [];
		let strSplitted = str.trim().split(/\n/g);
		for (let i = 0; i < strSplitted.length; i++) {
			strSplitted[i] = strSplitted[i];
		}
		let trimedStr = strSplitted.join("\n").trim();
		let trimedStrSplitted = trimedStr.split(/\n\n+/g);
		let k = 0;
		let key = "";
		let listOfValues = [];
		for (let i = 0; i < trimedStrSplitted.length; i++) {
			let match = trimedStrSplitted[i].match(/^#\S*/);
			if (match === null) {
				listOfValues.push(trimedStrSplitted[i]);
			}
			else {
				key = key.toLowerCase();
				res[k] = res[key] = { i: k, key, val: listOfValues.join("\n\n") };
				k++;
				key = match[0]
				listOfValues = [];
				let value0 = trimedStrSplitted[i].substring(match[0].length);
				if (value0) {
					listOfValues[0] = value0;
				}
			}
		}
		res[k] = res[key] = { i: k, key, val: listOfValues.join("\n\n") };
		return res;
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
			let valStr = ""; // $reco.find(".str").html();
			let uri = m.unescapeHTML($reco.find(".textURI").html());
			let strHeads = "uri\tdo\tval";
			let strContents = `${m.encloseStr(uri)}\toverwrite\t`; // Empty val.
			let r = m.myRecos[uri];
			let recoDef = m.recoDefs[uri];
			if (!r) {
				if (recoDef?.defTitles && recoDef.defTitles[0] && recoDef.defTitles[0][0]) {
					strHeads += "\ttitle";
					strContents += `\t${m.encloseStr(recoDef.defTitles[0][0])}`;
				}
				if (recoDef?.defDescs && recoDef.defDescs[0] && recoDef.defDescs[0][0]) {
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
	m.recomHTML = async function (r, inListPlay) {
		if (r?.has) {
			let recoHTML = await m.recoHTML(r, inListPlay, true, true);
			return String(recoHTML);
		}
		let recoDef = m.recoDefs[r?.uri];
		if (!recoDef) {
			await m.getMultiDefs(r?.uri);
		}
		let res = `<div class="reco recom"${inListPlay ? `` : ` id="recom-${m.recoms[m.currentCat][r?.uri]?.i}"`}>
<div class="edit button fRight" onclick="m.editOrRecoToMine(this, true)">+</div>
<div class="textURI">${m.escapeOnlyTag(r?.uri)}</div>
<div class="uri cBoth"><a class="button button-recostat" target="_blank" href="/recostat?uri=${encodeURIComponent(r?.uri)}">RecoStat</a>${m.uriToA(r?.uri)}</div>`;
		if (recoDef.defTitles[0] && recoDef.defTitles[0][0]) {
			res += `<div class="title">${m.escapeOnlyTag(recoDef.defTitles[0][0])}</div>`;
		}
		res += `<div class="cats">${m.catsToA(m.currentCat)}</div>`;
		if (!inListPlay) {
			let uriRendered = await uriRendering(r?.uri, false, inListPlay, r?.descR);
			res += String(uriRendered.html);
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
			res += `<div class="cBoth"></div><div class="my-point">${m.stars(0)} <span class="upDown up">&gt;</span> <span class="upDown down">&lt;</span> <span class="str"> </span></div>
<div class="cBoth button fLeft" style="margin:3em 0 1em" onclick="m.stashReco(event)">[--Stash--]</div>`;
		}
		res += `<div class="cBoth"></div><div class="result" style="margin:.5em 0"></div>`;
		if (recoDef.defDescs[0] && recoDef.defDescs[0][0]) {
			let descR = m.renderStrDescCmt(recoDef.defDescs[0][0]);
			res += `<div class="desc">`;
			for (let l = 0; l < descR.length; l++) {
				let key = m.escapeOnlyTag(descR[l].key);
				let val = m.escapeOnlyTag(descR[l].val);
				switch (key.toLowerCase()) {
					case "#start": case "#end": case "#": case "": default:
						res += `<div class="value">${key} ${val.replace(/\n/g, "<br>").replace(/\s+/g, " ").trim().replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`)}</div>`;
						break;
					case "#lyrics": case "#lyrics:":
					case "#lyric": case "#lyric:":
					case "#가사": case "#가사:":
						res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">▼ [--Toggle lyrics--]</div></div>
<div class="lyricsC" style="display:none">
	<div class="lyricsArrow"></div>
	<div class="lyrics">${val.trim().replace(/\n/g, "<br>").replace(/\s+/g, " ").trim().replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`)}</div>
	<div class="right"><div class="button" onclick="m.slideUp(this)">▲ [--Hide lyrics--]</div></div>
</div>
</div>`;
						break;
					case "#related": case "#related:":
					case "#originaluri": case "#originaluri:":
						res += `<div class="value"><span class="key">${key}</span>:`;
						let relateds = val.trim().split("\n");
						for (let p = 0; p < relateds.length; p++) {
							res += '<br>';
							let uriRendered = await uriRendering(m.formatURI(relateds[p]), true, false, r?.descR);
							res += String(uriRendered.html);
						}
						res += `</div>`;
						break;
				}
			}
			res += `</div>`;
		}
		if (recomsI?.cmtsHTML) {
			res += recomsI.cmtsHTML;
		}
		res += `</div>`;
		return res;
	};
	m.recoHTML = async function (r, inListPlay, inRange, inRecoms) {
		let res = "";
		if (r?.has) {
			res += `<div class="reco${inRange && !r.deleted ? '' : ' none'}"${inListPlay ? `` : ` id="reco${inRecoms ? `m-${m.recoms[m.currentCat][r?.uri]?.i}"` : `-${m.fsToRs.fullList[r?.uri]?.i}"`}`}><img class="SNS-img" src="/CDN/link.png" onclick="return m.shareSNS(this,'link')"><img class="SNS-img" src="/CDN/icon-Tag.png" onclick="return m.shareSNS(this,'tag')"><img class="SNS-img" src="/CDN/icon-Recoeve.png" onclick="return m.shareSNS(this,'recoeve')"><div class="SNS-img icon-X"><img class="icon-X" src="/CDN/icon-X.png" onclick="return m.shareSNS(this,'X')"></div><img class="SNS-img" src="/CDN/icon-Facebook.png" onclick="return m.shareSNS(this,'facebook')"><img class="SNS-img" src="/CDN/icon-Kakao.png" onclick="return m.shareSNS(this,'kakao')"/><img class="SNS-img" src="/CDN/icon-Whatsapp.png" onclick="return m.shareSNS(this,'whatsapp')"/>
${m.myIndex ? `<div class="button edit fRight${r.deleted ? " deleted" : ""}" onclick="m.editOrRecoToMine(this)">${m.myPage ? '[--Edit--]' : '[--Reco to mine--]'}</div>` : ''}
<div class="textURI">${m.escapeOnlyTag(r?.uri)}</div>
<div class="uri cBoth"><a class="button button-recostat" target="_blank" href="/recostat?uri=${encodeURIComponent(r?.uri)}">RecoStat</a>${m.uriToA(r?.uri)}</div>
<div class="title">${m.escapeOnlyTag(r?.title)}</div>
<div class="cats">${m.catsToA(r.cats)}</div>`
			if (!inListPlay) {
				let uriRendered = await uriRendering(r?.uri, false, inListPlay, r?.descR);
				res += String(uriRendered.html);
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
				res += `<div class="desc">`;
				for (let l = 0; l < descR.length; l++) {
					let key = m.escapeOnlyTag(descR[l].key);
					let val = m.escapeOnlyTag(descR[l].val);
					switch (key.toLowerCase()) {
						case "#start": case "#end": case "#": case "": default: {
							let valBrTrimed=val.replace(/\n/g, "<br>").replace(/\s+/g, " ").trim();
							res += `<div class="value">${key} ${valBrTrimed&&inListPlay?valBrTrimed.replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`):valBrTrimed}</div>`;
							break;
						}
						case "#lyrics": case "#lyrics:":
						case "#lyric": case "#lyric:":
						case "#가사": case "#가사:": {
							let valTrimedBr=val.trim().replace(/\n/g, "<br>").replace(/\s+/g, " ")
							res += `<div class="value">
<div class="center"><div class="button" onclick="m.slideToggle(this)">▼ [--Toggle lyrics--]</div></div>
<div class="lyricsC" style="display:none">
	<div class="lyricsArrow"></div>
	<div class="lyrics">${valTrimedBr&&inListPlay?valTrimedBr.replace(/(?:([0-9]{1,2})\:)?(?:([0-9]{1,2})\:)([0-9]{1,})/g, `<a class="seekTo" onclick="m.seekToVideo($3,$2,$1)">$&</a>`):valTrimedBr}</div>
	<div class="right"><div class="button" onclick="m.slideUp(this)">▲ [--Hide lyrics--]</div></div>
</div>
</div>`;
							break;
						}
						case "#related": case "#related:":
						case "#originaluri": case "#originaluri:":
							res += `<div class="value"><span class="key">${key}</span>:`;
							let relateds = val.trim().split("\n");
							for (let p = 0; p < relateds.length; p++) {
								res += '<br>';
								let uriRendered = await uriRendering(m.formatURI(relateds[p]), true, false, r?.descR);
								res += String(uriRendered.html);
							}
							res += `</div>`;
							break;
					}
				}
				res += `</div>`;
			}
			res += (r.cmt && r.cmt.length !== 0 ? (`<div class="cmt">${m.escapeOnlyTag(r?.cmt).replace(/\n/g, "<br>")}</div>`) : "");
			res += `<div class="tFirst">Firstly Recoed at ${m.toLocalTime(r.tFirst)}</div><div class="cBoth"></div>`;
			if (r.tFirst !== r.tLast) {
				res += `<div class="tLast">Lastly Editted at ${m.toLocalTime(r.tLast)}</div><div class="cBoth"></div>`;
			}
			res += `</div>`;
		}
		else {
			res += `<div class="reco">No Reco</div>`;
		}
		return res;
	};
	m.reco_pointChange_do = function (args, err) { // args : {strHeads, strContents, $result, uri, cats, valStr, inRecoms}
		if (err) {
			m.delayedLogOut(err, 60 * 60 * 24, args.$result);
			return;
		}
		let fs = m.fsGo;
		let uri = args.uri;
		$.ajax({
			type: "POST", url: "/reco/do", data: args.strHeads + "\n" + args.strContents
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
			let res = await m.strToJSON(resp);
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
				// m.refreshFSToRs(m.currentCat);
				m.refresh(args.cats, "changed", uri);
			}
			else if (result.startsWith("recoed")) {
				let r = m.myRecos[uri];
				let recoDef = m.recoDefs[uri];
				if (!r) {
					r = m.myRecos[uri] = { uri: uri, has: true, down: true, val: m.val(args.valStr) };
				}
				r.uri = uri;
				r.has = true;
				r.down = true;
				r.val = m.val(args.valStr);
				r.tFirst = res[1]?.tLast;
				r.tLast = res[1]?.tLast;
				if (recoDef.defTitles && recoDef.defTitles[0] && recoDef.defTitles[0][0]) {
					r.title = recoDef.defTitles[0][0];
				}
				else {
					r.title = "";
				}
				r.cats = args.cats;
				if (recoDef.defDescs && recoDef.defDescs[0] && recoDef.defDescs[0][0]) {
					r.desc = recoDef.defDescs[0][0];
				}
				else {
					r.desc = "";
				}
				r.descR = m.renderStrDescCmt(r.desc);
				m.putCats_UriToLists(r.cats, uri);
				m.refresh(r.cats, "recoed", uri);
				m.refreshFSToRs(m.currentCat);
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
		let valStr = $str.html();
		if (m.myPage) {
			if (inRecoms) {
				let strHeads = "uri\tdo\tval";
				let strContents = `${m.encloseStr(uri)}\treco\t${m.encloseStr(valStr)}`;
				let r = m.myRecos[uri];
				let recoDef = m.recoDefs[uri];
				if (recoDef?.defTitles && recoDef.defTitles[0] && recoDef.defTitles[0][0]) {
					strHeads += "\ttitle";
					strContents += `\t${m.encloseStr(recoDef.defTitles[0][0])}`;
				}
				if (recoDef?.defDescs && recoDef.defDescs[0] && recoDef.defDescs[0][0]) {
					strHeads += "\tdesc";
					strContents += `\t${m.encloseStr(recoDef.defDescs[0][0])}`;
				}
				strHeads += "\tcats";
				let cats = "";
				if (m.recoMode === "multireco") {
					cats = $multireco_input_cats[0].value = m.formatCats($multireco_input_cats[0].value);
				}
				else {
					cats = m.formatCats(m.currentCat);
				}
				strContents += `\t${m.encloseStr(cats)}`;
				$result?.html(`Recoing... The cats on this URI is ${m.escapeOnlyTag(cats)}.`);
				m.rmb_me(m.reco_pointChange_do, { strHeads, strContents, $result, uri, cats, valStr, inRecoms });
			}
			else if (valStr !== m.myRecos[uri].val?.str) {
				let strHeads = "uri\tdo\tval";
				let strContents = `${m.encloseStr(uri)}\tchange\t${m.encloseStr(valStr)}`;
				let cats = "";
				let catsChanged = true;
				if (m.recoMode === "multireco") {
					cats = $multireco_input_cats[0].value = m.formatCats($multireco_input_cats[0].value);
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
						cats = $multireco_input_cats[0].value = m.formatCats($multireco_input_cats[0].value);
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
					cats = $multireco_input_cats[0].value = m.formatCats($multireco_input_cats[0].value);
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
		let w = e.clientX - $bar.offset().left + $window.scrollLeft();
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
		$html.on("mousemove.mdInStars touchmove.mdInStars", function (e) {
			window.getSelection().removeAllRanges();
			e.preventDefault();
			e.stopPropagation();
			let x = (e.type === 'touchmove') ? e.originalEvent.touches[0].clientX : e.clientX;
			let w = x - $bar.offset().left + $window.scrollLeft();
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
		$window.off("scroll.delayedLoad");
		$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
		$window.trigger("scroll.delayedLoad");
		m.$fdList = $("#right-top-log-in, #change-style, #foot, #head, #headPlay, #playlist-container, .numbers-of-recos, .reco, .to-be-executed");
		let $stars = $(".my-point>.stars-container");
		$stars.off("click.mdInStars");
		$stars.on("click.mdInStars", m.starsOnClick);
		$stars.off("mousedown.mdInStars touchstart.mdInStars");
		$html.off("mouseup.mdInStars touchend.mdInStars mousemove.mdInStars touchmove.mdInStars");
		$stars.on("mousedown.mdInStars touchstart.mdInStars", function (e) {
			let { $str, uri, $result, $reco } = m.starsOnTouchMove(e);
			$html.on("mouseup.mdInStars touchend.mdInStars", function (e) {
				e.preventDefault();
				e.stopPropagation();
				$html.off("mouseup.mdInStars touchend.mdInStars mousemove.mdInStars touchmove.mdInStars");
				m.timeout[uri] = setTimeout(function () {
					m.recoByOnlyStars($str, uri, $result, $reco.hasClass("recom"));
				}, 2 * m.wait);
			});
		});
		let $ups = $(".my-point>.up");
		let $downs = $(".my-point>.down");
		$ups.off("click.ud");
		$downs.off("click.ud");
		$ups.on("click.ud", m.starsOnUpClick);
		$downs.on("click.ud", m.starsOnDownClick);
		m.reNewfsCatsOn();
	};
})(window.m, jQuery);