# ProFactored

Welcome to the ProFactored project! This README will guide you through running the project using Docker Compose. No programming or system engineering knowledge is required.

## What You Need

- **Docker**: Docker is a platform that allows you to run software in containers. [Download and install Docker](https://docs.docker.com/get-docker/) for your operating system.
- **Docker Compose**: This is a tool that lets you define and run multi-container applications. Docker Compose is included with Docker Desktop.

## How to Run the Project

1. **Download or Clone the Project**:
   - If you're on GitHub, find the "Code" button and click "Download ZIP".
   - If you're familiar with Git, you can clone the repository with:
     ```bash
     git clone https://github.com/Castro-1/fullstack-factored.git
     ```

2. **Open a Terminal**:
   - On Windows, you can use Command Prompt or PowerShell.
   - On Mac or Linux, use Terminal.
   - Navigate to the project directory (the folder where the files are located).

3. **Build the Docker Containers**:
   - In the terminal, type:
     ```bash
     docker-compose build
     ```
   - This command prepares the project by building the necessary containers. You only need to do this once, or when the project has changed significantly.

4. **Run the Project**:
   - To start the containers, type:
     ```bash
     docker-compose up
     ```
   - This command starts all the necessary parts of the project. Keep this terminal open while using the project.

5. **Access the Project**:
   - Open a web browser.
   - To view the **backend** (FastAPI), go to [http://localhost:8000/docs](http://localhost:8000/docs). You should see a documentation page.
   - To view the **frontend** (React/Vite.js), go to [http://localhost:3000/login](http://localhost:3000/login). You should see the Sign in page.

6. **Play around**:
   - Sign in with the default user: username=juanes, password=juanes.
   - Sign up and create your own user: go to [http://localhost:3000/register](http://localhost:3000/register). You should see the Sign up page.
   
## Stopping the Project

- To stop the project, go back to the terminal and press `Ctrl+C`.
- To remove the containers, type:
  ```bash
  docker-compose down
