import {createTheme} from "@mui/material"

const theme = createTheme({
    palette: {
        primary: {main: "#8B6FB3"},
        secondary: {main: "#C9A86A"},
        background: {
            default: "#161317",
            paper: "#221C24",
        },
        text: {
            primary: "#F0E6D2",
            secondary: "#BFB3A0",
        },
        mode: "dark",
        // primary: {main: "#C8A96A"},
        // secondary: {main: "#7A3E3E"},
        // background: {
        //     default: "#2B1F17",
        //     paper: "#3A2A21",
        // },
        // text: {
        //     primary: "#F2E6C9",
        //     secondary: "#CBBFA2",
        // },
    },
    typography: {
        fontFamily: "MedievalSharp",
    },
})


export default theme