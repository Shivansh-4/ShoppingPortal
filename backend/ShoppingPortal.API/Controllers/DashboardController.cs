using System.Numerics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController: ControllerBase
{
    private readonly ShoppingPortalDbContext dc;

    public DashboardController(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetCategoryWiseData()
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        if (userId == null)
        {
            return NotFound("User not found.");
        }
        
        var data = await dc.Orders.Where(u => u.UserId == userId).SelectMany(o => o.OrderItems).
        Select(items => new
        {
            CategoryName = items.Product.Category.CategoryName,
            Total = items.Quantity * items.Price
        }).GroupBy(c => c.CategoryName).Select(g => new DashboardResponseDTO
        {
            Category = g.Key,
            Spend = g.Sum(x => x.Total)
        }).ToArrayAsync();
        
        return Ok(data);
    }
}