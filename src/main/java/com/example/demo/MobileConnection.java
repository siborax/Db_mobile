package com.example.demo;

public class MobileConnection {

    private String test_type;
    private  String id;
    private String testtimestamp;
    private String provider;
    private String rat;
    private double latitude;
    private double longtitude;
    private double location_age;
    private double accuracy;
    private boolean success;
   // private double data_rate_median;
//default constructor
    public MobileConnection(){}
    //constructor
    public MobileConnection( String test_type, String id, String testtimestamp, String provider, String rat, double latitude, double longtitude,double location_age, double accuracy, boolean success)
            //, double data_rate_median
    {
        this.test_type = test_type;
        this.id = id;
        this.provider = provider;
        this.testtimestamp = testtimestamp;
        this.rat = rat;
        this.latitude = latitude;
        this.longtitude = longtitude;
        this.location_age = location_age;
        this.accuracy = accuracy;
        this.success = success;
    //    this.data_rate_median = data_rate_median;
    }

    public String getTest_type() {
        return test_type;
    }
    public String getId(){
        return id;
    }
    public String getTesttimestamp() {
        return testtimestamp;
    }
    public String getProvider(){
        return provider;
    }
    public String getRat(){
        return rat;
    }
    public double getLatitude(){
        return latitude;
    }
    public double getLongtitude(){
        return longtitude;
    }
    public double getLocation_age(){
        return location_age;
    }
    public double getAccuracy(){
        return accuracy;
    }
    public boolean getSucces(){
        return success;
    }
//    public double getData_rate_median(){
//        return data_rate_median;
//    }
}
