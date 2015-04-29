package kipid.hello._class;

public class Person {
	public static int numberOfPersons;
	static {
		numberOfPersons=0;
	}
	
	public String name;
	public int birthYear;
	{
		name="no name";
		birthYear=-1;
		numberOfPersons++; // okay to access static field?
	}
	
	public Person() {}
	public Person(String name, int birthYear) {
		this.name=name;
		this.birthYear=birthYear;
	}
	
	public void setName(String name) {
		this.name=name;
	}
	public void setBirthYear(int birthYear) {
		this.birthYear=birthYear;
	}
	public void set(String name, int birthYear) {
		this.name=name;
		this.birthYear=birthYear;
	}
	public String toString() {
		return "{name: "+name+", birthYear: "+birthYear+"}";
	}
}