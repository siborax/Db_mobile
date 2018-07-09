package com.example.demo;

import java.util.HashMap;
import java.util.Map;

public class accuracyMapping {
    private Double lat;
    private Double lang;
    private Double accuracy;
    HashMap<Double, Coordinates> map;


//    public accuracyMapping(Double accuracy, Coordinates hm){
//        this.accuracy=accuracy;
//        this.map=hm;
//
//
//    }



    public Double getAccuracy(){return  accuracy;}
    public HashMap<Double,Coordinates> getHash(){return  map;}
}
