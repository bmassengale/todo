using Microsoft.EntityFrameworkCore.Migrations;

namespace TodoApi.Infrastructure.Migrations
{
    public partial class removeDbs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Todos",
                table: "Todos");

            migrationBuilder.RenameTable(
                name: "Todos",
                newName: "todos");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "todos",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "TodoId",
                table: "todos",
                newName: "todoid");

            migrationBuilder.AddColumn<bool>(
                name: "iscomplete",
                table: "todos",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "something",
                table: "todos",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_todos",
                table: "todos",
                column: "todoid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_todos",
                table: "todos");

            migrationBuilder.DropColumn(
                name: "iscomplete",
                table: "todos");

            migrationBuilder.DropColumn(
                name: "something",
                table: "todos");

            migrationBuilder.RenameTable(
                name: "todos",
                newName: "Todos");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Todos",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "todoid",
                table: "Todos",
                newName: "TodoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Todos",
                table: "Todos",
                column: "TodoId");
        }
    }
}
