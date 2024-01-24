import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).send("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
});


// const donor = Donor.find()
// const Pat = Pat.find()

// const donordata ={
//   donorId:donor._id,
//   donorName:donor.name
// }
// const pdata ={
//   pId:Pat._id,
//   pName:Pat.name
// }



// res.json(donordata,pdata)


// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import User from '../model/usersModel.js';
// import STATUS_CODE from '../constant/statusCode.js';

// dotenv.config();

// export const isAuthorized = async (req, res, next) => {
//   try {
//     let token;
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     if (authHeader) {
//       token = authHeader.split(' ')[1];

//       jwt.verify(token, process.env.SECRET, async (err, decoded) => {
//         if (err) return res.status(STATUS_CODE.UNAUTHORIZED).send('Invalid token');

//         console.log('decoded:', decoded);
//         const { id } = decoded;

//         const user = await User.findById(id);

//         if (!user) return res.status(STATUS_CODE.NOT_FOUND).send('User not found');

//         req.user = user;
//         next();
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const isAdmin = async (req, res, next) => {
//   try {
//     const { role } = req.user;

//     if (role !== 'admin') {
//       return res.status(STATUS_CODE.FORBIDDEN).send('Access Forbidden');
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// };
