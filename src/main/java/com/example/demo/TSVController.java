package com.example.demo;

import com.sun.rowset.internal.Row;
import com.univocity.parsers.tsv.TsvParser;
import com.univocity.parsers.tsv.TsvParserSettings;
import org.springframework.web.bind.annotation.*;

import javax.sql.rowset.RowSetWarning;
import java.io.File;
import java.lang.reflect.Array;
import java.util.*;
import java.util.concurrent.atomic.DoubleAccumulator;

@RestController
@RequestMapping(value="/connections")
public class TSVController {
    TsvParserSettings settings = new TsvParserSettings();
    TsvParser parser = new TsvParser(settings);
    List<MobileConnection> allRows = null;
    ArrayList<Coordinates> Coordinates;




public TSVController(){
    allRows =  new ArrayList<>();
    allRows.clear();
    Coordinates = new ArrayList<Coordinates>();
    Coordinates.clear();

      List<String[]> RowsInTSV=  parser.parseAll(new File("C:\\Users\\Sibora\\IdeaProjects\\infovisProject\\src\\main\\resources\\ResultOctober-04-11-2016_FOR_OPEN_DATA.tsv"),500);
    if(RowsInTSV.iterator().hasNext()){
        RowsInTSV.remove(0);

            for( String[] element : RowsInTSV) {
                if (new Double(element[8]) > 100000) {
                    System.out.println("element8:"+ new Double (element[8]));
                    allRows.add(new MobileConnection(element[0], element[1], element[2], element[3], element[4], new Double(element[5]), new Double(element[6]), new Double(element[7]), new Double(element[8]), new Boolean(element[9])));
                    //Coordinates.put(new Coordinates(new Double(element[5]), (new Double(element[6]))));
                    Coordinates.add(new Coordinates(new Double(element[5]), (new Double(element[6]))));
                }
            }
        }
    System.out.println("size:"+ Coordinates.size());

}
    @RequestMapping(value= "/all", method= RequestMethod.GET)
   // @ResponseBody
    public List<MobileConnection> getAllRows() {
        return allRows;
}

@RequestMapping(value="/coordinates", method=RequestMethod.GET)
//@ResponseBody
public ArrayList< Coordinates> getCoordinates()
{
    for(int i =0; i< 500; i++){

//        System.out.println(o.getValue().getLatitude()+" "+ o.getValue().getLongtitude());/
        System.out.println("coord: " + Coordinates.get(i).getLongtitude()+ " "+ Coordinates.get(i).getLatitude());
    }
    return Coordinates;

}

//    @RequestMapping(value="/create", method = RequestMethod.POST)
//    public List<MobileConnection> create (@RequestBody MobileConnection mobilecon){
//                allRows.add(mobilecon);
//                return allRows;
//}

//public static void main(String[] args) {
//    Coordinates cd= new Coordinates(3.3, 4.1);
//    String[] coordinates;

//}
}