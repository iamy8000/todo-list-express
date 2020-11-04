const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  //檢查使用者是否已經存在
  User.findOne({ email }).then(user => {
    //使用者已存在：退回註冊頁面
    if (user) {
      console.log('user already existed!')
      res.render('register', { name, email, password, confirmPassword })
    } else {
      //建立新的使用者
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

module.exports = router