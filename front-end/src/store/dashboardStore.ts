import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { Notification } from '@/types/notification';
import { Task } from '@/types/task';
import { useAuthStore } from './authStore';

interface DashboardState {
    notifications: Notification[];
    tasks: Task[];
    stats: any;
    projects: any[];
    charts: any;
    isLoading: boolean;
    error: string | null;
    lastFetched: number;
  
    fetchAllDashboardData: (forceRefresh?: boolean) => Promise<void>;
    fetchNotifications: () => Promise<void>;
    updateNotifications : (updatedNotification: Notification) => Promise<void>;
    fetchTasks: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchProjects: () => Promise<void>;
    fetchCharts: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set, get) => ({
            notifications: [],
            tasks: [],
            stats: null,
            projects: [],
            charts: null,
            isLoading: false,
            error: null,
            lastFetched: 0,

            fetchAllDashboardData: async (forceRefresh = false) => {
                const { lastFetched } = get();
                const now = Date.now();
                
                if (!forceRefresh && now - lastFetched < 5 * 60 * 1000 && lastFetched !== 0) {
                    return;
                }
                
                set({ isLoading: true, error: null });
                
                try {
                    await Promise.all([
                        get().fetchNotifications(),
                        get().fetchTasks(),
                        //get().fetchStats(),
                        //get().fetchProjects(),
                        //get().fetchCharts()
                    ]);
                
                    console.log("Dashboard data fetched successfully");

                    set({ lastFetched: now });
                } catch (error) {
                    set({ error: "Failed to fetch dashboard data" });
                    console.error("Dashboard data fetch error:", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            
            fetchNotifications: async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const { token } = useAuthStore.getState();
                    
                    if (!token) {
                        console.error("No authentication token available");
                        return;
                    }
                    
                    const response = await axios({
                        method: 'GET',
                        url: `${API_URL}/widget/getNotifications`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'X-CSRF-Protection': '1'
                        },
                        withCredentials: true
                    });
                    
                    if (response.data.success && response.data.notifications) {
                        set({ notifications: response.data.notifications });
                    }
                } catch (error) {
                    console.error("Notifications fetch error:", error);
                    set({ error: "Failed to fetch notifications" });
                }
            },

            updateNotifications: async (updatedNotification: Notification) => {
                set((state) => ({ notifications: state.notifications.map((n) =>n.id === updatedNotification.id ? updatedNotification : n), }));

                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const { token } = useAuthStore.getState();
                    
                    if (!token) {
                        console.error("No authentication token available");
                        return;
                    }
                    
                    const response = await axios({
                        method: 'POST',
                        url: `${API_URL}/widget/updateNotification`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'X-CSRF-Protection': '1'
                        },
                        data: { 
                            notificationId: updatedNotification.id,
                            notificationRead: !updatedNotification.read
                        },
                        withCredentials: true
                    });
                    
                    if (response.data.success && response.data.tasks) {
                        set({ tasks: response.data.tasks });
                    }
                } catch (error) {
                    console.error("Notifications update error:", error);
                    set({ error: "Failed to update notifications" });
                }
            },

            fetchTasks: async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const { token } = useAuthStore.getState();
                    
                    if (!token) {
                        console.error("No authentication token available");
                        return;
                    }
                    
                    const response = await axios({
                        method: 'GET',
                        url: `${API_URL}/widget/getTasks`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'X-CSRF-Protection': '1'
                        },
                        withCredentials: true
                    });
                    
                    if (response.data.success && response.data.tasks) {
                        set({ tasks: response.data.tasks });
                    }
                } catch (error) {
                    console.error("Tasks fetch error:", error);
                    set({ error: "Failed to fetch tasks" });
                }
            },
            
            fetchStats: async () => {
            },
            
            fetchProjects: async () => {
            },
            
            fetchCharts: async () => {
            },
        }),
        {
            name: 'dashboard-storage',
            partialize: (state) => ({
                tasks: state.tasks,
                notifications: state.notifications,
                stats: state.stats,
                projects: state.projects,
                charts: state.charts,
                lastFetched: state.lastFetched
            })
        }
    )
);