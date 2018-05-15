package com.example.demo;

public class Coordinates {
    private Double longtitude;
    private Double latitude;
    public  Coordinates(Double longtitude,Double latitude){

        this.longtitude = longtitude;
        this.latitude = latitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongtitude() {
        return longtitude;
    }
}
