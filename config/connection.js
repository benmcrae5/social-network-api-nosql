const mongoose = requires('mongoose');

const connection = mongoose.connect(process.env.MONGODB_URI || 'mondodb://localhost/social-site-db', {
    useFindAndmodify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

module.exports = connection;