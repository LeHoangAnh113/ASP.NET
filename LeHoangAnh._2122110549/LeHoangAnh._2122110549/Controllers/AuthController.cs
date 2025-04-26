using LeHoangAnh._2122110549.Data;
using LeHoangAnh._2122110549.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
 // ✅ Thêm dòng này

namespace LeHoangAnh._2122110549.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context; // ✅ Đổi DataContext -> AppDbContext
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config) // ✅ Sửa ở đây
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login(LeHoangAnh._2122110549.Model.LoginRequest request) // ✅ Dùng namespace đầy đủ
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == request.Username && x.Password == request.Password);

            if (user == null)
                return BadRequest("Sai tài khoản hoặc mật khẩu");

            var token = GenerateJwtToken(user);

            return Ok(new { token });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("UserId", user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
