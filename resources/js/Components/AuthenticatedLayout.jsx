import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children, header }) {
    const { props } = usePage();

    return (
        <div>
            {/* Header */}
            <header className="bg-white shadow">{header}</header>

            {/* Success Message */}
            {props.flash?.success && (
                <div className="bg-green-100 text-green-800 p-3 rounded m-4">
                    {props.flash.success}
                </div>
            )}

            {/* Error Message */}
            {props.flash?.error && (
                <div className="bg-red-100 text-red-800 p-3 rounded m-4">
                    {props.flash.error}
                </div>
            )}

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}
