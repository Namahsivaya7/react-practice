import { Router } from 'express'
import User from '../models/User.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { toPublicUser } from '../utils/toPublicUser.js'

const router = Router()

router.use(authMiddleware)

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 })
    res.json({ users: users.map(toPublicUser) })
  } catch (error) {
    console.error('List users error:', error)
    res.status(500).json({ message: 'Server error while fetching users' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ user: toPublicUser(user) })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Server error while fetching user' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already registered' })
      }
      user.email = email
    }

    if (name) {
      user.name = name
    }

    await user.save()
    res.json({ message: 'User updated successfully', user: toPublicUser(user) })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')
      return res.status(400).json({ message })
    }

    console.error('Update user error:', error)
    res.status(500).json({ message: 'Server error while updating user' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account from here' })
    }

    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Server error while deleting user' })
  }
})

export default router
