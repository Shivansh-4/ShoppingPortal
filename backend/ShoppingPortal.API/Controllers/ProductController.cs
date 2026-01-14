using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{

    private readonly ShoppingPortalDbContext dc;

    public ProductController(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await dc.Products.Include(p => p.Category).Select(p => new ProductResponseDTO
        {
            ProductId = p.ProductId,
            ProductName = p.ProductName,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            ImageUrl = p.ImageUrl,
            CategoryId = p.CategoryId,
            CategoryName = p.Category != null ? p.Category.CategoryName : "Uncategorized"
        }).ToListAsync();

        if(products.Count == 0)
        {
            return NotFound("No products available.");
        }

        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await dc.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.ProductId == id);
        if (product == null)
        {
            return NotFound("Product not found.");
        }

        var productDto = new ProductResponseDTO
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName,
            Description = product.Description,
            Price = product.Price,
            Stock = product.Stock,
            ImageUrl = product.ImageUrl,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.CategoryName ?? "Uncategorized"
        };

        return Ok(productDto);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddProduct(ProductCreateDTO dto)
    {
        var product = new Product
        {
            ProductName = dto.ProductName,
            Description = dto.Description,
            Price = dto.Price,
            Stock = dto.Stock,
            CategoryId = dto.CategoryId,
            ImageUrl = dto.ImageUrl
        };

        dc.Products.Add(product);
        await dc.SaveChangesAsync();

        return CreatedAtAction(nameof(AddProduct), product);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductCreateDTO dto)
    {
        var existingProduct = await dc.Products.FindAsync(id);
        if (existingProduct == null)
        {
            return NotFound("Product not found.");
        }

        existingProduct.ProductName = dto.ProductName;
        existingProduct.Description = dto.Description;
        existingProduct.Price = dto.Price;
        existingProduct.Stock = dto.Stock;
        existingProduct.ImageUrl = dto.ImageUrl;
        existingProduct.CategoryId = dto.CategoryId;

        await dc.SaveChangesAsync();
        
        return Ok("Product updated successfully.");
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var exisitngProduct = await dc.Products.FindAsync(id);

        if(exisitngProduct == null)
        {
            return NotFound("Product not found.");
        }

        dc.Products.Remove(exisitngProduct);
        await dc.SaveChangesAsync();

        return NoContent();
    }
}