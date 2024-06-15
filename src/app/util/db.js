import {MongoClient} from "mongodb";
const url = "mongodb+srv://admin:admin@cluster0.y4w089k.mongodb.net/";
const option = {useNewUrlParser: true, useUnifiedTopology: true};
let connectDB;

if(process.env.NODE_ENV === 'development'){
    //npm run dev일 때
    if(!global._mongo){
        global._mongo = new MongoClient(url, option).connect()
    }
    connectDB = global._mongo
}else{
    //npm run build일 때
    connectDB = new MongoClient(url, option).connect()
}

export {connectDB}
