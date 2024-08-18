package kipid.hello.file;

import java.io.File;
	// http://docs.oracle.com/javase/8/docs/api/java/io/File.html
import java.io.FileReader;
import java.io.FileInputStream;
// import java.io.IOException;
import java.lang.StringBuffer;
import java.nio.CharBuffer;


public class FileInfos {
	public static void main(String... args){
		// Reading "data/test.txt". Can I use '/' or '\\'?
		// Relative to the current folder???
		// No, relative to the classes folder where "java.exe" is executed.
		File file=new File("data/test.txt");
		FileReader reader;
		FileInputStream in;

		if (file.exists()){
			try{
				System.out.println("getName : "+file.getName());
				System.out.println("getPath : "+file.getPath());

				System.out.println("pathSeparator : "+File.pathSeparator);
				System.out.println("separator : "+File.separator);

				// 파일 절대 경로 출력
				System.out.println("getAbsolutePath : "+file.getAbsolutePath());
				// 파일 정규 경로 출력
				System.out.println("getCanonicalPath : "+file.getCanonicalPath());
				// 상위 폴더 출력
				System.out.println("getParent : "+file.getParent());

				// 파일의 쓰기/읽기 권한 체크
				if (file.canWrite()) System.out.println("writable");
				if (file.canRead()) System.out.println("readable");

				// 객체의 파일, 폴더 여부 체크
				if (file.isFile()){
					System.out.println("is a file.");
				} else if (file.isDirectory()){
					System.out.println("is a directory.");
				}else{
					System.out.println("is neither file nor directory.");
				}

				// 파일 내용 길이 출력
				int len=(int)file.length();
				System.out.println("length() : "+len);

				reader=new FileReader(file);
				System.out.println("encoding : "+reader.getEncoding());
				reader.close();

				////////////////////////////////////
				// Using StringBuffer
				// 이게 가장 무난한듯.
				////////////////////////////////////
				StringBuffer sb=new StringBuffer();
				int ch;
				reader=new FileReader(file);
				while((ch=reader.read())!=-1){
					sb.append((char)ch);
				}
				reader.close();
				System.out.println("\n\tStringBuffer : \n"+sb);

				////////////////////////////////////
				// Using char[]
				////////////////////////////////////
				char[] cbuf=new char[len];
				// reader.reset(); // reset() not supported
				// reader.mark(0); // mark() not supported
				reader=new FileReader(file);
				reader.read(cbuf, 0, len);
				reader.close();
				System.out.println("\n\tchar[] : \n"+new String(cbuf, 0, len).trim());
					// UTF8 인코딩이라 한글이 3 byte로 처리되는데, JAVA에서는 UTF16으로 한글 한글자가 char 하나만 차지하는듯?

				////////////////////////////////////
				// Using CharBuffer (not working)
				////////////////////////////////////
				CharBuffer cb=CharBuffer.allocate(len);
				reader=new FileReader(file);
				reader.read(cb);
				reader.close();
				System.out.println("\n\tCharBuffer : \n"+cb.toString().trim());
					// not working

				////////////////////////////////////
				// Using FileInputStream and byte[]
				// This is used generally for image files or data files, not text files.
				////////////////////////////////////
				byte[] b=new byte[200];
				in=new FileInputStream(file);
				// System.out.println("length : "+in);
				in.read(b, 0, 200);
				in.close();
				String str=new String(b,"UTF-8");
				System.out.println("\n\tFileInputStream to byte[] : \n"+str.trim());
				System.out.println("len : "+str.length());
			} catch (Exception e){
				System.out.println(e);
			} finally{
				// finally do something.
			}
		} else{
			System.out.println("File does not exist.");
		}
	}
}