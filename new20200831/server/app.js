
const express = require('express');
const app = express();
const { port } = require('./config');
const bodyParser = require('body-parser');
app.use(require('cors')())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use(express.static('./public'))

app.use(require('./routers/modules/GetFile'))

app.use('/be',require('./routers/login'))
app.use('/web',require('./routers/modules/WebBlog'))
app.use('/be',require('./routers/modules/BeBlog'))
app.listen(port, () => {
    console.log('sever run to http://127.0.0.1:' + port);
})