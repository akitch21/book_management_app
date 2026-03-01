"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Mail,
  LayoutDashboard,
  Library,
  NotebookPen,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "ダッシュボード",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "書籍ライブラリ",
      url: "/library",
      icon: Library,
    },
    {
      title: "書籍記録",
      url: "/records",
      icon: NotebookPen,
    },
    {
      title: "書籍検索",
      url: "/search",
      icon: Search,
    },
    {
      title: "コミュニティ",
      url: "/community",
      icon: Users,
    },
    {
      title: "設定",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "お問い合わせ",
      url: "/contact",
      icon: Mail,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const navMainItems = data.navMain.map((item) => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(`${item.url}/`),
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
