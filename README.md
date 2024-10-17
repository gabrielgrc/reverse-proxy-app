# Reverse Proxy Node.js Application with MySQL

This project is a simple Node.js application that interacts with a MySQL database and is served behind an NGINX reverse proxy. The application inserts a random name into the database and displays a list of names on the homepage.

## Features

- **Node.js & Express**: Backend framework for building the API.
- **MySQL**: Database to store names.
- **NGINX**: Reverse proxy server that routes traffic to the Node.js app.
- **Docker & Docker Compose**: All services run inside containers for easy deployment.

## Prerequisites

To run this application, ensure you have the following installed:

- Docker
- Docker Compose

## Setup and Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <local-folder-on-your-computer>
   ```

2. **Build and run the application using Docker Compose**:

   ```bash
   docker-compose up -d
   ```

This will start three services:
.**nginx**: The reverse proxy server.
.**node-app**: The Node.js application that interacts with the MySQL database.
.**db**: The MySQL database service.

3. Access the application:

  Once all services are up, the application will be accessible at **http://localhost:8080**. Each time you refresh the page, a random name will be inserted into the MySQL database, and the full list of names will be displayed.

**Project Structure**

├── db-init/                       # Directory for database initialization scripts
├── nginx/                         # NGINX configuration files
│   └── default.conf               # NGINX server config
├── node-app/                      # Node.js application directory
│   ├── app.js                     # Main Node.js application file
│   ├── Dockerfile                 # Dockerfile for building the Node.js app
│   └── package.json               # Node.js dependencies
├── docker-compose.yml             # Docker Compose configuration
└── README.md                      # Project documentation

**How It Works**

1. **MySQL Initialization**: The database is initialized with a table called people to store names when the containers are first built.

2. **Node.js App:**
   . On each request to the homepage (**/**), a random name is inserted into the **people** table in MySQL.
   . All names stored in the database are displayed on the homepage in a list format.

3. **NGINX Reverse Proxy:** NGINX serves as a reverse proxy, routing incoming traffic on port **8080** to the Node.js app running on port **3000**.

**Customization**

  .**Modify the list of random names:** The list of names is defined in the **node-app/app.js** file. You can modify the **names** array to include more or different names.
  
  .**Database configuration:** The MySQL connection configuration (host, user, password, database) is also defined in **node-app/app.js** and can be adjusted as needed.

**Stop the Services**

  To stop all running services, use:

  ```bash
  docker-compose down
  ```

  This will stop and remove the containers but preserve the database volume.


**Troubleshooting**

  . If you encounter an error where a service fails to start, check the logs for each service by running:

  ```bash
  docker-compose logs <service-name>
  ```

  Replace **<service-name>** with **nginx**, **node-app**, or **db** depending on which service you want to inspect.

  . If you need to rebuild the containers, use:

  ```bash
  docker-compose up --build
  ```
