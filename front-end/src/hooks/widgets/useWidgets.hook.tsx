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
    const defaultLayout = generateLayout();
    const constrainedLayouts = { ...allLayouts };
    Object.keys(constrainedLayouts).forEach(breakpoint => {
      if (defaultLayout[breakpoint]) {
        constrainedLayouts[breakpoint] = constrainedLayouts[breakpoint].map((item: LayoutItem) => {
          const defaultItem = defaultLayout[breakpoint].find(defaultItem => defaultItem.i === item.i);

          if (defaultItem) {
            return {
              ...item,
              minW: defaultItem.minW || item.minW,
              minH: defaultItem.minH || item.minH,
              maxW: defaultItem.maxW || item.maxW,
              maxH: defaultItem.maxH || item.maxH
            };
          }
          return item;
        });
      }
    });
    
    setLayouts(constrainedLayouts);
    localStorage.setItem('dashboardLayout', JSON.stringify(constrainedLayouts));
  };

  const addNewWidget = (type: string) => {
    if (!widgets[type]) {
      setWidgets({ ...widgets, [type]: true });
      const newLayouts = { ...layouts } as Layouts;
      const defaultLayout = generateLayout();
      
      (Object.keys(newLayouts) as Array<keyof Layouts>).forEach(breakpoint => {
        const maxY = Math.max(...newLayouts[breakpoint].map((item: LayoutItem) => item.y + item.h), 0);
        let w = 6, h = 2;
        
        const defaultItem = defaultLayout[breakpoint]?.find(item => item.i === type);
        if (defaultItem) {
          w = defaultItem.w;
          h = defaultItem.h;
          
          newLayouts[breakpoint].push({
            i: type,
            x: 0,
            y: maxY,
            w,
            h,
            minW: defaultItem.minW,
            minH: defaultItem.minH,
            maxW: defaultItem.maxW,
            maxH: defaultItem.maxH
          });
        } else {
          if (type === 'notification') h = 1;
          if (type === 'stats') h = 1;
          
          newLayouts[breakpoint].push({
            i: type,
            x: 0,
            y: maxY,
            w,
            h,
            minW: type === 'notification' && breakpoint === 'lg' ? 6 : 2,
            minH: 1
          });
        }
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
    const defaultLayout = generateLayout();
    
    if (savedLayouts) {
      try {
        const parsedLayouts = JSON.parse(savedLayouts);
        const constrainedLayouts = { ...parsedLayouts };
        
        Object.keys(constrainedLayouts).forEach(breakpoint => {
          if (defaultLayout[breakpoint]) {
            constrainedLayouts[breakpoint] = constrainedLayouts[breakpoint].map((item: LayoutItem) => {
              const defaultItem = defaultLayout[breakpoint].find(defaultItem => defaultItem.i === item.i);
      
              if (defaultItem) {
                return {
                  ...item,
                  minW: defaultItem.minW || item.minW,
                  minH: defaultItem.minH || item.minH,
                  maxW: defaultItem.maxW || item.maxW,
                  maxH: defaultItem.maxH || item.maxH
                };
              }
              return item;
            });
          }
        });
        
        setLayouts(constrainedLayouts);
      } catch (e) {
        console.error('Could not parse saved layout', e);
        setLayouts(defaultLayout);
      }
    } else {
      setLayouts(defaultLayout);
    }
  }, []);

  return { layouts, widgets, addWidget, addNewWidget, removeWidget, onLayoutChange };
};
