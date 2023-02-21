import React from "react";
import {Box, useMediaQuery} from "@mui/material";
import Navbar from "../navbar";
import {useSelector} from "react-redux";
import UserWidget from "../widgets/UserWidget.jsx";
import MyPostWidget from "../widgets/MyPostWidget.jsx";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const {_id, picturePath} = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0m5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath}></UserWidget>
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath}/>

                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%"></Box>
                )}
            </Box>
        </Box>
    )
}
export default HomePage;