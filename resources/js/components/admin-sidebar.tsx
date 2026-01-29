import { Link } from '@inertiajs/react';
import { LayoutGrid, FileText, CreditCard, Users } from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import  admin  from '@/routes/admin';
import AppLogo from './app-logo';
import { NavMain } from '@/components/nav-main';
import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';

const mainNavItems = [
    { title: 'Dashboard', href: admin.dashboard().url, icon: LayoutGrid },
    { title: 'Plans', href: admin.plans().url, icon: FileText },
    { title: 'Subscriptions', href: admin.subscribe.getsub().url, icon: CreditCard },
    { title: 'Users', href: admin.users().url, icon: Users },
    { title: 'Payments', href: admin.payment.pay().url , icon: CreditCard },
];

const footerNavItems = [
    { title: 'Docs', href: 'https://laravel.com/docs', icon: FileText },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={admin.dashboard().url}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
