// 문제) ‘숫자와 카운트’ 수열은 다음과 같습니다.
// 1, 11, 12, 1121, 122111, 112213 …
// 양의 정수 n이 주어졌을때, 수열의 n번째의 수를 반환하는 함수를 작성하세요.

// numAndCount(1) => 1
// numAndCount(2) => 11 : 1이1개
// numAndCount(3) => 12 : 1이2개
// numAndCount(4) => 1121 : 1이1개, 2가1개
// numAndCount(5) => 122111 : 1이2개, 2가1개, 1이1개

package kipid.hello;

public class Test {
	public static String numAndCount(int n) {
		if (n<1) {
			return "";
		} else if (n==1) {
			return "1";
		} else {
			String res="";
			String pre=numAndCount(n-1);
			for(int i=0;i<pre.length();) {
				String a=pre.substring(i,i+1);
				int count=1;
				while(++i<pre.length()&&a.equals(pre.substring(i,i+1))) {
					count++;
				}
				res+=a+String.valueOf(count);
			}
			return res;
		}
	}
	
	public static void main(String... args) {
		System.out.println(numAndCount(0));
		System.out.println(numAndCount(1));
		System.out.println(numAndCount(2));
		System.out.println(numAndCount(3));
		System.out.println(numAndCount(4));
		System.out.println(numAndCount(5));
		System.out.println(numAndCount(6));
		System.out.println(numAndCount(7));
		System.out.println(numAndCount(8));
		System.out.println(numAndCount(9));
		System.out.println(numAndCount(10));
		System.out.println(numAndCount(11));
		System.out.println(numAndCount(12));
		System.out.println(Long.toString(Long.MAX_VALUE, 16));
	}
}