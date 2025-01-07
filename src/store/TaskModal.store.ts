import { makeAutoObservable } from "mobx";

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

    constructor() {
        makeAutoObservable(this);
    }

    toggleModal() { this.open = !this.open }
    setTitle(value: string) { this.title = value }
    setDate(value: string) { this.date = value }

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
    }
}

export default TaskModalStore

