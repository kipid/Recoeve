// package kipid.hello;

// class Variables{
// 	public static void main(String... args){
// 		// 1: 8 bit.
// 		byte	byteV;

// 		// 2: 16 bit.
// 		short	shortV;

// 		// 3: 32 bit.
// 		int		intV;

// 		// 4: 64 bit.
// 		long	longV;

// 		// 5: 32 bit.
// 		float	floatV;

// 		// 6: 64 bit.
// 		double	doubleV;

// 		// 7: 1 bit(?). No precise size! But just 1 bit information.
// 		boolean	booleanV;

// 		// 8: 16 bit.
// 		char	charV;

// 		// String object.
// 		String	s= "this is a string";


// 		// System.out.println(intV); // error: not initialized
// 		// System.out.println(intV=0); // 0
// 		// System.out.println(s); // this is a string
// 		// s= "Korean in UTF-8"; // error: unmappable character for encoding MS949
// 		// System.out.println(s);

// 		// booleanV= true;
// 		// System.out.println(booleanV); // true
// 		// floatV= 123.4567; // error: incompatible types
// 		// floatV= 123.4567f;
// 		// System.out.println(floatV); // 123.4567
// 		// floatV= 1.234567e2f;
// 		// System.out.println(floatV); // 123.4567
// 		// doubleV= 123.4567;
// 		// System.out.println(doubleV); // 123.4567
// 		// doubleV= 1.234567e2;
// 		// System.out.println(doubleV); // 123.4567
// 		// doubleV= 1.234567e2f; // no error
// 		// System.out.println(doubleV); // 123.45670318603516
// 		// charV= 'C';
// 		// System.out.println("charV: "+charV); // charV: C
// 		// charV= '\u0108';
// 		// System.out.println("charV: "+charV); // charV: ?
// 		// charV= '\u00ed';
// 		// System.out.println("charV: "+charV); // charV: ?
// 		// charV= 0x0fad;
// 		// System.out.println("charV: "+charV); // charV: ?
// 		// intV= 0b1000;
// 		// System.out.println(intV); // 8
// 		// intV= 0x1000;
// 		// System.out.println(intV); // 4096
// 		// intV= 0xFF; // 0xF == 0b1111
// 		// System.out.println(intV); // 255
// 		// intV= 0b1111_1111;
// 		// System.out.println(intV); // 255
// 		// intV= 0b1111_1111_1111_1111_1111_1111_1111_1111;
// 		// System.out.println(intV); // -1
// 		// intV= 0b0111_1111_1111_1111_1111_1111_1111_1111;
// 		// System.out.println(intV); // 2147483647
// 		// intV++; // no error
// 		// System.out.println(intV); // -2147483648
// 		// intV= 3048L; // error
// 		longV= 3047L;
// 		System.out.println(longV); // 3047
// 		// longV= 0b0111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111; // error: integer number too large
// 		longV= 0b0111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111_1111L;
// 		System.out.println(longV); // 9223372036854775807
// 		longV++;
// 		System.out.println(longV); // -9223372036854775808
// 		longV= 5_________2;
// 		System.out.println(longV); // 52
// 	}
// }