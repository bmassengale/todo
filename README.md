# Full stack ToDo Application
The purpose of this application was to learn react, docker, terraform, and user authentication.

### Technology Stack
* Asp.Net Core 3.1
* xUnit
* Entity Framework Core
* React
* Jest
* React Testing Library
* Docker
* Terraform
* AWS 
  * Lambda
  * API Gateway
  * S3 
  * CloudFront
  * RDS (AWS Aurora - PostgreSQL)


### Run the applciation using web browser
In order to limit my cost, the AWS deployment has been taken down. A terraform file is in the root directory that can be used to duplicate my configuration. Admittedly, this deployment does not have the most secure set up.

**Note:** This will NOT work until a few values in the code are updated. My personal Auth0 configuration will need to allow for the CloudFront URL. Check the Word document within the terraform folder for the deployment in and message me if you would like me to update my Auth0 configuraation.

### Run the applciation locally (Development code - front end is not optimized)
* Download [Docker](https://www.docker.com/products/docker-desktop) for your specific operating system.
* Download [Docker-Compose](https://docs.docker.com/compose/install/) for your operating system
* Clone the repository using the following command: `git clone https://github.com/bmassengale/todo.git`
* Using your terminal or command prompt, navigate into the root directory of the project
* Run `docker-compose up -d`
* Type `localhost:3000` into the web browser of your choice
  * Guest User Username: brads.app.guest@gmail.com
  * Guest User Password: LogInToBradsCoolWebApp
* Enjoy!


### Hurdles I Had to Overcome
**Problem:** Because I had no previous experience, I had to spend a lot of time researching different methods of securing web applications. This meant that I went back and forth between using IdentityServer, Identity, Auth0, and completely custom security. All of my research led to more confusion, because forum member's had strong opinions of their methods and what method was easier to manage.  
**Resolution:** The ending result was that I decided to go with using Auth0's service. This allowed for less infrastructure for me to manage and I felt confident that security was done properly. 

**Problem:** There was a front end issue where a user wasn't shown as logged in until the web page was refreshed.  
**Resolution:** Looking deeper into the Auth0 documentation showed an isLoading method that allowed me to hold off on rendering the web page until authorization was confirmed.

**Problem:** The thought process behind React Testing Library is still a struggle for me. The idea is to test the DOM, rather than the code implementation. While this is awesome, there doesn't seem to the ability to update React state. Since almost all of my components change based on the state, it seemed impossible to properly test different situations.  
**Resolution:** TBD
