package kipid.hello;

import java.lang.Comparable;
import java.util.Random;

class Sort {
public static Random random=new Random();
public static void putRandoms(int[] A, int bound) {
	for (int i=0; i<A.length; i++) {
		A[i]=random.nextInt(bound); // [0, bound) random number
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
	boolean bSorted=true;
	for (int i=1; i<A.length; i++) {
		if (A[i-1] > A[i]) {
			bSorted=false;
			break;
		}
	}
	System.out.println("\nSorted? : "+bSorted);
}
public static void checkSorted(int[] A, int[] iSorted) {
	boolean bSorted=true;
	for (int i=1; i<iSorted.length; i++) {
		if (A[iSorted[i-1]] > A[iSorted[i]]) {
			bSorted=false;
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
		int temp=A[i];
		int j=i;
		for (; (j>0) && (A[j-1]>temp); j--)
			A[j]=A[j-1];
		A[j]=temp;
	}
}
public static void bubbleSort(int[] A) {
	for (int n=A.length; n>1;) {
		System.out.println("n : "+n);
		int newn=1;
		for (int j=1; j<n; j++) {
			if (A[j-1] > A[j]) {
				int p=A[j-1]; A[j-1]=A[j]; A[j]=p;
				newn=j; // 마지막 swap 위치 저장.
			}
		}
		n=newn; // 마지막 swap 이후는 다 정렬이 되었다는 뜻이니 다음번 routine 에서는 여기까지만 돌리면 됨.
	}
}
public static void selSort(int[] A) {
	for (int n=A.length-1; n>0; n--) {
		int maxIndex=n;
		for (int j=maxIndex-1; j>=0; j--) // Finding max value
			if (A[j] > A[maxIndex]) // Found something bigger
				maxIndex=j; // Remember the bigger index
		// swap(A, maxIndex, n); // Put it into place
		int p=A[maxIndex]; A[maxIndex]=A[n]; A[n]=p;
	}
}
public static int[] stableSelSort(int[] A) {
	int[] sorted=new int[A.length];
	boolean[] bSorted=new boolean[A.length];
	for (int n=0; n<A.length; n++) {
		bSorted[n]=false;
	}
	for (int n=0; n<A.length; n++) {
		int minIndex=0;
		for (; minIndex<A.length && bSorted[minIndex];)
			minIndex++;
		for (int j=minIndex+1; j<A.length; j++) // Finding the next min value
			if (!bSorted[j] && A[j]<A[minIndex]) // Found something smaller
				minIndex=j; // Remember the smaller index
		bSorted[minIndex]=true;
		sorted[n]=minIndex;
	}
	return sorted;
}

public static void quickSort(int[] A, int i, int j) {
	int pivotIndex=findPivot(A, i, j); // Pick a pivot
	int temp=A[j]; A[j]=A[pivotIndex]; A[pivotIndex]=temp; // Stick pivot at end
	// k will be the first position in the right subarray
	int k=partition(A, i, j-1, A[j]);
	temp=A[k]; A[k]=A[j]; A[j]=temp;
	if (k-i>1) quickSort(A, i, k-1); // Sort left partition
	if (j-k>1) quickSort(A, k+1, j); // Sort right partition
}
public static int findPivot(int[] A, int i, int j) {
	return (i+j)/2;
}
public static int partition(int[] A, int left, int right, int pivot) {
	while (left <= right) { // Move bounds inward until they meet
		while (A[left]<pivot) left++;
		while ((right>=left) && (A[right]>=pivot)) right--;
		if (right > left) {
			int temp=A[left]; A[left]=A[right]; A[right]=temp;
		} // Swap out-of-place values
	}
	return left; // Return first position in right partition
}

public static void mergeSort(int[] A, int[] temp, int left, int right) {
  if (left==right) return;         // List has one record
  int mid=(left+right)/2;          // Select midpoint
  mergeSort(A, temp, left, mid);     // Mergesort first half
  mergeSort(A, temp, mid+1, right);  // Mergesort second half
  for (int i=left; i<=right; i++)    // Copy subarray to temp
    temp[i]=A[i];
  // Do the merge operation back to A
  int i1=left;
  int i2=mid+1;
  for (int curr=left;curr<=right;curr++) {
    if (i1==mid+1)                 // Left sublist exhausted
      A[curr]=temp[i2++];
    else if (i2>right)             // Right sublist exhausted
      A[curr]=temp[i1++];
    else if (temp[i1]<=temp[i2])  // Get smaller value
      A[curr]=temp[i1++];
    else
      A[curr]=temp[i2++];
  }
}

public static void mergeSort1(int[] A, int[] temp, int left, int right) {
  if (right-left<=1) return;         // List has one record
  int mid=(left+right)/2;          // Select midpoint
  mergeSort1(A, temp, left, mid);     // Mergesort first half
  mergeSort1(A, temp, mid, right);  // Mergesort second half
  for (int i=left; i<right; i++)    // Copy subarray to temp
    temp[i]=A[i];
  // Do the merge operation back to A
  int i1=left;
  int i2=mid;
  for (int curr=left;curr<right;curr++) {
    if (i1==mid)                 // Left sublist exhausted
      A[curr]=temp[i2++];
    else if (i2==right)             // Right sublist exhausted
      A[curr]=temp[i1++];
    else if (temp[i1]<=temp[i2])  // Get smaller value
      A[curr]=temp[i1++];
    else
      A[curr]=temp[i2++];
  }
}

public static void heapSort(int[] A) {
// Max-heap implementation
class MaxHeap {
  private int[] Heap; // Pointer to the heap array
  private int size; // Maximum size of the heap
  private int n; // Number of things now in heap

  // Constructor supporting preloading of heap contents
  MaxHeap(int[] h, int num, int max) {
  	Heap=h; n=num; size=max;
  	buildheap();
  }

  // Return current size of the heap
  int heapsize() { return n; }

  // Return true if pos a leaf position, false otherwise
  boolean isLeaf(int pos) { return (pos>=n/2)&&(pos<n); }

  // Return position for left child of pos
  int leftchild(int pos) {
    if (pos>=n/2) return -1;
    return 2*pos+1;
  }

  // Return position for right child of pos
  int rightchild(int pos) {
    if (pos>=(n-1)/2) return -1;
    return 2*pos+2;
  }

  // Return position for parent
  int parent(int pos) {
    if (pos<=0) return -1;
    return (pos-1)/2;
  }

  // Insert val into heap
  void insert(int key) {
    if (n>=size) {
      System.out.println("Heap is full");
      return;
    }
    int curr=n++;
    Heap[curr]=key;  // Start at end of heap
    // Now sift up until curr's parent's key > curr's key
    while ((curr!=0)&&(Heap[curr]>Heap[parent(curr)])) {
      int p=parent(curr);
      int temp=Heap[curr]; Heap[curr]=Heap[p]; Heap[p]=temp;
      curr=p;
    }
  }

  // Heapify contents of Heap
  void buildheap() {
  	for (int i=n/2-1;i>=0;i--) siftdown(i);
  }

  // Put element in its correct place
  void siftdown(int pos) {
    if ((pos<0)||(pos>=n)) return; // Illegal position
    while (!isLeaf(pos)) {
      int j=leftchild(pos);
      if ((j<(n-1))&&(Heap[j]<Heap[j+1]))
        j++; // j is now index of child with greater value
      if (Heap[pos]>=Heap[j]) return;
      int temp=Heap[pos]; Heap[pos]=Heap[j]; Heap[j]=temp;
      pos=j;  // Move down
    }
  }

  // Remove and return maximum value
  int removemax() {
    if (n==0) return -1;  // Removing from empty heap
    int temp=Heap[0]; Heap[0]=Heap[--n]; Heap[n]=temp; // Swap maximum with last value
    if (n!=0)      // Not on last element
      siftdown(0);  // Put new heap root val in correct place
    return Heap[n];
  }

  // Remove and return element at specified position
  int remove(int pos) {
    if ((pos<0)||(pos>=n)) return -1; // Illegal heap position
    if (pos==(n-1)) n--; // Last element, no work to be done
    else {
    	 int temp=Heap[pos]; Heap[pos]=Heap[--n]; Heap[n]=temp; // Swap with last value
      // If we just swapped in a big value, push it up
      while ((pos>0)&&(Heap[pos]>Heap[parent(pos)])) {
        int p=parent(pos);
        int temp1=Heap[pos]; Heap[pos]=Heap[p]; Heap[p]=temp1;
        pos=p;
      }
      if (n!=0) siftdown(pos); // If it is little, push down
    }
    return Heap[n];
  }
}

  // The heap constructor invokes the buildheap method
  MaxHeap H=new MaxHeap(A, A.length, A.length);
  for (int i=0; i<A.length; i++)  // Now sort
    H.removemax(); // Removemax places max at end of heap
}

public static void heapSort1(int[] A) {
// Max-heap implementation
class MaxHeap {
  private int[] Heap; // Pointer to the heap array
  private int size; // Maximum size of the heap
  private int n; // Number of things now in heap

  // Constructor supporting preloading of heap contents
  MaxHeap(int[] h, int num, int max) {
  	Heap=h; n=num; size=max;
  	buildheap();
  }

  // Return current size of the heap
  int heapsize() { return n; }

  // Return true if pos a leaf position, false otherwise
  boolean isLeaf(int pos) { return (pos>=n/2)&&(pos<n); }

  // Return position for left child of pos
  int leftchild(int pos) {
    if (pos>=n/2) return -1;
    return 2*pos+1;
  }

  // Return position for right child of pos
  int rightchild(int pos) {
    if (pos>=(n-1)/2) return -1;
    return 2*pos+2;
  }

  // Return position for parent
  int parent(int pos) {
    if (pos<=0) return -1;
    return (pos-1)/2;
  }

  // Heapify contents of Heap
  void buildheap() {
  	for (int i=n/2-1;i>=0;i--) siftdown(i);
  }

  // Put element in its correct place
  int siftdown(int pos) {
    if ((pos<0)||(pos>=n)) return pos; // Illegal position
    while (!isLeaf(pos)) {
      int j=leftchild(pos);
      if ((j<(n-1))&&(Heap[j]<Heap[j+1]))
        j++; // j is now index of child with greater value
      if (Heap[pos]>=Heap[j]) return pos;
      int temp=Heap[pos]; Heap[pos]=Heap[j]; Heap[j]=temp;
      pos=j;  // Move down
    }
    return pos;
  }
  
  int siftup(int pos) {
  	if ((pos<0)||(pos>=n)) return pos; // Illegal position
  	while (pos>0) {
  		int p=parent(pos);
  		if (Heap[pos]<=Heap[p]) return pos;
  		int temp=Heap[pos]; Heap[pos]=Heap[p]; Heap[p]=temp;
  		pos=p;
  	}
  	return pos;
  }

  // Remove and return maximum value
  int removemax() {
    if (n==0) return -1;  // Removing from empty heap
    int temp=Heap[0]; Heap[0]=Heap[--n]; Heap[n]=temp; // Swap maximum with last value
    siftdown(0);  // Put new heap root val in correct place
    return Heap[n];
  }

  // Remove and return element at specified position
  int remove(int pos) {
    if ((pos<0)||(pos>=n)) return -1; // Illegal heap position
    if (pos==(n-1)) n--; // Last element, no work to be done
    else {
    	 int temp=Heap[pos]; Heap[pos]=Heap[--n]; Heap[n]=temp; // Swap with last value
      pos=siftup(pos); // If we just swapped in a big value, push it up
      siftdown(pos); // If it is little, push down
    }
    return Heap[n];
  }
}

  // The heap constructor invokes the buildheap method
  MaxHeap H=new MaxHeap(A, A.length, A.length);
  for (int i=0; i<A.length; i++)  // Now sort
    H.removemax(); // Removemax places max at end of heap
}

public static void countingSort(int[] A, int max) {
	int[] counter=new int[max];
	for (int i=0;i<max;i++) { counter[i]=0; }
	for (int i=0;i<A.length;i++) { counter[A[i]]++; }
	for (int i=1;i<max;i++) { counter[i]+=counter[i-1]; }
	int[] Acopy=new int[A.length];
	for (int i=0;i<A.length;i++) { Acopy[i]=A[i]; }
	for (int i=A.length-1;i>=0;i--) { A[--counter[Acopy[i]]]=Acopy[i]; }
}

public static void radixSort(int[] A, int k, int r) {
  int[] B=new int[A.length];
  int[] count=new int[r];     // Count[i] stores number of records with digit value i
  int i, j, rtok;

  for (i=0, rtok=1; i<k; i++, rtok*=r) { // For k digits
    for (j=0; j<r; j++) count[j]=0;    // Initialize count

    // Count the number of records for each bin on this pass
    for (j=0; j<A.length; j++) count[(A[j]/rtok)%r]++;

    // count[j] will be index in B for last slot of bin j.
    for (j=1; j<r; j++) count[j]+=count[j-1];

    // Put records into bins, working from bottom of bin
    // Since bins fill from bottom, j counts downwards
    for (j=A.length-1; j>=0; j--) {
      B[--count[(A[j]/rtok)%r]]=A[j];
    }
    for (j=0; j<A.length; j++) A[j]=B[j]; // Copy B back
  }
}

public static void main(String... args){
	System.out.println("Sorting int array :");
	int[] intArray={8, 100, 2, 42, 57, 15, 66, 23, 0, -5, 77, 102, 150, 230};
	printIntArray(intArray);
	System.out.println("\nSorting... insSortShift");
	insSortShift(intArray);
	printIntArray(intArray);
	checkSorted(intArray);
	
	/////////////////////////////////////////////
	// Random int array
	/////////////////////////////////////////////
	System.out.println("\nSorting random int array :");
	int[] randomIntArray=new int[30];
	putRandoms(randomIntArray, 300);
	printIntArray(randomIntArray);
	System.out.println("\nSorting... insSortShift");
	insSortShift(randomIntArray);
	printIntArray(randomIntArray);
	checkSorted(randomIntArray);
	
	System.out.println("\nSorting random int array :");
	putRandoms(randomIntArray, 300);
	printIntArray(randomIntArray);
	System.out.println("\nSorting... stableSelSort");
	int[] iSorted=stableSelSort(randomIntArray);
	printIntArray(randomIntArray, iSorted);
	checkSorted(randomIntArray, iSorted);
	
	/////////////////////////////////////////////
	// Comparable
	/////////////////////////////////////////////
	Comparable c0=Integer.valueOf(10);
	Comparable c1=10;
	
	/////////////////////////////////////////////
	// Random int array, Quick sort
	/////////////////////////////////////////////
	System.out.println("\nSorting random int array :");
	int[] randomIntArray1=new int[30];
	putRandoms(randomIntArray1, 300);
	printIntArray(randomIntArray1);
	System.out.println("\nSorting... quickSort");
	quickSort(randomIntArray1, 0, randomIntArray1.length-1);
	printIntArray(randomIntArray1);
	checkSorted(randomIntArray1);
	
	/////////////////////////////////////////////
	// Random int array, Merge sort
	/////////////////////////////////////////////
	System.out.println("\nSorting random int array :");
	int[] randomIntArray2=new int[30];
	putRandoms(randomIntArray2, 300);
	printIntArray(randomIntArray2);
	System.out.println("\nSorting... mergeSort");
	mergeSort(randomIntArray2, new int[30], 0, randomIntArray2.length-1);
	printIntArray(randomIntArray2);
	checkSorted(randomIntArray2);
	
	System.out.println("\nSorting random int array :");
	int[] randomIntArray2_1=new int[30];
	putRandoms(randomIntArray2_1, 300);
	printIntArray(randomIntArray2_1);
	System.out.println("\nSorting... mergeSort1");
	mergeSort1(randomIntArray2_1, new int[30], 0, randomIntArray2_1.length);
	printIntArray(randomIntArray2_1);
	checkSorted(randomIntArray2_1);
	
	/////////////////////////////////////////////
	// Random int array, Heap sort
	/////////////////////////////////////////////
	System.out.println("\nSorting random int array :");
	int[] randomIntArray3=new int[30];
	putRandoms(randomIntArray3, 300);
	printIntArray(randomIntArray3);
	System.out.println("\nSorting... heapSort");
	heapSort(randomIntArray3);
	printIntArray(randomIntArray3);
	checkSorted(randomIntArray3);
	
	System.out.println("\nSorting random int array :");
	int[] randomIntArray3_1=new int[30];
	putRandoms(randomIntArray3_1, 300);
	printIntArray(randomIntArray3_1);
	System.out.println("\nSorting... heapSort1");
	heapSort1(randomIntArray3_1);
	printIntArray(randomIntArray3_1);
	checkSorted(randomIntArray3_1);
	
	/////////////////////////////////////////////
	// Random int array, Counting sort
	/////////////////////////////////////////////
	System.out.println("\nSorting random int array :");
	int[] randomIntArray4=new int[30];
	int max=10;
	putRandoms(randomIntArray4, max);
	printIntArray(randomIntArray4);
	System.out.println("\nSorting... countingSort");
	countingSort(randomIntArray4, max);
	printIntArray(randomIntArray4);
	checkSorted(randomIntArray4);
	
	/////////////////////////////////////////////
	// Random int array, Radix sort
	/////////////////////////////////////////////
	System.out.println("\nSorting random int array :");
	int[] randomIntArray5=new int[300];
	putRandoms(randomIntArray5, 500);
	printIntArray(randomIntArray5);
	System.out.println("\nSorting... radixSort");
	radixSort(randomIntArray5, 3, 10);
	printIntArray(randomIntArray5);
	checkSorted(randomIntArray5);
}
}