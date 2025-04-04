using Microsoft.AspNetCore.Mvc;
using LeHoangAnh_2122110549.Model; // Thêm namespace
using LeHoangAnh_2122110549.Data;
using Microsoft.EntityFrameworkCore; // Thêm namespace

namespace LeHoangAnh_2122110549.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        // Tạo danh sách category tạm thời
        private static List<Category> _categorys = new List<Category>
        {
            new Category { Id = 1, Name = "Điện tử", Image = "dientu.png" },
            new Category { Id = 2, Name = "Quần áo", Image = "quanao.png" }
        };

        // GET: api/Category - Lấy tất cả category
        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetAll()
        {
            return Ok(_categorys);
        }

        // GET api/Category/5 - Lấy category theo ID
        [HttpGet("{id}")]
        public ActionResult<Category> GetById(int id)
        {
            var category = _categorys.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                return NotFound("Không tìm thấy category với ID này");
            }
            return Ok(category);
        }

        // POST api/Category - Thêm category mới
        [HttpPost]
        public ActionResult<Category> Create([FromBody] Category newCategory)
        {
            // Tạo ID mới
            newCategory.Id = _categorys.Max(c => c.Id) + 1;
            _categorys.Add(newCategory);

            // Trả về kết quả với status 201 Created
            return CreatedAtAction(nameof(GetById), new { id = newCategory.Id }, newCategory);
        }

        // PUT api/Category/5 - Cập nhật category
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Category updatedCategory)
        {
            var existingCategory = _categorys.FirstOrDefault(c => c.Id == id);
            if (existingCategory == null)
            {
                return NotFound("Không tìm thấy category để cập nhật");
            }

            // Cập nhật thông tin
            existingCategory.Name = updatedCategory.Name;
            existingCategory.Image = updatedCategory.Image;

            return NoContent(); // Status 204 No Content
        }

        // DELETE api/Category/5 - Xóa category
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = _categorys.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                return NotFound("Không tìm thấy category để xóa");
            }

            _categorys.Remove(category);
            return NoContent(); // Status 204 No Content
        }
    }
}
