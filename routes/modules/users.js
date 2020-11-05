const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

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
  const erros = []
  //表單填寫錯誤：
  if (!name || !email || !password || !confirmPassword) {
    erros.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    erros.push({ message: '密碼與確認密碼不相符！' })
  }
  if (erros.length) {
    return res.render('register', {
      erros,
      name,
      email,
      password,
      confirmPassword
    })
  }

  //檢查使用者是否已經存在
  User.findOne({ email }).then(user => {
    //使用者已存在：退回註冊頁面
    if (user) {
      erros.push({ message: '這個email已經註冊過了。' })
      res.render('register', {
        erros,
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      //建立新的使用者
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt)) //為使用者密碼「加鹽」，產生雜湊值
        .then(hash => User.create({
          name,
          email,
          password: hash,
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router