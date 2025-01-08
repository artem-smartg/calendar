import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { observer } from 'mobx-react-lite';
import { DayProps, Task } from "../type/calendar.type";
import { Context } from "../context/ContextProvider";
import { ContextType } from "../type/context.type";
import { styles } from "../view/dayComponent.style"


const DayComponent: React.FC<DayProps> = observer(({ day }) => {
    const { dragDrop, taskModal } = useContext(Context) as ContextType

    const dayNumber = new Date(day.date).getDate();
    const monthName = new Date(day.date).toLocaleString("en-US", { month: "short" });

    const handleTaskClick = (task: Task) => {
        taskModal.setTaskToEdit(task, day.date); 
        taskModal.toggleModal();
      };

    return (
        <Box sx={styles.boxContainer}>

            <Typography variant="subtitle2" sx={styles.typographySubtitle}>
                {day.showMonth && (
                    <Typography >{`${monthName} ${dayNumber}`}</Typography>
                )}
                {!day.showMonth && <Typography>{dayNumber}</Typography>}
            </Typography>

            <Box>
                {day.tasks?.map((task, index) => (
                    <Box
                        key={task.id}
                        sx={styles.taskBox}
                        draggable={true}
                        onDragStart={(e) => dragDrop.onDragStart(e, day, task)}
                        onDragEnd={(e) => dragDrop.onDragEnd(e)}
                        onDragOver={(e) => dragDrop.onDragOver(e, index)}
                        onDragLeave={(e) => dragDrop.onDragLeave(e)}
                        onClick={() => handleTaskClick(task)}
                    >
                        <Box sx={{ display: "flex", flexWrap:"wrap", marginBottom: "4px" }}>
                            {task.labels.map((label, index) => (
                                <Box
                                    key={index}
                                    sx={{ ...styles.labelBox, backgroundColor: label }}
                                ></Box>
                            ))}
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                ...styles.taskTitle,
                                backgroundColor: task.isMatched ? 'yellow' : 'transparent',
                            }}
                        >
                            {task.title}
                        </Typography>
                    </Box>
                ))}
            </Box>

        </Box>

    );
});

export default DayComponent;
