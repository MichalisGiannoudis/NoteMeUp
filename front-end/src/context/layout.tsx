import { Layouts } from "react-grid-layout";

export const generateLayout = (): Layouts => {
  return {
    lg: [
      { i: 'notification', x: 0, y: 2, w: 12, h: 2, minW: 6, minH: 2, maxW: 12, maxH: 4 },
      { i: 'tasks', x: 0, y: 0, w: 6, h: 2, minW: 5, minH: 2, maxW: 12, maxH: 8 },
      { i: 'todos', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 4, maxW: 6, maxH: 8 },
      { i: 'stats', x: 6, y: 0, w: 6, h: 1, minW: 2, minH: 1, maxW: 12, maxH: 3 },
      { i: 'barChart', x: 0, y: 3, w: 6, h: 2, minW: 2, minH: 2, maxW: 12, maxH: 6 },
      { i: 'performanceChart', x: 6, y: 3, w: 6, h: 2, minW: 2, minH: 2, maxW: 12, maxH: 6 }
    ],
    md: [
      { i: 'notification', x: 0, y: 2, w: 10, h: 1, minW: 2, minH: 1, maxW: 10, maxH: 4 },
      { i: 'tasks', x: 0, y: 0, w: 5, h: 2, minW: 2, minH: 2, maxW: 10, maxH: 8 },
      { i: 'todos', x: 5, y: 0, w: 5, h: 2, minW: 3, minH: 4, maxW: 10, maxH: 8 },
      { i: 'stats', x: 5, y: 0, w: 5, h: 1, minW: 2, minH: 1, maxW: 10, maxH: 3 },
      { i: 'barChart', x: 0, y: 3, w: 5, h: 2, minW: 2, minH: 2, maxW: 10, maxH: 6 },
      { i: 'performanceChart', x: 5, y: 3, w: 5, h: 2, minW: 2, minH: 2, maxW: 10, maxH: 6 }
    ],
    sm: [
      { i: 'notification', x: 0, y: 3, w: 6, h: 1, minW: 2, minH: 1, maxW: 6, maxH: 4 },
      { i: 'tasks', x: 0, y: 0, w: 6, h: 2, minW: 2, minH: 2, maxW: 6, maxH: 8 },
      { i: 'todos', x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 4, maxW: 6, maxH: 8 },
      { i: 'stats', x: 0, y: 2, w: 6, h: 1, minW: 2, minH: 1, maxW: 6, maxH: 3 },
      { i: 'barChart', x: 0, y: 4, w: 6, h: 2, minW: 2, minH: 2, maxW: 6, maxH: 6 },
      { i: 'performanceChart', x: 0, y: 6, w: 6, h: 2, minW: 2, minH: 2, maxW: 6, maxH: 6 }
    ],
    xs: [
      { i: 'notification', x: 0, y: 3, w: 4, h: 1, minW: 2, minH: 1, maxW: 4, maxH: 4 },
      { i: 'tasks', x: 0, y: 0, w: 4, h: 2, minW: 2, minH: 2, maxW: 4, maxH: 8 },
      { i: 'todos', x: 0, y: 2, w: 4, h: 2, minW: 3, minH: 4, maxW: 4, maxH: 8 },
      { i: 'stats', x: 0, y: 2, w: 4, h: 1, minW: 2, minH: 1, maxW: 4, maxH: 3 },
      { i: 'barChart', x: 0, y: 4, w: 4, h: 2, minW: 2, minH: 2, maxW: 4, maxH: 6 },
      { i: 'performanceChart', x: 0, y: 6, w: 4, h: 2, minW: 2, minH: 2, maxW: 4, maxH: 6 }
    ]
  };
};