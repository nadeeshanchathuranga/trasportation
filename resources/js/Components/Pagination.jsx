import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    // If there's only 1 page, don't render pagination
    if (links.length <= 3) {
        return null;
    }
    
    return (
        <div className="flex flex-wrap items-center justify-center gap-1 mt-4">
            {links.map((link, key) => (
                <div key={key}>
                    {link.url === null ? (
                        // Disabled links (current page, etc.)
                        <span
                            className={`px-4 py-2 text-sm border rounded ${
                                link.active
                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                    : "text-gray-500 cursor-not-allowed"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        // Active links
                        <Link
                            href={link.url}
                            className={`px-4 py-2 text-sm border rounded hover:bg-gray-50 ${
                                link.active 
                                    ? "border-indigo-600 bg-indigo-600 text-white" 
                                    : "text-gray-700"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}