package com.humber.backend.repositories;

import com.humber.backend.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    Order findByUserId(String userId); //finds the lists of orders by user id

    List<Order> findOrdersByUserId(String userId); //finds the lists of orders by user id
}
