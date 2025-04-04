using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeHoangAnh_2122110549.Migrations
{
    /// <inheritdoc />
    public partial class paket3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PriceCeiling",
                table: "Categorys",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceCeiling",
                table: "Categorys");
        }
    }
}
