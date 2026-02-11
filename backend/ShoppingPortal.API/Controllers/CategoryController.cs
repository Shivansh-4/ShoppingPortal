using Microsoft.AspNetCore.Mvc;
using ShoppingPortal.API.Services;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoryController: ControllerBase
{
    private readonly ICategoryService cService;

    public CategoryController(ICategoryService service)
    {
        cService = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await cService.GetAllCategoriesAsync();

        return Ok(categories);
    }
}