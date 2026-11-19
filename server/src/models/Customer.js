const mongoose=require('mongoose');
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},gstin:String,phone:String,email:String,
 address:String,state:String,state_code:String
},{timestamps:true});
module.exports=mongoose.model('Customer',schema);
