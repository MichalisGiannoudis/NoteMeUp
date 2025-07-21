import { useState, useEffect } from 'react';
import { LayoutItem, Layouts } from '@/types/grid';
import { generateLayout } from '@/context/layout';

interface UseWidgetsReturn {
  layouts: Layouts;
  widgets: {[key: string]: boolean};
  addWidget: (widgetType: string) => void;
  addNewWidget: (type: string) => void;
  removeWidget: (id: string) => void;
  onLayoutChange: (currentLayout: LayoutItem[], allLayouts: Layouts) => void;
}

export const useWidgets = (): UseWidgetsReturn => {
  const [layouts, setLayouts] = useState<Layouts>({
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: []
  });

  const [widgets, setWidgets] = useState<{[key: string]: boolean}>({
    tasks: true,
    stats: true,
    notification: true,
    barChart: true,
    performanceChart: true
  });

  const addWidget = (widgetType: string) => {
    const newWidgets = { ...widgets, [widgetType]: true };
    setWidgets(newWidgets);
  };

  const onLayoutChange = (currentLayout: LayoutItem[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
    localStorage.setItem('dashboardLayout', JSON.stringify(allLayouts));
  };

  const addNewWidget = (type: string) => {
    if (!widgets[type]) {
      setWidgets({ ...widgets, [type]: true });
      const newLayouts = { ...layouts } as Layouts;
      
      (Object.keys(newLayouts) as Array<keyof Layouts>).forEach(breakpoint => {
        const maxY = Math.max(...newLayouts[breakpoint].map((item: LayoutItem) => item.y + item.h), 0);
        let w = 6, h = 2;
        if (type === 'notification') h = 1;
        if (type === 'stats') h = 1;

        newLayouts[breakpoint].push({
          i: type,
          x: 0,
          y: maxY,
          w,
          h,
          minW: 2,
          minH: 1
        });
      });
      
      setLayouts(newLayouts);
      localStorage.setItem('dashboardLayout', JSON.stringify(newLayouts));
    }
  };

  const removeWidget = (id: string) => {
    setWidgets({ ...widgets, [id]: false });
  };
  
  useEffect(() => {
    const savedLayouts = localStorage.getItem('dashboardLayout');
    if (savedLayouts) {
      try {
        setLayouts(JSON.parse(savedLayouts));
      } catch (e) {
        console.error('Could not parse saved layout', e);
        setLayouts(generateLayout());
      }
    } else {
      setLayouts(generateLayout());
    }
  }, []);

  return { layouts, widgets, addWidget, addNewWidget, removeWidget, onLayoutChange };
};
