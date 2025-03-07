package recoeve.db;

// import java.lang.StringBuilder;

// import java.util.ArrayList;
// import java.util.Map;
// import java.util.HashMap;

public class Similarity {
	public long sumSim;
	public int nSim;
	// public int simAvg100;

	public Similarity() {
		sumSim = 0;
		nSim = 0;
		// simAvg100=0;
	}

	public Similarity(long simSingle) {
		sumSim = simSingle;
		nSim = 1;
		// simAvg100=simAvg100(sumSim, nSim);
	}

	public Similarity(long sumSim, int nSim) {
		this.sumSim = sumSim;
		this.nSim = nSim;
		// this.simAvg100=Similarity.simAvg100(sumSim, nSim);
	}

	public void simpleAdd(long simSingle) {
		sumSim += simSingle;
		nSim++;
	}

	// public void add(long simSingle) {
	// sumSim+=simSingle;
	// nSim++;
	// simAvg100=simAvg100(sumSim, nSim);
	// }
	// public int calc() {
	// simAvg100=simAvg100(sumSim, nSim);
	// }
	public boolean remove(long simSingle) {
		if (nSim > 0 && sumSim >= simSingle) {
			sumSim -= simSingle;
			nSim--;
			// simAvg100=simAvg100(sumSim, nSim);
			return true;
		}
		return false;
	}

	public String toString() {
		return "nSim:" + nSim + ", sumSim" + sumSim;
		// +", simAvg100"+simAvg100;
	}

	public static long sim(double d) {
		return Math.round(100.0 / (1 + d * d * 50));
	}

	public static long sim(Points p1, Points p2) {
		return sim(p1.val() - p2.val());
	}

	public static int simAvg100(long sumSim, int nSim) {
		return (int) Math.round(100.0 * sumSim / (nSim > 5 ? nSim : 5));
	}

	public static void main(String... args) {
	}
}