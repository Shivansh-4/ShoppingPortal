using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using ShoppingPortal.API.Services;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController: ControllerBase
{
    private readonly IDashboardService dService;

    public DashboardController(IDashboardService service)
    {
        dService = service;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetCategoryWiseData()
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var data = await dService.GetCategoryWiseDataAsync(userId);

        return Ok(data);
    }

    [Authorize]
    [HttpGet("filter")]
    public async Task<IActionResult> GetDashboardFilteredData([FromQuery] DateTime d1, [FromQuery] DateTime d2)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var data = await dService.GetDashboardFilteredDataAsync(userId, d1, d2);

        return Ok(data);
    }
}