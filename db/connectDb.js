const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

// Create Database
MongoClient.connect(`mongodb://${process.env.DATABASE_HOST}:27017/${process.env.DATABASE_DB}`,
    { useUnifiedTopology: true })
    .then(db => {
        console.log('Database is created!');
        db.close();
    })
    .catch(err => {
        console.log('Fail while creating database /n' + err)
        throw err;
    });

// Connect Database
const mongooseConnect = mongoose.connect(
        `mongodb://${process.env.DATABASE_HOST}:27017/${process.env.DATABASE_DB}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.log('Unable to connect to the database:', err);
        });

module.exports = mongooseConnect;
