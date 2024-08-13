package kipid.hello._class.nestedClass;

public class LocalClassExample {
	static String regularExpression="[^0-9]";
	// String regularExpression="[^0-9]"; // error: non-static variable regularExpression cannot be referenced from a static context
	
	public static void validatePhoneNumber(String phoneNumber1, String phoneNumber2) {
		// final int numberLength=10; // This is better if an inner class access this.
		int numberLength=10; // This is okay. // Valid in JDK 8 and later.

		// phoneNumber1="another string 123-456"; // error: local variables referenced from an inner class must be final or effectively final
		// numberLength=7; // error: local variables referenced from an inner class must be final or effectively final

		class PhoneNumber {
			String formattedPhoneNumber=null;

			PhoneNumber(String phoneNumber){
				// numberLength=7; // error: local variables referenced from an inner class must be final or effectively final
				String currentNumber=phoneNumber.replaceAll(regularExpression, "");
				if (currentNumber.length()==numberLength)
					formattedPhoneNumber=currentNumber;
				else
					formattedPhoneNumber=null;
			}

			public String getNumber() {
				return formattedPhoneNumber;
			}
			public void printOriginalNumbers() {
			// Valid in JDK 8 and later:
				System.out.println("Original nubmers are "+phoneNumber1+" and "+phoneNumber2);
			}
		}

		PhoneNumber myNumber1=new PhoneNumber(phoneNumber1);
		PhoneNumber myNumber2=new PhoneNumber(phoneNumber2);

		myNumber1.printOriginalNumbers();

		if (myNumber1.getNumber()==null) 
			System.out.println("First number is invalid");
		else
			System.out.println("First number is "+myNumber1.getNumber());
		if (myNumber2.getNumber() == null)
			System.out.println("Second number is invalid");
		else
			System.out.println("Second number is "+myNumber2.getNumber());
		
		// numberLength=7; // error: local variables referenced from an inner class must be final or effectively final
	}
	
	public static void main(String... args) {
		validatePhoneNumber("123-456-7890", "456-7890");
		new InEnglish().sayGoodbyeInEnglish();
	}
}

class InEnglish{
	public void sayGoodbyeInEnglish() {
		class EnglishGoodbye {
			public static final String farewell="Bye bye";
			// public static String farewell="Bye bye"; // error: Illegal static declaration in inner class EnglishGoodbye
			public void sayGoodbye() {
				System.out.println(farewell);
			}
		}
		EnglishGoodbye myEnglishGoodbye=new EnglishGoodbye();
		myEnglishGoodbye.sayGoodbye();
	}
}