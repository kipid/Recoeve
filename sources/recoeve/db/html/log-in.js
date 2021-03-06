(function(recoeve, $, undefined) {
	////////////////////////////////////////////////////
	// String to Array
	////////////////////////////////////////////////////
	recoeve.strToArray=function(str) {
		var ret=[];
		var delimiter=/([^\t\n]*)([\t\n])/g;
		var lastQuote=/[^"](?:"")*"([\t\n])/g;
		var exec;
		var start=0;
		var row=-1, col=-1, delim="\n";
		var strElem="";
		function increseRC(str) {
			if (str==='\t') {
				col++; return true;
			} else if (str==='\n') {
				row++; col=0; ret.push([]); return true;
			} return false;
		}
		while (start<str.length&&increseRC(delim)) {
			if ((str.substring(start, start+1))==='"') {
				lastQuote.lastIndex=start+1;
				if ((exec=lastQuote.exec(str))!==null) {
					strElem=str.substring(start+1, lastQuote.lastIndex-2);
					delim=exec[1];
					start=delimiter.lastIndex=lastQuote.lastIndex;
				} else {
					strElem=str.substring(start+1);
					delim="";
					start=str.length;
				}
				strElem=strElem.replace(/""/g,'"');
			} else {
				if ((exec=delimiter.exec(str))!==null) {
					strElem=exec[1];
					delim=exec[2];
					start=delimiter.lastIndex;
				} else {
					strElem=str.substring(start);
					delim="";
					start=str.length;
				}
			}
			ret[row][col]=strElem;
		}
		return ret;
	};
	
	var $dataLang=$("#data-lang");
	var dataLang=recoeve.strToArray( $dataLang.html().trim() );
	var href=window.location.href.replace(/\?.*$/, "")+"?lang=";
	var htmlLang='<div class="p">';
	for (var i=0;i<dataLang.length;i++) {
		htmlLang+='<a href="'+href+dataLang[i][1]+'">'+dataLang[i][0]+'</a><br>';
	}
	htmlLang+='</div>';
	$dataLang.after(htmlLang);
	
	//////////////////////////////////////////////////////////
	// Form handling. (Validity check, encrypt, and submit)
	//////////////////////////////////////////////////////////
	$("form.form-login").prepend(
		'<input type="hidden" name="log" value="web"/>'
		+'<input type="hidden" name="iehack" value="&#9760;"/>' // Encoding utf-8 in IE.
		+'<input type="hidden" name="screenWidth" value="'+screen.width+'"/>'
		+'<input type="hidden" name="screenHeight" value="'+screen.height+'"/>'
		+'<input type="hidden" name="locationHref" value="'+location.href+'"/>'
	);
	$(".desc").html(function(i, orgHtml) {
		return orgHtml
			.replace(/\breco/ig,'<span class="reco bold">$&</span>')
			.replace(/eve/ig,'<span class="eve bold">$&</span>');
	});
	
	recoeve.errorMsgDiv=function(msg) {
		return '<div class="error-msg">'+msg+'</div>';
	};
	recoeve.byteCount=function(str) {
		return encodeURI(str).split(/%..|./).length-1;
	};
	recoeve.pad=function(str, max) {
		str=str.toString();
		return (str.length<max)?recoeve.pad("0"+str,max):str;
	};
	recoeve.hash1=function(str) {
		var h=-17-str.length;
		for (var i=0;i<str.length;i++) {
			h+=str.charCodeAt(i);
			h+=(h<<10);
			h^=(h>>>6);
		}
		h+=(((h>>>0)%1318489)<<7);
			// prime from http://www.gutenberg.org/cache/epub/65/pg65.html.utf8
		h+=(h<<3);
		h^=(h>>>11);
		h+=(h<<15);
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash2=function(str) {
		var h=str.length+1;
		var tmp;
		for (var i=0;i<str.length;i++) {
			h+=str.charCodeAt(i);
			tmp=(str.charCodeAt(str.length-1-i)<<11)^h;
			h+=(h<<16)^tmp;
			h^=(h>>>7);
			h+=(h<<11);
		}
		h+=( ((h>>>0)%918679)<<11 );
			// prime from http://www.gutenberg.org/cache/epub/65/pg65.html.utf8
		h^=h<<3;
		h+=h>>>5;
		h^=h<<4;
		h+=h>>>17;
		h^=h<<25;
		h+=h>>>6;
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash3=function(str) {
		var h=-1023+str.length;
		for (var i=0;i<str.length;i++) {
			h^=(h<<5)+(h>>>2)+str.charCodeAt(i);
		}
		h^=h<<15;
		h+=h<<15;
		h+=( ((h>>>0)%1299451)<<2 );
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash4=function(str) {/* RS Hash Function */
		var b=378551;
		var a=63689;
		var h=0;
		for (var i=0;i<str.length;i++) {
			var q=0;
			for (var j=0;j<32;j++) {
				if (a&(1<<j)) {
					q=(q+(h<<j))>>>0;
				}
			}
			h=(q+str.charCodeAt(i))>>>0;
				// h=h*a+str.charCodeAt(i);
			q=0;
			for (var j=0;j<32;j++) {
				if (b&(1<<j)) {
					q=(q+(a<<j))>>>0;
				}
			}
			a=q; // a=a*b;
		}
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash5=function(str) {/* JS Hash Function */
		var h=1315423911;
		for (var i=0;i<str.length;i++) {
			h^=((h<<5)+str.charCodeAt(i)+(h>>2))>>>0;
		}
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash6=function(str) {/* ELF Hash Function */
		var h=0;
		var x=0;
		for (var i=0;i<str.length;i++) {
			h=((h<<4)+str.charCodeAt(i))>>>0;
			if ((x=h&0xf0000000)!=0) {
				h^=(x>>24);
			}
			h&=~x;
		}
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash7=function(str) {/* BKDR Hash Function */
		var a=131; // 31 131 1313 13131 131313 etc..
		var h=0;
		for (var i=0;i<str.length;i++) {
			var q=0;
			for (var j=0;j<32;j++) {
				if (a&(1<<j)) {
					q=(q+(h<<j))>>>0;
				}
			}
			h=(q+str.charCodeAt(i))>>>0;
				// h=h*a+str.charCodeAt(i);
		}
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash8=function(str) {/* SDBM Hash Function */
		var h=0;
		for (var i=0;i<str.length;i++) {
			h=(str.charCodeAt(i)+(h<<6)+(h<<16)-h)>>>0;
		}
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash9=function(str) {/* DJB Hash Function */
		var h=5381;
		for (var i=0;i<str.length;i++) {
			h=(((h<<5)+h)+str.charCodeAt(i))>>>0;
		}
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash10=function(str) {/* DEK Hash Function */
		var h=str.length;
		for (var i=0;i<str.length;i++) {
			h=((h<<5)^(h>>27))^str.charCodeAt(i);
		}
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash11=function(str) {/* BP Hash Function */
		var h=0;
		for (var i=0;i<str.length;i++) {
			h=h<<7^str.charCodeAt(i);
		}
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash12=function(str) {/* FNV Hash Function */
		var a=0x811C9DC5;
		var h=0;
		for (var i=0;i<str.length;i++) {
			var q=0;
			for (var j=0;j<32;j++) {
				if (a&(1<<j)) {
					q=(q+(h<<j))>>>0;
				}
			}
			h=q>>>0;
				// h=h*a;
			h^=str.charCodeAt(i);
		}
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.hash13=function(str) {/* AP Hash Function */
		var h=0xAAAAAAAA;
		for(var i=0;i<str.length;i++) {
			if ((i&1)==0) {
				h^=((h<<7)^str.charCodeAt(i)*(h>>3));
			} else {
				h^=(~((h<<11)+str.charCodeAt(i)^(h>>5)));
			}
		}
		h=h>>>0;
		return recoeve.pad(h.toString(16), 8);
	};
	recoeve.encrypt=function(salt, pwd, iter) {
		iter=pwd.length+131+((iter&&iter.constructor==Number&&iter>=0)?iter:0);;
		pwd=salt+pwd;
		var h1=recoeve.hash1(pwd);
		var h2=recoeve.hash2(pwd);
		var h3=recoeve.hash3(pwd);
		var h4=recoeve.hash4(pwd);
		var h5=recoeve.hash5(pwd);
		var h6=recoeve.hash6(pwd);
		var h7=recoeve.hash7(pwd);
		var h8=recoeve.hash8(pwd);
		var h9=recoeve.hash9(pwd);
		var h10=recoeve.hash10(pwd);
		var h11=recoeve.hash11(pwd);
		var h12=recoeve.hash12(pwd);
		var h13=recoeve.hash13(pwd);
		var tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
		for (var i=0;i<iter;i++) {
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
			h1=recoeve.hash1(tmp1);
			h2=recoeve.hash2(tmp2);
			h3=recoeve.hash3(tmp3);
			h4=recoeve.hash4(tmp4);
			h5=recoeve.hash5(tmp5);
			h6=recoeve.hash6(tmp6);
			h7=recoeve.hash7(tmp7);
			h8=recoeve.hash8(tmp8);
			h9=recoeve.hash9(tmp9);
			h10=recoeve.hash10(tmp10);
			h11=recoeve.hash11(tmp11);
			h12=recoeve.hash12(tmp12);
			h13=recoeve.hash13(tmp13);
		}
		return h1+h2+h3+h4+h5+h6+h7+h8+h9+h10+h11+h12+h13;
	};
	recoeve.iterFull=10000;
	// var salt="14d95b54b8ac93af5891cca6fd09e81346fca2de72cfc4f2fa519b32ae4e41e720c2b70087d9775a8cb85bb756f2cc8bcbcb24d0";
	// console.log("encrypt('Ef!%qKd3$2b') : "+recoeve.encrypt(salt, "Ef!%qKd3$2b",recoeve.iterFull));
	// console.log("encrypt('3s9dkf@Q)34WKZ,e') : "+recoeve.encrypt(salt, "3s9dkf@Q)34WKZ,e",recoeve.iterFull));
	// console.log("encrypt('c,DksEI%@8WE^% sq') : "+recoeve.encrypt(salt, "c,DksEI%@8WE^% sq",recoeve.iterFull));
	// console.log("encrypt(' a528wdf329') : "+recoeve.encrypt(salt, " a528wdf329",recoeve.iterFull));
	// console.log("encrypt('347958416') : "+recoeve.encrypt(salt, "347958416",recoeve.iterFull));
	
	recoeve.regExId=/^[a-zA-Z가-힣0-9-_.]+$/;
	recoeve.regExEmail=/^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+$/;
	
	recoeve.logIn=function(elem) {
		var $elem=$(elem).eq(0);
		$elem[0].disabled=true;
		var $form=$elem.parent("form").eq(0);
		var idType="id";
		var userId=$form.find(".user-id")[0].value;
		var userIdLength=recoeve.byteCount(userId);
		var userPwd=$form.find(".user-pwd")[0].value;
		var valid=false;
		
		if (userIdLength==0) {
			$elem.after( recoeve.errorMsgDiv("ID or E-mail is empty.") );
		} else if (userIdLength<3) {
			$elem.after( recoeve.errorMsgDiv("ID or E-mail is too short.") );
		} else if (userPwd.length==0) {
			$elem.after( recoeve.errorMsgDiv("Password is empty.") );
		} else if (userPwd.length<7) {
			$elem.after( recoeve.errorMsgDiv("Password is too short.") );
		} else {
			if (recoeve.regExId.test(userId)) {
				$form.find("input#input-idType")[0].value=idType="id"; valid=true;
			} else if (recoeve.regExEmail.test(userId)) {
				$form.find("input#input-idType")[0].value=idType="email"; valid=true;
			} else {
				$elem.after( recoeve.errorMsgDiv("ID or E-mail is of invalid form.") );
			}
		}
		
		if (valid) {
			$elem.after( recoeve.errorMsgDiv("Logging in: Please wait......") );
			$.ajax("./pwd_iteration", {
				type: "POST"
				, data: idType+"\t"+userId
			}).fail(function() {
				$elem.next(".error-msg").append("Request times out. Please click the Log-in button again.");
				$elem[0].disabled=false;
			}).done(function(resp) { // resp: pwd_iteration or "No such id"	salt
				var res=resp.split('\t');
				var iter=Number(res[0]);
				if (isNaN(iter)) {
					$elem.next(".error-msg").append("Error : "+res[0]);
					$elem[0].disabled=false;
				} else {
					$form.find(".user-pwd")[0].value=recoeve.encrypt(res[1], userPwd, iter); userPwd="";
					$form.submit();
				}
			});
		} else {
			$elem[0].disabled=false;
		}
		var errorMsgs=$form.find(".error-msg");
		for (var i=5;i<errorMsgs.length;i++) {
			errorMsgs.eq(i).css({display:"none"});
		};
	};
	recoeve.signUp=function(elem) {
		var $elem=$(elem).eq(0);
		$elem[0].disabled=true;
		var $form=$elem.parent("form").eq(0);
		var userId=$form.find(".user-id")[0].value;
		var userIdLength=recoeve.byteCount(userId);
		var userEmail=$form.find(".user-Email")[0].value;
		var userPwd=$form.find(".user-pwd")[0].value;
		var userPwdCfm=$form.find(".user-pwd")[1].value;
		
		if (userIdLength==0) {
			$elem.after( recoeve.errorMsgDiv("ID is empty. (required)") );
		} else if (userIdLength<3) {
			$elem.after( recoeve.errorMsgDiv("ID is too short.<br>"+userId+" : "+userIdLength+" (ID.length: 3~21)") );
		} else if (userIdLength>21) {
			$elem.after( recoeve.errorMsgDiv("ID is too long.<br>"+userId+" : "+userIdLength+" (ID.length: 3~21)") );
		} else if (!recoeve.regExId.test(userId)) {
			$elem.after( recoeve.errorMsgDiv("ID [\""+userId+"\": "+userIdLength+"] is of invalid form.") );
		} else if (userEmail.length==0) {
			$elem.after( recoeve.errorMsgDiv("E-mail is empty. (required)") );
		} else if (!recoeve.regExEmail.test(userEmail)) {
			$elem.after( recoeve.errorMsgDiv("E-mail [\""+userEmail+"\"] is of invalid form.") );
		} else if (userPwd.length==0) {
			$elem.after( recoeve.errorMsgDiv("Password is empty. (required)") );
		} else if (userPwd.length<7) {
			$elem.after( recoeve.errorMsgDiv("Password is too short.<br>*: "+userPwd.length+" (Password.length: 7~64)") );
		} else if (userPwd!==userPwdCfm) {
			$elem.after( recoeve.errorMsgDiv("Confirm your password correctly.") );
		} else {
			$elem.after( recoeve.errorMsgDiv("Checking ID and E-mail: Please wait......") );
			$.ajax("./check", {
				type: "POST"
				, data: userId+"\t"+userEmail
			}).fail(function() {
				$elem.next(".error-msg").append("Request times out. Please click the Sign-up button again.");
				$elem[0].disabled=false;
			}).done(function(resp) { // resp: idAvailable	emailAvailable	tToken	authToken(char(64))
				var res=resp.split('\t');
				if (res[0]=="true"&&res[1]=="true") {
					$form.prepend(
						'<input type="hidden" name="tToken" value="'+res[2]+'"/>'
						+'<input type="hidden" name="authToken" value="'+res[3]+'"/>'
					);
					$form.find(".user-pwd")[0].value=recoeve.encrypt(res[3], userPwd, recoeve.iterFull); userPwd="";
					$form.find(".user-pwd")[1].value="confirmed"; userPwdCfm="";
					$elem.after( recoeve.errorMsgDiv("Signing up: Please wait......") );
					$form.submit();
				} else {
					var errStr="";
					if (res[0]=="false") {
						errStr+="<br>* ID '"+userId+"' is already in use. Please try another ID.";
					}
					if (res[1]=="false") {
						errStr+="<br>* E-mail '"+userEmail+"' is already registered. Please try another e-mail.";
					}
					$elem.next(".error-msg").append(errStr);
					$elem[0].disabled=false;
				}
			});
		}
		var errorMsgs=$form.find(".error-msg");
		for (var i=5;i<errorMsgs.length;i++) {
			errorMsgs.eq(i).css({display:"none"});
		}
	};
})(window.recoeve=window.recoeve||{}, jQuery);