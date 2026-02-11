using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Services;

namespace ShoppingPortal.API.Controllers;

[Authorize]
[ApiController]
[Route("api/orders")]
public class OrderController: ControllerBase
{
    private IOrderService oService;

    public OrderController(ShoppingPortalDbContext context, IOrderService service)
    {
        oService = service;
    }

    [HttpPost]
    public async Task<IActionResult> PlaceOrder(PlaceOrderDTO dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        int orderId = await oService.PlaceOrderAsync(userId, dto);

        return Ok(orderId);
    }

    [HttpGet("my")]
    public async Task<IActionResult> MyOrders()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var orders = await oService.GetMyOrdersAsync(userId);

        return Ok(orders);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> AllOrders()
    {
        var orders = await oService.GetAllOrdersAsync();

        return Ok(orders);       
    }
}