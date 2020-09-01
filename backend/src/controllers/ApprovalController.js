// Get registration model

const Registration = require('../models/Registration')

// Find registration by ID for the passed param
// Change approved status value


module.exports = {
    async approval(req, res) {
        const { registrationId } = req.params

        try {
            const registration = await Registration.findById(registrationId)

            registration.approved = true

            await registration.save()
            return res.json(registration)

        } catch (err) {
            return res.status(400).json(error)
        }
    }
}

// save()

// Send response