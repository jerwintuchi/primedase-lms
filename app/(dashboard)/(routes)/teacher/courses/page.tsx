import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button className="bg-red-400 text-red-900 text-sm font-semibold pl-6 transition-all hover:text-black-600 hover:bg-red-300">
          Add a Course
        </Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
