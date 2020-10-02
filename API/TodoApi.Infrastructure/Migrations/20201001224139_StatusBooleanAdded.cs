using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApi.Infrastructure.Migrations
{
    public partial class StatusBooleanAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isComplete",
                table: "Todos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isComplete",
                table: "Todos");
        }
    }
}
