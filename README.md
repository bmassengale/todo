# Full stack ToDo Application
The purpose of this application is to practice unit testing skills, react, docker, and adding user authentication.

### Technology Stack
* Asp.Net Core 3.1
* React
* Docker
* AWS 
  * ECS
  * S3 
  * CloudFront
  * RDS (AWS Aurora - PostgreSQL)
* Terraform

### Run the applciation using web browser
In order to limit costs, the AWS deployment has been taken down. A terraform file is in the root directory that could be used to duplicate my configuration.

### Run the applciation locally (Development code)
* Download [Docker](https://www.docker.com/products/docker-desktop) for your specific operating system.
* Download [Docker-Compose](https://docs.docker.com/compose/install/) for your operating system
* Clone the repository using the following command: `git clone https://github.com/bmassengale/todo.git`
* Using your terminal or command prompt, navigate into the root directory of the project
* Run `docker-compose up -d`
* Type `localhost:3000` into the web browser of your choice
  * Guest User Username: brads.app.guest@gmail.com
  * Guest User Password: LogInToBradsCoolWebApp

#### Accessing the data without the React front end
* In the upper right hand of the web page, click the "Sign Up" button to create an account or sign in if you already have one
* After logging in, the homepage of the postman site will change to allow the beta feature of running postman in the browser
* Click the "Launch Postman" button

![Launch Postman](/readme-images/launchpostman.png)

* In the upper left hand side of the browser, click on the + symbol in the grey box

![Postman New Request](/readme-images/postman_in_browser.png)

* Fill in the request URL and select your request type from the dropdown

![Request Filled Out](/readme-images/postman_filled.png)

* Click the blue "Send" button
