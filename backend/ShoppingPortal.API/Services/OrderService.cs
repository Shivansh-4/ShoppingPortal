using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Helper;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Services;

public interface IOrderService
{
    Task<int> PlaceOrderAsync(int userId, PlaceOrderDTO dto);
    Task<List<OrderResponseDTO>> GetMyOrdersAsync(int userId);
    Task<List<Order>> GetAllOrdersAsync();
}

public class OrderService: IOrderService
{
    private readonly ShoppingPortalDbContext dc;

    public OrderService(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    public async Task<int> PlaceOrderAsync(int userId, PlaceOrderDTO dto)
    {
        var order = new Order
        {
            UserId = userId,
            OrderItems = new List<OrderItem>()
        };

        decimal total = 0;

        foreach (var item in dto.orderItems)
        {
            var product = await dc.Products.FindAsync(item.ProductId);
            if(product == null)
            {
                throw new ArgumentException("Invalid Product");
            }
            if(product.Stock < item.Quantity)
            {
                throw new ArgumentException("Insufficient Stock");
            }

            product.Stock -= item.Quantity;
            order.OrderItems.Add(new OrderItem
            {
                ProductId = product.ProductId,
                Price = product.Price,
                Quantity = item.Quantity
            });
            total += item.Quantity * product.Price;
        }

        order.TotalAmount = total;

        dc.Orders.Add(order);
        await dc.SaveChangesAsync();

        return order.OrderId;
    }

    public async Task<List<OrderResponseDTO>> GetMyOrdersAsync(int userId)
    {
        return await dc.Orders.Where(u => u.UserId == userId).Select(o => new OrderResponseDTO
        {
           OrderId = o.OrderId,
           OrderDate = o.OrderDate,
           TotalAmount = o.TotalAmount,
           OrderItems = o.OrderItems.Select(oi => new OrderItemResponseDTO
           {
               Price = oi.Price,
               ProductName = oi.Product.ProductName,
               Quantity = oi.Quantity
           }).ToList()
        }).ToListAsync();
    }

    public async Task<List<Order>> GetAllOrdersAsync()
    {
        return await dc.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).ToListAsync();
    }
}