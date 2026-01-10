using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.DTOs;

public class OrderResponseDTO
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public List<OrderItemResponseDTO> OrderItems { get; set; } = new ();
}