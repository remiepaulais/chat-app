import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/user.model'
import { generateToken } from '../lib/utils'
import cloudinary from '../lib/cloudinary'

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    generateToken(user._id.toString(), res)

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      message: 'Login successful'
    })
  } catch (err) {
    console.log(`Error in login controller ${err.message}`)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const logout = (_: Request, res: Response) => {
  try {
    res.cookie(process.env.JWT_TOKEN_NAME, '', {
      maxAge: 0
    })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log(`Error in logout controller ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body
    const userID = req.user._id.toString()

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile picture is required' })
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      {
        profilePic: uploadResponse.secure_url
      },
      {
        new: true
      }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(`Error in updateProfile controller ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const check = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log(`Error in check controller ${error.message}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}
