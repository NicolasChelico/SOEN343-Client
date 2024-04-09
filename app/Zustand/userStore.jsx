import { create } from 'zustand';

const useAuthStore = create(set => ({
    userId: localStorage.getItem('userId') || '',
    userName: localStorage.getItem('userName') || '',
    role: localStorage.getItem('role') || '',
    location: localStorage.getItem('location') || '',
    setUserId: userId => {
        localStorage.setItem('userId', userId);
        set({ userId });
    },
    setUserName: userName => {
        localStorage.setItem('userName', userName);
        set({ userName });
    },
    setRole: role => {
        localStorage.setItem('role', role);
        set({ role });
    },
    setLocation: location => {
        localStorage.setItem('location', location); 
        set({ location });
    }
}));

export default useAuthStore;
