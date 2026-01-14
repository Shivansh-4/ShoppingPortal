namespace ShoppingPortal.API.DTOs;

public class OrderItemResponseDTO
{
    public string ProductName { get; set;} = string.Empty;
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
}