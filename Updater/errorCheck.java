import java.io.BufferedReader;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;

public class errorCheck {

    public static void main(String[] args) {

      try{
        BufferedReader brTest = new BufferedReader(new FileReader("test.xlsx"));

        if(!brTest.readLine().equals("{")){
          // File (or directory) with old name
          File file1 = new File("test.xlsx");

          // File (or directory) with new name
          File file2 = new File("data.xlsx");

          if (file2.exists()){
            throw new java.io.IOException("file exists");
          }
            // Rename file (or directory)
            boolean success = file1.renameTo(file2);

            if (!success) {
              // File was not successfully renamed
            }
        }
      }
      catch (IOException ex) {
        System.out.println("error!");
        ex.printStackTrace();
      }

    }

}
