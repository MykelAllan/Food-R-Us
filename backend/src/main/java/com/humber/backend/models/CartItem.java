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
    private String id;
    private String productId;
    private String userId;
    private String name;
    private double price;
    private String imageUrl;
    private int amount;
}
