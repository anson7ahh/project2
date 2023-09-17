const express = require("express")
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
require('dotenv').config()
const router = require("./router/user.js")
const Authrouter = require("./router/auth.js")
const session = require('express-session')
const store = session.MemoryStore();
const passport = require('passport')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: process.env.keysession,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        Maxage: 5 * 6 * 1000
    },
    store
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use("/", router);
app.use("/", Authrouter)





app.use((req, res, next) => {
    next(createError.NotFound('ko tim thay router'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
