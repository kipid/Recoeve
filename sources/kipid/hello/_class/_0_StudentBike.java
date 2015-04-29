package kipid.hello._class;

public class _0_StudentBike extends _0_Bicycle {
	public int seatHeight;

	public _0_StudentBike(int startHeight, int startCadence, int startGear, int startSpeed) {
		super(startCadence, startGear, startSpeed);
		seatHeight = startHeight;
	}
	public _0_StudentBike(String brandName, int startCadence, int startGear, int startSpeed, Student owner) {
		super(brandName,startCadence,startGear,startSpeed,owner);
	}

	public void setHeight(int newValue) {
		seatHeight = newValue;
	}
	public Student getOwner() {
	// This technique, called covariant return type, means that the return type is allowed to vary in the same direction as the subclass. http://docs.oracle.com/javase/tutorial/java/javaOO/returnvalue.html
		return (Student)owner;
	}
	
	public static void main(String... args) {}
}