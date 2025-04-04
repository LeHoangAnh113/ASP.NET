using Microsoft.EntityFrameworkCore;
using LeHoangAnh_2122110549.Model;

namespace LeHoangAnh_2122110549.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        // **Thêm constructor không tham số này**
        public AppDbContext()
        {
        }

        // **Thêm hoặc chỉnh sửa phương thức OnConfiguring**
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // **Quan trọng:** Thay thế chuỗi kết nối này bằng chuỗi kết nối thực tế của bạn
                // từ file appsettings.json hoặc nơi bạn lưu trữ nó.
                optionsBuilder.UseSqlServer("Server=.;Database=MyDatabase;Trusted_Connection=True;TrustServerCertificate=True;");
            }
        }

        // Ánh xạ bảng Product
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categorys { get; set; }
    }
}