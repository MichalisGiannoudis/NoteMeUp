'use client'

import { useDashboardStore } from "@/store/dashboardStore";

export const TasksPage = () => {

    const tasks = useDashboardStore(state => state.tasks);
    const isLoading = useDashboardStore(state => state.isLoading);
    const error = useDashboardStore(state => state.error);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            {isLoading && tasks.length === 0 && (
                <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4 flex items-center justify-center">
                    <p className="text-card-muted">Loading tasks...</p>
                </div>
            )}
            {error && tasks.length === 0 && (
                <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
                    <p className="text-red-500">Error loading tasks: {error}</p>
                </div>
            )}
            {tasks.length === 0 && !isLoading && (
                <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
                    <p className="text-card-muted">No tasks available</p>
                </div>
            )}
            {tasks.map(task => (
                <div key={task.id} className="bg-card-bg rounded-xl p-5 shadow-lg mb-4 border border-gray-200 flex items-start gap-4 transition hover:shadow-xl">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-lg">
                        {task.type[0]}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-semibold text-blue-700">{task.type}</h2>
                        <p className="text-sm mt-1">{task.message}</p>
                        <p className="text-x mt-2">
                            {task.createdAt ? new Date(task.createdAt).toLocaleString() : "Unknown date"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}