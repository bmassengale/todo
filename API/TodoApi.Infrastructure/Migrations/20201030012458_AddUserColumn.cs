using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApi.Infrastructure.Migrations
{
    public partial class AddUserColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "user",
                table: "todos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "user",
                table: "todos");
        }
    }
}
