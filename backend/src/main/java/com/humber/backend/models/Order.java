package com.humber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId; //user id - who owns the order
    private List<CartItem> items; //embedding cartItems
    private double totalPrice;
    private double shippingFee;
    private int totalProducts;
    private String status; // pending | completed
}
