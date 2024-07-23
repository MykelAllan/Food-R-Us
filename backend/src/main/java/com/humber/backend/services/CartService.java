package com.humber.backend.services;

import com.humber.backend.models.CartItem;
import com.humber.backend.repositories.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    //add
    public CartItem addCartItem(CartItem cartItem) {
        CartItem existingItem = cartRepository.findByProductIdAndUserId(cartItem.getProductId(), cartItem.getUserId());

        if (existingItem != null) {
            existingItem.setAmount(existingItem.getAmount() + cartItem.getAmount());
            return cartRepository.save(existingItem);
        } else {
            return cartRepository.save(cartItem);
        }
    }

    //get cartItem by id
    public Optional<CartItem> getCartItemById(String id) {
        return cartRepository.findById(id);

    }

    //get cartItems by user id
    public List<CartItem> getCartItemsByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }

    //update cartItem
    //when item amount reaches 0 it will automatically delete
    //transactional of having two database operations saving & delete
    @Transactional
    public void updateCartItemAmount(String id, int amount) {
        Optional<CartItem> cartItem = cartRepository.findById(id);

        if (cartItem.isPresent()) {
            CartItem existingItem = cartItem.get();
            existingItem.setAmount(amount);
            if (existingItem.getAmount() <= 0) {
                cartRepository.deleteById(id);
            } else {
                cartRepository.save(existingItem);
            }
        } else {
            throw new IllegalStateException("CartItem with productId " + id + " doesn't exist");
        }
    }


    //removing item from cart
    public void removeCartItem(String id) {
        cartRepository.deleteById(id);

    }

    //clear cart items by userId
    public void clearCartByUserId(String userId) {
        long cartItemCount = cartRepository.countByUserId(userId);

        if (cartItemCount == 0) {
            throw new IllegalStateException("Cart is Already Empty");
        }

        cartRepository.deleteItemsByUserId(userId);
    }

}
