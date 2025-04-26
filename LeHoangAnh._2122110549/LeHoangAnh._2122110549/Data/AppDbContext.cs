using LeHoangAnh._2122110549.Model;
using Microsoft.EntityFrameworkCore;

namespace LeHoangAnh._2122110549.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Post> Posts { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}
