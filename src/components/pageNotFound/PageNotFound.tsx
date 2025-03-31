"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-60px)] flex w-full flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-9xl font-extrabold leading-none text-transparent md:text-[10rem]">
          404
        </span>

        <h2 className="font-heading text-2xl font-bold md:text-3xl">
          Something&apos;s missing
        </h2>

        <p className="text-muted-foreground md:text-lg">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>

        <div className="flex gap-2 pt-6 flex-row justify-center">
          <Button
            onClick={() => router.back()}
            variant="default"
            size="lg"
            className="w-full md:w-auto"
          >
            Go back
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            size="lg"
            className="w-full md:w-auto"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
