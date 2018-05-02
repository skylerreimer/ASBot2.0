import java.io.BufferedReader;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;

public class errorCheck {
    private static final java.io.File CRED_STORE_DIR = new java.io.File(
     System.getProperty("user.home"), ".credentials/");
    private static final java.io.File DATA_STORE_DIR = new java.io.File("../../res/");
    public static void main(String[] args) {

      try{
        BufferedReader brTest = new BufferedReader(new FileReader(DATA_STORE_DIR + "/test.xlsx"));

        if(!brTest.readLine().equals("{")){
          // File (or directory) with old name
          File file1 = new File(DATA_STORE_DIR + "/test.xlsx");

          // File (or directory) with new name
          File file2 = new File(DATA_STORE_DIR + "/data.xlsx");

          if (file2.exists()){
            file2.delete();
          }
            // Rename file (or directory)
            boolean success = file1.renameTo(file2);

            if (!success) {
              // File was not successfully renamed
              //probably gonna send an alert email or something i dunno yet
            }
        }else{
          File file1 = new File(CRED_STORE_DIR + "/drive-nodejs-quickstart.json");
          file1.delete();
        }
      }
      catch (IOException ex) {
        System.out.println("error!");
        ex.printStackTrace();
      }

    }

}
