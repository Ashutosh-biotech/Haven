import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "Haven Admin",
    description: "Haven Admin panel - control room of haven ...",
};

export default function AdminLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div>
        {children}
        </div>
    );
}