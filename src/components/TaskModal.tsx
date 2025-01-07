import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Modal, TextField, Typography, Button, Box } from "@mui/material";
import { Context } from "../context/ContextProvider";
import { ContextType } from "../type/context.type";
import { styles } from "../view/taskModal.styles"

const TaskModal: React.FC = observer(() => {
  const { calendar, taskModal } = useContext(Context) as ContextType

  const handleSave = () => {
    const { title, date, selectedLabels } = taskModal;

    if (title && date) {
      calendar.addTask({ title, date, labels: selectedLabels });
      taskModal.reset()
      taskModal.toggleModal()
    }
  };

  return (
    <Modal open={taskModal.open} onClose={() => taskModal.toggleModal()}>
      <Box sx={styles.modalBox}>
        <Typography align="center" variant="h6" gutterBottom>Добавить задачу</Typography>

        <TextField
          fullWidth
          label="Название задачи"
          value={taskModal.title}
          onChange={(e) => taskModal.setTitle(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Дата"
          type="date"
          value={taskModal.date}
          onChange={(e) => taskModal.setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <Typography variant="subtitle1" sx={styles.title}>
          Выберите приоритет задачи:
        </Typography>

        <Box sx={styles.priorityBox}>
          {taskModal.availableColors.map((color) => (
            <Box
              key={color}
              onClick={() => taskModal.toggleLabel(color)}
              sx={styles.priorityLabel(color, taskModal.selectedLabels.includes(color))}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={!taskModal.title || !taskModal.date}
          fullWidth
        >
          Сохранить
        </Button>
      </Box>
    </Modal>
  );
});

export default TaskModal;