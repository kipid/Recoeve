package kipid.hello;

class ReplaceTest{
	public static void main(String... args){
		String str = "abc\ndef\n안녕?";
		System.out.println(str.replaceAll("\\n", "<br/>"));
	}
}