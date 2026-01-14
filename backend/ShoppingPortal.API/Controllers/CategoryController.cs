using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ShoppingPortalDbContext dc;

    public CategoryController(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await dc.Categories.Select(c => new
        {
            c.CategoryId,
            c.CategoryName
        }).ToListAsync();

        // If no categories exist, return some defaults
        if (categories.Count == 0)
        {
            return Ok(new List<dynamic>
            {
                new { CategoryId = 1, CategoryName = "Electronics" },
                new { CategoryId = 2, CategoryName = "Clothing" },
                new { CategoryId = 3, CategoryName = "Books" },
                new { CategoryId = 4, CategoryName = "Home & Garden" },
                new { CategoryId = 5, CategoryName = "Sports" }
            });
        }

        return Ok(categories);
    }
}