using System.Collections.Generic; // nhớ using thêm cái này nha bro

namespace LeHoangAnh._2122110549.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }

        public ICollection<Product> Products { get; set; }
    }

}
