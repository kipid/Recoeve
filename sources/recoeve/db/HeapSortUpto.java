package recoeve.db;

import java.util.Arrays;

public class HeapSortUpto {
	public static int[] sort(final int[] arr) {
		return sort(arr, arr.length);
	}
	public static int[] sort(final int[] arr, int upto) {
		int n=arr.length;
		int[] sorted=new int[n];
		for (int i=0;i<n;i++) {
			sorted[i]=i;
		}

		for (int i=n/2-1;i>=0;i--)
			heapify(arr, sorted, n, i);

		upto=upto>n?n:upto;
		int until=n-upto;
		for (int i=n-1;i>=until;i--) {
			int temp=sorted[0];
			sorted[0]=sorted[i];
			sorted[i]=temp;
			heapify(arr, sorted, i, 0);
		}
		return sorted;
	}

	private static void heapify(final int[] arr, int[] sorted, int n, int i) {
		int largest=i;
		int l=2*i+1;
		int r=2*i+2;

		if (l<n&&arr[sorted[l]]>arr[sorted[largest]])
			largest=l;
		if (r<n&&arr[sorted[r]]>arr[sorted[largest]])
			largest=r;
		if (largest!=i) {
			int swap=sorted[i];
			sorted[i]=sorted[largest];
			sorted[largest]=swap;
			heapify(arr, sorted, n, largest);
		}
	}

	public static void main(String[] args) {
		int[] arr={ 12, 11, 13, 100, 203, 305, 102, 21, 5, 6, 7 };
		int[] sorted=sort(arr, 6);
		System.out.println(Arrays.toString(arr));
		for (int i=0;i<sorted.length;i++) {
			System.out.println(arr[sorted[i]]);
		}
	}
}
