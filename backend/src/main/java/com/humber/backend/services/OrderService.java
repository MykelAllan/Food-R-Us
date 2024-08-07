package com.humber.backend.services;

import com.humber.backend.models.CartItem;
import com.humber.backend.models.Order;
import com.humber.backend.models.Product;
import com.humber.backend.repositories.CartRepository;
import com.humber.backend.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    public OrderService(OrderRepository orderRepository, CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    //get order by id
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }


    //calculats the totalProducts
    private int calculateTotalProducts(List<CartItem> cartItems) {
        if (cartItems == null || cartItems.size() == 0) {
            return 0;
        }
        return cartItems.stream()
                .mapToInt(CartItem::getAmount)
                .sum();
    }

    //create | save order
    public void createOrder(Order order) {
        String userId = order.getUserId();
        cartRepository.deleteItemsByUserId(userId);
        order.setStatus("PENDING"); //sets the order status to pending
        order.setTotalProducts(calculateTotalProducts(order.getItems()));

        orderRepository.save(order);
    }


    //gets orders by userId - used for order history lists
    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findOrdersByUserId(userId);
    }


    //admin stuffs
    //get all orders - for admin dashboard
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    //sets the order status to complete | pending
    public int updateOrderStatus(String orderId, Order newOrder) {
        Optional<Order> isOrderExist = orderRepository.findById(orderId);

        if (isOrderExist.isPresent()) {
            orderRepository.save(newOrder);
            return 1; //return 1 if successfully saved
        }
        return 0;//return 0 if order is null
    }

    //deletes an order
    public int deleteOrder(String id) {
        Optional<Order> isOrderExist = orderRepository.findById(id);
        if (isOrderExist.isPresent()) {
            orderRepository.deleteById(id);
            return 1;
        }
        return 0;
    }


}
