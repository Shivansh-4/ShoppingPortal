using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController: ControllerBase
{
    private readonly ShoppingPortalDbContext dc;

    public CategoryController(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await dc.Categories.Select(c => new CategoryResponseDTO
        {
            CategoryId = c.CategoryId,
            CategoryName = c.CategoryName
        }).ToListAsync();

        return Ok(categories);
    }
}