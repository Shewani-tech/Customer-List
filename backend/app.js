const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
//enable cors
//app.use(cors);
app.use(cors({
    origin: 'http://localhost:4200'
}));
//enable json parser
app.use(express.json());
const PORT = 3000;
//route the customer api
const customer = require('./router/customer');
app.get('/', (req, res, next) => {
    res.send("Welcome to Customers API !!");
})
app.use('/api/customers',customer);
app.listen(PORT,(error)=>{

    !error ? console.log(`app is listening at localhost${PORT}`): console.log('An error occured',error);



});
//app.listen(PORT, () => console.log('connected'));

mongoConnect().catch((error) => console.error(error));

async function mongoConnect(){
    const connectionString ="mongodb+srv://shewanioffical:LearnMongo$2025@cluster0.kite6il.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
     await mongoose.connect(connectionString);
     console.log('mongo connected');
     
     mongoose.set('strictQuery',true);
}