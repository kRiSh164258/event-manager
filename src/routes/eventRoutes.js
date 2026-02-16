const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/eventController");

router.post("/", protect, createEvent);
router.get("/", getEvents);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
