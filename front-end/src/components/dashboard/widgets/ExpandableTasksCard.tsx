import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Task } from '@/types/task';

interface ExpandableTasksCardProps {
  height: number;
  rowHeight: number;
  removeWidget: (id: string) => void;
}

export const ExpandableTasksCard: React.FC<ExpandableTasksCardProps> = ({ height, rowHeight, removeWidget }) => {
  const tasks = useDashboardStore(state => state.tasks);
  const [visibleTasks, setVisibleTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    const headerHeight = 40;
    const availableHeight = height - headerHeight;
    const tasksPerRow = 1;
    const maxVisibleTasks = Math.max(1, Math.floor(availableHeight / rowHeight) * tasksPerRow);
    setVisibleTasks(tasks.slice(0, maxVisibleTasks));
  }, [height, rowHeight, tasks]);

  return (
    <div className="bg-card-bg rounded-lg h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <button onClick={() => removeWidget('tasks')} className="hover:text-red-500">×</button>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {visibleTasks.length > 0 ? (
          visibleTasks.map((task, index) => (
            <div key={index} className="border-b last:border-b-0 p-3">
              <div className="flex items-center">
                <div className="flex-grow">
                  <h4 className="font-bold">{task.type}</h4>
                  <p className="text-md">{task.message}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                    {task.status}
                  </span>
                </div>
                <div className="text-sm">
                  Due: <span className="font-medium">{task.dueDate ? (typeof task.dueDate === 'string' ? task.dueDate : task.dueDate.toLocaleDateString()) : 'N/A'}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-gray-500">No tasks available</div>
        )}
        
        {tasks.length > visibleTasks.length && (
          <div className="p-2 text-center text-sm text-gray-500 border-t">
            {tasks.length - visibleTasks.length} more task(s) - expand to view
          </div>
        )}
      </div>
    </div>
  );
};
