const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Missing middleware setup - will cause JSON parse errors
app.use(cors())

// Real bug: mongoose.connect returns a promise but no error handling
mongoose.connect(process.env.MONGO_URI)

// Real bug: undefined variable reference
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find()  // UserModel never imported/defined
    res.json({ success: true, data: users })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Real bug: async function without await causing unhandled promise
app.post('/api/users', (req, res) => {
  const user = new UserModel(req.body)
  user.save()  // Missing await - unhandled promise rejection
  res.json({ success: true, message: 'User created' })
})

// Real bug: wrong port variable
const PORT = process.env.PORT || 3000
app.listen(port, () => {  // 'port' is undefined, should be PORT
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
