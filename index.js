// const express = require("express")
// const app = express();
// const { default: mongoose } = require("mongoose")
// const { MONGOURL } = require("./key")
// const cors = require('cors')



// app.use(express.json());
// app.use(cors({
//   origin: ["http://localhost:5173","https://insta-frontend-ashen.vercel.app","http://localhost:5174",],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


// app.options("*", cors());


// app.get("/", (req,res) => {
//     res.send("this is get req")
// })

// const PORT = 3000;


// mongoose.connect(MONGOURL)
// .then(() => console.log("Database connected successfully"));

// app.use(require("./controllers/auth"))
// app.use(require("./controllers/user"))
// app.use(require("./controllers/post"))

// app.listen(PORT , "0.0.0.0", () => {
//     console.log(`Serve is running on port http://localhost:${PORT}`);
// })


const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const { MONGOURL } = require("./key");
const cors = require("cors");

// Middleware
app.use(express.json());

// ✅ Fixed CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://insta-frontend-ashen.vercel.app",
    "http://localhost:5174"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Allow preflight (OPTIONS) requests
//app.options("*", cors());

// Test route
app.get("/", (req, res) => {
  res.send("this is get req");
});

// Connect to MongoDB
mongoose.connect(MONGOURL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Import Routes
app.use(require("./controllers/auth"));
app.use(require("./controllers/user"));
app.use(require("./controllers/post"));

// Start server
const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
