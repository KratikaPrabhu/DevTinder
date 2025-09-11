const mongoose = require('mongoose');

const connectionrequestSchema = mongoose.Schema(
    {
        fromuserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"user"
        },
       touserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"user"
        },
        status: {
        type: String,
        enum: {
             values: ['ignore', 'rejected','accepted','interested'],
             message: '{VALUE} is not a status type'
    }
  }
    },
    { 
    timestamps: true,
 }
)

const ConnectionrequestModle = new mongoose.model("connectionRequest",connectionrequestSchema);
module.exports = ConnectionrequestModle;