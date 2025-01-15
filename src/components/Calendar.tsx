import React, { useEffect, useContext } from "react";
import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import { Context } from "../context/ContextProvider";
import { ContextType } from "../type/context.type";
import { observer } from 'mobx-react-lite';
import DayComponent from "./DayComponent";
import TaskModal from "./TaskModal";

const Calendar: React.FC = observer(() => {
    const { calendar, taskModal, dragDrop } = useContext(Context) as ContextType

    useEffect(() => {
        calendar.fetchData(calendar.selectedCountry);
    }, [calendar.selectedCountry])

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'flex-start',
                gap: 1,
                m: 1,
            }}>
                <Button
                    sx={{ mt: { xs: 1, sm: 0 } }}
                    variant="contained" color="primary"
                    onClick={() => taskModal.toggleModal()}
                >
                    Добавить задачу
                </Button>

                <TextField
                    sx={{ '& .MuiInputBase-root': { height: '38px' } }}
                    variant="outlined"
                    placeholder="Поиск задач"
                    value={calendar.searchText}
                    onChange={(e) => calendar.setSearchText(e.target.value)}
                />
            </Box>

            <Typography variant="h4" align="center" sx={{ m: 1 }}>
                {calendar.currentMonth} {calendar.currentYear}
            </Typography>



            <Box
                sx={{
                    paddingX: 1, 
                    overflowX: { xs: 'auto', sm: 'hidden' },
                }}>
                <Grid
                    container
                    spacing={1}
                    sx={{
                        minWidth: 'max-content', paddingX: 2, mb: 2
                    }}
                >
                    {calendar.weekdays.map((day) => (
                        <Grid item xs={1.7} key={day}>
                            <Typography variant="h6" align="center">
                                {day}
                            </Typography>
                        </Grid>
                    ))}

                    {calendar.days.map((day, index) => {
                        const currentDate = new Date(day.date);
                        const isFirstDay = currentDate.getDate() === 1
                        const isLastDay =
                            index === calendar.days.length - 1
                            ||
                            currentDate.getDate() === new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

                        return (
                            <Grid
                                item
                                xs={1.7}
                                key={day.date}
                                onDragOver={(e) => dragDrop.onDragOver(e, null)}
                                onDrop={(e) => dragDrop.onDrop(e, day)}
                            >
                                <DayComponent
                                    day={{
                                        ...day,
                                        showMonth: isFirstDay || isLastDay
                                    }}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            <TaskModal />
        </Box >
    );
});

export default Calendar;
