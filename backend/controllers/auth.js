//const { findOne } = require('../models/user');
const User = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

// exports.signup = (req, res) =>{
//     console.log("user", req.body);
//     const user = new User(req.body);
//     user.save((err, user)=>{
//         if (err){
//             return res.status(400).json({
//                 err
//             })
//         }
//         res.json({
//             user
//         })
//     })
// }

exports.signup = async (req, res, next)=>{

    const {name, email, password} = req.body;
      // if (!name){
      //   return  next(new ErrorResponse("name is required", 400));
      // }

      // if (!email){
      //   return  next(new ErrorResponse("E-mail is required", 400));
      // }

      // if (!password){
      //   return  next(new ErrorResponse("Password is required", 400));
      // }

      // if (password.length < 6){
      //   return  next(new ErrorResponse("Password must have at least six(6) characters", 400));
      // }

      const useExist = await User.findOne({email});
      if (useExist){
        return  next(new ErrorResponse("E-mail already taken", 400));
      }

  try {


    const  user = await User.create(req.body);
    res.status(201).json({
        success: true,
        user
    });
  } catch (err) {
    //   res.status(400).json({
    //       success: false
    //   })
    // next(err);
    // next(new ErrorResponse(`User not found with the id of ${req.params.id}`, 404));
    // next(new ErrorResponse(`e-mail: ${req.body.email}, already exists`, 403));
   next(err);
  }
}


exports.signin = async (req, res, next)=>{
  try{
    const {email, password} = req.body;
     // validation
    if (!email){
      return next(new ErrorResponse('Please enter an email ', 403));
    }
    if ( !password){
      return next(new ErrorResponse('Please enter a password', 403));
    }
    // check user email
    const user = await User.findOne({email});
    if  (!user){
      return next(new ErrorResponse('Invalid credenctials', 400));
    }

    //check password
    const isMatched = await user.comparePassword(password);
    if  (!isMatched){
      return next(new ErrorResponse('Invalid credenctials', 400));
    }
    // const token = await user.getJwtToken();
    // res.status(200).json({success: true, token});

    sendTokenResponse(user, 200, res);
  }

  catch(err){
    next(err) 
  }
}


const sendTokenResponse = async (user, statusCode, res) =>{
  const token = await user.getJwtToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.EXPIRE_TOKEN)
  };

  res
  .status(statusCode)
  .cookie('token', token, options)
  .json({success:true, token, user})
}

 


// LOG OUT USER
exports.logout =  (req, res, next)=>{
  // res.cookie('token', null, {
  //   expires: new Date(Date.now()),
  //   httpOnly: true
  // })

  res.clearCookie('token');

  res.status(200).json({
    success: true,
    message: "Logged out"
  })
}

//GET CURRENT LOG IN USER
exports.userProfile = async (req, res, next) =>{
  
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user
  });


}