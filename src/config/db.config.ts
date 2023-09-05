
import mongoose from "mongoose";
const mongo_url = 'mongodb+srv://rohitchaturvedi698:mmAxiZLS5ZqHpU61@cluster0.ftzk4kg.mongodb.net/?retryWrites=true&w=majority'
function connection(){
    mongoose.connect(mongo_url).then(()=>{
        console.log('connected');
    }).catch(()=>{
        console.log('error');
    })

}


export default connection;