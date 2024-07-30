package com.humber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "products")
public class Product {

    @Id
    private String id; //id is a string since mongodb has its own generated id
    private String name;
    private String category;
    private double price;
    //optional disounts
    private double discountPercentage;
    private double discountedPrice;


    //product image url
    private String imageUrl;
}


