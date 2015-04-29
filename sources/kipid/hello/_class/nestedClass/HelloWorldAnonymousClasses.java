package kipid.hello._class.nestedClass;

public class HelloWorldAnonymousClasses {
	interface HelloWorld {
		public void greet();
		public void greetSomeone(String someone);
	}
	
	public void sayHello() {
		// public class Something {} // error: illegal start of expression. // inner class cannot be public.
		class EnglishGreeting implements HelloWorld {
			static final int a=0;
			String name="world";
			
			public void greet() {
				greetSomeone(name);
			}
			public void greetSomeone(String someone) {
				name=someone;
				System.out.println("Hello "+name);
			}
		}

		HelloWorld englishGreeting=new EnglishGreeting();
		HelloWorld frenchGreeting=new EnglishGreeting() {
			// This is an instance which extends EnglishGreeting.
			{name="tout le monde";}
			
			public void greetSomeone(String someone) {
				name=someone;
				System.out.println("Salut "+name);
			}
		};
		HelloWorld spanishGreeting=new EnglishGreeting() {
			// This is an instance which extends EnglishGreeting.
			static final int a=1; // This is legal, but you cannot access this variable from outside.
			{name="mundo";}
			
			public void greetSomeone(String someone) {
				name=someone;
				System.out.println("Hola, "+name);
				System.out.println("a in spanishGreeting: "+a); // 1
				System.out.println("super.a in spanishGreeting: "+super.a); // 0
			}
			public int getA(){ // Cannot be called from outside.
				return a;
			}
			public int getSuperA(){ // Cannot be called from outside.
				return super.a;
			}
		};
		englishGreeting.greet();
		englishGreeting.greetSomeone("Fred");
		System.out.println("englishGreeting.name: "+((EnglishGreeting)englishGreeting).name);
		frenchGreeting.greet();
		frenchGreeting.greetSomeone("Fred");
		spanishGreeting.greet();
		spanishGreeting.greetSomeone("Fred");
		System.out.println("spanishGreeting.a: "+((EnglishGreeting)spanishGreeting).a); // 0
		// System.out.println("spanishGreeting.name: "+spanishGreeting.name); // error: cannot find symbol // why?? spanishGreeting is "interface HelloWorld".
	}

	public static void main(String... args) {
		HelloWorldAnonymousClasses myApp=new HelloWorldAnonymousClasses();
		myApp.sayHello();
	}
}