const mongoose = require("mongoose");

// Mongoose

const connectString = `mongodb+srv://animesapi:animesapi@cluster0-crzfp.mongodb.net/animesApi?retryWrites=true&w=majority`;

mongoose
  .connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Conectado ao MongoDB!");
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
