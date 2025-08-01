const express = require("express")
const app = express();
const { default: mongoose } = require("mongoose")
const { MONGOURL } = require("./key")
const cors=require('cors')


app.use(express.json());
app.use(cors())
app.get("/", (res,req) => {
    res.send("this is get req")
})


mongoose.connect(MONGOURL)
.then(() => console.log("Database connected successfully"));

app.use(require("./controllers/auth"))
app.use(require("./controllers/user"))
app.use(require("./controllers/post"))
app.listen(3000, () => {
    console.log("Serve is running on port http://localhost:3000");
})