// Import required packages and models
const bcrypt = require('../../node_modules/bcrypt/bcrypt')
const User = require('../models/User')

// Export modules
module.exports = {

    // Grab email and password from request body
    async store(req, res) {
        const { email, password } = req.body

        try {
            // Check if both input fields have been filled --'Required field is missing
            if (!email || !password) {
                res.status(200).json({
                    message: 'Required field missing'
                })
            }

            // Findthe provided email in User database
            const user = await User.findOne({ email })

            // Check if user exists. If not, ask to register as response
            if (!user) {
                return res.status(200).json({
                    message: 'User not found. Do you want to register?'
                })
            }

            // Check if user and password combo match
            // Password from server will be hashed, so decrypt and compate
            if (user && await bcrypt.compare(password, user.password)) {
                const userResponse = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                return res.json(userResponse)
            } else {
                return res.status(200).json({
                    message: 'Email or password does not match'
                })
            }

        } catch (error) {
            throw Error(`Error while authenticating a User ${error}`)
        }

    }
}

