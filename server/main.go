package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Todo struct {
	Id int `json:"id"`
	Title string `json:"title"`
	Done bool `json:"done"`
	Body string `json:"body"`
}
func main() {
	fmt.Println("i am in server backend application");
	// created a new server- fbiber is express fastHTTP server
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	todos := []Todo{}
	app.Get("/", func(c *fiber.Ctx) error{
		return c.SendString("Hello, World!")
	  })
	
	app.Get("/:value",func(c *fiber.Ctx) error{
		return c.SendString(fmt.Sprintf("I am in a route with /:value and the params I got are = %s", c.Params("value")))

	})
	
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return err
		}
		todo.Id = len(todos) + 1
		todos = append(todos, *todo)
		return c.Status(fiber.StatusOK).JSON(todos)
	})
	app.Patch("api/todos/:id", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err!= nil {
			return c.Status(401).SendString("invalid id format")
		}
		// checking for id in todos
		for i,t := range todos{
			if(t.Id == id) {
				todos[i].Done=true;
				break;
			}
		}
		return c.Status(200).JSON(todos)


	})
	// return all todos
	app.Get("api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	if err := app.Listen(":3000"); err != nil {
		fmt.Println("Error starting server:", err)
	}

	

}