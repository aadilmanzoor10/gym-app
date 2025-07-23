'use client';

import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">🏋️ FitZone</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">{user?.email}</span>
          <button
            onClick={logout}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      <header className="text-center py-12 px-4">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">
          Welcome, {user?.email?.split('@')[0] || 'Athlete'}!
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Ready to crush your goals? Track your activities, manage your
          schedule, and find the best gyms nearby.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-12 max-w-6xl mx-auto">
        <Link
          href="/activities"
          className="bg-white hover:shadow-md border border-gray-200 rounded-lg p-6 transition duration-200"
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            🏃‍♂️ View Activities
          </h3>
          <p className="text-gray-600 text-sm">
            Explore gym activities grouped into categories and plan your
            workouts.
          </p>
        </Link>

        <Link
          href="/schedule"
          className="bg-white hover:shadow-md border border-gray-200 rounded-lg p-6 transition duration-200"
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            📅 Schedule Workouts
          </h3>
          <p className="text-gray-600 text-sm">
            Pick a date, time, and activity to schedule your gym sessions at
            your favorite location.
          </p>
        </Link>

        <Link
          href="/gym-map"
          className="bg-white hover:shadow-md border border-gray-200 rounded-lg p-6 transition duration-200"
        >
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            🗺️ Find Gyms Near You
          </h3>
          <p className="text-gray-600 text-sm">
            Use the interactive map to discover and select gyms around your
            area.
          </p>
        </Link>
      </section>
    </div>
  );
}
