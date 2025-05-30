
export default function Loading() {
  return (
    <div className="flex items-center justify-center">
    <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div></div>
  );
}
