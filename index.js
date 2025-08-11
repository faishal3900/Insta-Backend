const express = require("express")
const app = express();
const { default: mongoose } = require("mongoose")
const { MONGOURL } = require("./key")
const cors=require('cors')



const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://insta-frontend-ashen.vercel.app"
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));






app.get("/", (req,res) => {
    res.send("this is get req")
})

const PORT = 3000;


mongoose.connect(MONGOURL)
.then(() => console.log("Database connected successfully"));

app.use(require("./controllers/auth"))
app.use(require("./controllers/user"))
app.use(require("./controllers/post"))

app.listen(PORT , "0.0.0.0", () => {
    console.log(`Serve is running on port http://localhost:${PORT}`);
})