const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

//user model
const User = require('../models/user.js')

router.get('/register', (req, res)=>{
    res.render('users/register.ejs')
})

router.post('/register', (req, res)=>{
   	// we need to encrypt our passwords 
	// we can use the bcrypt library for this 
	// we need to import the library at the top of our file 
	// first we need to generate salt 
	const salt = bcrypt.genSaltSync(10)
	// salt is a random number garbage we add to our encrypted passwords
	// the number we pass in to genSaltSync determines how much salt 
	// we are adding, the higher the number the more secure, but the longer it takes 
	// now we're going to generate the actual hashed password 
    // console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    console.log(req.body)

    User.findOne({username: req.body.username}, (err, userExists)=>{
        if(userExists){
            res.send('The username is taken!')
        }else{
            User.create(req.body, (err, createdUser)=>{
                if(err){
                    console.log(err.message)
                }else{
                console.log(createdUser)
                req.session.currentUser = createdUser
                // res.redirect('/dogpark/home')
                res.render('users/signin.ejs')
            }
            })
        }
    })
})

router.get('/signin', (req, res)=>{
    res.render('users/signin.ejs')
})

router.post('/signin', (req, res)=>{
    User.findOne({username: req.body.username}, (err, foundUser)=>{
        if(foundUser){
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if(validLogin){
                req.session.currentUser = foundUser
                res.redirect('/dogpark/home')
            }else{
                res.send('Invalid username or password!')
            }
        }
    })
})

router.get('/signout', (req, res)=>{
    console.log(req.session.currentUser)
    req.session.destroy()
    res.redirect('/dogpark')
})

module.exports = router