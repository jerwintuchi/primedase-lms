import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { LayoutDashboard } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import CategoryForm from "./_components/category-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.length; //get number of all required fields
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} out of ${totalFields})`;

  return (
    <div className="p-6 grow">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium text-red-700">Course Creation</h1>
          <span className="text-sm text-red-500">
            Complete all fields to publish your course {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2 text-red-500">
            <IconBadge icon={LayoutDashboard} />
            <h2>Describe your Course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
