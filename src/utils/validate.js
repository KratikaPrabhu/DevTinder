const validator = require('validator');


const validateSignUpdata = (req) =>{
    const {firstName,lastName,email,Password}=req.body;
    if(!firstName||!lastName){
        throw new Error("name is invalid");   
    }
    else if (!validator.isEmail(email)) {
        throw new Error("email id is invalid");
        
    }else if(!validator.isStrongPassword(Password)){
       throw new Error("password is not strong");
       
    }
};


const validateprofileData = (req) =>{
    const allowedEditfields =[
        "firstName",
        "lastName",
        "skills",
        "gender",
        "age",
        "about",
        "photoUrl"

    ];
const isallowedupdates = Object.keys(req.body).every((fields)=>{
    return allowedEditfields.includes(fields);
});
return isallowedupdates;  
}

module.exports={
    validateSignUpdata,
    validateprofileData,
   
  
}