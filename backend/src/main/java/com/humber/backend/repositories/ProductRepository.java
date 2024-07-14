package com.humber.backend.repositories;


import com.humber.backend.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    //custom query for singular or plural category
    //category: 'vegetable' : 'vegetables'
    //i: case insensitive
    @Query("{'category':  {$regex :  ?0, $options:  'i'}}")
    List<Product> findByCategory(String category);
}
