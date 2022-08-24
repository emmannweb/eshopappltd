const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const path = require('path');

//keep the server alive
app.keepAliveTimeout = (60 * 1000) + 1000;
app.headersTimeout = (60 * 1000) + 2000;

//import routes
const auth = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoute');
const stripeRts = require('./routes/stripeRoute');


const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");

//db connection 
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//MIDDLEWARE
//app.use(express.limit('5M'));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '100mb',
  extended: true
  })); 
app.use(cookieParser());
app.use(cors());

  //ROUTES middleware 
app.use("/api", auth );
app.use("/api", categoryRoutes );
app.use("/api", userRoutes );
app.use("/api", productRoutes );
app.use("/api", orderRoutes );
app.use("/api", stripeRts );

__dirname= path.resolve();

if (process.env.NODE_ENV=== 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res)=>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  ) 
  
} else{
  app.get('/', ()=>{
    res.send("API is running...")
  })
}

//Error middleware
app.use(errorHandler);

const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

