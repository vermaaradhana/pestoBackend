// creating connection instance of mongodb

const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/pestoTask", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

exports.connection = mongoose;