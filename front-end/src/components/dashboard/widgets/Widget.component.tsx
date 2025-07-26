import React from 'react';
import { Chart } from '../Chart';
import { StatCard } from '../StatCard';
import { ExpandableTasksCard } from './ExpandableTasksCard';
import { ExpandableNotificationCard } from './ExpandableNotificationCard';

interface WidgetProps {
  type: string;
  removeWidget: (id: string) => void;
  height: number;
  rowHeight: number;
}

export const Widget: React.FC<WidgetProps> = ({ type, height, rowHeight, removeWidget }) => {
  const renderWidgetContent = () => {
    switch (type) {
      case 'notification':
        return (
          <ExpandableNotificationCard height={height} rowHeight={rowHeight} removeWidget={removeWidget}/>
        );

      case 'tasks':
        return (
          <ExpandableTasksCard height={height} rowHeight={rowHeight} removeWidget={removeWidget}/>
        );
      
      // case 'stats':
      //   return (
      //     <>
      //       <div className="flex justify-between items-center mb-2">
      //         <h3 className="text-lg font-semibold">Statistics</h3>
      //         <button onClick={() => removeWidget('stats')} className="text-gray-500 hover:text-red-500">
      //           ×
      //         </button>
      //       </div>
      //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      //         <StatCard title="Active Employees" value="547" 
      //           icon={
      //             <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      //             </svg>
      //           }
      //         />
      //         <StatCard title="Projects" value="339" 
      //           icon={
      //             <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      //             </svg>
      //           }
      //         />
      //       </div>
      //     </>
      //   );
      
      // case 'barChart':
      //   return (
      //     <>
      //       <div className="flex justify-between items-center mb-2">
      //         <h3 className="text-lg font-semibold">Bar Chart</h3>
      //         <button onClick={() => removeWidget('barChart')} className="text-gray-500 hover:text-red-500">
      //           ×
      //         </button>
      //       </div>
      //       <Chart title="Graphs and Analysis" subtitle="Projects completed per month based on trends." chartType="bar"/>
      //     </>
      //   );
      
      // case 'performanceChart':
      //   return (
      //     <>
      //       <div className="flex justify-between items-center mb-2">
      //         <h3 className="text-lg font-semibold">Performance Chart</h3>
      //         <button onClick={() => removeWidget('performanceChart')} className="text-gray-500 hover:text-red-500">
      //           ×
      //         </button>
      //       </div>
      //       <Chart title="Top Performance" subtitle="Best performing employee ranking" chartType="performance"/>
      //     </>
      //   );
      
      default:
        return <div>Unknown widget type: {type}</div>;
    }
  };

  return (
    <div key={type} className="rounded-lg border h-full overflow-hidden">
      {renderWidgetContent()}
    </div>
  );
};
