package com.radiationexposure.commons.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import java.util.Date;

@Data
@Document(indexName = "geiger-user-account")

@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    @Id
    @ReadOnlyProperty
    private String id;

    @Field(name = "firstName")
    private String firstName;

    @Field(name = "LastName")
    private String LastName;

    @Field(name = "address")
    private String address;

    @Field(name = "email")
    private String username;

    @Field(name = "password")
    private String password;

    @Field(name = "reset_token")
    private String resetToken;

    @Field(name = "expiration_date")
    private Date expirationDate;
}
