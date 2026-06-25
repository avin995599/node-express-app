const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Real bug: hardcoded secret (also eslint will flag this)
const SECRET = "mysecretkey123"

// Real bug: bcrypt.compare is async but used synchronously
function validatePassword(plainPassword, hashedPassword) {
  const isValid = bcrypt.compare(plainPassword, hashedPassword)
  // isValid is a Promise here, not a boolean - always truthy!
  if (isValid) {
    return true
  }
  return false
}

// Real bug: jwt.sign with wrong algorithm name
function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    SECRET,
    { 
      expiresIn: '24h',
      algorithm: 'HS999'  // Invalid algorithm - will throw at runtime
    }
  )
}

// Real bug: missing return statement
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET)
    // Missing: return decoded
  } catch (err) {
    throw new Error('Invalid token')
  }
}

module.exports = { validatePassword, generateToken, verifyToken }
