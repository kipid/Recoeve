package kipid.hello;

import java.lang.Comparable;
import java.util.Random;

class Sort {
public static Random random = new Random();
public static void putRandoms(int[] A, int bound) {
	for (int i=0; i<A.length; i++) {
		A[i] = random.nextInt(bound); // [0, bound) random number
	}
}
public static void putRandoms(int[] A) {
	putRandoms(A, 100);
}
public static void printIntArray(int[] A) {
	for (int i: A)
		System.out.print(i+"  ");
}
public static void printIntArray(int[] A, int[] i) {
	for (int j=0; j<i.length; j++)
		System.out.print(A[i[j]]+"  ");
}
public static void checkSorted(int[] A) {
	boolean bSorted = true;
	for (int i=1; i<A.length; i++) {
		if (A[i-1] > A[i]) {
			bSorted = false;
			break;
		}
	}
	System.out.println("\nSorted? : "+bSorted);
}
public static void checkSorted(int[] A, int[] iSorted) {
	boolean bSorted = true;
	for (int i=1; i<iSorted.length; i++) {
		if (A[iSorted[i-1]] > A[iSorted[i]]) {
			bSorted = false;
			break;
		}
	}
	System.out.println("\nSorted? : "+bSorted);
}

public static void insSort(int[] A) {
	for (int i=1; i<A.length; i++) // Insert i'th record
		for (int j=i; (j>0) && (A[j-1]>A[j]); j--) {
			int p=A[j-1]; A[j-1]=A[j]; A[j]=p;
		}
}
public static void insSortShift(int[] A) {
	for (int i=1; i<A.length; i++) { // Insert i'th record
		int temp = A[i];
		int j=i;
		for (; (j>0) && (A[j-1]>temp); j--)
			A[j] = A[j-1];
		A[j] = temp;
	}
}
public static void bubbleSort(int[] A) {
	for (int n=A.length; n>1;) {
		System.out.println("n : "+n);
		int newn = 1;
		for (int j=1; j<n; j++) {
			if (A[j-1] > A[j]) {
				int p=A[j-1]; A[j-1]=A[j]; A[j]=p;
				newn = j; // 마지막 swap 위치 저장.
			}
		}
		n = newn; // 마지막 swap 이후는 다 정렬이 되었다는 뜻이니 다음번 routine 에서는 여기까지만 돌리면 됨.
	}
}
public static void selSort(int[] A) {
	for (int n=A.length-1; n>0; n--) {
		int maxIndex = n;
		for (int j=maxIndex-1; j>=0; j--) // Finding max value
			if (A[j] > A[maxIndex]) // Found something bigger
				maxIndex = j; // Remember the bigger index
		// swap(A, maxIndex, n); // Put it into place
		int p=A[maxIndex]; A[maxIndex]=A[n]; A[n]=p;
	}
}
public static int[] stableSelSort(int[] A) {
	int[] sorted = new int[A.length];
	boolean[] bSorted = new boolean[A.length];
	for (int n=0; n<A.length; n++) {
		bSorted[n] = false;
	}
	for (int n=0; n<A.length; n++) {
		int minIndex = 0;
		for (; minIndex<A.length && bSorted[minIndex];)
			minIndex++;
		for (int j=minIndex+1; j<A.length; j++) // Finding the next min value
			if (!bSorted[j] && A[j]<A[minIndex]) // Found something smaller
				minIndex = j; // Remember the smaller index
		bSorted[minIndex] = true;
		sorted[n] = minIndex;
	}
	return sorted;
}

public static void main(String... args){
	System.out.println("Sorting int array :");
	int[] intArray = {8, 100, 2, 42, 57, 15, 66, 23, 0, -5, 77, 102, 150, 230};
	printIntArray(intArray);
	System.out.println("\nSorting...");
	insSortShift(intArray);
	printIntArray(intArray);
	checkSorted(intArray);
	
	/////////////////////////////////////////////
	// Random int array
	/////////////////////////////////////////////
	System.out.println("\nSorting random int array :");
	int[] randomIntArray = new int[30];
	putRandoms(randomIntArray, 300);
	printIntArray(randomIntArray);
	System.out.println("\nSorting...");
	insSortShift(randomIntArray);
	printIntArray(randomIntArray);
	checkSorted(randomIntArray);
	
	System.out.println("\nSorting random int array :");
	putRandoms(randomIntArray, 300);
	printIntArray(randomIntArray);
	System.out.println("\nSorting...");
	int[] iSorted = stableSelSort(randomIntArray);
	printIntArray(randomIntArray, iSorted);
	checkSorted(randomIntArray, iSorted);
	
	/////////////////////////////////////////////
	// Comparable
	/////////////////////////////////////////////
	Comparable c0 = new Integer(10);
	Comparable c1 = 10;
}
}