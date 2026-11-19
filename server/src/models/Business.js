const mongoose=require('mongoose');
const schema=new mongoose.Schema({
 shop_name:{type:String,required:true,trim:true},owner_name:String,gstin:String,pan:String,
 phone:String,email:String,address:{type:String,required:true},state:String,state_code:String,
 logo_url:String,bank_name:String,account_number:String,ifsc:String,branch:String,account_holder:String,
 terms:String,place_of_supply:String
},{timestamps:true});
module.exports=mongoose.model('Business',schema);
