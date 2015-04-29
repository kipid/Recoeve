package recoeve.db;

import java.lang.StringBuilder;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;



public class Similarity {
	public static final int MAX_DEPTH=2;
	public long user_i;
	public Category cats_i;
	public long user_j;
	public Map<String, Map<String, Sim>> map;
	public class Sim {
		public long sumSim;
		public int nSim;
		public Sim() {
			sumSim=0;
			nSim=0;
		}
		public Sim(long simSingle) {
			sumSim=simSingle;
			nSim=1;
		}
		public void add(long simSingle) {
			sumSim+=simSingle;
			nSim++;
		}
		public boolean remove(long simSingle) {
			if (nSim>0&&sumSim>=simSingle) {
				sumSim-=simSingle;
				nSim--;
				return true;
			}
			return false;
		}
		public String toString() {
			return ""+nSim+" , "+sumSim+" , "+Similarity.simAvg100(sumSim, nSim);
		}
		public int simAvg100() {
			return Similarity.simAvg100(sumSim, nSim);
		}
	}
	
	public Similarity(long user1, Category cats1, long user2) {
		user_i=user1;
		cats_i=cats1;
		user_j=user2;
		map=new HashMap<String, Map<String, Sim>>();
		for (String superCat: cats_i.setOfSuperCats) {
			if (Category.depthOfCat(superCat)<=Similarity.MAX_DEPTH) {
				map.put(superCat, new HashMap<String,Sim>());
			}
		}
	}
	
	public void add(Category cats1, Category cats2, double d) {
		long simSingle=sim(d);
		for (String superCat1: cats1.setOfSuperCats) {
			Map<String,Sim> map1=map.get(superCat1);
			if (map1!=null) {
				for (String superCat2: cats2.setOfSuperCats) {
					Sim sim=map1.get(superCat2);
					if (sim!=null) {
						sim.add(simSingle);
					} else {
						if (Category.depthOfCat(superCat2)<=Similarity.MAX_DEPTH) {
							map1.put(superCat2, new Sim(simSingle));
						}
					}
				}
			}
		}
	}
	
	public static long sim(double d) {
		return Math.round(100/(1+d*d*50));
	}
	public static int simAvg100(long sumSim, int nSim) {
		return (int)Math.round(100*sumSim/(nSim>5?nSim:5));
	}
	
	public String toString() {
		StringBuilder sb=new StringBuilder();
		for (Map.Entry<String, Map<String, Sim>> entry1: map.entrySet()) {
			sb.append(entry1.getKey()+"\n");
			for (Map.Entry<String, Sim> entry2: entry1.getValue().entrySet()) {
				sb.append("  , "+entry2.getKey()+" : "+entry2.getValue()+"\n");
			}
			sb.append("\n");
		}
		return sb.toString();
	}
	
	public static void main(String... args) {
		Category cats=new Category("ABC--DEF--KGB;Music--K-pop");
		Similarity s=new Similarity(1, cats, 2);
		s.add(cats, new Category("KK--DD"), 0.1);
		s.add(new Category("ABC--DEF--GH;Music--O"), new Category("KK--DD--GG"), -0.3);
		s.add(new Category("ABC--DEF--GH;Music--O"), new Category("KK"), 0.15);
		System.out.println(s);
		// System.out.println(simAvg100(100, 4));
	}
}