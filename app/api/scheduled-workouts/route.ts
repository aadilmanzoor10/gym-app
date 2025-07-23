import { NextRequest, NextResponse } from 'next/server';

interface ScheduledWorkout {
  id: number;
  activityId: string;
  gymId: string;
  datetime: string;
}

const scheduledWorkouts: ScheduledWorkout[] = [];

export const GET = async () => {
  return NextResponse.json(scheduledWorkouts);
};

export const POST = async (req: NextRequest) => {
  try {
    const data = (await req.json()) as Omit<ScheduledWorkout, 'id'>;

    if (!data.activityId || !data.gymId || !data.datetime) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const newWorkout: ScheduledWorkout = {
      id: Date.now(),
      ...data,
    };

    scheduledWorkouts.push(newWorkout);

    return NextResponse.json(newWorkout, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to schedule workout' }, { status: 500 });
  }
};
