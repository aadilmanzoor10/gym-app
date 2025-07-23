import { Activity, Gym } from "@/types/schduleTypes";

export const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'Login', href: '/login' },
    { label: 'Sign Up', href: '/signup' },
  ];

export const mockActivities: Activity[] = [
    { id: 1, name: 'Cardio Blast' },
    { id: 2, name: 'Yoga Flow' },
    { id: 3, name: 'HIIT Training' },
    { id: 4, name: 'Strength Training' },
  ];

export const mockGyms: Gym[] = [
    { id: 1, name: 'Downtown Fitness Club' },
    { id: 2, name: 'Uptown Gym & Wellness' },
    { id: 3, name: 'City Center Gym' },
  ];