using System.ComponentModel.DataAnnotations;

namespace ShoppingPortal.API.DTOs;

public class ProductCreateDTO
{
    [Required(ErrorMessage ="Product Name is required")]
    [MinLength(3, ErrorMessage ="Product name must be at least 3 characters")]
    [MaxLength(70, ErrorMessage ="Product name cannot exceed 70 characters")]
    public string ProductName { get; set; } = string.Empty;

    [MinLength(10, ErrorMessage = "Description must be at least 10 characters")]
    [MaxLength(1000, ErrorMessage = "Description cannot exceed 1000 characters")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage ="Price is required")]
    [Range(0.01, double.MaxValue, ErrorMessage ="Price must be greater than zero")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "Stock is required")]
    [Range(0, int.MaxValue, ErrorMessage = "Stock cannot be negative")]
    public int Stock { get; set; }

    [Required(ErrorMessage = "Category is required")]
    public int CategoryId { get; set; }

    [Required(ErrorMessage = "Image URL is required")]
    [Url(ErrorMessage = "Image URL must be a valid URL")]
    [MaxLength(500, ErrorMessage = "Image URL is too long")]
    public string ImageUrl { get; set; } = string.Empty;
}