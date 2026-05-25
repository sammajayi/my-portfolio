export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-ghost-white px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-4 w-24 animate-pulse rounded bg-alabaster-grey" />
        <div className="mt-6 h-16 max-w-2xl animate-pulse rounded bg-alabaster-grey" />
        <div className="mt-12 h-28 animate-pulse rounded-lg bg-white" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-alabaster-grey bg-white">
              <div className="aspect-[16/9] animate-pulse bg-alabaster-grey" />
              <div className="space-y-4 p-5">
                <div className="h-4 w-28 animate-pulse rounded bg-alabaster-grey" />
                <div className="h-7 animate-pulse rounded bg-alabaster-grey" />
                <div className="h-20 animate-pulse rounded bg-alabaster-grey" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
