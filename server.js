const app = require('./app');
const mongoose = require('mongoose');
const config = require('./service.json');

mongoose.connect(config.MONGODB_SERVER_LOCAL, {
    // useNewUrlParser: true, 
    // useUnifiedTopology: true
})
  .then(()=> console.log("Connected to mongoDB!"))
  .catch(err => console.log("MongoDB Connection Failed!", err.message))

  const port = config.PORT || 5000;

  app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`)
  })