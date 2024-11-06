## Report 3 Project

### Quick-Start:
1. Clone the Repository:
- "git clone https://github.com/cashhollister2u/Report3.git"

2. cd into the cloned repository
3. Ensure all dependancies for Python are installed:
- pip install -r requirements.txt
4. Ensure all dependancies for Mysql are installed:
- Ensure MySql is installed on your device
- Ensure the amazon_marketplace.sql dump file is loaded into your MySql instance
- Ensure the password in the "sql_commands.py file in the Backend Dir Matches the password used to access your instance of MySql
5. Ensure all dependancies Next.js are installed:
- install "node"
  - "brew install node" (mac users)
- Install all project dependancies:
  - "cd report3frontend"
  - "npm install"
6. Run the application
- "cd .." (access project root directory)
- "./run.sh" (run the Flask Server and Next.js Instance)
- Click on the terminal output from Next.js "http://localhost:3000" or navagate to the url manually
7. To close the applicaiton, access the terminal and click "ctrl + c" twice to close the Flask and Next.js instances
