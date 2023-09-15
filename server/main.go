package main

import (
	"os"
	"log"
	_ "github.com/joho/godotenv/autoload"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"crud-demo-server/database"
	"crud-demo-server/routes"
)

func setUpRoutes(app *fiber.App) {
	app.Get("/hello", routes.Hello)
	app.Get("/allbooks", routes.AllBooks)
	app.Post("/addbook", routes.AddBook)
	app.Post("/book", routes.Book)
	app.Put("/update", routes.Update)
	app.Delete("/delete", routes.Delete)
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	return ":" + port
}

func main() {
	database.ConnectDb()
	app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowHeaders:     "Content-Type,access-control-allow-origin, access-control-allow-headers",
        AllowOrigins:     "*",
    }))

	setUpRoutes(app)

	log.Fatal(app.Listen(getPort()))
}
