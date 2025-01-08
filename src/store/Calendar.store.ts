
import { observable, action, makeObservable, runInAction, computed } from "mobx";
import { Day, Task } from "../type/calendar.type";
import { format } from "date-fns";
import calendarService from "../services/Calendar.services";


class CalendarStore {
    days = [] as Day[];
    selectedCountry = "US";
    weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    normalizeDate = (date: string | Date) => format(new Date(date), "yyyy-MM-dd");
    searchText: string = "";

    constructor() {
        makeObservable(this, {
            days: observable,
            weekdays: observable,
            selectedCountry: observable,
            searchText: observable,

            fetchData: action,
            createTask: action,
            setDays: action,
            setSearchText: action,

            currentMonth: computed,
            currentYear: computed,
        });
    }

    setSearchText(text: string) {
        this.searchText = text
        this.updateMatchedTasks()
    }

    updateMatchedTasks() {
        const searchTextLower = this.searchText.toLowerCase();

        this.days.forEach((day) => {
            day.tasks?.forEach((task) => {
                task.isMatched = this.searchText === "" ?
                    false
                    :
                    task.title.toLowerCase().includes(searchTextLower);
            });
        });
    }

    setDays(days: Day[]) { this.days = days }

    getAmountTasks(day: Day): number {
        return day.tasks ? day.tasks.length : 0;
    }

    get currentMonth() {
        if (this.days.length > 0) {
            return new Date(this.days[0].date).toLocaleString("en-US", { month: "short" });
        }
        return "";
    }

    get currentYear() {
        if (this.days.length > 0) {
            return new Date(this.days[0].date).getFullYear();
        }
        return new Date().getFullYear();
    }

    updateDay(day: Day) {
        const index = this.days.findIndex((d) => d.date === day.date);
        if (index > -1) {
            this.days[index] = day;
        }
    }

    async fetchData(countryCode: string) {
        try {
            const year = new Date().getFullYear();
            const response = await calendarService.fetchCalendaDay(year, countryCode);

            const longWeekends = response.data;

            const calendarDays = this.generateDaysInMonth(0, 2025).map((date) => {
                const longWeekend = longWeekends.find(
                    (lw: any) =>
                        this.normalizeDate(lw.startDate) <= date &&
                        this.normalizeDate(lw.endDate) >= date
                );

                return {
                    date,
                    isHoliday: !!longWeekend,
                    isLongWeekend: !!longWeekend,
                    tasks: [],
                    longWeekendDetails: longWeekend || null,
                };
            });

            runInAction(() => {
                this.days = calendarDays;
            });
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }

    private generateDaysInMonth(month: number, year: number): string[] {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) =>
            this.normalizeDate(new Date(year, month, i + 1))
        );
    }

    createTask(task: { date: string; title: string; labels: string[] }) {
        const normalizedDate = this.normalizeDate(task.date);
        const day = this.days.find((d) => d.date === normalizedDate);

        if (day) {
            runInAction(() => {
                if (!day.tasks) {
                    day.tasks = [];
                }

                day.tasks.push({
                    id: `${Date.now()}`,
                    title: task.title,
                    labels: task.labels,
                });
            });
        } else {
            console.error(`День с датой ${normalizedDate} не найден.`);
        }
    }

    updateTask(taskId: string, updatedTask: Partial<Task>, newDate: string) {
        const currentDay = this.days.find((day) =>
            day.tasks?.some((task) => task.id === taskId)
        );

        if (!currentDay || !currentDay.tasks) return;

        const taskIndex = currentDay.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex === -1) return;

        if (newDate !== currentDay.date) {
            const [taskToMove] = currentDay.tasks.splice(taskIndex, 1);

            const targetDay = this.days.find((day) => day.date === newDate);
            if (targetDay) {
                targetDay.tasks = [...(targetDay.tasks || []), { ...taskToMove, ...updatedTask }];
            } else {
                this.days.push({
                    date: newDate,
                    isHoliday: false,
                    isLongWeekend: false,
                    tasks: [{ ...taskToMove, ...updatedTask }],
                });
            }
        } else {
            currentDay.tasks[taskIndex] = {
                ...currentDay.tasks[taskIndex],
                ...updatedTask,
            };
        }
    }

}

export default CalendarStore

