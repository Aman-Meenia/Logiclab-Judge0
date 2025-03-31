"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { submissionType } from "./ProblemHeader";
import { cn } from "@/lib/utils";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Accepted":
      return "bg-green-500 hover:bg-green-600";
    default:
      return "bg-red-500 hover:bg-red-600";
  }
};

export default function SubmissionTable({
  submissions,
  loading,
}: {
  submissions: submissionType[] | null;
  loading: boolean;
}) {
  return loading ? (
    <div className="flex justify-center items-center h-40 bg-white dark:bg-black">
      <p className="text-lg text-black dark:text-white">
        Loading submissions...
      </p>
    </div>
  ) : submissions ? (
    <Table className="bg-white dark:bg-black">
      <TableHeader>
        <TableRow>
          <TableHead>Language</TableHead>
          <TableHead>Runtime</TableHead>
          <TableHead>Memory</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {submissions?.map((entry: submissionType) => (
          <TableRow key={entry.createdAt}>
            <TableCell className=" light:text-black">
              {entry.language}
            </TableCell>
            <TableCell>{entry.time} ms</TableCell>
            <TableCell>{entry.memory}</TableCell>
            <TableCell>
              <Badge
                className={cn(getStatusColor(entry.status), "dark:text-white")}
              >
                {entry.status}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(entry.createdAt)}</TableCell>
          </TableRow>
        ))}
        {submissions.length == 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-lg">
              No submissions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  ) : (
    <>
      <div>
        <h1> Error while fetching submissions</h1>
      </div>
    </>
  );
}
function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}`;
}
