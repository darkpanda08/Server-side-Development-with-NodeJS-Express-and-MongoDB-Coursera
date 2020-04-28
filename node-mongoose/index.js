const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'MONGO_URL';

options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const connect = mongoose.connect(url, options);

connect.then((db) => {
    console.log("Connected to MongoDB");

    Dishes.create({
        name: "Uthapizza",
        description: 'Test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: "Updated Test" }
        },{
            new: true
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);
        
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Vineet'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        //Dishes.remove() is depricated
        return Dishes.deleteMany({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});