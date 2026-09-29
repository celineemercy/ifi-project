"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function ProtectedError({ reset }: { reset: () => void }) {
  return (
    <main className="p-5 sm:p-8 lg:p-10">
      <Alert variant="destructive" className="max-w-2xl">
        <AlertTriangle aria-hidden="true" />
        <AlertTitle>This page could not be loaded</AlertTitle>
        <AlertDescription>
          Your saved learning data is unchanged. Try loading the page again.
          <div className="mt-4">
            <Button type="button" variant="outline" onClick={reset}>
              <RotateCcw className="size-4" aria-hidden="true" />
              Try again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </main>
  );
}
