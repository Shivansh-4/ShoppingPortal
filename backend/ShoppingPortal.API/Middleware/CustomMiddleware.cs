using System.Net;
using System.Text.Json;

namespace ShoppingPortal.API.Middleware;

public class CustomMiddleware
{
    private readonly RequestDelegate rd;

    public CustomMiddleware(RequestDelegate r)
    {
        rd = r;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await rd(context);
        }
        catch (ArgumentException ex)
        {
            await WriteError(context, HttpStatusCode.BadRequest, ex.Message);
        }
        catch (UnauthorizedAccessException ex)
        {
            await WriteError(context, HttpStatusCode.Unauthorized, ex.Message);
        }
        catch (Exception ex)
        {
            await WriteError(context, HttpStatusCode.InternalServerError, ex.Message);
        }
    }

    private async Task WriteError(HttpContext context, HttpStatusCode statusCode, string message)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)statusCode;

        var response = new { message };
        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}