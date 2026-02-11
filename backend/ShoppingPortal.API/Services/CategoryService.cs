using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;

namespace ShoppingPortal.API.Services;

public interface ICategoryService
{
    Task<List<CategoryResponseDTO>> GetAllCategoriesAsync();
}

public class CategoryService : ICategoryService
{
    private readonly ShoppingPortalDbContext dc;

    public CategoryService(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    public async Task<List<CategoryResponseDTO>> GetAllCategoriesAsync()
    {
        var categories = await dc.Categories.Select(c => new CategoryResponseDTO
        {
            CategoryId = c.CategoryId,
            CategoryName = c.CategoryName
        }).ToListAsync();

        if(!categories.Any()) throw new ArgumentException("No Categories Found");
        return categories;
    }
}