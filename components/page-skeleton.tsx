import { Skeleton } from "poyraz-ui/atoms";

export function PageSkeleton() {
  return (
    <section aria-busy="true" aria-live="polite" className="space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-5 w-28 rounded-sm" />
        <Skeleton className="h-10 w-full rounded-sm" />
        <Skeleton className="h-4 w-5/6 rounded-sm" />
        <Skeleton className="h-4 w-2/3 rounded-sm" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-40 w-full rounded-sm" />
        <Skeleton className="h-40 w-full rounded-sm" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-24 rounded-sm" />
        <Skeleton className="h-4 w-full rounded-sm" />
        <Skeleton className="h-4 w-full rounded-sm" />
        <Skeleton className="h-4 w-4/5 rounded-sm" />
      </div>
    </section>
  );
}
