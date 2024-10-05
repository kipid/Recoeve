package recoeve.db;



public class Encrypt {
	public static final int ITER_FULL=10000;
	public static final int ITER_SSN_FULL=1000;
	public static String pad(String str, int max) {
		return (str.length()<max)?pad("0"+str,max):str;
	}
	public static String hash1(String str) {
		int h=-17-str.length();
		for (int i=0;i<str.length();i++) {
			h+=str.codePointAt(i);
			h+=(h<<10);
			h^=(h>>>6);
		}
		h+=( ((int)((h&0xffff_ffffL)%1318489))<<7 );
			// prime from http://www.gutenberg.org/cache/epub/65/pg65.html.utf8
		h+=(h<<3);
		h^=(h>>>11);
		h+=(h<<15);
		return pad(Integer.toHexString(h), 8);
	}
	public static String hash2(String str) {
		int h=str.length()+1;
		int tmp;
		for (int i=0;i<str.length();i++) {
			h+=str.codePointAt(i);
			tmp=(str.codePointAt(str.length()-1-i)<<11)^h;
			h+=(h<<16)^tmp;
			h^=(h>>>7);
			h+=(h<<11);
		}
		h+=( ((int)((h&0xffff_ffffL)%918679))<<11 );
			// prime from http://www.gutenberg.org/cache/epub/65/pg65.html.utf8
		h^=h<<3;
		h+=h>>>5;
		h^=h<<4;
		h+=h>>>17;
		h^=h<<25;
		h+=h>>>6;
		return pad(Integer.toHexString(h), 8);
	}
	public static String hash3(String str) {
		int h=-1023+str.length();
		for (int i=0;i<str.length();i++) {
			h^=(h<<5)+(h>>>2)+str.codePointAt(i);
		}
		h^=h<<15;
		h+=h<<15;
		h+=( ((int)((h&0xffff_ffffL)%1299451))<<2 );
		return pad(Integer.toHexString(h), 8);
	}
	public static String hash4(String str) {/* RS Hash Function */
		int b=378551;
		int a=63689;
		int h=0;
		for (int i=0;i<str.length();i++) {
			h=h*a+str.codePointAt(i);
			a=a*b;
		}
		return pad(Integer.toHexString((int)h), 8);
	};
	public static String hash5(String str) {/* JS Hash Function */
		int h=1315423911; // max +int : 2_147_483_647
		for (int i=0;i<str.length();i++) {
			h^=((h<<5)+str.codePointAt(i)+(h>>2));
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash6(String str) {/* ELF Hash Function */
		int h=0;
		int x;
		for (int i=0;i<str.length();i++) {
			h=(h<<4)+str.codePointAt(i);
			if ((x=h&0xf0000000)!=0) {
				h^=(x>>24);
			}
			h&=~x;
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash7(String str) {/* BKDR Hash Function */
		int a=131; // 31 131 1313 13131 131313 etc..
		int h=0;
		for (int i=0;i<str.length();i++) {
			h=h*a+str.codePointAt(i);
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash8(String str) {/* SDBM Hash Function */
		int h=0;
		for (int i=0;i<str.length();i++) {
			h=str.codePointAt(i)+(h<<6)+(h<<16)-h;
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash9(String str) {/* DJB Hash Function */
		int h=5381;
		for (int i=0;i<str.length();i++) {
			h=((h<<5)+h)+str.codePointAt(i);
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash10(String str) {/* DEK Hash Function */
		int h=str.length();
		for (int i=0;i<str.length();i++) {
			h=((h<<5)^(h>>27))^str.codePointAt(i);
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash11(String str) {/* BP Hash Function */
		int h=0;
		for (int i=0;i<str.length();i++) {
			h=h<<7^str.codePointAt(i);
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash12(String str) {/* FNV Hash Function */
		int fnv_prime=0x811C9DC5;
		int h=0;
		for (int i=0;i<str.length();i++) {
			h*=fnv_prime;
			h^=str.codePointAt(i);
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String hash13(String str) {/* AP Hash Function */
		int h=0xAAAAAAAA;
		for(int i=0;i<str.length();i++) {
			if ((i&1)==0) {
				h^=((h<<7)^str.codePointAt(i)*(h>>3));
			} else {
				h^=(~((h<<11)+str.codePointAt(i)^(h>>5)));
			}
		}
		return pad(Integer.toHexString(h), 8);
	};
	public static String encrypt0(String salt, String h, int iter) {
		String tmp1, tmp2, tmp3, tmp4, tmp5, tmp6, tmp7, tmp8, tmp9, tmp10, tmp11, tmp12, tmp13;
		int i=0;
		String h1=h.substring(i,i+8); i+=8;
		String h2=h.substring(i,i+8); i+=8;
		String h3=h.substring(i,i+8); i+=8;
		String h4=h.substring(i,i+8); i+=8;
		String h5=h.substring(i,i+8); i+=8;
		String h6=h.substring(i,i+8); i+=8;
		String h7=h.substring(i,i+8); i+=8;
		String h8=h.substring(i,i+8); i+=8;
		String h9=h.substring(i,i+8); i+=8;
		String h10=h.substring(i,i+8); i+=8;
		String h11=h.substring(i,i+8); i+=8;
		String h12=h.substring(i,i+8); i+=8;
		String h13=h.substring(i,i+8);
		for (int k=0;k<iter;k++) {
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
			h1=hash1(tmp1);
			h2=hash2(tmp2);
			h3=hash3(tmp3);
			h4=hash4(tmp4);
			h5=hash5(tmp5);
			h6=hash6(tmp6);
			h7=hash7(tmp7);
			h8=hash8(tmp8);
			h9=hash9(tmp9);
			h10=hash10(tmp10);
			h11=hash11(tmp11);
			h12=hash12(tmp12);
			h13=hash13(tmp13);
		}
		return h1+h2+h3+h4+h5+h6+h7+h8+h9+h10+h11+h12+h13;
	};
	public static String encrypt(String salt, String pwd, int iter) {
		iter=pwd.length()+131+((iter>=0)?iter:0);
		pwd=salt+pwd;
		return encrypt0(
			salt
			, hash1(pwd)+hash2(pwd)+hash3(pwd)+hash4(pwd)+hash5(pwd)+hash6(pwd)+hash7(pwd)+hash8(pwd)+hash9(pwd)+hash10(pwd)+hash11(pwd)+hash12(pwd)+hash13(pwd)
			, iter
		);
	}
	public static String encryptRest(String salt, String pwd, int iter) {
		return encrypt0(salt, pwd, ITER_FULL-iter);
	}
	public static String encryptSSNRest(String salt, String pwd, int iter) {
		return encrypt0(salt, pwd, ITER_SSN_FULL-iter);
	}

	public static void main(String... args) {
		// int h=-100;
		// System.out.println(pad(Integer.toHexString(h), 8)); // ffffff9c

		// String salt="14d95b54b8ac93af5891cca6fd09e81346fca2de72cfc4f2fa519b32ae4e41e720c2b70087d9775a8cb85bb756f2cc8bcbcb24d0";
		// System.out.println("encrypt('Ef!%qKd3$2b') : "+encrypt(salt, "Ef!%qKd3$2b",ITER_FULL));
		// System.out.println("encrypt('3s9dkf@Q)34WKZ,e') : "+encrypt(salt, "3s9dkf@Q)34WKZ,e",ITER_FULL));
		// System.out.println("encrypt('c,DksEI%@8WE^% sq') : "+encrypt(salt, "c,DksEI%@8WE^% sq",ITER_FULL));
		// System.out.println("encrypt(' a528wdf329') : "+encrypt(salt, " a528wdf329",ITER_FULL));
		// System.out.println("encrypt('347958416') : "+encrypt(salt, "347958416",ITER_FULL));

		// int k=-100%1000;
		// System.out.println(k);
		// k=(int)((-100&0xffff_ffffL)%1000);
		// System.out.println(k);

		// k=1;
		// for (int i=0;i<100;i++) {
		// 	System.out.println(
		// 		pad(Integer.toString(i), 2)+" : "
		// 		+k+" : "
		// 		+pad(Integer.toString(k), 10)+" : "
		// 		+pad(Integer.toHexString(k), 8)+" : "
		// 		+pad(Integer.toBinaryString(k), 32) );
		// 	k=k*-3;
		// }

		// k=0x7fff_ffff;
		// for (int i=0;i<10;i++) {
		// 	System.out.println(
		// 		pad(Integer.toString(i), 2)+" : "
		// 		+k+" : "
		// 		+pad(Integer.toString(k), 10)+" : "
		// 		+pad(Integer.toHexString(k), 8)+" : "
		// 		+pad(Integer.toBinaryString(k), 32) );
		// 	k=k*0x7fff_ffff;
		// }
	}
}