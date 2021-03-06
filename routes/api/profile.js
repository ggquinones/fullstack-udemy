const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

router.get('/me', auth, async (req,res) => {
  try {
    const profile = await Profile
    .findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])

    if(!profile) {
      return res.status(400).json({ msg : 'No profile for this user.'})
    }
    res.json(profile)

  } catch(err) {
    console.log(err.message)
    return res.status(500).send('SERVER ERROR\n')
  }
})

module.exports = router