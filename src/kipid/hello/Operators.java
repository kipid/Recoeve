package kipid.hello;

class Operators{
	public static void main(String... args){
		int	intV=0;
		
		System.out.println(intV++); // 0
		System.out.println(++intV); // 2
		
		int a=intV++;
		System.out.println(a); // 2
		
		System.out.println(intV); // 3
		intV=intV++;
		System.out.println(intV); // 3
		intV=intV+++1;
		System.out.println(intV); // 4
		// intV=1+++intV; // error
		intV=1+(++intV);
		System.out.println(intV); // 6
		intV=1+(intV++);
		System.out.println(intV); // 7
		
		intV=0b1;
		System.out.println(intV); // 1
		// 0b0_0001
		System.out.println(intV<<1); // 2
		// 0b0_0010
		System.out.println(intV<<2); // 4
		// 0b0_0100
		System.out.println(intV<<31); // -2147483648
		// 0b1000_0......
		System.out.println(intV<<32); // 1
		// 0b0_0001 // strange. (%32 implicitly?)
		System.out.println(intV<<33); // 2
		// 0b0_0010
		
		intV= intV<<31;
		System.out.println(intV<<1); // 0
		System.out.println(intV<<2); // 0
		
		System.out.println(intV>>1); // 0
		// 0b0_0000
		
		intV=-2147483648;
		// 0b1000_0......
		System.out.println(intV<<1); // 0
		// 0b0000_0...... // strange.
		System.out.println(intV>>1); // -1073741824
		// 0b1100_0......
		System.out.println(intV>>2); // -536870912
		// 0b1110_0......
		System.out.println(intV>>31); // -1
		// 0b1111_1......
		System.out.println(intV>>32); // -2147483648
		// 0b1000_0...... // strange (%32 implicitly?)
		System.out.println(intV>>>1); // 1073741824
		// 0b0100_0......
		System.out.println(intV>>>2); // 536870912
		// 0b0010_0......
		System.out.println(intV>>>31); // 1
		// 0b0_0001
		
		System.out.println("New Test!");
		intV= intV>>31;
		// 0b1111_1......
		System.out.println(intV); // -1
		System.out.println(intV>>1); // -1
		
		System.out.println(1==1); // true
		System.out.println(1==2); // false
		
		// instanceof
	}
}