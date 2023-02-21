import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commanderDeckRoutes from "./routes/commanderDecks.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { createCommanderDeck } from "./controllers/commanderDecks.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import { users } from "./data/index.js";

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json( {limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, "public/assets");
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

//ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post("/commanderDecks", verifyToken, upload.single("picture"), createCommanderDeck)

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/commanderDecks", commanderDeckRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log('Now Running on Server Port: ' + PORT));

    // MOCK DATA ONLY ONCE
    // User.insertMany(users);

}).catch((error) => console.log(error + ' did not connect'))