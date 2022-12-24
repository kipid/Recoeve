package recoeve.db;

public class UserCat {
	public long user_i;
	public String cat_i;

	private static final int prime=31;

	@Override
	public int hashCode() {
		int result=1;
		result=prime*result+(int)user_i;
		result=prime*result+((cat_i==null)?0:cat_i.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this==obj) {return true;}
		if (obj==null) {return false;}
		if (getClass()!=obj.getClass()) {return false;}
		UserCat other=(UserCat)obj;
		if (user_i!=other.user_i) {return false;}
		if (cat_i==null) {
			if (other.cat_i!=null) {return false;}
		} else if (!cat_i.equals(other.cat_i)) {return false;}
		return true;
	}

	public static void main(String... args) {
	}
}