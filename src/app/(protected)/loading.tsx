import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProtectedLoading() {
  return (
    <main className="space-y-8 p-5 sm:p-8 lg:p-10" aria-busy="true">
      <div className="space-y-3">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-10 w-full max-w-xl" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index}>
            <CardContent className="space-y-3 p-4">
              <Skeleton className="size-10" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </section>
      <Card>
        <CardContent className="space-y-3 p-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    </main>
  );
}
