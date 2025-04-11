export const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
        <div className="mt-2 text-sm text-error-txt bg-error-bg p-3 border-l-4 border-error-br rounded-md shadow-sm">
            {message}
        </div>
    );
};
