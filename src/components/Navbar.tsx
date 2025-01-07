import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar: React.FC = () => {
    return (
        <AppBar sx={{
            backgroundColor: "orange",
            position: "fixed",
            height: "64px"
        }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>

                <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                    My Calendar
                </Typography>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
