
using LeHoangAnh_2122110549.Model;
using Microsoft.EntityFrameworkCore;


namespace LeHoangAnh_2122110549.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}