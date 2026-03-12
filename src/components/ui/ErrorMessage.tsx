


type ErrorMessageProps = {
    error: unknown;
};
export function ErrorMessage({ error }: ErrorMessageProps) {
    const message =
     error instanceof Error ? error.message : "Something went wrong loading products.";
     
     return (
         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
             <strong className="font-bold">Error:</strong> 
             <span className="block sm:inline ml-2">{message}</span>
              </div> 
              );
}