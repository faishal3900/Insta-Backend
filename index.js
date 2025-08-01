const express = require("express")
const app = express();
const { default: mongoose } = require("mongoose")
const { MONGOURL } = require("./key")
const cors=require('cors')
const port = process.env.PORT || 10000 

app.use(express.json());
app.use(cors())
app.get("/", (req,res) => {
    res.send("this is get req")
})


mongoose.connect(MONGOURL)
.then(() => console.log("Database connected successfully"));

app.use(require("./controllers/auth"))
app.use(require("./controllers/user"))
app.use(require("./controllers/post"))
app.listen(port, () => {
    console.log(`Serve is running on port http://localhost:${port}`);
})