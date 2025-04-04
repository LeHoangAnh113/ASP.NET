using Microsoft.AspNetCore.Mvc;
using LeHoangAnh_2122110549.Model; // Thêm namespace
using LeHoangAnh_2122110549.Data;
using Microsoft.EntityFrameworkCore; // Thêm namespace

namespace LeHoangAnh_2122110549.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        // Tạo danh sách Product tạm thời
        private static List<Product> _categories = new List<Product>
        {
            new Product { Id = 1, Name = "Điện tử", Image = "dientu.png" },
            new Product { Id = 2, Name = "Quần áo", Image = "quanao.png" }
        };

        // GET: api/Product - Lấy tất cả Product
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetAll()
        {
            return Ok(_categories);
        }

        // GET api/Product/5 - Lấy Product theo ID
        [HttpGet("{id}")]
        public ActionResult<Product> GetById(int id)
        {
            var Product = _categories.FirstOrDefault(c => c.Id == id);
            if (Product == null)
            {
                return NotFound("Không tìm thấy Product với ID này");
            }
            return Ok(Product);
        }

        // POST api/Product - Thêm Product mới
        [HttpPost]
        public ActionResult<Product> Create([FromBody] Product newProduct)
        {
            // Tạo ID mới
            newProduct.Id = _categories.Max(c => c.Id) + 1;
            _categories.Add(newProduct);

            // Trả về kết quả với status 201 Created
            return CreatedAtAction(nameof(GetById), new { id = newProduct.Id }, newProduct);
        }

        // PUT api/Product/5 - Cập nhật Product
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Product updatedProduct)
        {
            var existingProduct = _categories.FirstOrDefault(c => c.Id == id);
            if (existingProduct == null)
            {
                return NotFound("Không tìm thấy Product để cập nhật");
            }

            // Cập nhật thông tin
            existingProduct.Name = updatedProduct.Name;
            existingProduct.Image = updatedProduct.Image;

            return NoContent(); // Status 204 No Content
        }

        // DELETE api/Product/5 - Xóa Product
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var Product = _categories.FirstOrDefault(c => c.Id == id);
            if (Product == null)
            {
                return NotFound("Không tìm thấy Product để xóa");
            }

            _categories.Remove(Product);
            return NoContent(); // Status 204 No Content
        }
    }
}
