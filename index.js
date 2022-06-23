//connection to DB server
const mongoose = require("mongoose");
const Campsite = require("./models/campsite");

const url = "mongodb://localhost:27017/nucampsite";
const connect = mongoose.connect(url, {
   useCreateIndex: true,
   useFindAndModify: false,
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

         return Campsite.findByIdAndUpdate(
            campsite._id,
            {
               $set: { description: "Updated Test Document" },
            },
            {
               new: true,
               //return the updated document, otherwise it will return the original document before it was updated.
            }
         );
      })
      .then((campsite) => {
         console.log(campsite);

         campsite.comments.push({
            rating: 5,
            text: "What a magnificent view!",
            author: "Tinus Lorvaldes",
         });

         return campsite.save();
      })
      .then((campsite) => {
         console.log(campsite);
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
