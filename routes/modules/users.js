const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  console.log('login POST done')
})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router