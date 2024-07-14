package com.humber.backend.repositories;

import com.humber.backend.models.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<CartItem, String> {

    //checks for duplicate items for adding to cart
    CartItem findByProductId(String productId);

    //finds cart item by user
    //List<CartItem> findByUserId(String userId);
}
