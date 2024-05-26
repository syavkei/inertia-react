import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { useMemo } from "react";

export default function Error({ status }) {
    const title = useMemo(() => {
        return (
            {
                404: "Page Not Found",
                // 500: "Internal Server Error",
                403: "Forbidden",
            }[status] || "An Error Occurred"
        );
    }, [status]);

    const description = useMemo(() => {
        return (
            {
                404: "We couldn't find the page you are looking for.",
                403: "You don't have permission to access this page.",
            }[status] || "An unexpected error has occurred."
        );
    }, [status]);
    return (
        <Guest>
            <Head title={title} />
            <div className="mb-4 font-medium text-sm text-red-600 text-center">
                {description}
            </div>
        </Guest>
    );
}
