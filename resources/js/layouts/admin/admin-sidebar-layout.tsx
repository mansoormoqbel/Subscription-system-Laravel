import { type PropsWithChildren } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminSidebarHeader } from '@/components/admin-sidebar-header';
import { type BreadcrumbItem } from '@/types';

export default function AdminSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AdminSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AdminSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
