const mongoose = require("mongoose");

const config = require('../config');
const User = require("../models/employee");

// exports.user_signup = (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Mail exists"
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err
//             });
//           } else {
//             const user = new User({
//               _id: new mongoose.Types.ObjectId(),
//               email: req.body.email,
//               name: req.body.name,
//               age: req.body.age,
//               contactno: req.body.contactno,
//               address: req.body.address,
//               password: hash
//             });
//             user
//               .save()
//               .then(result => {
//                 console.log(result);
//                 res.status(201).json({
//                   message: "User created"
//                 });
//               })
//               .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err
//                 });
//               });
//           }
//         });
//       }
//     });
// };


exports.create_User = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    currentaddress: req.body.currentaddress,
    permanentaddress: req.body.permanentaddress,
    img:req.body.img,
    course:req.body.course,
    collage:req.body.collage,
    year:req.body.year,
    percentage:req.body.percentage,
    companyname:req.body.companyname,
    fromdate:req.body.fromdate,
    todate:req.body.todate,
    designation:req.body.designation,
    linkedin:req.body.linkedin,
    github:req.body.github,
    facebook:req.body.facebook,
    hobbies:req.body.hobbies,
     });
    user
     .save()
       .then(result => {
      console.log(result);
      res.status(201).json({
       message: "Employee created"
        });
        })
     .catch(err => {
       console.log(err);
        res.status(500).json({
        error: err
        });
      });
};



exports.user_all = (req, res, next) => {
  User.find()
    .select("firstname lastname phone email")
    .exec()
    .then(docs => {
      const response = {
        users: docs.map(doc => {
          return {
            firstname: doc.firstname,
            lastname:doc.lastname,
            phone: doc.phone,
            email: doc.email,
            id:doc.id,
            currentaddress:doc.currentaddress,
            permanentaddress:doc.permanentaddress,
            companyname:doc.companyname,

          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.user_delete = (req, res, next) => {
  console.log(req.params.empId)
  User.deleteOne({ _id: req.params.empId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_edit = async (req, res, next) => {
  const id = req.params.empId;
  const email = req.body.email;
  const user = await User.findById({
    _id: id
  });
  const emailExist = await User.findOne({
    "req.body.email": email
  })
  try {
    if (emailExist && emailExist.local.email !== user.local.email) {
      console.log('email exists and its not mine')
      res.status(200).json({
        error: "Email already registered",
        user: user
      })
    } else {
      if (!emailExist || emailExist.local.email === user.local.email) {
        console.log("email doesnt exist or email exist and it's current user")
        const currUser = await User.findByIdAndUpdate({
          _id: id
        }, req.body);
        if (!currUser) {
          console.log('cannot fin user')
          return res.status(400).json({
            errorMessage: "Could not find user"
          })
        } else {
          console.log('====edit user====')
          res.status(200).json({
            message: "Successfully edit user",
            user: currUser
          })
        }
      }
    }
  } catch (error) {
    console.log('is there a problem')
    res.json({
      errorMessage: error
    })
  }
}
exports.curr_User = async (req, res, next) => {
  let id = req.params.empId
  try {
    const user = await User.findById({
      _id: id
    })
    if (!user) {
      res.status(400).send({
        success: false,
        message: "User not found"
      });
    } else {
      res.status(200).json({
        user
      })
    }
  } catch (error) {
    res.json(error)
  }

}