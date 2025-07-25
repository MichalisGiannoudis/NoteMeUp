import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { Notification } from '@/types/notification';

interface DashboardState {
    notifications: Notification[];
    tasks: any[];
    stats: any;
    projects: any[];
    charts: any;
    isLoading: boolean;
    error: string | null;
    lastFetched: number;
  
    fetchAllDashboardData: () => Promise<void>;
    fetchNotifications: () => Promise<void>;
    fetchTasks: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchProjects: () => Promise<void>;
    fetchCharts: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set, get) => ({
            tasks: [],
            notifications: [],
            stats: null,
            projects: [],
            charts: null,
            isLoading: false,
            error: null,
            lastFetched: 0,

            fetchAllDashboardData: async () => {
                const { lastFetched } = get();
                const now = Date.now();
                
                if (now - lastFetched < 5 * 60 * 1000 && lastFetched !== 0) {
                    return;
                }
                
                set({ isLoading: true, error: null });
                
                try {
                    await Promise.all([
                        get().fetchNotifications(),
                        //get().fetchTasks(),
                        //get().fetchStats(),
                        //get().fetchProjects(),
                        //get().fetchCharts()
                    ]);
                
                    set({ lastFetched: now });
                } catch (error) {
                    set({ error: "Failed to fetch dashboard data" });
                    console.error("Dashboard data fetch error:", error);
                } finally {
                    set({ isLoading: false });
                }
            },
            
            fetchTasks: async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const response = await axios.get(`${API_URL}/tasks`);
                    set({ tasks: response.data });
                } catch (error) {
                    console.error("Tasks fetch error:", error);
                }
            },
            
            fetchNotifications: async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const token = localStorage.getItem('auth_token');
                    
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
            
            fetchStats: async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const response = await axios.get(`${API_URL}/stats`);
                    set({ stats: response.data });
                } catch (error) {
                    console.error("Stats fetch error:", error);
                }
            },
            
            fetchProjects: async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const response = await axios.get(`${API_URL}/projects`);
                    set({ projects: response.data });
                } catch (error) {
                    console.error("Projects fetch error:", error);
                }
            },
            
            fetchCharts: async () => {
                try {
                    const API_URL = process.env.NEXT_PUBLIC_API_URL;
                    const response = await axios.get(`${API_URL}/charts`);
                    set({ charts: response.data });
                } catch (error) {
                    console.error("Charts fetch error:", error);
                }
            }
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