package com.humber.backend.controllers;

import com.humber.backend.models.Product;
import com.humber.backend.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.171:3000/","https://food-r-us.vercel.app"})
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    //get products by category
    @GetMapping("/{category}")
    public List<Product> getProductByCategory(@PathVariable String category) {
        String lower = category.toLowerCase();
        return productService.getProductByCategory(lower);
    }

}
