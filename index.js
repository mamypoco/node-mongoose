const mongoose = require("mongoose");
const Campsite = require("./models/campsite");

const url = "mongodb://localhost:27017/nucampsite";
const connect = mongoose.connect(url, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

connect.then(() => {
   console.log("Connected correctly to server");

   Campsite.create({
      name: "React Lake Campground",
      description: "test",
   })

      .then((campsite) => {
         console.log(campsite);
         return Campsite.find();
      })
      .then((campsites) => {
         console.log(campsites);
         return Campsite.deleteMany();
         //The deleteMany() function is used to delete all of the documents that match conditions from the collection. This function behaves like the remove() function but it deletes all documents that match conditions regardless of the single option.
      })
      .then(() => {
         return mongoose.connection.close();
      })
      .catch((err) => {
         console.log(err);
         mongoose.connection.close();
      });
});
