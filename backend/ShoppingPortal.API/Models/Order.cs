namespace ShoppingPortal.APi.Models;

public class Order
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public decimal TotalAmount { get; set; }

    public List<OrderItem>? OrderItems { get; set; }
}