package kipid.hello.file;

import java.io.File;
// import java.io.IOException;


public class FolderLists {
	public static void main(String... args){
		// "." means the current folder.
		File file=new File(".");

		if (file.exists()&&file.isDirectory()){
			try{
				String[] fList=file.list();
				for (int i=0;i<fList.length;i++){
					System.out.println(i+" : "+fList[i]);
				}
			} catch (Exception e){
				System.out.println(e);
			}
		} else{
			System.out.println("Folder does not exist.");
		}
	}
}