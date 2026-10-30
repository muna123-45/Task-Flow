import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Target,
  TrendingUp,
  ListTodo,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto grid  items-center gap-12 px-6 py-16 md:px-12 lg:grid-cols-2 lg:px-20 lg:py-24">
        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-200 px-4 py-2 text-sm font-medium text-violet-700">
            <Target size={16} />

            Stay Organized, Stay Productive
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Organize Your Work.
            <span className="mt-2 block text-violet-600">
              Achieve More.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-slate-500 md:text-lg">
            TaskFlow helps you manage your tasks, track your
            progress, and build better habits — all in one place.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              Get Started Free

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-200 px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              Login
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Organize your day. Focus on what matters.
          </p>
        </div>

        {/* Right Dashboard Preview */}
        <div className="relative">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-100 blur-1xl" />

          <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-violet-100 sm:p-7">
            {/* Preview Header */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  My Dashboard
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Here's your productivity overview.
                </p>
              </div>

              <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
                <ListTodo size={24} />
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-violet-50 p-4">
                <ListTodo className="text-violet-600" size={22} />

                <p className="mt-3 text-sm text-slate-500">
                  Total Tasks
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Work
                </h3>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <Clock3 className="text-blue-600" size={22} />

                <p className="mt-3 text-sm text-slate-500">
                  In Progress
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Work
                </h3>
              </div>

              <div className="rounded-xl bg-green-50 p-4">
                <CheckCircle2 className="text-green-600" size={22} />

                <p className="mt-3 text-sm text-slate-500">
                  Completed
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Work
                </h3>
              </div>

              <div className="rounded-xl bg-orange-50 p-4">
                <TrendingUp className="text-orange-600" size={22} />

                <p className="mt-3 text-sm text-slate-500">
                  Pending
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Work
                </h3>
              </div>
            </div>

            {/* Sample Tasks */}
            <div className="mt-7">
              <h3 className="mb-4 font-bold text-slate-900">
                Today's Tasks
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-green-500"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Complete React Revision
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Learning
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600">
                    Active
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <div className="h-5 w-5 shrink-0 rounded-full border-2 border-slate-300" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      Build Full Stack Project
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Development
                    </p>
                  </div>

                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-600">
                    Pending
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-slate-50 px-6 py-16 md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-violet-600">
              FEATURES
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything you need to stay productive
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Keep your tasks organized and make progress every day.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={ListTodo}
              title="Manage Tasks"
              description="Create, update, and delete tasks from one simple dashboard."
            />

            <FeatureCard
              icon={Target}
              title="Set Priorities"
              description="Organize your work by priority and track each task's status."
            />

            <FeatureCard
              icon={TrendingUp}
              title="Track Progress"
              description="See your pending and completed tasks at a glance."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="about"
        className="px-6 py-20 text-center md:px-12"
      >
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Ready to organize your day?
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
          Start managing your tasks with TaskFlow and build a more
          productive routine.
        </p>

        <Link
          to="/register"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white transition hover:bg-violet-700"
        >
          Create Your Account

          <ArrowRight size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} TaskFlow. Built to help you
        stay productive.
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex rounded-xl bg-violet-100 p-3 text-violet-600">
        <Icon size={24} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default Landing;