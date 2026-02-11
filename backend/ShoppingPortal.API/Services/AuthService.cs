using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using ShoppingPortal.API.Data;
using ShoppingPortal.API.DTOs;
using ShoppingPortal.API.Helper;
using ShoppingPortal.API.Models;

namespace ShoppingPortal.API.Services;

public interface IAuthService
{
    Task RegisterAsync(RegisterRequestDTO dto);
    Task<LoginResponseDTO> LoginAsync(LoginRequestDTO dto);
}

public class AuthService : IAuthService
{
    private readonly ShoppingPortalDbContext dc;
    private readonly JwtHelper jwt;

    public AuthService(ShoppingPortalDbContext context, JwtHelper help)
    {
        dc = context;
        jwt = help;
    }

    public async Task RegisterAsync(RegisterRequestDTO dto)
    {
        var userExists = await dc.Users.AnyAsync(u => u.Email == dto.Email);
        if (userExists)
        {
            throw new ArgumentException("This email is already registered");
        }

        var user = new User
        {
            Email = dto.Email,
            Name = dto.Name,
            Password = dto.Password,
            RoleId = 2
        };

        dc.Users.Add(user);
        await dc.SaveChangesAsync();
    }

    public async Task<LoginResponseDTO> LoginAsync(LoginRequestDTO dto)
    {
        var userExists = await dc.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);
        
        if (userExists == null)
        {
            throw new UnauthorizedAccessException("Invalid Email or Password");
        }

        return new LoginResponseDTO
        {
            Message = "Login successfull",
            Token = jwt.GenerateToken(userExists.UserId, userExists.Role.RoleName),
            Role = userExists.Role.RoleName,
        };
    }
}