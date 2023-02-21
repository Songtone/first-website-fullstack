import CommanderDeck from "../models/CommanderDeck.js";
import User from "../models/User.js";

// READ
export const getCommanderDecks = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const commanderDecks = await Promise.all(
            user.commanderDeck.map((id) => CommanderDeck.findById(id))
        );
        const formattedCommanderDecks = commanderDecks.map(
            ({ _id, commanderName, colorPie, wins, picturePath }) =>{
                return { _id, commanderName, colorPie, wins, picturePath };
            }
        );
        res.status(200).json(formattedCommanderDecks);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
};

// CREATE
export const createCommanderDeck = async (req, res) => {
    try{
        const {
            userId,
            commanderName,
            colorPie,
            picturePath,
            deckName,
        } = req.body;

        const user = await User.findById(userId);

        const newCommanderDeck = new CommanderDeck({
            commanderName,
            colorPie,
            picturePath,
            deckName,
        });

        const savedCommanderDeck = await newCommanderDeck.save();

        user.commanderDecks.push(savedCommanderDeck.id);

        await user.save();

        const commanderDecks = await Promise.all(
            user.commanderDecks.map((id) => CommanderDeck.findById(id))
        );
        const formattedCommanderDecks = commanderDecks.map(
            ({ _id, commanderName, colorPie, wins, picturePath }) =>{
                return { _id, commanderName, colorPie, wins, picturePath };
            }
        );
        res.status(200).json(formattedCommanderDecks);
    }catch(error){
        res.status(409).json({ message: error.message });
    }
};