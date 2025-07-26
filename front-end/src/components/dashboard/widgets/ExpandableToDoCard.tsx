import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Todo } from '@/types/todo';
import { formatDueDate } from '@/types/task';
import Image from 'next/image';

interface ExpandableToDoCardProps {
  height: number;
  rowHeight: number;
  removeWidget: (id: string) => void;
}

export const ExpandableToDoCard: React.FC<ExpandableToDoCardProps> = ({ height, rowHeight, removeWidget }) => {
  const todos = useDashboardStore(state => state.todos);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  
  useEffect(() => {
    const headerHeight = 40;
    const availableHeight = height - headerHeight;
    const todosPerRow = 1;
    const maxVisibleTodos = Math.max(1, Math.floor(availableHeight / rowHeight) * todosPerRow);
    setVisibleTodos(todos.slice(0, maxVisibleTodos));
  }, [height, rowHeight, todos]);

  return (
    <div className="bg-card-bg rounded-lg h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-1 border-b">
        <h3 className="text-lg font-semibold">Todos</h3>
        <Image onClick={() => removeWidget('tasks')} src="/widget/widget-close.png" alt="Close" width={16} height={16}/>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {visibleTodos.length > 0 ? ( visibleTodos.map((todo, index) => (
            <div key={index} className="border-b last:border-b-0 p-3">
              <div className="flex items-center">
                <div className="flex-grow">
                  <h4 className="font-bold">{todo.type}</h4>
                  <p className="text-md">{todo.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    todo.isCompleted === true ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {todo.isCompleted}
                  </span>
                </div>
                <div className="text-sm">
                  Due: <span className="font-medium"> { formatDueDate(todo.dueDate) }</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center"> No todos available </div>
        )}
        </div>
        
      {todos.length > visibleTodos.length && (
        <div className="p-2 text-center text-md border-t h-10 flex items-center justify-center">
          <span className="truncate">{todos.length - visibleTodos.length} more todo(s) - expand to view </span>
        </div>
      )}
    </div>
  );
};
