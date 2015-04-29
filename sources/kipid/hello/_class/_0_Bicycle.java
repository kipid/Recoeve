package kipid.hello._class;

public class _0_Bicycle {
	public static int numberOfBicycles;
	static {
		numberOfBicycles=0;
	}
	
	private String brand="default";
	int cadence; // no modifier: (package-public, outPackage-private).
	int gear;
	int speed;
	Person owner;
	final int id;
	{
		brand="default";
		cadence=gear=speed=0;
		id=numberOfBicycles++;
	}

	public _0_Bicycle(String brandName) {
		brand=brandName;
	}
	public _0_Bicycle(String brandName, Person owner) {
		this(brandName);
		this.owner=owner;
	}
	public _0_Bicycle(int startCadence, int startGear, int startSpeed) {
		cadence = startCadence;
		gear = startGear;
		speed = startSpeed;
	}
	public _0_Bicycle(String brandName, int startCadence, int startGear, int startSpeed) {
		this(startCadence, startGear, startSpeed); // call to this must be first statement in constructor
		// this(brandName); // error // no duplicate this calls.
		brand=brandName;
	}
	public _0_Bicycle(String brandName, int startCadence, int startGear, int startSpeed, Person owner) {
		this(startCadence, startGear, startSpeed);
		brand=brandName;
		this.owner=owner;
	}
	
	public String getBrand() {
		return brand;
	}
	public Person getOwner() {
		return owner;
	}
	public void setCadence(int newValue) {
		cadence = newValue;
	}
	public void setGear(int newValue) {
		gear = newValue;
	}
	public void applyBrake(int decrement) {
		speed -= decrement;
	}
	public void speedUp(int increment) {
		speed += increment;
	}
	
	public static void main(String... args) {}
}