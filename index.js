const express = require("express")
const app = express();
const { default: mongoose } = require("mongoose")
const { MONGOURL } = require("./key")
const cors=require('cors')
const dotenv = require ("dotenv")


app.use(express.json());
app.use(cors())
app.get("/", (req,res) => {
    res.send("this is get req")
})
dotenv.config()
const PORT = process.env.PORT || 8000;


mongoose.connect(MONGOURL)
.then(() => console.log("Database connected successfully"));

app.use(require("./controllers/auth"))
app.use(require("./controllers/user"))
app.use(require("./controllers/post"))

app.listen(PORT, () => {
    console.log(`Serve is running on port http://localhost:${PORT}`);
})