using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController: ControllerBase
{
    private ShoppingPortalDbContext dc;

    public AuthController(ShoppingPortalDbContext context)
    {
        dc = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDTO dto)
    {
        var userExists = dc.Users.Any(u => u.Email == dto.Email);
        if (userExists)
        {
            return BadRequest("User with this email already exists.");
        }

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Password = dto.Password,
            RoleId = 2 // Default role as Customer
        };

        dc.Users.Add(user);
        await dc.SaveChangesAsync();

        return CreatedAtAction(nameof(Register), user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDTO dto)
    {
        var user = await dc.Users.Include(u => u.Role).FirstOrDefaultAsync(u=> u.Email == dto.Email && u.Password == dto.Password);
        if (user == null)
        {
            return Unauthorized("Invalid email or password.");
        }

        return Ok(new LoginResponseDTO
        {
            Message = "Login successful",
            Token = "dummy",
            Role = user.Role.RoleName
        });
    }

}