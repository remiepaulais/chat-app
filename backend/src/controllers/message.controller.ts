import { Request, Response } from 'express'
import User from '../models/user.model'
import Message from '../models/message.model'
import cloudinary from '../lib/cloudinary'

/**
 * Gets all users except the logged-in user for the sidebar display
 * @param req Express Request object containing the logged-in user's ID in req.user._id
 * @param res Express Response object
 * @returns Array of user objects with passwords excluded
 * @throws 500 if server error occurs
 */
export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user._id.toString()
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }
    }).select('-password')
    res.status(200).json(filteredUsers)
  } catch (error) {
    console.log(`Error in getUsersForSidebar ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Retrieves chat messages between two users
 * @param req Express Request object containing:
 *        - params.id: ID of the user to chat with
 *        - user._id: Logged in user's ID
 * @param res Express Response object
 * @returns Array of message objects between the two users
 * @throws 500 if server error occurs
 */
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params
    const myId = req.user._id.toString()
    const messages = await Message.find({
      $or: [
        { senderID: myId, receiverID: userToChatId },
        { senderID: userToChatId, receiverID: myId }
      ]
    })
    res.status(200).json(messages)
  } catch (error) {
    console.log(`Error in getMessages ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Sends a new message to another user
 * @param req Express Request object containing:
 *        - body.text: Message text content
 *        - body.image: Optional base64 encoded image
 *        - params.id: Receiver's user ID
 *        - user._id: Sender's user ID
 * @param res Express Response object
 * @returns Newly created message object
 * @throws 500 if server error occurs
 * @todo Add real-time functionality with socket.io
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { text, image } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id.toString()

    let imageUrl: string
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image)
      imageUrl = uploadResponse.secure_url
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    })

    await newMessage.save()

    // todo: realtime functionality goes here => socket.io

    res.status(201).json(newMessage)
  } catch (error) {
    console.log(`Error in sendMessage ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
}
