package com.humber.backend.controllers;

import com.humber.backend.models.Product;
import com.humber.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://food-r-us.vercel.app"})
@RequestMapping("/admin/products")
public class AdminController {
    //gets pageSize from properties
    @Value("${page.size}")
    private int pageSize;

    private final ProductService productService;

    public AdminController(ProductService productService) {
        this.productService = productService;
    }

    //get products with pagination
    @GetMapping("/lists/{pageNo}")
    public ResponseEntity<Page<Product>> getAllProducts(@PathVariable int pageNo) {
        //paging info
        Page<Product> page = productService.getPaginatedProducts(pageSize, pageNo);

        return ResponseEntity.ok(page);
    }

    //add new product
    @PostMapping("/add")
    public String addNewProduct(@RequestBody Product product) {
        productService.addNewProduct(product);
        return "product succesffully saved!";
    }

    //get product by id
    @GetMapping("/{productId}")
    public Optional<Product> getProductById(@PathVariable String productId) {
        return productService.getProductById(productId);
    }


    //updates a product
    @PutMapping("/update/{id}")
    public String updateProduct(@PathVariable String id,
                                @RequestBody Product newProduct) {
        int statusCode = productService.updateProduct(id, newProduct);

        if (statusCode == 1) {
            return "product successfully updated";
        }
        return "error updating product";

    }

    //deletes a product
    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable String id) {
        int statusCode = productService.deleteProduct(id);

        if (statusCode == 1) {
            return "product was deleted successfully";
        }
        return "error deleting the product";
    }
}
