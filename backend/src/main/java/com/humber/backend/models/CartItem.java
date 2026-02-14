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
@Document(collection = "cartItems")
public class CartItem {

    @Id
    private String id; //id is a string since mongodb has its own generated id
    //product id
    private String productId;
    //user id - used for finding the owner
    private String userId;
    private String name;
    private double price;

    //optional discount prices
    private double discountPercentage;
    private double discountedPrice;

    private String imageUrl;

    //amount|quantity of a product
    private int amount;
}
