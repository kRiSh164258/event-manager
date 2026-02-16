const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

eventSchema.pre("save", function () {
    if (this.isModified("capacity")) {
        this.availableSeats = this.capacity;
    }
});

module.exports = mongoose.model("Event", eventSchema);
