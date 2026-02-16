const Event = require("../models/Event");

// CREATE EVENT
exports.createEvent = async (req, res) => {
    try {
        const { name, date, capacity } = req.body;
        if (!name || !date || !capacity)
            return res.status(400).json({ message: "All fields required" });

        const event = await Event.create({
            name,
            date,
            capacity,
            createdBy: req.user._id
        });

        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET EVENTS (filter + pagination)
exports.getEvents = async (req, res) => {
    try {
        let { start, end, page = 1, limit = 10 } = req.query;

        const filter = {};
        if (start && end)
            filter.date = { $gte: new Date(start), $lte: new Date(end) };

        page = Math.max(1, Number(page));
        limit = Math.max(1, Number(limit));

        const events = await Event.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ date: 1 });

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const { name, date, capacity } = req.body;

        if (name) event.name = name;
        if (date) event.date = date;
        if (capacity !== undefined) event.capacity = capacity;

        await event.save();
        res.json(event);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        await event.deleteOne();
        res.json({ message: "Event deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
