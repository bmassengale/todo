using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApi.Infrastructure.Migrations
{
    public partial class RandomFieldAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isComplete",
                table: "Todos",
                newName: "IsComplete");

            migrationBuilder.AddColumn<string>(
                name: "Something",
                table: "Todos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Something",
                table: "Todos");

            migrationBuilder.RenameColumn(
                name: "IsComplete",
                table: "Todos",
                newName: "isComplete");
        }
    }
}
