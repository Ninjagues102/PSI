const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const environmentProd = require("./environments/environment");
const environmentDev = require("./environments/environment-dev");
const websiteRouter = require("./routes/website-route");

const app = express();
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/website", websiteRouter);

const environment = app.settings.env === "development" ? environmentDev : environmentProd;

mongoose.connect(environment.mongo_uri)
    .then(_ => {
        console.log(`Successfully connected to datasource`);
        app.listen(environment.port, () => {
            console.log(`Server running on port ${environment.port}`);
        });
    })
    .catch(err => console.error(`Error connecting to datasource:`, err));
