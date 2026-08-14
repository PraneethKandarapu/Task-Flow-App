require("dotenv").config();
// import app locally
const app = require("./src/app");

//import connectDatabase function locally from config folder
const { connectDatabase } = require("./src/config/database");

// connect database , start the server
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    //connect database
    await connectDatabase();

    //listen for requests
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
      
    });
  } catch (err) {
    console.log(err);
  }
};

// call the function
startServer();
