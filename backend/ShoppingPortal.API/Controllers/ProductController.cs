using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Services;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/products")]
public class ProductController : ControllerBase
{

    private readonly IProductService pService;

    public ProductController(IProductService service)
    {
        pService = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await pService.GetAllProductsAsync();

        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await pService.GetProductByIdAsync(id);

        return Ok(product);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> AddProduct(ProductCreateDTO dto)
    {
        var product = await pService.AddProductAsync(dto);

        return CreatedAtAction(nameof(AddProduct), product);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductCreateDTO dto)
    {
        var product = await pService.UpdateProductAsync(id, dto);

        return Ok("Product updated successfully.");
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        await pService.DeleteProductAsync(id);
        return NoContent();
    }

    [HttpGet("product-by-category/{categoryId}")]
    public async Task<IActionResult> GetProductByCategory(int categoryId)
    {
        var products = await pService.GetProductByCategory(categoryId);
        return Ok(products);
    }

}