const express = require("express");
const mongoose = require("mongoose");

const environment = require("./environments/environment");
const websiteRouter = require("./routes/website-route");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/website", websiteRouter);

mongoose.connect(environment.mongo_uri)
    .then(_ => {
        console.log(`Successfully connected to datasource`);
        app.listen(environment.port, () => {
            console.log(`Server running on port ${environment.port}`);
        });
    })
    .catch(err => console.error(`Error connecting to datasource:`, err));
