package com.example.demo;

import com.sun.rowset.internal.Row;
import com.univocity.parsers.tsv.TsvParser;
import com.univocity.parsers.tsv.TsvParserSettings;
import org.joda.time.*;
import org.joda.time.format.DateTimeFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.joda.time.DateTime;

import javax.sql.rowset.RowSetWarning;
import java.io.File;
import java.lang.reflect.Array;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.DoubleAccumulator;

@RestController
@RequestMapping(value="/connections")
public class TSVController {
    final Logger logger = LoggerFactory.getLogger( TSVController.class );
    TsvParserSettings settings = new TsvParserSettings();
    TsvParser parser = new TsvParser(settings);
    List<MobileConnection> allRows = null;
    ArrayList<Data> data;//Coordinates
    ArrayList<Coordinates>Coordinates;
    List<Data>aggregatedMonths;
    String rate ;
    Map<Data, Integer> averagedAccuraciesPerDate ;





    public TSVController(){
        allRows =  new ArrayList<>();
        allRows.clear();
        data = new ArrayList<Data>();
        data.clear();
        Coordinates = new ArrayList<Coordinates>();
        Coordinates.clear();
        aggregatedMonths = new ArrayList<>();
        aggregatedMonths.clear();
        averagedAccuraciesPerDate  = new HashMap<>();
        averagedAccuraciesPerDate.clear();


          // 18
        List<String[]> RowsInTSV=  parser.parseAll(new File("C:\\Users\\Sibora\\IdeaProjects\\infovisProject\\src\\main\\resources\\ResultOctober-04-11-2016_FOR_OPEN_DATA.tsv"),1000);
        if(RowsInTSV.iterator().hasNext()){
            RowsInTSV.remove(0);

            for( String[] element : RowsInTSV) {

                if (new Double(element[8]) > 100) {
//                    System.out.println("element8:"+ new Double (element[8]));
                    allRows.add(new MobileConnection(element[0], element[1], element[2], element[3], element[4], new Double(element[5]), new Double(element[6]), new Double(element[7]), new Double(element[8]), new Boolean(element[9])));
                    Coordinates.add(new Coordinates(new Double(element[5]), (new Double(element[6]))));

                    org.joda.time.format.DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss.SSSSSS Z")
                            .withLocale(Locale.GERMANY);
//                    System.out.println("date:"+element[2]);
                    LocalDateTime date = formatter.parseLocalDateTime(element[2]);

                  //  System.out.println(date.getYear());  // 2012
                    int Month = date.getMonthOfYear();
                    org.joda.time.format.DateTimeFormatter month = DateTimeFormat.forPattern("MMM");
                    String monthString = month.print(date.getMonthOfYear());
//                    System.out.println(monthString);// 8
//                    System.out.println(date.getDayOfMonth());
                    String Date = monthString+ " "+date.getDayOfMonth();
//                    String dateNumeric = date.getMonthOfYear()+"/"+date.getDayOfMonth()+"/"+date.getYear()+" "+date.getHourOfDay()+":"+date.getMinuteOfHour();
                    String dateNumeric = date.getDayOfMonth()+" "+ date.getMonthOfYear()+" "+date.getYear();
//                    System.out.println("rate "+element[4]);

                    data.add(new Data(new Double(element[8]),dateNumeric,element[4],new Coordinates(new Double(element[5]), (new Double(element[6]))),element[3], new Boolean(element[9])));
                }
            }
        }

        for(Data iterator: data){
            if(iterator.getSuccess()==true){
                Data existingElement = null;
                for(Data iterator2: aggregatedMonths){
                if(iterator2.getDate().equals(iterator.getDate())){
                    existingElement = iterator2;
//                    System.out.println("existing provider"+existingElement.getProvider());
//                    System.out.println("iterator provider"+iterator.getProvider());

                }
                }
                if(existingElement == null){
                    aggregatedMonths.add(iterator);
//                    aggregatedMonths.add(",");
                }

                else
                {
                   // System.out.println("count1");
                    if(existingElement.getDate().equals(iterator.getDate())) {
                    if(existingElement.getProvider().equals(iterator.getProvider())){

                            logger.debug("inside if");
                            int count = averagedAccuraciesPerDate.containsKey(existingElement) ? averagedAccuraciesPerDate.get(existingElement) : 0;
                            averagedAccuraciesPerDate.put(existingElement, count + 1);
                          //System.out.println("count" +aggregatedMonths.get(0).getAccuracy());
                            aggregatedMonths.add(new Data((iterator.getAccuracy() + existingElement.getAccuracy())/averagedAccuraciesPerDate.get(existingElement)+1, existingElement.getDate(), existingElement.getProvider(), existingElement.getSuccess()));

                        }
                    }

                }

            }
         //   System.out.println("sz:" + averagedAccuraciesPerDate.size());
        }
//        for(Data d:aggregatedMonths){

            for(Data d: averagedAccuraciesPerDate.keySet()){
            for(int dt=0;dt<aggregatedMonths.size();dt++){
                    if(d.getProvider().equals(aggregatedMonths.get(dt).getProvider())){
                        if(d.getDate().equals(aggregatedMonths.get(dt).getDate()))
                     //   System.out.println(d.getProvider());
                       // System.out.println(aggregatedMonths.get(dt).getAccuracy());
//                int acc = Integer.parseInt(aggregatedMonths.get(dt).getAccuracy())/averagedAccuraciesPerDate.get(d);
                        System.out.println("acc:");
                      //  aggregatedMonths.get(dt).setAccuracy(String.valueOf(acc));
                //System.out.println("map:" + d+ " "+ averagedAccuraciesPerDate.get(d));
            }}}
//        }
//        for(int d=0;d< data.size();d++){
//        System.out.println("data:"+ data.get(d).getAccuracy()+" "+ data.get(d).getDate()+" "+data.get(d).getRate()+" "+data.get(d).getCoordinates()+" "+data.get(d).getProvider());
//        }

    }


    @RequestMapping(value= "/getData", method= RequestMethod.GET)
    // @ResponseBody
    public List<Data> getData() {
//        System.out.println("not aggregated:"+ data.size());
        return data;
    }
    @RequestMapping(value= "/coordinates", method= RequestMethod.GET)
    // @ResponseBody
    public List<Coordinates> coordinates() {
        return Coordinates;
    }
    @RequestMapping(value= "/all", method= RequestMethod.GET)
    // @ResponseBody
    public List<MobileConnection> getAllRows() {
        return allRows;
    }
    @RequestMapping(value= "/aggregatedByDate", method= RequestMethod.GET)
    // @ResponseBody
    public List<Data> getAggregatedMonths() {
//        System.out.println("aggregated:"+ aggregatedMonths.size());
        return aggregatedMonths;
    }

//
//    @RequestMapping(value="/coordinates", method=RequestMethod.GET)
////@ResponseBody
//    public List<Coordinates> getCoordinates()
//    {
//        for(int i =0; i< 500; i++){
//
////        System.out.println(o.getValue().getLatitude()+" "+ o.getValue().getLongtitude());/
//            System.out.println("coord: " + Coordinates.get(i).getLongtitude()+ " "+ Coordinates.get(i).getLatitude());
//        }
//        return Coordinates;
//
//    }

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