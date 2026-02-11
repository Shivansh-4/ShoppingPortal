using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;

namespace ShoppingPortal.API.Services;

public interface IDashboardService
{
    Task<List<DashboardResponseDTO>> GetCategoryWiseDataAsync(int userId);
    Task<List<DashboardResponseDTO>> GetDashboardFilteredDataAsync(int userId, DateTime start, DateTime end);
}

public class DashboardService : IDashboardService
{
    private readonly ShoppingPortalDbContext dc;

    public DashboardService(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    public async Task<List<DashboardResponseDTO>> GetCategoryWiseDataAsync(int userId)
    {
        var data = await dc.Orders.Where(o => o.UserId == userId).SelectMany(oi => oi.OrderItems)
        .Select(items => new
        {
            CategoryName = items.Product.Category.CategoryName,
            Total = items.Quantity * items.Price
        }).GroupBy(x => x.CategoryName).Select(p => new DashboardResponseDTO
        {
            Category = p.Key,
            Spend = p.Sum(x => x.Total)
        }).ToListAsync();

        if(!data.Any()) throw new ArgumentException("No Data");

        return data;
    }

    public async Task<List<DashboardResponseDTO>> GetDashboardFilteredDataAsync(int userId, DateTime start, DateTime end)
    {
        if(start > end) throw new ArgumentException("Start date should be less than end date");

        var data = await dc.Orders.Where(u => u.UserId == userId).Where(o => o.OrderDate > start && o.OrderDate < end).SelectMany(oi => oi.OrderItems)
        .Select(items => new
        {
            CategoryName = items.Product.Category.CategoryName,
            Total = items.Price * items.Quantity
        }).GroupBy(g => g.CategoryName).Select(p => new DashboardResponseDTO
        {
            Category = p.Key,
            Spend = p.Sum(x => x.Total)
        }).ToListAsync();

        if(!data.Any()) throw new ArgumentException("No Data");
        return data;
    }
}