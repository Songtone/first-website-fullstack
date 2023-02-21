import mongoose from "mongoose";

const CommanderDeckSchema = new mongoose.Schema({
    commanderName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    colorPie: {
        type: String,
        required: true,
        min: 1,
        max: 9,
    },
    wins: {
        type: Number,
        required: true,
        default: 0,
    },
    picturePath: {
        type: String,
        default: "",
    },
    deckName: {
        type: String,
        default: "",
    },
    description: String,
}, { timestamps: true});

const CommanderDeck = mongoose.model("CommanderDeck", CommanderDeckSchema);
export default CommanderDeck;