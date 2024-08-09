
const Loader = () => {
    return (
        <span className="loading loading-dots loading-lg">
        </span>
    )
}

export const LoaderImage = () => {
    return (
        <span className="loading loading-bars loading-lg"></span>
    )
}

export const LoaderContent = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10">
            <div className="w-full max-w-xl gap-4">
                <div className="skeleton h-24 w-full m-4"></div>
                <div className="skeleton h-24 w-full m-4"></div>
                <div className="skeleton h-24 w-full m-4"></div>
                <div className="skeleton h-24 w-full m-4"></div>
            </div>
        </div>
    )
}

export default Loader;