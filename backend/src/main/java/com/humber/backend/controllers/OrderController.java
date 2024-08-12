package com.humber.backend.controllers;

import com.humber.backend.models.Order;
import com.humber.backend.services.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.0.170:3000", "https://food-r-us.vercel.app"})
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    //gets all orders for admin
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    //gets all orders by userId
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable String userId) {
        return orderService.getOrdersByUser(userId);
    }

    //creates the order
    @PostMapping
    public String createOrder(@RequestBody Order order) {
        orderService.createOrder(order);
        return "Order created successfully";
    }

    //deletes an order
    @DeleteMapping("/delete/{id}")
    public String deleteOrder(@PathVariable String id) {
        int statusCode = orderService.deleteOrder(id);

        if (statusCode == 1) {
            return "order was deleted successfully";
        }
        return "error deleting the order";
    }



}
