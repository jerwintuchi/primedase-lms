import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeftIcon, FileVideo, LucideLayoutDashboard } from "lucide-react";
import { IconBadge } from "@/components/ui/icon-badge";

import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterVisibility from "./_components/chapter-visibility-component";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/banner";
import toast from "react-hot-toast";

const chapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/unauthorized");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields} out of ${totalFields}`;
  if (completionText === "3 out of 3") {
    toast.success("All fields are completed. You can now publish the chapter.");
  }
  return (
    <div className="w-full mb-4">
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="Chapter is not yet published. This chapter will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-80 mb-6 text-red-600 hover:text-red-800">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Course Edit
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium text-red-700">
                  Chapter Creation
                </h1>
                <span className="text-sm text-gray-500">
                  Completed {completionText} fields
                </span>
                <div>
                  <ChapterVisibility
                    initialData={chapter}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2 text-red-700">
              <IconBadge icon={LucideLayoutDashboard} />
              <h2 className="text-xl">Customize Chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2 text-red-600">
              <IconBadge icon={FileVideo} />
              <h2 className="text-xl">Upload Video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}></ChapterVideoForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default chapterIdPage;
