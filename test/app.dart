import 'dart:html';
import 'dart:math' show Random;



void main(){
  filePath a = new filePath();
}

class filePath{
  
  static final List fileNames = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
  static final Random indexGen = new Random();
  static String fileName;
  
  filePath(){
    fileName = fileNames[indexGen.nextInt(4)];
  }
  
  String getFileName() => fileName; 
  
}
