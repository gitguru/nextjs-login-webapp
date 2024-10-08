export const Loading = ({ message }: { message?: string }) => {
    return (
        <>
        <div className="flex min-h-screen items-center justify-center w-full h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-1 text-lg font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                { message !== null && message ? message : 'Cargando...' }
            </div>
        </div>  
        </>
    )
};

export default Loading;