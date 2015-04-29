package kipid.hello._class;

public class _0_TestBicycle {
	public static void main(String... args) {
		String b0Brand="The First";
		Person b0Owner=new Person("kipid", 1900);
		_0_Bicycle b0=new _0_Bicycle(b0Brand,10,20,0,b0Owner);
		// System.out.println("b0.brand: "+b0.brand); // error: brand has private access in _0_Bicycle
		System.out.println("b0.brand: "+b0.getBrand());
		System.out.println("b0.cadence: "+b0.cadence);
		System.out.println("b0.gear: "+b0.gear);
		System.out.println("b0.speed: "+b0.speed);
		System.out.println("b0.owner: "+b0.owner+"\n");
		
		b0=new _0_Bicycle(b0Brand,30,40,60,b0Owner);
		b0Brand="Changed"; // New reference. Value of String cannot be changed.
		b0Owner.set("Candy",1901);
		System.out.println("b0.brand: "+b0.getBrand());
		System.out.println("b0.cadence: "+b0.cadence);
		System.out.println("b0.gear: "+b0.gear);
		System.out.println("b0.speed: "+b0.speed);
		System.out.println("b0.owner: "+b0.owner+"\n");
		
		b0=new _0_MountainBike(b0Brand,30,40,60,b0Owner);
		System.out.println("b0.brand: "+b0.getBrand());
		System.out.println("b0.cadence: "+b0.cadence);
		System.out.println("b0.gear: "+b0.gear);
		System.out.println("b0.speed: "+b0.speed);
		b0Owner.set("Another person",1902);
		System.out.println("b0.owner: "+b0.owner+"\n"); // passing by reference value.
		
		b0=new _0_MountainBike("Brand New",30,40,60,new Student("Student A",1990));
		System.out.println("b0.brand: "+b0.getBrand());
		System.out.println("b0.cadence: "+b0.cadence);
		System.out.println("b0.gear: "+b0.gear);
		System.out.println("b0.speed: "+b0.speed);
		System.out.println("b0.owner: "+b0.owner+"\n");
		
		_0_MountainBike mb0=new _0_MountainBike("Good",30,40,60,new Person("Kylie",1995));
		mb0.accessToPackagePublic();
		System.out.println("mb0.brand: "+mb0.getBrand());
		System.out.println("mb0.cadence: "+mb0.cadence);
		System.out.println("mb0.gear: "+mb0.gear);
		System.out.println("mb0.speed: "+mb0.speed);
		System.out.println("mb0.owner: "+mb0.owner+"\n");
		
		_0_StudentBike sb0=new _0_StudentBike("Student Bike",0,1,2,new Student("Student B",1991));
		Student b0Student=sb0.getOwner();
		System.out.println("b0Student.id: "+b0Student.getId());
		System.out.println("Student.numberOfStudents: "+Student.numberOfStudents);
	}
}