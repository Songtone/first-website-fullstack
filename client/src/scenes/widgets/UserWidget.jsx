import React from "react";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import {Box, Typography, Divider, useTheme} from "@mui/material";
import UserImage from "../../components/UserImage.jsx";
import FlexBetween from "../../components/FlexBetween.jsx";
import WidgetWrapper from "../../components/WidgetWrapper.jsx";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const UserWidget = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(process.env.REACT_APP_BASE_URL + `/users/${userId}`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        username,
        commanderDecks
    } = user;

    return (
        <WidgetWrapper>
            {/*    FIRST ROW   */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath}/>
                    <Box>
                        <Typography
                            varian="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{commanderDecks.length}</Typography>
                    </Box>

                </FlexBetween>
                <ManageAccountsOutlined/>
            </FlexBetween>

            <Divider/>

            {/*    SECOND ROW   */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{color: main}}/>
                    <Typography color={medium}>STUFF1</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{color: main}}/>
                    <Typography color={medium}>STUFF1</Typography>
                </Box>
            </Box>

            <Divider/>

            {/*    THIRD ROW   */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}> STUFF 2</Typography>
                    <Typography color={medium} fontWeight="500">STUFF 2</Typography>
                </FlexBetween>
            </Box>

            <Divider/>

            {/*    THIRD ROW   */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography fontSize="1rem" color={main}> Social Profiles</Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
                            IMAGE
                        </FlexBetween>
                    </FlexBetween>
                </FlexBetween>
            </Box>
</WidgetWrapper>
)
};

export default UserWidget;