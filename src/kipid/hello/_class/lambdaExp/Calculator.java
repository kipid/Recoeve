package kipid.hello._class.lambdaExp;

public class Calculator {
	interface IntegerMath {
		int operation(int a, int b);
		// int some(); // error: incompatible types: IntegerMath is not a functional interface
	}

	public int operateBinary(int a, int b, IntegerMath op) {
		return op.operation(a, b);
	}

	public static void main(String... args) {
		Calculator myApp = new Calculator();
		// IntegerMath addition = (a, b) -> "a+b"; // error: incompatible types: bad return type in lambda expression /// Complier detects types automatically.
		// IntegerMath addition = (int a, double b) -> a+b; // error: incompatible types: incompatible parameter types in lambda expression
		IntegerMath addition = (int a, int b) -> a+b;
		IntegerMath subtraction = (a, b) -> a-b;
		IntegerMath multiplication = (a, b) -> a*b;
		System.out.println("40 + 2 = "+myApp.operateBinary(40, 2, addition));
		System.out.println("20 - 10 = "+myApp.operateBinary(20, 10, subtraction));
		System.out.println("20 * 10 = "+myApp.operateBinary(20, 10, multiplication));
	}
}