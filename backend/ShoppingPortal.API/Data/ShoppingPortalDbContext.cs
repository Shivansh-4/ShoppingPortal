using Microsoft.EntityFrameworkCore;

namespace ShoppingPortal.APi.Data;

public class ShoppingPortalDbContext: DbContext
{
    public ShoppingPortalDbContext(DbContextOptions<ShoppingPortalDbContext> options) : base(options) {}
}