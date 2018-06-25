# What is this?
This is the frontend for a playground project I set up to experiment with a few techniques, primarily testing in React.  
The backend is here: https://github.com/faktotum85/address-book-server
You can see a demo of the full application here: https://sw-address-book.herokuapp.com

# Running the application locally
- Pull the repo and run npm install
- Make a copy of .env.dist and rename it to .env
    - change the variables in the .env file
    - You can use a mlab.com to quickly set up a mongodb database
- Run npm start in the root directory to spin up the application
- Make sure the api server is running (separate repo)

# Todos
- Make responsive
- Add link to form for adding address when table is empty
- Build out propTypes for DataForm component to cover properties of config object
- Improve test coverage