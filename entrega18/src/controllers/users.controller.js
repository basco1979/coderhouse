import { userModel } from '../dao/models/user.model.js'
import { usersService } from '../dao/repositories/index.js'

//Change user role to premium and the other way round
export const userToPremium = async (req, res) => {
  const { uid } = req.params
  try {
    const user = await userModel.findOne({ _id: uid })
    let x = 0
    user.documents.forEach((doc) => {
      if (doc.doctype.includes('profile')) {
        x += 1
      }
      if (doc.doctype.includes('accountstatement')) {
        x += 1
      }
      if (doc.doctype.includes('address')) {
        x += 1
      }
    })
    if (x === 3 && user.role === 'user') {
      user.role = 'premium'
      const result = await usersService.updateUser(uid, user)
      return res.send({ message: `User role updated to ${user.role} ` })
    }
    if (user.role === 'premium') {
      user.role = 'user'
      const result = await usersService.updateUser(uid, user)
      return res.send({ message: `User role updated to ${user.role} ` })
    } else {
      res.status(422).json({ error: 'Not enough documents for this action' })
    }
  } catch (error) {
    req.logger.error(
      `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to update user`
    )
  }
}

export const postDocument = async (req, res) => {
  if (!req.file)
    return res.status(400).send({ status: 'error', error: 'Cannot save file' })
  let { uid } = req.params
  const user = await userModel.findOne({ _id: uid })
  const newDoc = {
    name: req.file.filename,
    reference: req.file.path,
    doctype: req.file.fieldname,
  }
  user.documents.push(newDoc)
  const updatedUser = await usersService.updateUser(uid, user)
  res.send({ status: 'success', data: updatedUser })
}
