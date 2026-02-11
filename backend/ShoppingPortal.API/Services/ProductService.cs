using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Services;

public interface IProductService
{
    Task<List<ProductResponseDTO>> GetAllProductsAsync();
    Task<ProductResponseDTO> GetProductByIdAsync(int id);
    Task<Product> AddProductAsync(ProductCreateDTO dto);
    Task<Product> UpdateProductAsync(int id, ProductCreateDTO dto);
    Task DeleteProductAsync(int id);
    Task<List<ProductResponseDTO>> GetProductByCategory(int catId);
}

public class ProductService : IProductService
{
    private readonly ShoppingPortalDbContext dc;

    public ProductService(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    public async Task<List<ProductResponseDTO>> GetAllProductsAsync()
    {
        var products = await dc.Products.Select(p => new ProductResponseDTO
        {
            ProductId = p.ProductId,
            Description = p.Description,
            ImageUrl = p.ImageUrl,
            Price = p.Price,
            ProductName = p.ProductName,
            Stock = p.Stock,
            CategoryId = p.CategoryId
        }).ToListAsync();

        return products;
    }

    public async Task<ProductResponseDTO>GetProductByIdAsync(int id)
    {
        var product = await dc.Products.FindAsync(id);
        if(product == null)
        {
            throw new ArgumentException("Product Not Found");
        }

        var response = new ProductResponseDTO
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName,
            Description = product.Description,
            ImageUrl = product.ImageUrl,
            Price = product.Price,
            Stock = product.Stock,
            CategoryId = product.CategoryId
        };

        return response;
    }

    public async Task<Product> AddProductAsync(ProductCreateDTO dto)
    {
        var product = new Product
        {
            ProductName = dto.ProductName,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            Price = dto.Price,
            Stock = dto.Stock,
            CategoryId = dto.CategoryId
        };

        dc.Products.Add(product);
        await dc.SaveChangesAsync();

        return product;
    }

    public async Task<Product> UpdateProductAsync(int id, ProductCreateDTO dto)
    {
        var product = await dc.Products.FindAsync(id);

        if(product == null) throw new ArgumentException("No Product Found");

        product.ProductName = dto.ProductName;
        product.Description = dto.Description;
        product.ImageUrl = dto.ImageUrl;
        product.Price = dto.Price;
        product.Stock = dto.Stock;
        product.CategoryId = dto.CategoryId;

        await dc.SaveChangesAsync();

        return product;
    }

    public async Task DeleteProductAsync(int id)
    {
        var product = await dc.Products.FindAsync(id);

        if(product == null)
        {
            throw new ArgumentException($"Product with ID: {id} not found!");
        }

        dc.Remove(product);
        await dc.SaveChangesAsync();
    }

    public async Task<List<ProductResponseDTO>> GetProductByCategory(int catId)
    {
        var products = await dc.Products.Where(o => o.CategoryId == catId).Select(product => new ProductResponseDTO
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName,
            Description = product.Description,
            ImageUrl = product.ImageUrl,
            Stock = product.Stock,
            Price = product.Price,
            CategoryId = product.CategoryId
        }).ToListAsync();

        if(!products.Any()) throw new ArgumentException("No products found for this category");

        return products;
    }
}