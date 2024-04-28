# ProFactored

Welcome to the ProFactored project! This README will guide you through running the project using Docker Compose. No programming or system engineering knowledge is required.

## What You Need

- **Docker**: Docker is a platform that allows you to run software in containers. [Download and install Docker](https://docs.docker.com/get-docker/) for your operating system.
- **Docker Compose**: This is a tool that lets you define and run multi-container applications. Docker Compose is included with Docker Desktop.

## How to Run the Project

1. **Download or Clone the Project**:
   - If you're on GitHub, find the "Code" button and click "Download ZIP".
     
     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/c12e9a12-8d05-4e86-ad87-b583703e62f1)

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
  
     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/6ec3aa94-b58a-445b-811a-8f2732dbf903)


4. **Run the Project**:
   - To start the containers, type:
     ```bash
     docker-compose up
     ```
   - This command starts all the necessary parts of the project. Keep this terminal open while using the project.
  
     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/d7b433d5-293a-4e23-ab92-8139343d1a59)


5. **Access the Project**:
   - Open a web browser.
   - To view the **backend** (FastAPI), go to [http://localhost:8000/docs](http://localhost:8000/docs). You should see a documentation page.
     
     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/0544eadb-7f5b-4293-85f5-cdefce195607)

   - To view the **frontend** (React/Vite.js), go to [http://localhost:3000/login](http://localhost:3000/login). You should see the Sign in page.
  
     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/ac50af99-30a2-412d-8dae-a5af2647c0a6)


5. **Play around**:
   - Sign in with the default user: username=juanes, password=juanes.
   - Sign up and create your own user: go to [http://localhost:3000/register](http://localhost:3000/register). You should see the Sign up page.
  
     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/069f4ef4-bd03-4415-81bc-321a21c36041)
  
   - More views:
  
     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/8c75a8d1-0a98-48f2-a718-10ebf738c1e7)

     ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/15056136-643f-45a4-8a2c-3d569cd5cb6e)

      
## Stopping the Project

- To stop the project, go back to the terminal and press `Ctrl+C`.
- To remove the containers, type:
  ```bash
  docker-compose down
  ```

  ![image](https://github.com/Castro-1/fullstack-factored/assets/82610906/517e574d-95fa-46cc-aa52-34dfd6a44a5f)


## External resources used

- [Avatar generator (DiceBear)](https://www.dicebear.com/)
