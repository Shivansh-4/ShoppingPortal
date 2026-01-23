using System.Numerics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
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

    [HttpGet("filter")]
    public async Task<IActionResult> GetDashboardFilteredData([FromQuery] DateTime d1, [FromQuery] DateTime d2)
    {   

        if(d1 >= d2)
        {
            return NoContent();
        }

        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        if(userId == null)
        {
            return NotFound("User not found.");
        }

        var data = await dc.Orders.Where(u => u.UserId == userId).Where(o => o.OrderDate >= d1 && o.OrderDate <= d2).SelectMany(oi => oi.OrderItems)
        .Select(items => new
        {
            CategoryName = items.Product.Category.CategoryName,
            Total = items.Quantity * items.Price
        }).GroupBy(g => g.CategoryName).Select(z => new DashboardResponseDTO
        {
            Category =  z.Key,
            Spend = z.Sum(x => x.Total)
        }).ToListAsync();

        return Ok(data);
    }
}