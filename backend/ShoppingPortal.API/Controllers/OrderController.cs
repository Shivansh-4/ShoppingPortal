using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Controllers;

[Authorize]
[ApiController]
[Route("api/orders")]
public class OrderController: ControllerBase
{
    private readonly ShoppingPortalDbContext dc;

    public OrderController(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    [HttpPost]
    public async Task<IActionResult> PlaceOrder(PlaceOrderDTO dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

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
                return BadRequest("Invalid Product");        
            }
            if(product.Stock < item.Quantity)
            {
                return BadRequest($"Insufficient stock for {product.ProductName}");
            }

            product.Stock -= item.Quantity;

            order.OrderItems.Add( new OrderItem
            {
                ProductId = product.ProductId,
                Price = product.Price,
                Quantity = item.Quantity
            });
            total += product.Price * item.Quantity;
        }

        order.TotalAmount = total;

        dc.Orders.Add(order);
        await dc.SaveChangesAsync();

        return Ok(order.OrderId);
    }

    [HttpGet("my")]
    public async Task<IActionResult> MyOrders()
    {
        var claimValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var orders = await dc.Orders.Where(o => o.UserId == userId).Select( o => new OrderResponseDTO
        {
            OrderId = o.OrderId,
            OrderDate = o.OrderDate,
            TotalAmount = o.TotalAmount,
            OrderItems = o.OrderItems.Select(oi => new OrderItemResponseDTO
            {
                ProductName = oi.Product.ProductName,
                Quantity = oi.Quantity,
                Price = oi.Price
            }).ToList()
        }).ToListAsync();

        return Ok(orders);
    }

    [HttpGet]
    public async Task<IActionResult> AllOrders()
    {
        var orders = await dc.Orders.Include(o => o.OrderItems).ThenInclude(o => o.Product)
        .ToListAsync();

        return Ok(orders);       
    }
}