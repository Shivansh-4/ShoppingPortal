using Microsoft.AspNetCore.Mvc;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Services;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController: ControllerBase
{
    private readonly IAuthService aService;

    public AuthController(IAuthService aS)
    {
        aService = aS;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDTO dto)
    {
        await aService.RegisterAsync(dto);
        return Ok("User Registered Successfully");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDTO dto)
    {
        var response = await aService.LoginAsync(dto);
        return Ok(response);
    }
}