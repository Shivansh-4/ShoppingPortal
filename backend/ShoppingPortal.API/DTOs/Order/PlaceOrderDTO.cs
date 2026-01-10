using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.DTOs;

public class PlaceOrderDTO
{
    public List<OrderItemDTO> orderItems {get; set; } = new();

}

public class OrderItemDTO
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}