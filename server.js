const server = require('express');
const routes = require('./controllers');
const PORT = process.env.port || 3003;

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