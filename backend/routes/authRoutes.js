import { Router } from 'express'
import User from '../models/User.js'

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

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')
      return res.status(400).json({ message })
    }

    console.error('Signup error:', error)
    res.status(500).json({ message: 'Server error during signup' })
  }
})

export default router
