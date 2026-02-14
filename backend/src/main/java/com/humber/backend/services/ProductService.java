package com.humber.backend.services;

import com.humber.backend.models.Product;
import com.humber.backend.repositories.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //gets all the products with filters
    public List<Product> getProducts(String category, Double minPrice, Double maxPrice) {
        //handles category if its singular or plural
        String regexPatt = category + "s?";
        //filter by price and category
        if (category != null && minPrice != null && maxPrice != null) {
            return productRepository.findByCategoryAndPriceBetween(regexPatt, minPrice, maxPrice);
        } else if (category != null) { // filter by category only
            return productRepository.findByCategory(regexPatt);
        } else if (minPrice != null && maxPrice != null) { //filter by price only
            return productRepository.findByPriceBetween(minPrice, maxPrice);
        } else { // else return regular list
            return productRepository.findAll();
        }
    }

    //gets all products by productName
    public List<Product> getProductsByName(String productName) {
        return productRepository.findByProductName(productName);
    }

    //gets all products that are discounted
    public List<Product> getDiscountedProducts() {
        return productRepository.findDiscountedProducts();
    }

    //get product by id
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    //saves the product
    public void addNewProduct(Product product) {
        productRepository.save(product);
    }

    //updates a product
    public int updateProduct(String id, Product newProduct) {
        Optional<Product> isProductExist = productRepository.findById(id);

        if (isProductExist.isPresent()) {
            if (newProduct.getDiscountPercentage() > 0) {
                double discPrice = calculateDiscountedPrice(newProduct.getPrice(), newProduct.getDiscountPercentage());
                //we set the new discounted price according to the percentage
                newProduct.setDiscountedPrice(discPrice);
            } else {
                newProduct.setDiscountedPrice(0); //set to zero if its not on discount
            }
            productRepository.save(newProduct); //save
            return 1;
        }
        return 0;
    }

    //deletes a product
    public int deleteProduct(String id) {
        Optional<Product> isProductExist = productRepository.findById(id);

        if (isProductExist.isPresent()) {
            productRepository.deleteById(id);
            return 1;
        }
        return 0;
    }

    //get paginated products for admin dashboard
    public Page<Product> getPaginatedProducts(int pageSize, int pageNo) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        return productRepository.findAll(pageable);
    }

    //calculate the discounted price - since admins will be only inputting discount percentage
    //op - origPrice
    //dp - discPercent
    //op - (op * ( dp / 100));
    private double calculateDiscountedPrice(double originalPrice, double discountedPercentage) {
        double discPrice = originalPrice - (originalPrice * (discountedPercentage / 100));
        return Math.round(discPrice * 100.0) / 100.0; //round in two decimals
    }
}
