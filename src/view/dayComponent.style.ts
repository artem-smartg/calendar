import { SxProps, Theme } from "@mui/material";

export const styles = {
    boxContainer: {
        backgroundColor: "#ccc",
        border: "1px solid #ddd",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        padding: "6px",
        borderRadius: "4px",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
    } as SxProps<Theme>,
    typographySubtitle: {
        fontWeight: "bold",
        marginBottom: "4px",
        color: "#333",
        textAlign: "left",
    } as SxProps<Theme>,
    taskBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "4px",
        backgroundColor: "#f9f9f9",
        padding: "4px",
        borderRadius: "3px",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        cursor:'pointer',
    } as SxProps<Theme>,
    labelBox: {
        width: "40px",
        height: "5px",
        marginRight: "4px",
        borderRadius: "2px",
    } as SxProps<Theme>,
    taskTitle: {
        color: "#333",
        textAlign: "left",
    } as SxProps<Theme>,
};
