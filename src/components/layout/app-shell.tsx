"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BrainCircuit,
  ChartNoAxesCombined,
  ClipboardList,
  LayoutDashboard,
  Lightbulb,
  Menu,
  MessageSquareText,
  QrCode,
  Settings,
  Users,
  X,
} from "lucide-react";

import { ProductMark } from "@/components/brand/product-mark";
import { SignOutButton } from "@/components/layout/sign-out-button";
import { Button } from "@/components/ui/button";
import type { AppRole } from "@/config/demo-accounts";
import { cn } from "@/lib/utils";

type ShellUser = {
  name?: string | null;
  email?: string | null;
  role: AppRole;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN", "MANAGER"],
  },
  {
    label: "Feedback",
    href: "/feedback",
    icon: MessageSquareText,
    roles: ["SUPER_ADMIN", "MANAGER", "STAFF"],
  },
  {
    label: "Tickets",
    href: "/staff",
    icon: ClipboardList,
    roles: ["SUPER_ADMIN", "MANAGER", "STAFF"],
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ["SUPER_ADMIN", "MANAGER"],
  },
  {
    label: "Insights",
    href: "/dashboard/insights",
    icon: Lightbulb,
    roles: ["SUPER_ADMIN", "MANAGER"],
  },
  {
    label: "AI Coach",
    href: "/coach",
    icon: BrainCircuit,
    roles: ["SUPER_ADMIN", "MANAGER", "STAFF"],
  },
  {
    label: "Touchpoints",
    href: "/admin/touchpoints",
    icon: QrCode,
    roles: ["SUPER_ADMIN"],
  },
  { label: "Users", href: "/admin/users", icon: Users, roles: ["SUPER_ADMIN"] },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["SUPER_ADMIN"],
  },
] satisfies Array<{
  label: string;
  href: string;
  icon: typeof ChartNoAxesCombined;
  roles: AppRole[];
}>;

export function AppShell({
  user,
  children,
}: {
  user: ShellUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const visibleItems = navigation.filter((item) =>
    item.roles.includes(user.role),
  );

  return (
    <div className="bg-background min-h-screen lg:grid lg:grid-cols-[272px_1fr]">
      <aside className="hidden min-h-screen flex-col bg-[#053b23] p-5 text-white lg:flex">
        <Link href="/dashboard" className="px-2 py-3">
          <ProductMark inverse />
        </Link>
        <NavItems items={visibleItems} pathname={pathname} />
        <UserFooter user={user} />
      </aside>

      <div className="min-w-0">
        <header className="border-border sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/95 px-5 backdrop-blur lg:hidden">
          <ProductMark />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </header>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Close navigation overlay"
              className="absolute inset-0 bg-black/45"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative flex h-full w-[min(86vw,320px)] flex-col bg-[#053b23] p-5 text-white shadow-2xl">
              <div className="flex items-center justify-between px-2 py-3">
                <ProductMark inverse />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close navigation"
                  className="text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
              <NavItems
                items={visibleItems}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
              <UserFooter user={user} />
            </aside>
          </div>
        )}

        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  );
}

function NavItems({
  items,
  pathname,
  onNavigate,
}: {
  items: typeof navigation;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="mt-8 flex-1 space-y-1" aria-label="Primary navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors",
              active
                ? "text-brand-green bg-white shadow-sm"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
          >
            <Icon className="size-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserFooter({ user }: { user: ShellUser }) {
  return (
    <div className="mt-8 border-t border-white/12 pt-4">
      <div className="mb-2 px-3">
        <p className="truncate text-sm font-semibold">{user.name}</p>
        <p className="mt-0.5 truncate text-xs text-white/50">
          {user.role.replaceAll("_", " ")}
        </p>
      </div>
      <SignOutButton />
    </div>
  );
}
