import { SxProps, Theme } from "@mui/material";

export const styles = {
    modalBox: {
        padding: 3,
        backgroundColor: "#fff",
        margin: "50px auto",
        maxWidth: 400,
        borderRadius: 1,
    } as SxProps<Theme>,
    title: {
        mt: 2,
        mb: 1,
    } as SxProps<Theme>,
    priorityBox: {
        display: "flex",
        gap: 1,
        mb: 2,
    } as SxProps<Theme>,
    priorityLabel: (color: string, isSelected: boolean): SxProps<Theme> => ({
        width: 24,
        height: 24,
        backgroundColor: color,
        borderRadius: "30%",
        cursor: "pointer",
        border: isSelected ? "2px solid #000" : "2px solid transparent",
    }),
};
