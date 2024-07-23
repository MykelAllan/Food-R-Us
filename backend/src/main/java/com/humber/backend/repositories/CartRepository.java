package com.humber.backend.repositories;

import com.humber.backend.models.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CartRepository extends MongoRepository<CartItem, String> {

    //checks for duplicate items for adding to cart
    CartItem findByProductIdAndUserId(String productId, String userId);

    //cart items counter/length
    long countByUserId(String userId);
    //method to delete cartitems
    void deleteItemsByUserId(String userId);

    //finds cart item by user
    List<CartItem> findByUserId(String userId);


}
