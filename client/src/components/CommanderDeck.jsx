import {
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCommanderDecks } from "../state";
import FlexBetween from "./FlexBetween.jsx";
import UserImage from "./UserImage.jsx";

const CommanderDeck = ({ commanderDeckId, name, subtitle, userPicturePath }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state => state.token));
    const commanderDecks = useSelector((state) => state.user.commanderDecks);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const addCommanderDecks = async () => {
        const response = await fetch(
            process.env.REACT_APP_BASE_URL+ `/commanderDecks/${_id}/create`,
            {
                method: "POST",
                headers: {

                }
            }
        )
    }


}

export default CommanderDeck;