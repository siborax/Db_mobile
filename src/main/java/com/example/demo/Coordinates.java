package com.example.demo;

public class Coordinates {
    private Double longitude;
    private Double latitude;
    public  Coordinates(Double longitude,Double latitude){

        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongtitude() {
        return longitude;
    }
}
