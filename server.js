const server = require('express');
const routes = require('./controllers');
const mongoose = require('mongoose');
//const serverConnect = require('./config/connection');
const PORT = process.env.port || 3003;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-site-db', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

const app = server();
app.use(server.json());
app.use(server.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, (err) => {
    if (!err) {
        console.log('connected at http://localhost:3001')
    } else {
        console.log(err);
    }
})