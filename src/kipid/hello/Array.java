package kipid.hello;

class Array{
	public static void main(String... args){
		int[]	intArray;
		intArray= new int[10];
		
		for(int i=0;i<10;i++){
			intArray[i]= i+1;
		}
		
		// System.out.println(i); // error: cannot find symbol
		System.out.println(intArray[0]); // 1
		
		for(int i=0;i<10;i++){
			System.out.println(intArray[i]);
			int j=11;
			j+=11;
			System.out.println(j);
		}
		// System.out.println(j); // error: cannot find symbol
		
		for(int i: intArray){
			System.out.println(i);
		}
		System.out.println("\nintArray.length: "+intArray.length);
		
		//////////////////////////////////////////////////
		// Map data is also possible in "for ( : )"
		//////////////////////////////////////////////////
		// StringBuilder sb = new StringBuilder();
		// for (Map.Entry<String, String> header: req.headers().entries()) {
		// 	sb.append("<b>").append(header.getKey()).append("</b>: ").append(header.getValue()).append("<br>\n");
		// }
		
		int[]	anArray= {100, 200, 300, 400, 500};
		
		System.out.println("\nanArray is printing: ");
		for(int i: anArray){
			System.out.println(i);
		}
		System.out.println("\nanArray is printing: ");
		for(int i=0;i<anArray.length;i++){
			System.out.println(anArray[i]);
		}
		// anArray= {300, 200, 100, 0, 100, 200, 300, 400, 500}; // error
		// anArray= {100, 200, 300, 400, 600}; // error
		
		char[] copyFrom = {'d', 'e', 'c', 'a', 'f', 'f', 'e', 'i', 'n', 'a', 't', 'e', 'd'};
		char[] copyTo0 = new char[9];
		System.arraycopy(copyFrom, 2, copyTo0, 0, 7);
		System.out.println(new String(copyTo0)); // caffein NUL NUL
		
		// char[] copyTo1 = new char[6];
		// System.arraycopy(copyFrom, 2, copyTo1, 0, 7); // Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException
		
		char[] copyTo = java.util.Arrays.copyOfRange(copyFrom, 2, 7);
		System.out.println(new String(copyTo)); // caffein
		
		int[][]	intArray2D= {{1,2,3},{1},{1,2,3,4,5,6,7,8,9},{1,2,3}};
		System.out.println("intArray2D.length: "+intArray2D.length); // 4
		for(int[] i: intArray2D){
			for(int j: i){
				System.out.print(j+" ");
			}
			System.out.println("intArray2D[i].length: "+i.length); // 3, 1, 9, 3
		}
	}
}