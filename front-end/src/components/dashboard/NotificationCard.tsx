import React from 'react';

type NotificationCardProps = {
  message: string;
  highlightedName: string;
  period: string;
};

export const NotificationCard: React.FC<NotificationCardProps> = ({ message, highlightedName, period }) => {
  return (
    <div className="bg-card-bg rounded-lg p-4 shadow-md mb-4">
      <div className="flex items-start">
        <div className="p-2 bg-background rounded-full mr-3">
          <svg className="h-6 w-6 text-card-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div className="flex-grow">
          <h3 className="font-bold text-card-fg">Dear Manager</h3>
          <p className="text-card-muted">
            {message} 
            <span className="text-red-500">[{highlightedName}]</span>'s performance over the past {period}.
          </p>
        </div>
        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition-colors">View Detail</button>
      </div>
    </div>
  );
};
