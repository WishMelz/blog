const express = require("express")
const app = express();
const router = express.Router();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static("public"))




app.set("view engine", "ejs");
app.set("views", __dirname + "/views")



app.use(require("./router/UpFile"))
app.use(require("./router/forBlog"))
app.use(require("./router/page"))
app.use(router)
app.listen(6001, () => {
    console.log("http://127.0.0.1:6001");
})