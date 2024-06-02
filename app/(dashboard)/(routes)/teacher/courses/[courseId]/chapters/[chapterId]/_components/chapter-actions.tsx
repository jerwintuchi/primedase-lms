"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}
export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  return (
    <div className="flex items-left gap-x-2">
      <Button
        className=" hover:bg-green-800 hover:text-white"
        onClick={() => {}}
        disabled={disabled}
        variant={"outline"}
        size="lg">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button
        size={"lg"}
        className="bg-red-400 text-red-900 hover:bg-red-800 hover:text-white">
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
};
