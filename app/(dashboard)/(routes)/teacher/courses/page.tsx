import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button className="bg-purple-400 text-purple-900 text-sm font-semibold pl-6 transition-all hover:text-black-600 hover:bg-purple-300">
          Add a Course
        </Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
