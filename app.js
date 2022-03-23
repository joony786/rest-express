import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes'
const  environment = process.env.NODE_ENV || 'development'

const isProduction = environment === 'production';

const app = express();
console.log(isProduction);
app.use(morgan('dev'));
app.use(express.json());
if (!isProduction) {
    app.use(cors());
};
// app.use(helmet({
//     contentSecurityPolicy: false
// }));

app.use(routes)


app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = 'Resource Not Found!';
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
})

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    })
})




module.exports = app;