package kipid.hello;

import static java.lang.Math.*;

class Hello {
	public static void main(String... args) {
		System.out.println("Hello World! 한글!");
		for (int i=0; i<args.length; i++) {
			System.out.println("Hello "+args[i]);
		}
		// System.out.println(cos(PI));
	}
}