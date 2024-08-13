package kipid.hello._class;

public class _0_MountainBike extends _0_Bicycle {
	public int seatHeight;

	public _0_MountainBike(int startHeight, int startCadence, int startGear, int startSpeed) {
		super(startCadence, startGear, startSpeed);
		seatHeight = startHeight;
	}
	public _0_MountainBike(String brandName, int startCadence, int startGear, int startSpeed, Person owner) {
		super(brandName,startCadence,startGear,startSpeed,owner);
	}

	public void setHeight(int newValue) {
		seatHeight = newValue;
	}
	public void accessToPackagePublic() { // subclass in the same package can access the "no modifier" field.
		cadence=-100;
	}
	
	public static void main(String... args) {}
}