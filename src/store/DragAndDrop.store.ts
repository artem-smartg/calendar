import { makeObservable, observable, action } from "mobx";
import { Day, Task } from "../type/calendar.type";
import CalendarStore from "./Calendar.store";


class DragAndDropStore {
    currentDay: Day | null = null;
    currentTask: Task | null = null;
    targetTaskIndex: number | null = null; // Новый стейт для индекса цели

    constructor(private calendarStore: CalendarStore) {
        makeObservable(this, {
            currentDay: observable,
            currentTask: observable,
            targetTaskIndex: observable,

            setCurrentDay: action,
            setCurrentTask: action,
            setTargetTaskIndex: action,

            onDragStart: action,
            onDrop: action,
        });
    }

    setCurrentDay(day: Day | null) { this.currentDay = day }
    setCurrentTask(task: Task | null) { this.currentTask = task }
    setTargetTaskIndex(index: number | null) { this.targetTaskIndex = index; }

    onDragStart(e: React.DragEvent, day: Day, task: Task) {
        this.setCurrentDay(day)
        this.setCurrentTask(task)
    }

    onDragEnd(e: React.DragEvent) {
        const target = e.currentTarget as HTMLElement;
        target.style.boxShadow = "none";
        this.setCurrentDay(null);
        this.setCurrentTask(null);
        this.setTargetTaskIndex(null);
    }

    onDrop(e: React.DragEvent, targetDay: Day) {
        e.preventDefault();
        if (!this.currentDay || !this.currentTask || this.targetTaskIndex === null) return;

        const currentIndex = this.currentDay.tasks!.findIndex(
            (task) => task.id === this.currentTask!.id
        );

        if (currentIndex > -1) this.currentDay.tasks!.splice(currentIndex, 1);

        if (this.currentDay === targetDay) {
            const adjustedIndex = this.targetTaskIndex > currentIndex
                ?
                this.targetTaskIndex - 1
                :
                this.targetTaskIndex;

            targetDay.tasks!.splice(adjustedIndex, 0, this.currentTask);
        } else {
            targetDay.tasks = targetDay.tasks || [];
            targetDay.tasks.splice(this.targetTaskIndex, 0, this.currentTask);
        }

        this.setCurrentDay(null);
        this.setCurrentTask(null);
        this.setTargetTaskIndex(null);
    }

    onDragOver(e: React.DragEvent, targetTaskIndex: number | null) {
        e.preventDefault();
        if (targetTaskIndex !== null) {
            this.setTargetTaskIndex(targetTaskIndex);
        }
        const target = e.currentTarget as HTMLElement;
        if (target.className.includes("task")) {
            target.style.boxShadow = "0px 3px 3px grey";
        }
    }

    onDragLeave(e: React.DragEvent) {
        const target = e.currentTarget as HTMLElement;
        target.style.boxShadow = "none";
    }

}

export default DragAndDropStore
