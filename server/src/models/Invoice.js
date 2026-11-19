const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
 description:{type:String,required:true},hsn:String,qty:{type:Number,default:1},unit:String,
 rate:{type:Number,default:0},discount:{type:Number,default:0},gst:{type:Number,default:0},
 taxable:{type:Number,default:0},tax:{type:Number,default:0},amount:{type:Number,default:0}
},{_id:false});
const schema=new mongoose.Schema({
 invoice_no:{type:String,unique:true,index:true},date:{type:String,required:true},due_date:String,
 copy_type:{type:String,default:'Original Copy'},reverse_charge:{type:String,default:'No'},
 place_of_supply:String,tax_type:{type:String,enum:['intra','inter'],default:'intra'},
 business:{type:Object,required:true},customer:{type:Object,required:true},items:[itemSchema],
 subtotal:Number,discount_total:Number,tax_total:Number,cgst:Number,sgst:Number,igst:Number,grand_total:Number,
 amount_words:String,notes:String
},{timestamps:true});
module.exports=mongoose.model('Invoice',schema);
