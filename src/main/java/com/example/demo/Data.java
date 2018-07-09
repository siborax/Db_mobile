package com.example.demo;

public class Data{
    private Double accuracy;
    private String date;
    private Coordinates coord;
    private String provider;
    private Boolean success;

    private String rate;
    public  Data(Double accuracy, String date, String rate, Coordinates coord, String provider, Boolean succcess){

        this.accuracy = accuracy;
        this.date = date;
        this.coord = coord;
       this.provider=provider;
       this.rate=rate;
       this.success=succcess;
    }

    public  Data(Double accuracy, String date, String provider, Boolean succcess){

        this.accuracy = accuracy;
        this.date = date;
        this.provider=provider;
        this.success=succcess;
    }
    public String getRate(){return rate;}
    public Double getAccuracy() {
        return accuracy;
    }
    public void setAccuracy(Double accuracy) {
        this.accuracy=accuracy;
    }

    public String getDate() {
        return date;
    }

    public Coordinates getCoordinates() {
        return coord;
    }
   public String getProvider(){return provider;}
    public Boolean getSuccess(){return success;}
}
