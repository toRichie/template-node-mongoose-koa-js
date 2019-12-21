"use strict";

import chalk from "chalk";
import mongoose from "mongoose";
import config from "dotenv/config";

import app from './config/app'
import mongo from './config/mongo'
import mail from './config/mail'

import "babel-polyfill";
if (app.env === "development") {
  require("babel-register");
}


global.__basedir = __dirname;

/**
 * initialise the mongodb
 *
 */
const init = () => {

  if (mongo.enable) {

    mongoose.Promise = global.Promise;

    return new Promise((resolve, reject) => {
      mongoose
        .connect(mongo.connection, mongo.options)
        .then(() => {
          const source = require(app.src).default;
          resolve(source);
        })
        .catch(reject);
    });
  } else {
    return new Promise((resolve, reject) => {
      const source = require(app.src).default;
      resolve(source);
    })
  }
};


/**
 * start the server
 *
 * default port is 3000
 */
export const start = () => {
  init()
    .then(server => {
      server.listen(app.port, () => {

        
        let path =
          (app.env === "secure" ? "https://" : "http://") + app.host + ":" + app.port;
        console.log(
          chalk.green("kubex development server started on " + path)
        );
      });
    })
    .catch(err => {
      console.error(err);
    });
};

module.exports = start();