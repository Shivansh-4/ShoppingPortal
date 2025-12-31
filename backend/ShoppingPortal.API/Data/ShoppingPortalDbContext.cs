using Microsoft.EntityFrameworkCore;
using ShoppingPortal.APi.Models;

namespace ShoppingPortal.APi.Data;

public class ShoppingPortalDbContext: DbContext
{
    public ShoppingPortalDbContext(DbContextOptions<ShoppingPortalDbContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
}