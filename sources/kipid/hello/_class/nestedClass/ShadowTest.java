package kipid.hello._class.nestedClass;

public class ShadowTest {
	public static int n=0;
	public int x = 0;
	{
		n+=10;
	}

	class FirstLevel {
		// public static int err=0; // error: Illegal static declaration in inner class // inner class cannot have static things.
		public int x;
		{
			x=++n;
		}
		
		void methodInFirstLevel(int x) {
			System.out.println("x = "+x+", n = "+n); // arg x
			System.out.println("this.x = "+this.x); // 1 at the first call.
			System.out.println("ShadowTest.this.x = "+ShadowTest.this.x); // 0
		}
	}

	public static void main(String... args) {
		// ShadowTest.FirstLevel fl=ShadowTest.new FirstLevel(); // error: cannot find symbol
		ShadowTest.FirstLevel fl=new ShadowTest().new FirstLevel(); // no error
		fl.methodInFirstLevel(13);
		ShadowTest st=new ShadowTest();
		ShadowTest.FirstLevel fl0=st.new FirstLevel();
		ShadowTest.FirstLevel fl1=st.new FirstLevel();
		fl0.methodInFirstLevel(23);
		fl1.methodInFirstLevel(33);
	}
}