import { makeAutoObservable } from "mobx";
import { Task } from "../type/calendar.type";

class TaskModalStore {
    open = false;
    title = "";
    date = "";
    selectedLabels: string[] = [];
    availableColors = [
        "#4CAF50", // Зеленый
        "#FFC107", // Желтый
        "#FF5722", // Оранжевый
        "#2196F3", // Синий
        "#9C27B0", // Фиолетовый
    ];
    taskToEdit: Task | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    toggleModal() {
        this.open = !this.open
        if (!this.open) this.reset()
    }
    setTitle(value: string) { this.title = value }
    setDate(value: string) { this.date = value }

    setTaskToEdit(task: Task | null, date: string) {
        this.taskToEdit = task;

        if (task) {
            this.taskToEdit = task;
            this.title = task.title;
            this.date = date;
            this.selectedLabels = task.labels || [];
        } else {
            this.title = '';
            this.date = '';
            this.selectedLabels = [];
        }
    }

    toggleLabel(color: string) {
        if (this.selectedLabels.includes(color)) {
            this.selectedLabels = this.selectedLabels.filter((label) => label !== color);
        } else {
            this.selectedLabels.push(color);
        }
    }

    reset() {
        this.title = "";
        this.date = "";
        this.selectedLabels = [];
        this.taskToEdit = null;
    }

}

export default TaskModalStore

