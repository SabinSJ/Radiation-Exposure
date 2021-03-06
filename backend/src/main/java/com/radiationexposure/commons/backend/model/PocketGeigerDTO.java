package com.radiationexposure.commons.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

@Data
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
    private Double value;

    @Field(name = "LocationLat")
    private Double locationlat;

    @Field(name = "LocationLong")
    private Double locationlong;

    @Field(name = "TimeStamp", format = DateFormat.epoch_millis)
    private long timestamp;

    @Field(name = "Measurement")
    private String measurement;

}
