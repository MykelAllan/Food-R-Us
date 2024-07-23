package com.humber.backend.controllers;

import com.humber.backend.models.CartItem;
import com.humber.backend.repositories.CartRepository;
import com.humber.backend.services.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.171:3000/", "https://food-r-us.vercel.app"})
public class CartController {

    private final CartService cartService;
    private final CartRepository cartRepository;


    public CartController(CartService cartService, CartRepository cartRepository) {
        this.cartService = cartService;
        this.cartRepository = cartRepository;
    }

    //gets the cart items by user id
    @GetMapping("/{userId}")
    public List<CartItem> getCartItemsByUserId(@PathVariable String userId) {
        return cartService.getCartItemsByUserId(userId);
    }

    //adds cartitem
    @PostMapping("/add")
    public CartItem addCartItem(@RequestBody CartItem cartItem) {
        return cartService.addCartItem(cartItem);
    }

    //updates cart item amount from checkout
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCartItemAmount(@PathVariable String id, @RequestBody Map<String, Integer> request) {
        int amount = request.get("amount");
        try {
            cartService.updateCartItemAmount(id, amount);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("updated cart item amount successfully");
    }

    @DeleteMapping("/{id}")
    public String removeCartItem(@PathVariable String id) {
        cartService.removeCartItem(id);
        return "removing an item from cart";
    }

    //clear all cart items
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<String> clearCartItems(@PathVariable String userId) {
        try {
            cartService.clearCartByUserId(userId);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("cleared cart items successfully");
    }

}
