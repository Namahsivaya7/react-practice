import { Router } from 'express'
import User from '../models/User.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { generateToken } from '../utils/generateToken.js'
import { toPublicUser } from '../utils/toPublicUser.js'

const router = Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' })
    }

    const user = await User.create({ name, email, password })
    const token = generateToken(user._id)

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: toPublicUser(user),
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')
      return res.status(400).json({ message })
    }

    if (error.message === 'JWT_SECRET is not configured') {
      return res.status(500).json({ message: 'Server auth is not configured' })
    }

    console.error('Signup error:', error)
    res.status(500).json({ message: 'Server error during signup' })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = generateToken(user._id)

    res.json({
      message: 'Signed in successfully',
      token,
      user: toPublicUser(user),
    })
  } catch (error) {
    if (error.message === 'JWT_SECRET is not configured') {
      return res.status(500).json({ message: 'Server auth is not configured' })
    }

    console.error('Signin error:', error)
    res.status(500).json({ message: 'Server error during signin' })
  }
})

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: toPublicUser(req.user) })
})

export default router
