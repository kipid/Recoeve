package kipid.hello._class;

public class Student extends Person {
	public static int numberOfStudents;
	static {
		numberOfStudents=0;
	}
	
	private final int id;
	{
		id=numberOfStudents++;
	}
	
	public Student(String name, int birthYear) {
		super(name,birthYear);
	}
	public int getId() {
		return id;
	}
	
	public static void main(String... arg) {}
}