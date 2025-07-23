'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'sonner';
import { Activity, Gym } from '@/types/schduleTypes';
import { api } from '@/lib/api';

interface Workout {
  id: number;
  activityId: number;
  gymId: number;
  datetime: string;
}

interface FormState {
  activityId: string;
  gymId: string;
  datetime: string;
}

export default function SchedulePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [scheduled, setScheduled] = useState<Workout[]>([]);
  const [form, setForm] = useState<FormState>({
    activityId: '',
    gymId: '',
    datetime: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const mockActivities = await api.get('/mockActivities');
      const mockGyms = await api.get('/gyms');
      setActivities(mockActivities?.data);
      setGyms(mockGyms?.data);

      const scheduledRes = await api.get('/scheduled-workouts');

      if (!scheduledRes) throw new Error('Failed to fetch scheduled workouts');
      const scheduledList: Workout[] = await scheduledRes.data;
      setScheduled(scheduledList);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.activityId || !form.gymId || !form.datetime) {
      toast.error('Please complete all fields');
      return;
    }

    try {
      setSubmitting(true);

      const res = await api.post('/scheduled-workouts', {
        activityId: Number(form.activityId),
        gymId: Number(form.gymId),
        datetime: form.datetime,
      });

      if (!res) throw new Error('Failed to schedule');

      toast.success('Workout scheduled successfully!');
      setForm({ activityId: '', gymId: '', datetime: '' });
      fetchData();
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Failed to schedule activity. Try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          📅 Schedule a Workout
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {scheduled.length > 0 && (
              <div className="bg-green-50 border p-4 rounded shadow mb-6">
                <h2 className="text-lg font-semibold mb-3 text-green-700">
                  Your Scheduled Workouts
                </h2>
                <ul className="space-y-2">
                  {scheduled.map((w) => (
                    <li
                      key={w.id}
                      className="text-sm text-gray-700 border-b pb-2"
                    >
                      {activities.find((a) => a.id === w.activityId)?.name} at{' '}
                      {gyms.find((g) => g.id === w.gymId)?.name} on{' '}
                      {new Date(w.datetime).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-md space-y-5 border"
            >
              <div>
                <label
                  htmlFor="activityId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Activity
                </label>
                <select
                  name="activityId"
                  id="activityId"
                  value={form.activityId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded bg-white text-black"
                  required
                >
                  <option value="">-- Select Activity --</option>
                  {activities.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="gymId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Gym
                </label>
                <select
                  name="gymId"
                  id="gymId"
                  value={form.gymId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded bg-white text-black"
                  required
                >
                  <option value="">-- Select Gym --</option>
                  {gyms.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="datetime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="datetime"
                  id="datetime"
                  value={form.datetime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded bg-white text-black"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2 rounded disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Schedule Workout'}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
