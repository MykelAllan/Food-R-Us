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

    //gte = greater than or equal to
    //lte = less than or equal to
    @Query("{'price':  {$gte:  ?0, $lte:  ?1}}")
    List<Product> findByPriceBetween(double minPrice, double maxPrice);


    //custom query for finding products that are on discount
    @Query("{'discountPercentage': {$gt: 0} }")
    List<Product> findDiscountedProducts();

    //custom query for category and price
    @Query("{'category':  {$regex :  ?0, $options:  'i'}, 'price':  {$gte:  ?1, $lte:  ?2}}")
    List<Product> findByCategoryAndPriceBetween(String category, double minPrice, double maxPrice);

    //custom query to finding products by name
    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Product> findByProductName(String name);

}
