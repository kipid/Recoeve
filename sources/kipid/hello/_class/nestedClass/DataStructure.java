package kipid.hello._class.nestedClass;

public class DataStructure {
	// Create an array
	static private final int SIZE=21;
	private int[] arrayOfInts=new int[SIZE];
	{
		for (int i=0; i<SIZE; i++){
			arrayOfInts[i]=i;
		}
	}
	
	public void printEven() {
		// Print out values of even indices of the array
		java.util.Iterator<Integer> iterator=this.new EvenIterator();
		while (iterator.hasNext()) {
			System.out.print(iterator.next()+" ");
		}
		System.out.println();
	}

	interface DataStructureIterator extends java.util.Iterator<Integer> {}

	// Inner class implements the DataStructureIterator interface, which extends the Iterator<Integer> interface
	private class EvenIterator implements DataStructureIterator {
		// Start stepping through the array from the beginning
		private int nextIndex = 0;

		public boolean hasNext() {
			// Check if the current element is the last in the array
			return (nextIndex<SIZE);
		}
		public Integer next() {
			// Record a value of an even index of the array
			Integer retValue=Integer.valueOf(arrayOfInts[nextIndex]);
			// Get the next even element
			nextIndex+=2;
			return retValue;
		}
	}

	public static void main(String... args){
		// Fill the array with integer values and print out only values of even indices
		DataStructure ds = new DataStructure();
		ds.printEven();
	}
}