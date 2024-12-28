import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'
import { generateToken } from '../lib/utils'

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters' })
    }

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    })

    if (newUser) {
      generateToken(newUser._id.toString(), res)
      await newUser.save()
      return res.status(201).json({ _id: newUser._id, message: 'User created' })
    } else {
      return res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (err) {
    console.log(`Error in signup controller ${err.message}`)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const login = (_: Request, res: Response) => {
  res.send('Login Route')
}

export const logout = (_: Request, res: Response) => {
  res.send('Logout Route')
}
