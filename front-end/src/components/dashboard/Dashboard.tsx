'use client';

import React, { useState } from 'react';
import { useRequireAuth } from '../../hooks/auth/useRequireAuth.hook';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { User } from '@/types/user';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Widget } from './widgets/Widget.component';
import { useWidgets } from '@/hooks/widgets/useWidgets.hook';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Dashboard = () => {
  const { user, authenticated, isLoading } = useRequireAuth() as { user: User | null, authenticated: boolean, isLoading: boolean };
  const { layouts, widgets, removeWidget, onLayoutChange } = useWidgets();
  const [rowHeight, setRowHeight] = useState(100);
  
  const handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    onLayoutChange(currentLayout, allLayouts);
  };

  if (isLoading) {
    return (
      <div className="p-16 bg-background h-screen">
        <div className="text-2xl mb-4 font-bold text-foreground">Dashboard</div>
        <div className="ml-2 w-8 h-8 border-l-2 rounded-full animate-spin border-blue-600" />
        <div className="mt-4 text-foreground">Verifying authentication...</div>
      </div>
    );
  }
  
  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />     
        <div className="flex-1 overflow-auto">
          <ResponsiveGridLayout 
            className="layout" 
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={rowHeight}
            width={1200}
            onLayoutChange={handleLayoutChange}
            isDraggable={true}
            isResizable={true}
            margin={[16, 16]}>
            {Object.entries(widgets).map(([type, isVisible]) => (
              isVisible && (
                <div key={type} className="h-full">
                  <Widget type={type} removeWidget={removeWidget} height={(layouts.lg.find(item => item.i === type)?.h || 1) * rowHeight} rowHeight={rowHeight}/> 
                </div>
              )
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
};
