namespace ShoppingPortal.APi.DTOs;

public class LoginResponseDTO
{
    public string Message { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}