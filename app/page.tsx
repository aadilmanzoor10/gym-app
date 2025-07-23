import Navbar from '@/components/NavBar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center bg-gradient-to-b from-indigo-100 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Unlock Your Best Self with{' '}
          <span className="text-indigo-600">Gym App</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Join thousands of fitness enthusiasts booking classes, tracking
          workouts, and discovering the best gyms near them.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/signup">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-100 font-semibold px-6 py-3 rounded-lg">
              I already have an account
            </button>
          </Link>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Why Choose Gym App?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-gray-600">
              Book your favorite gym classes and activities effortlessly with
              real-time scheduling.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Find Nearby Gyms</h3>
            <p className="text-gray-600">
              Discover gyms near you using our interactive map and filter
              options.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Mobile First</h3>
            <p className="text-gray-600">
              Fully responsive design optimized for your mobile experience on
              the go.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          <blockquote className="bg-indigo-50 p-6 rounded-xl shadow-sm">
            <p className="italic text-gray-700">
              “Gym App changed the way I book classes. It’s fast, intuitive, and
              always reliable.”
            </p>
            <footer className="mt-4 text-right text-sm font-semibold text-indigo-600">
              — Sarah, CrossFit Coach
            </footer>
          </blockquote>
          <blockquote className="bg-indigo-50 p-6 rounded-xl shadow-sm">
            <p className="italic text-gray-700">
              “I love being able to find gyms on the go and schedule my
              workouts. 10/10 experience!”
            </p>
            <footer className="mt-4 text-right text-sm font-semibold text-indigo-600">
              — Ahmad, Fitness Enthusiast
            </footer>
          </blockquote>
        </div>
      </section>

      <footer className="py-8 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Gym App. All rights reserved.
      </footer>
    </main>
  );
}
