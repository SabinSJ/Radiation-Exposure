package com.radiationexposure.commons.backend.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Document(indexName = "pocket-geiger-data")

@AllArgsConstructor
@NoArgsConstructor
public class PocketGeigerDTO {

    @Id
    @ReadOnlyProperty
    private String id;

    @Field(name = "Source")
    private String source;

    @Field(name = "Sensor")
    private String sensor;

    @Field(name = "Value")
    private String value;

    @Field(name = "LocationLat")
    private String locationlat;

    @Field(name = "LocationLong")
    private String locationlong;

    @Field(name = "TimeStamp")
    private String timestamp;

    @Field(name = "Measurement")
    private String measurement;
}
