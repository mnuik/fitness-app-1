const Event = require('../models/Event')

module.exports = {
    async getEventById(req, res) {
    const { eventId } = req.params

    try {
        const user = await Event.findById(eventId)
        return res.json(event)
    } catch (error) {
        return res.status(400).json({
            message: 'Event ID does not exist. Do you want to register?'
        })
    }
},

async getAllEvents(req, res) {
    const { category } = req.params
    const query = category ? { category } : {}

    try {
        const events = await Event.find(query)

        if (events) {
            return res.json(events)
        }
    } catch (error) {
        return res.status(400).json({
            message: " We do not have any events to show"
        })
    }
}
}
