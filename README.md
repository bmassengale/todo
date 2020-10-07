# Full stack ToDo Application
The purpose of this application is to practice unit testing skills, react, docker, and adding user authentication.

### Technology Stack
Asp.Net Core 3.1
React
PostgreSQL
Docker

### Supported HTTP Requests
* GET
  * http://localhost:8080/todos/
  * Get specific todo 
    * http://localhost:8080/todos/#
* POST - *Requires TodoDTO object in request body*
  * http://localhost:8080/todos/
* PUT *Requires TodoDTO object in request body and matching ID in URL*
  * http://localhost:8080/todos/#
* DELETE
  * http://localhost:8080/todos/#

### Run the applciation locally
* Download [Docker](https://www.docker.com/products/docker-desktop) for your specific operating system.
* Download [Docker-Compose](https://docs.docker.com/compose/install/) for your operating system
* Clone the repository using the following command: `git clone https://github.com/bmassengale/todo.git`
* Using your terminal or command prompt, navigate into the root directory of the project
* Run `docker-compose up -d`

### Accessing the data
*At this time, the front end is not complete, so data will have to be accessed via the API. In order to do this, you can use Postman, a very common tool used in testing APIs.*
* In the upper right hand of the web page, click the "Sign Up" button to create an account or sign in if you already have one
* After logging in, the homepage of the postman site will change to allow the beta feature of running postman in the browser
* Click the "Launch Postman" button

![Launch Postman](/readme-images/launchpostman.png)

* In the upper left hand side of the browser, click on the + symbol in the grey box

![Postman New Request](/readme-images/postman_in_browser.png)

* Fill in the request URL and select your request type from the dropdown

![Request Filled Out](/readme-images/postman_filled.png)

* Click the blue "Send" buttonz
