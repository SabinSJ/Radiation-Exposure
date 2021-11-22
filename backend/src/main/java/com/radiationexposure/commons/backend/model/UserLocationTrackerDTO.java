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
@Document(indexName="geiger-user-location")

@AllArgsConstructor
@NoArgsConstructor
public class UserLocationTrackerDTO {

    @Id
    @ReadOnlyProperty
    private String id;

    @Field(name = "username")
    private String username;

    @Field(name="latitude")
    private Double latitude;

    @Field(name="longitude")
    private Double longitude;

    @Field(name="timestamp", format = DateFormat.epoch_millis)
    private Long timestamp;
}
