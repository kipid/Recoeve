(function(m, $, undefined) {
m.version1=".10";
// SEE (Super Easy Edit)
let $SEE=$("codeprint.SEE");
m.SEEHTMLs=m.SEEHTMLs||[];
for (let i=0;i<$SEE.length;i++) {
	let $SEEi=$SEE.eq(i);
	let SEEHTMLi="";
	if (!!m.SEEHTMLs[i]) {
		SEEHTMLi=m.SEEHTMLs[i].trim();
	}
	else {
		SEEHTMLi=$SEEi.html().trim();
	}
	$SEEi.html("");
	$SEEi.after(m.renderToDocuK(SEEHTMLi));
}
$("pre.prettyprint.scrollable").addClass("linenums");

let $docuK=$(".docuK");
m.$docuK=$docuK;

// Showing disableQ0 only in width>321.
if (m.browserWidth>321) {
	$docuK.find(".disableQ0").html(function(ith,orgText) {
		m.logPrint(`<br><br>".disableQ0"s are enabled at vertical position of ${(100*$(this).offset().top/$document.height()).toPrecision(3)}% of document.`);
		return orgText.replace(/<!--/g,'').replace(/-->/g,'');
	});
}

// <eq> and <eqq> tags to MathJax format
let $eqs=$("eq");
for (let i=0;i<$eqs.length;i++) {
	$eqs.eq(i).html(function(ith,orgTxt) {return "\\( "+orgTxt.trim()+" \\)";});
}
let $eqqs=$("eqq");
for (let i=0;i<$eqqs.length;i++) {
	$eqqs.eq(i).html(function(ith,orgTxt) {return "\\[ "+orgTxt.trim()+" \\]";});
}
m.logPrint(`<br><br>&lt;eq&gt; and &lt;eqq&gt; tags are rendered to MathJax format, being enclosed by \\ ( and \\ ).`);

// docuK process.
$docuK.has("script").addClass("noDIdHandle");
let k=$docuK.length;
for(let i=1;i<k;i++) {
	m.docuKProcess(m, jQuery, i);
}

m.bubbleRefs=$docuK.find(".bubbleRef"); // for function m.ShowBR

let $inRefs=$docuK.find(".inRef");
// Centering arrow.
$inRefs.each(function () {
	let $elem=$(this);
	let width=$elem.width()-2;
	let $arrow=$elem.find(".arrow");
	let borderWidth=parseFloat($arrow.css("borderWidth"));
	let fontSize=parseFloat($arrow.css("fontSize"));
	$arrow.css({marginLeft:((width/2-borderWidth)/fontSize).toFixed(2)+"em"});
});
// Delayed-Load in bubble ref.
$inRefs.on("mouseenter.delayedLoad", function () {
	m.logPrint(`<br>Do delayed-load in bubble ref.`);
	$window.trigger("scroll.delayedLoad");
	$(this).off("mouseenter.delayedLoad");
});

//////////////////////////////////////////
// Fuzzy search fullList
//////////////////////////////////////////
let $list=$(".docuK .p, .docuK .cmt, .docuK .bcf, .docuK li, .docuK pre");
for (let i=0;i<$list.length;i++) {
	let $listI=$list.eq(i);
	let $sec=$listI.parents(".docuK>.sec");
	let txt="";
	let html="";
	if ($sec.length) {
		let cat=$sec.find("h2:first-child .head-txt").text();
		let $subSec=$listI.parents(".subsec");
		if ($subSec.length) {
			cat+="\n&nbsp; -- "+$subSec.find("h3:first-child .head-txt").text();
			let $subSubSec=$listI.parents(".subsubsec");
			if ($subSubSec.length) {
				cat+="\n&nbsp; &nbsp; -- "+$subSubSec.find("h4:first-child .head-txt").text();
			}
		}
		txt=cat.replace(/\n&nbsp; &nbsp;/g,"").replace(/\n&nbsp;/g,"")+"\n";
		html='<div class="cat">'+cat.replace(/\n/g, "<br>")+'</div>';
	}
	txt+="* "+$listI.text();
	html+=`<div class="li">* ${$listI.html().trim().replace(/\sid=/g,"\squasi-id=")}</div>`;
	m.fsGo.fullList[$list.length-1-i]={i:$list.length-1-i, txt:m.splitHangul(txt), html:html, $listI:$listI};
}

$fuzzy_search.trigger("keyup.fs");
$button_Go=$(".button-Go");
$button_log=$(".button-log");

// Scripts will be appended on this.
window.$headOrBody=$("head")||$("body")||$("#docuK-style");

window.onpopstate=function (e) {
	if (!!e.state) {
		if (e.state?.goOn!==m.goOn) {
			$window.trigger({type:'keydown', keyCode:'G'.charCodeAt(0)});
		}
		if (e.state?.logOn!==m.logOn) {
			$window.trigger({type:'keydown', keyCode:'K'.charCodeAt(0)});
		}
	}
};

// On ready.
$document.ready(function () {
	// Disqus js script, and Redirect to the canonical URL.
	if (window.disqus_config) {
		m.disqusVars={page:{}};
		window.disqus_config.apply(m.disqusVars);
		let url=m.canonicalURI=m.disqusVars.page.url;
		$('link[rel="canonical"]').remove();
		($("head")||$("#docuK-style")).append(`<link rel="canonical" href="${url}" />`);
		let hrefAnalyzed=new URL(window.location.href);
		let urlAnalyzed=new URL(url);
		if (hrefAnalyzed.protocol.toLowerCase()===urlAnalyzed.protocol.toLowerCase()&&decodeURIComponent(hrefAnalyzed.pathname)!==decodeURIComponent(urlAnalyzed.pathname)) {
			window.location.pathname=urlAnalyzed.pathname;
		}
	}

	setTimeout(function () {
		let parsedHref=new URL(window.location.href);
		let origin=parsedHref.origin.toLowerCase();
		if (origin==="https://kipid.tistory.com"||origin==="https://localhost"||origin==="https://recoeve.net") {
			let blogStat=`URI\treferer\tREACTION_GUEST\n${window.location.href}\t${document.referrer}\t${m.docCookies.getItem("REACTION_GUEST")}`;
			$.ajax({
				type:"POST", url:"https://recoeve.net/BlogStat", data:blogStat, dataType:"text"
			}).fail(function (resp) {
				m.logPrint("<br><br>BlogStat failed. "+resp);
				console.log("BlogStat failed. ", resp)
			}).done(function (resp) {
				m.logPrint("<br><br>BlogStat is logged. "+resp);
				console.log("BlogStat is logged. ", resp)
			});
		}
	}, 4*m.wait);

	$title.html($title.html()+` at ${window.location.host}`);

	m.$log.after(`<div id="floating-key">
<div id="button-hideFK" class="button" onclick="m.toggleFK()">▼ Hid<span class="bold underline">e</span></div>
<div class="button button-Go" style="width:4.5em; border-right:none" onclick="$window.trigger({type:'keydown', keyCode:'G'.charCodeAt(0)})">
	<span class="bold underline">G</span>o (FS)
</div>
<div class="button" style="width:4.5em" onclick="$window.trigger({type:'keydown', keyCode:'T'.charCodeAt(0)})">
	<span class="bold underline">T</span>ofC
</div>
<div class="button button-log" onclick="$window.trigger({type:'keydown', keyCode:'K'.charCodeAt(0)})">
	Docu<span class="bold underline">K</span> Log
</div>
<div class="button" onclick="$window.trigger({type:'keydown', keyCode:'D'.charCodeAt(0)})">
	Backwar<span class="bold underline">d</span>
</div>
<div class="button" onclick="$window.trigger({type:'keydown', keyCode:'F'.charCodeAt(0)})">
	<span class="bold underline">F</span>orward
</div>
<div class="button" style="width:4.5em; border-right:none" onclick="$window.trigger({type:'keydown', keyCode:'R'.charCodeAt(0)})">
	<span class="bold underline">R</span>RA
</div>
<div class="button" style="width:4.5em" onclick="$window.trigger({type:'keydown', keyCode:'L'.charCodeAt(0)})">
	<span class="bold underline">L</span>ists
</div>
<div class="button" style="width:4.5em; border-right:none" onclick="$window.trigger({type:'keydown', keyCode:'Z'.charCodeAt(0)})">
	Cmt<span class="bold underline">Z</span>
</div>
<div class="button" style="width:4.5em" onclick="$window.trigger({type:'keydown', keyCode:'X'.charCodeAt(0)})">
	Cmt<span class="bold underline">X</span>
</div>
<div class="button" onclick="$window.trigger({type:'keydown', keyCode:'H'.charCodeAt(0)})">
	<span class="bold underline">H</span>andle CmtZ
</div>
${m.docCookies.hasItem("REACTION_GUEST")?`<div class="button" onclick="$window.trigger({type:'keydown', keyCode:'I'.charCodeAt(0)})">
	Log <span class="bold underline">i</span>n
</div>`:`<div class="button" onclick="$window.trigger({type:'keydown', keyCode:'O'.charCodeAt(0)})">
	Log <span class="bold underline">o</span>ut
</div>`}
<div id="SNS-floating"><a onclick="return m.shareSNS('tag',this)"><img class="SNS-img" src="https://recoeve.net/CDN/icon-Tag.png"></a><img class="SNS-img" src="https://recoeve.net/CDN/icon-Recoeve.png" onclick="m.shareSNS('recoeve')"><div class="SNS-img icon-X"><img class="icon-X" src="https://recoeve.net/CDN/icon-X.png" onclick="m.shareSNS('X')"></div><img class="SNS-img" src="https://recoeve.net/CDN/icon-Facebook.png" onclick="m.shareSNS('facebook')"><img class="SNS-img" src="https://recoeve.net/CDN/icon-Kakao.png" onclick="m.shareSNS('kakao')"><img class="SNS-img" src="https://recoeve.net/CDN/icon-Whatsapp.png" onclick="m.shareSNS('Whatsapp')"></div></div><div class="button" id="toggle-floating-key" onclick="m.toggleFK()">▲</div>`);
	$floating_key=$("#floating-key");
	if (m.docCookies.getItem("hideFK")==="y") {
		$floating_key.hide();
	}
if (!m.printMode) {
	for (let i=1;i<m.$docuK.length;i++) {
		m.$docuK.eq(i).before(m.promoting(`promoting-${i}-0`));
		m.$docuK.eq(i).after(m.promoting(`promoting-${i}-1`));
	}
}
	// Printing codes in <codeprint> with id (which starts with "code-") into <pre id="pre-code-...">.
	let $codeprints=$("codeprint");
	for (let i=0;i<$codeprints.length;i++) {
		let codeId=$codeprints.eq(i).attr('id');
		if (codeId!==null&&codeId!==undefined&&codeId.startsWith("code-")) {
			m.printCode(codeId);
		}
	}

	// Hiding hiden sections.
	$docuK.find(".sec.hiden").find(">.sec-contents").css({display:"none"});

	// Setting and Printing Styles
	m.$deviceInfo=$docuK.find(".deviceInfo");

	let cookieItem;
	m.logPrint(`<br>`);

	cookieItem=m.docCookies.getItem("m.mode");
	if (cookieItem!==null) {
		m.Cmode(cookieItem);
		m.logPrint(`<br>Mode ${cookieItem} is set from cookie.`);
	}
	else {
		m.Cmode("Dark");
	}
	for(let i=1;i<m.$docuK.length;i++) {
		$(`#button${i}-${m.mode}`).prop('checked', true);
	}

	cookieItem=m.docCookies.getItem("m.fontFamily");
	if (cookieItem!==null) {
		m.CfontFamily(cookieItem);
		m.logPrint(`<br>Font ${cookieItem} is set from cookie.`);
		for(let i=1;i<m.$docuK.length;i++) {
			$(`#input${i}-font-family`)[0].value=m.fontFamily;
		}
	}

	cookieItem=m.docCookies.getItem("m.fontSize");
	if (cookieItem!==null) {
		m.CfontSize(Number(cookieItem)-m.defaultStyles.fontSize);
		m.logPrint(`<br>Font-size ${(Number(cookieItem)*1.8).toFixed(1)} is set from cookie.`);
	}

	cookieItem=m.docCookies.getItem("m.lineHeight10");
	if (cookieItem!==null) {
		m.ClineHeight(Number(cookieItem)-m.defaultStyles.lineHeight10);
		m.logPrint(`<br>Line-height ${(Number(cookieItem)/10).toFixed(1)} is set from cookie.`);
	}

	m.plink=$('meta[property="dg:plink"]').attr('content');
	m.logPrint(`<br><br>Current styles (dark/bright mode, font-family, font-size, line-height) are shown.`);
	m.printDeviceInfo();

if (!m.printMode) {
	$disqus_thread=$("#disqus_thread");
	if (!($disqus_thread.length)) {
		($("#docuK-script")||$("body")).append(`<div id="disqus_thread"></div>`);
		$disqus_thread=$("#disqus_thread");
	}
	let $disqus_js=$(`<script id="disqus-js" defer src="https://kipid.disqus.com/embed.js" data-timestamp="${new Date()}"></`+`script>`); // Avoid closing script
	$headOrBody.append($disqus_js);
	m.logPrint(`<br><br>disqus.js with id="disqus-js" is loaded.`);

	m.myIPs=["14.38.247.30", "175.212.158.53"];
	m.ignoreMe=true;
	m.weekDays=["일", "월", "화", "수", "목", "금", "토"];
	m.daysToPlotPageViewsChart=31;
	m.to=[];
	m.from=[];
	let currentDate=new Date();
	for (let i=0;i<m.daysToPlotPageViewsChart;i++) {
		let toDate=currentDate;
		let year=toDate.getFullYear();
		let month=String(toDate.getMonth()+1).padStart(2, '0'); // Adding 1 because months are zero-based
		let day=String(toDate.getDate()).padStart(2, '0');
		// Format the date as YYYY-MM-DD (Locale date)
		m.to.push({date:`${year}-${month}-${day}`, month, day, weekday:m.weekDays[toDate.getDay()]});

		let fromDate=new Date(currentDate.setDate(currentDate.getDate()-1));
		year=fromDate.getFullYear();
		month=String(fromDate.getMonth()+1).padStart(2, '0'); // Adding 1 because months are zero-based
		day=String(fromDate.getDate()).padStart(2, '0');
		m.from.push({date:`${year}-${month}-${day}`});
	}
	m.blogStatRes=[];
	m.getBlogStat=function () {
	return new Promise(function (resolve, reject) {
		let reqTimes=`host\tfrom\tto`;
		for (let i=0;i<m.daysToPlotPageViewsChart;i++) {
			reqTimes+=`\nkipid.tistory.com\t${m.from[i].date} 15:00:00\t${m.to[i].date} 15:00:00`; // until 24:00:00 of today. UTC+09:00.
		}
		$.ajax({
			type:"POST", url:"https://recoeve.net/BlogStat/Get", data:reqTimes, dataType:"text"
		}).fail(function (resp) {
			m.logPrint("<br><br>BlogStat is failed to be got.");
			reject();
		}).done(async function (resp) {
			m.logPrint("<br><br>BlogStat is got.");
			m.blogStatRes=await m.strToJSON(resp);
			let promise=Promise.all(m.blogStatRes);
			for (let i=1;i<m.blogStatRes.length;i++) {
				promise=promise.then(async function (blogStatRes) {
					let statI=blogStatRes[i];
					statI.splice(2,1);
					let id=`${statI.from}\t${statI.to}`;
					statI.id=id;
					m.blogStatRes[id]=statI;
					statI.stats=await m.strToJSON(statI.stats);
					return Promise.all(m.blogStatRes);
				});
				promise=promise.then(async function (blogStatRes) {
					let statI=blogStatRes[i];
					let stats=statI.stats; // =await m.strToJSON(statI.stats);
					let pageViews=0;
					for(let k=1;k<stats.length;k++) {
						let ip=stats[k].ip.split(":")[0];
						if (m.ignoreMe&&(ip===m.myIPs[0]||ip===m.myIPs[1])) {
							continue;
						}
						pageViews++;
					}
					m.blogStatRes[i].pageViews=pageViews;
					return Promise.all(m.blogStatRes);
				});
			}
			resolve();
		});
	});
	};
	m.loadPageViewsStat=async function () {
		$page_views_chart.removeClass("to-be-executed");
		$page_views_chart.off("click");
		$page_views_chart.on("click", function () {
			$page_views_chart.off("click");
		});
		await m.getBlogStat();
		let countChartHTML=`<div class="rC" style="margin:1em 0"><div class="rSC"><div><svg width="100%" height="100%">`;
		let leftPadding=3.0;
		let rightPadding=3.0;
		let topPadding=7.0;
		let bottomPadding=20.0;
		let bottomLine=100.0-bottomPadding;
		let maxHeight=100.0-topPadding-bottomPadding;
		let dx=(100.0-leftPadding-rightPadding)/m.daysToPlotPageViewsChart/2.0;
		m.setIntervalBlogStatN=0;
		setTimeout(function self() {
			if (m.blogStatRes?.length<m.daysToPlotPageViewsChart&&m.setIntervalBlogStatN++<=17) {
				setTimeout(self, 2048);
				return;
			}
			let maxPageViews=0;
			for (let i=1;i<m.blogStatRes.length;i++) {
				let pageViews=m.blogStatRes[i].pageViews;
				if (pageViews>maxPageViews) {
					maxPageViews=pageViews;
				}
			}
			let pageViewsOfADay=[];
			for (let k=0;k<m.daysToPlotPageViewsChart;k++) {
				let blogStatResK=m.blogStatRes[k+1];
				let x=leftPadding+(m.daysToPlotPageViewsChart-1.0-k)*dx*2.0;
				let tick=leftPadding+(m.daysToPlotPageViewsChart-0.5-k)*dx*2.0;
				let h=maxHeight*blogStatResK.pageViews/maxPageViews;
				pageViewsOfADay[k]={pageViews:blogStatResK.pageViews, x, tick, month:m.to[k].month, day:m.to[k].day, weekday:m.to[k].weekday, h};
			}
			for (let i=0;i<pageViewsOfADay.length;i++) {
				countChartHTML+=`<rect class="column" x="${pageViewsOfADay[i].x}%" y="${bottomLine-pageViewsOfADay[i].h}%" width="${2.0*dx}%" height="${pageViewsOfADay[i].h}%"></rect><text class="page-views" x="${pageViewsOfADay[i].tick}%" text-anchor="middle" y="${bottomLine-pageViewsOfADay[i].h-1.0}%" dominant-baseline="text-bottom">${pageViewsOfADay[i].pageViews?.toFixed(0)}</text>`;
			}
			countChartHTML+=`<line class="bar" x1="${leftPadding}%" y1="${bottomLine}%" x2="${100.0-rightPadding}%" y2="${bottomLine}%"/>`;
			for (let i=0;i<pageViewsOfADay.length;i++) {
				countChartHTML+=`<line class="bar" x1="${pageViewsOfADay[i].tick}%" y1="${bottomLine-1.5}%" x2="${pageViewsOfADay[i].tick}%" y2="${bottomLine+1.0}%"/>
<text class="tick${pageViewsOfADay[i].weekday==="토"?" saturday":pageViewsOfADay[i].weekday==="일"?" sunday":""}" x="${pageViewsOfADay[i].tick}%" y="${bottomLine}%">
<tspan x="${pageViewsOfADay[i].tick}%" text-anchor="middle" dy="2.0em">${pageViewsOfADay[i].month}</tspan>
<tspan x="${pageViewsOfADay[i].tick}%" text-anchor="middle" dy="1.1em">/${pageViewsOfADay[i].day}</tspan>
<tspan x="${pageViewsOfADay[i].tick}%" text-anchor="middle" dy="1.6em">${pageViewsOfADay[i].weekday}</tspan>
</text>`
			}
			countChartHTML+=`<text class="now-local" x="100%" y="100%"><tspan x="100%" text-anchor="end" y="99%" dominant-baseline="text-bottom">${new Date().toLocaleString()}</tspan></text>`;
			countChartHTML+=`</svg></div></div></div>`;
			$page_views_chart.html(countChartHTML);
		}, 512);
	};
	$page_views_chart=$("#page-views-chart");
	if (!($page_views_chart.length)) {
		$disqus_thread.after(`<div id="page-views-chart" class="to-be-executed" onclick="m.loadPageViewsStat()">Get page views</div>`);
		$page_views_chart=$("#page-views-chart");
	}
}

	// Kakao js script (from kakao.com CDN) is added.
	m.kakao_js_id='kakao-jssdk';
	if (!$(`#${m.kakao_js_id}`)) {
		let $kakao_js=$(`<script id="${m.kakao_js_id}" src="https://developers.kakao.com/sdk/js/kakao.js"></`+`script>`); // Avoid closing script
		$headOrBody.append($kakao_js);
	}
	m.logPrint(`<br><br>kakao.js with id="${m.kakao_js_id}" is loaded.`);
	m.kakaoInitDo=function () {
		if (typeof Kakao!=='undefined') {
			clearInterval(m.kakaoInit);
			if (!Kakao.isInitialized()) {
				Kakao.init('c85c800b54a2a95faa5ca7a5e3d357ef');
			}
			m.logPrint(`<br>Kakao.isInitialized()=${Kakao.isInitialized()};`);
		}
	};
	m.kakaoInit=setInterval(m.kakaoInitDo, 2048);

	m.popUpKakao=function () {
		let $desc=$("meta[name='description']");
		let href=window.location.href;
		Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: $("title").html(),
				description: $desc?$desc[0].content:'',
				imageUrl: '',
				link: {
					mobileWebUrl: href,
					webUrl: href,
				},
			},
		});
	};

	// google code prettify js script (from cdn.jsdelivr.net CDN) is added.
	if ($docuK.find('.prettyprint').length) {
		let $gcp=$(`<script id="prettyfy-js" src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></`+`script>`); // Avoid closing script
		$headOrBody.append($gcp);
		m.logPrint(`<br><br>Google code prettyfy.js is loaded since ".prettyprint" is there in your document.`);
	}

	// MathJax js script (from cdn.mathjax.org) is added.
	if ($docuK.find('eq, eqq').length) {
		let $mjxConfig=$(`<script>
window.MathJax={
	startup: {
		typeset: false, // Skip startup typeset.
		ready: function () {
			m.logPrint('<br><br>MathJax is loaded, but not yet initialized.');
			MathJax.startup.defaultReady();
			m.logPrint('<br><br>MathJax is initialized, and the initial typeset is queued.');
		}
	},
	asciimath: {
		delimiters: [['$','$']] // AsciiMath to Jax
	},
	tex: {
		inlineMath: [['$','$'], ['\\\\(','\\\\)']], // Using $ for inline math.
		displayMath: [['$$','$$'], ['\\\\[','\\\\]']], // Using $$ for outline math.
		processEscapes: true, // Escape \\$
		processEnvironments: false // Ignore \\begin{something} ... \\end{something}
	},
	svg: {
		fontCache: 'global'
	}
};
</`+`script>`); // Avoid closing script
		$headOrBody.append($mjxConfig);
		let $mjx=$(`<script id="MathJax-script" defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></`+`script>`); // Avoid closing script
		$headOrBody.append($mjx);
		m.logPrint(`<br><br>MathJax.js (mathjax@3/es5/tex-chtml.js) is loaded since "&lt;eq&gt;, &lt;eqq&gt;" is there in your document.`);
		// MathJax PreProcess after the above MathJax.js is loaded.
		m.mathJaxPreProcessDo=function () {
			if (MathJax.startup!==undefined&&MathJax.typeset) {
				MathJax.typeset();
			}
			else {
				setTimeout(m.mathJaxPreProcessDo, 2048);
			}
		};
		m.mathJaxPreProcess=setTimeout(m.mathJaxPreProcessDo, 2048);
	}

	// ShortKeys (including default 'processShortcut(event)' of tistory.)
	m.$fdList=$("#header, #shortkey, .promoting, .change-docuK-style, #content, #container, #wrapContent, .docuK .sec>h1, .docuK .sec>h2, .docuK .subsec>h3, .docuK .subsubsec>h4, .comments, .comments>.comment-list>ul>li, #disqus_thread, #aside, #page-views-chart, #chartdiv, #recentComments, #tistorySidebarProfileLayer"); // Ordered automatically by jQuery.
	m.tocs=$(".docuK>.sec").has(".toc");
	m.rras=$(".docuK>.sec").has("ol.refs");
	m.goOn=false;
	m.logOn=false;
	m.processShortKey=function(event) {
		if (event.altKey||event.ctrlKey||event.metaKey) return;
		switch (event.target&&event.target.nodeName) {
			case "INPUT": case "SELECT": case "TEXTAREA": return;
		}
		let scrollTop=null;
		let i, k;
		switch (event.keyCode) {
			case 65: // A=65 Toggle a mess
				$(".toggle-a-mess").eq(0).trigger("click");
				break;
			case 69: // E=69 Expand/Hide floating keys
				m.toggleFK();
				break;
			case 71: // G=71
				event.preventDefault();
				if ($fuzzy_search_container.is(":visible")) {
					$fuzzy_search_container.hide();
					$out_focus.focus();
					$button_Go.removeClass("enabled");
					m.goOn=false;
					window.history.pushState({goOn:m.goOn, logOn:m.logOn}, "");
				}
				else {
					$fuzzy_search_container.show();
					$fuzzy_search.focus();
					$button_Go.addClass("enabled");
					m.goOn=true;
					window.history.pushState({goOn:m.goOn, logOn:m.logOn}, "");
				}
				break;
			case 75: // K=75
				event.preventDefault();
				if (m.$log.is(":visible")) {
					m.$logAll.hide();
					$out_focus.focus();
					$button_log.removeClass("enabled");
					m.logOn=false;
					window.history.pushState({goOn:m.goOn, logOn:m.logOn}, "");
				}
				else {
					m.$logAll.show();
					$button_log.addClass("enabled");
					m.logOn=true;
					window.history.pushState({goOn:m.goOn, logOn:m.logOn}, "");
				}
				break;
			case 70: // F=70
			case 68: // D=68
				scrollTop=$window.scrollTop();
				k=m.$fdList.length;
				let $hI;

				if (event.keyCode===70) { // F=70
					scrollTop+=10;
					for (i=0;i<k;i++) {
						$hI=m.$fdList.eq(i);
						if ($hI.is(":visible")&&scrollTop<$hI.offset().top) { break; }
					}
					if (i===k) {
						return;
					}
				}
				else{ // D=68
					scrollTop-=10;
					for (i=k-1;i>=0;i--) {
						$hI=m.$fdList.eq(i);
						if ($hI.is(":visible")&&scrollTop>$hI.offset().top) { break; }
					}
					if (i===-1) {
						return;
					}
				}
				let hIID=$hI[0].id;
				if (hIID) {
					window.location.hash=`#${hIID}`;
				}
				$window.scrollTop($hI.offset().top);
				break;
			case 84: // T=84
				scrollTop=$window.scrollTop();
				k=m.tocs.length;
				let tocI;
				scrollTop-=10;
				for (i=k-1;i>=0;i--) {
					tocI=m.tocs.eq(i);
					if (tocI.is(":visible")&&scrollTop>tocI.offset().top) { break; }
				}
				if (i===-1) {
					tocI=m.tocs.eq(k-1);
				}
				$window.scrollTop(tocI.offset().top);
				break;
			case 82: // R=82
				scrollTop=$window.scrollTop();
				k=m.rras.length;
				let rraI;
				scrollTop-=10;
				for (i=k-1;i>=0;i--) {
					rraI=m.rras.eq(i);
					if (rraI.is(":visible")&&scrollTop>rraI.offset().top) { break; }
				}
				if (i===-1) {
					rraI=m.rras.eq(k-1);
				}
				$window.scrollTop(rraI.offset().top);
				break;
			case 76: // L=76
				if (window.location.pathname==="/entry/Lists") {
					window.location="/category";
				}
				else {
					window.location="/entry/Lists";
				}
				break;
			case 90: // Z=90
				if ($("div.comments").length) $window.scrollTop($("div.comments").offset().top);
				break;
			case 72: // H=72
				m.handleAhrefInComment();
				break;
			case 88: // X=88
				if ($("#disqus_thread").length) $window.scrollTop($("#disqus_thread").offset().top);
				break;
			case 73: // I=73
				m.docCookies.removeItem("REACTION_GUEST", "/");
				window.location.href="https://www.tistory.com/auth/login";
				break;
			case 79: // O=79
				window.location.href="https://www.tistory.com/auth/logout";
				break;
			default:
				if (window.processShortcut!==undefined) {
					window.processShortcut(event);
				}
		}
	}
	$window.on("keydown", m.processShortKey);
	m.logPrint(`<br><br>New ShortKeys (T: Table of Contents, F: Forward Section, D: Previous Section, L: To 전체목록/[Lists]) are set.`);

	m.logPrint(`<br><br>m.delayPad=${m.delayPad};<br>m.wait=${m.wait};`);

	m.handleAhrefInComment=function () {
		let promise=Promise.resolve(0);
		let $ps=$("div.comments>.comment-list").find("p");
		let toBeAdded=[];
		for (let k=0;k<$ps.length;k++) {
			let $elem=$ps.eq(k);
			let contents=$elem.contents();
			let elemHTML="";
			toBeAdded[k]=[];
			promise=promise.then(function () {
				return Promise.all(toBeAdded[k]);
			});
			for (let i=0;i<contents.length;i++) {
				promise=promise.then(function (toBeAddedK) {
					toBeAdded[k][i]="";
					return Promise.all(toBeAdded[k]);
				});
				if (contents[i].nodeType===Node.TEXT_NODE) { // Node.TEXT_NODE=3
					let contentsText=contents[i].wholeText;
					let start=0;
					let exec=null;
					let ptnURL=/https?:\/\/\S+/ig;
					if ((exec=ptnURL.exec(contentsText))!==null) { // TODO: multiple https links should be handled. Here only the first one is handled.
						promise=promise.then(async function (toBeAddedK) {
							toBeAdded[k][i]+=contentsText.substring(start, exec.index);
							let uri=exec[0];
							start=exec.lastIndex;
							if (!start) {
								start=contentsText.length;
							}
							let uriRendered=await uriRendering(uri, true, false);
							return Promise.resolve(uriRendered);
						});
						promise=promise.then(function (uriRendered) {
							if (uriRendered?.html) {
								toBeAdded[k][i]+=uriRendered.html;
							}
							return Promise.all(toBeAdded[k]);
						});
					}
					promise=promise.then(function (toBeAddedK) {
						toBeAdded[k][i]+=contentsText.substring(start);
						return Promise.all(toBeAdded[k]);
					})
				}
				else {
					promise=promise.then(function (toBeAddedK) {
						toBeAdded[k][i]+=contents[i].outerHTML;
						return Promise.all(toBeAdded[k]);
					});
				}
			}
			promise=promise.then(function (toBeAddedK) {
				for (let i=0;i<toBeAdded[k].length;i++) {
					elemHTML+=toBeAdded[k][i];
				}
				$elem.html(elemHTML);
				return Promise.all(toBeAdded[k]);
			});
		}
		promise=promise.then(function (toBeAddedK) {
			m.reNewAndReOn();
			return Promise.all(toBeAdded);
		})
	};

	$window.on("resize.menubar", function (e) {
		$("#menubar_wrapper").parents().show();
	});

	m.reNewAndReOn=function () {
		m.$delayedElems=$("[delayed-src], [delayed-bgimage], .to-be-executed");
		$window.off("scroll.delayedLoad");
		$window.on("scroll.delayedLoad", m.delayedLoadByScroll);
		$window.trigger("scroll.delayedLoad");
		m.$fdList=$("#header, #shortkey, .promoting, .change-docuK-style, #content, #container, #wrapContent, .docuK .sec>h1, .docuK .sec>h2, .docuK .subsec>h3, .docuK .subsubsec>h4, .comments, .comments>.comment-list>ul>li, #disqus_thread, #aside, #page-views-chart, #chartdiv, #recentComments, #tistorySidebarProfileLayer");
	};
	m.handleAhrefInComment();

	// Closing docuK Log.
	m.logPrint(`<br><br><span class='emph'>docuK scripts are all done. Then this log is closing in 1.0 sec.</span>`);
	setTimeout(function () {m.$logAll.hide();}, 2048);
});
})(window.m, jQuery);