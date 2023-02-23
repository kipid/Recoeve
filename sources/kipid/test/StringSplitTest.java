package kipid.test;

public class StringSplitTest {
	public static void main(String... args){
		String path="/user/kipid";
		String[] pathSplit=path.split("/");
		System.out.println("path="+path);
		System.out.println("length: "+pathSplit.length);
		for (String split: pathSplit) {
			System.out.println(split);
		}

		path="/";
		pathSplit=path.split("/");
		System.out.println("path="+path);
		System.out.println("length: "+pathSplit.length);
		for (String split: pathSplit) {
			System.out.println(split);
		}

		path="/jquery.min.js";
		pathSplit=path.split("/");
		System.out.println("path="+path);
		System.out.println("length: "+pathSplit.length);
		for (String split: pathSplit) {
			System.out.println(split);
		}

		path="/CDN/icon-Kakao.png";
		pathSplit=path.split("/");
		System.out.println("path="+path);
		System.out.println("length: "+pathSplit.length);
		for (String split: pathSplit) {
			System.out.println(split);
		}
	}
}