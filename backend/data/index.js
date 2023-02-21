import mongoose from "mongoose";

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// users + post demo data...
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId()
];

export const users = [
    {
        _id: userIds[0],
        firstName: "Sebastien",
        lastName: "Ong TOne",
        username: "SongTone",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p11.jpeg",
        commanderDecks: [],
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    }
];
