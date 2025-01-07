import { makeObservable, observable, action } from "mobx";
import { Day, Task } from "../type/calendar.type";
import CalendarStore from "./Calendar.store";


class DragAndDropStore {
    currentDay: Day | null = null; 
    currentTask: Task | null = null;

    constructor(private calendarStore: CalendarStore) {  
        makeObservable(this, {
            currentDay: observable,
            currentTask: observable,
            setCurrentDay: action,
            setCurrentTask: action,
            onDragStart: action,
            onDrop: action,
        });
    }

    setCurrentDay(day: Day | null) { this.currentDay = day }
    setCurrentTask(task: Task | null) { this.currentTask = task }

    onDragStart(e: React.DragEvent, day: Day, task: Task) {
        this.setCurrentDay(day)
        this.setCurrentTask(task)
    }

    onDragEnd(e: React.DragEvent) {
        const target = e.currentTarget as HTMLElement;
        target.style.boxShadow = "none";
        this.setCurrentDay(null);
        this.setCurrentTask(null);
    }

    onDrop(e: React.DragEvent, targetDay: Day) {
        e.preventDefault()
        if (!this.currentDay || !this.currentTask) return;

        // Удалить задачу из исходного дня
        // const sourceDayIndex = this.calendarStore.days.indexOf(this.currentDay);
        const taskIndex = this.currentDay.tasks?.findIndex((t) => t.id === this.currentTask!.id);
        if (taskIndex !== undefined && taskIndex > -1) {
            this.currentDay.tasks!.splice(taskIndex, 1);
        }

        // Добавить задачу в целевой день
        const targetDayIndex = this.calendarStore.days.indexOf(targetDay);
        if (targetDayIndex > -1) {
            targetDay.tasks = targetDay.tasks || [];
            targetDay.tasks.push(this.currentTask);
        }

        this.setCurrentDay(null);
        this.setCurrentTask(null);
    }

    onDragOver(e: React.DragEvent) {
        e.preventDefault();
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
