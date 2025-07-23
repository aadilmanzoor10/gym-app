'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Activity {
  id: string;
  name: string;
  category: string;
  time: string;
  gymId: number;
}

interface Gym {
  id: string;
  name: string;
  location: string;
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [gyms, setGyms] = useState<Record<string, Gym>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, gymsRes] = await Promise.all([
          api.get<Activity[]>('/activities'),
          api.get<Gym[]>('/gyms'),
        ]);
        setActivities(activitiesRes.data);
        const gymMap: Record<string, Gym> = {};
        gymsRes.data.forEach((gym) => {
          gymMap[gym.id] = gym;
        });
        setGyms(gymMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const grouped = activities.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <main className="p-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-4xl font-bold text-indigo-800 mb-10 text-center">
        🏋️‍♀️ Explore Our Gym Activities
      </h1>

      {Object.entries(grouped).map(([category, acts]) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-5 border-b pb-2 border-gray-300">
            {category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {acts.map((act) => {
              const gym = gyms[act.gymId.toString()];
              return (
                <div
                  key={act.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-bold text-indigo-700 mb-1">
                    {act.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    🕒 <strong>Time:</strong> {act.time}
                  </p>
                  {gym && (
                    <>
                      <p className="text-sm text-gray-600">
                        🏢 <strong>Gym:</strong> {gym.name}
                      </p>
                      <p className="text-sm text-gray-500">📍 {gym.location}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
