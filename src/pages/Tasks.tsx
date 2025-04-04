
import { Suspense, memo } from "react";
import TasksSection from "@/components/TasksSection";
import Header from "@/components/Header";

// Memoize components to prevent unnecessary re-renders
const MemoizedTasksSection = memo(TasksSection);

const Tasks = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="py-6">
          <Suspense fallback={<div className="py-8 text-center">Loading tasks...</div>}>
            <MemoizedTasksSection />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
