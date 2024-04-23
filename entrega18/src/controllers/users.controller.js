import { userModel } from '../dao/models/user.model.js'
import { usersService } from '../dao/repositories/index.js'


//Change user role to premium and the other way round
export const userToPremium = async (req, res) => {
  const { uid } = req.params
  try {
    const user = await userModel.findOne({ _id: uid })
    user.role =
      user.role === 'premium' ? (user.role = 'user') : (user.role = 'premium')
    const result = await usersService.updateUser(uid, user)
    res.send({ message: `User role updated to ${user.role} ` })
  } catch (error) {
    req.logger.error(
      `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()} - Error to update user`
    )
  }
}

export const postDocument = async (req, res) => {
  const {filetype} = req.query
  console.log(filetype)
  if(!req.file) return res.status(400).send({status: 'error', error: 'Cannot save file'})
  let {uid} = req.params
  const user = await userModel.findOne({ _id: uid })
  console.log(req.file)
}