package com.humber.backend.controllers;

import com.humber.backend.models.Product;
import com.humber.backend.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.171:3000/", "https://food-r-us.vercel.app"})
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //gets products // filter products by category and price
    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        return productService.getProducts(category, minPrice, maxPrice);
    }

    //gets all discounted products
    @GetMapping("/discounted")
    public List<Product> getDiscountedProducts() {
        return productService.getDiscountedProducts();
    }

    //gets all products by name
    @GetMapping("/by-name")
    public List<Product> getProductsByName(@RequestParam(required = false) String name) {
        return productService.getProductsByName(name);

    }


}
