interface TasksProps {
    id: number
    title: string
    description: string
    isCompleted: boolean
}

export const defaultTasksData: TasksProps[] = [
    {
        id: 1,
        title: "Welcome Task",
        description: "This is your first task! Feel free to edit or delete it.",
        isCompleted: false,
    },{
        id: 2,
        title: "Explore Features",
        description: "Take a moment to explore the features of this application.",
        isCompleted: false,
    },{
        id: 3,
        title: "Stay Organized",
        description: "Use tasks to stay organized and keep track of your to-dos.",
        isCompleted: false,
    }
]