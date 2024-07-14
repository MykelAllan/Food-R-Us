package com.humber.backend.controllers;

import com.humber.backend.models.Product;
import com.humber.backend.services.ProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin/products")
public class AdminController {

    private final ProductService productService;

    public AdminController(ProductService productService) {
        this.productService = productService;
    }

    //add new product
    @PostMapping("/add")
    public String addNewProduct(@RequestBody Product product) {
        Product newProduct = productService.addNewProduct(product);

        return "product succesffully saved!";
    }


//    @PostMapping("/update/{id}")
//    public String updateProduct(@PathVariable String id,
//                                @ModelAttribute Product productDetails) {
//        productService.updateProduct(id, productDetails);
//        return "redirect:/products/product-list";
//
//    }
//
//    @GetMapping("/delete/{id}")
//    public String deleteProduct(@PathVariable String id) {
//        productService.deleteProduct(id);
//        return "redirect:/products/product-list";
//    }
}
