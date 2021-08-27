const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../config/passport')(passport);
var currentUser;
var mongoose = require('mongoose');
// Load User model
const User = require('../models/User');
const Employee = require('../models/Employee');
var fs = require('fs');
const { Mongoose } = require('mongoose');
// requireLogin = passport.authenticate('local', { session: false });

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// router.post('/login', requireLogin, function(req, res){    //not working. requireLogin
//    AuthenticationController.login(req,res)});
// Login
router.post('/login', (req, res) => {
  let errors = [];

  passport.authenticate("login", function (err, user) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      currentUser = user;
      return res.status(200).json({ user: user });
    });
  })(req, res);
});
// Logout
router.get('/logout', (req, res) => {
  currentUser = null;
  res.json({ message: "logged out" })
})

// router.get('/currentUser', (req, res) => {
//   if (currentUser)
//     res.json(currentUser);
//   else
//     res.json({ message: "not found" })
// });

// router.post('/activeEmployee', async (req, res) => {
//   await Employee.findByIdAndUpdate({ _id: req.body._id }, { $set: { "active": req.body.active } }, (err, result) => {
//     if (err)
//       res.json({ errors: err })
//     if (result)
//       res.json(result);
//   });
// })

// router.post('/employee', async (req, res) => {
//   await Employee.findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       errors.push({ msg: 'Email already exists' });
//     }
//   });
//   const data = req.body;
//   let file = req.files.image;
//   delete data.image;

//   try {
//     const collection = new Employee(data);
//     await collection.save();

//     const dir = `${__dirname}/../product_images/${collection.id}/`;

//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }

//     file.name = uuidv4() + '.png';

//     await file.mv(`${dir}${file.name}`);

//     collection.imageLink = collection.id + '/' + file.name;
//     await collection.save();

//     res.json({
//       message: 'Employee added successfully'
//     })
//   } catch (ex) {
//     res.status(400).json({
//       message: ex.message || 'Error while adding the product'
//     })
//   }
//   // }
// })

// router.get('/getEmployee', async (req, res) => {
//   await Employee.find({}, (err, result) => {
//     if (err)
//       res.json({ errors: err })
//     if (result)
//       res.json(result);
//   });
// })
// router.post('/updateEmployee', async (req, res) => {
//   // await Employee.findOne({ email: req.body.email }).then(user => {
//   //   if (user) {
//   //     // errors.push({ msg: 'Email already exists' });
//   //     res.json({
//   //       err:"email already exist"
//   //     })
//   //   }
//   // });
//   const data = req.body;
//   let file = req.files.image;
//   // delete data.image;

//   try {
//     await Employee.findOneAndUpdate({ _id: req.body._id }, data).then(async (user) => {
//       if (user) {
//         const collection = user;
//         if (file) {
//           const dir = `${__dirname}/../product_images/${collection.id}/`;

//           if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir);
//           }

//           file.name = uuidv4() + '.png';

//           await file.mv(`${dir}${file.name}`);

//           collection.imageLink = collection.id + '/' + file.name;
//           await collection.save();
//         }
//         res.json({
//           message: 'Employee added successfully'
//         })
//       }
//     });

//   } catch (ex) {
//     res.status(400).json({
//       message: ex.message || 'Error while adding the product'
//     })
//   }
// })
// router.post('/deleteEmployee', async (req, res) => {
//   await Employee.findOneAndRemove({ _id: req.body._id }, (err, result) => {
//     if (err)
//       res.json({ errors: err })
//     if (result)
//       res.json(result);
//   });
// })
// const uuidv4 = () => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = Math.random() * 16 | 0,
//       v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }

module.exports = router;
