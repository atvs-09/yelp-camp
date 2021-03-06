const Campground = require("../models/campground");
const mongoose = require("mongoose");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';


mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connection Open");
    })
    .catch((err) => {
        console.log("Mongo Connection error");
        console.log(err);
    })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error"));
db.once("open", () => {
    console.log("Connected!!!");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const pr = Math.floor(Math.random() * 30);
        const c = new Campground({
            author: '60f0850051947f0015ecae1e',
            location: `${cities[rand].city}, ${cities[rand].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: pr,
            geometry: {
                coordinates: [
                    cities[rand].longitude,
                    cities[rand].latitude
                ],
                type: 'Point'
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, aliquam? Neque veritatis consequuntur rerum aspernatur magnam sit quam alias! Repellat voluptate eius ratione amet perspiciatis assumenda dolorum, officia repudiandae molestiae",
            image: [{
                url: 'https://res.cloudinary.com/db1pq7dxf/image/upload/v1625921471/YelpCamp/wifm9xyn8jekqjseegch.jpg',
                filename: 'YelpCamp/wifm9xyn8jekqjseegch'
            },
            {
                url: 'https://res.cloudinary.com/db1pq7dxf/image/upload/v1625921476/YelpCamp/zqdkr5tqtnmstimifdhl.jpg',
                filename: 'YelpCamp/zqdkr5tqtnmstimifdhl'
            }
            ]
        });
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});


