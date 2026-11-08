"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useSession } from "@/lib/auth-client"


type Role = "seeker" | "recruiter" | "admin"
type MenuItem = { id: string; name: string; url: string; icon: LucideIcon }


const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { id: "jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseBusiness },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}
export function DashboardSidebar() {

  const {data: session, isPending} = useSession()
  const role = session?.user?.role || "seeker"
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />

        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {
            menuItemsByRole[role].map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton render={<a href={item.url} />}>
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
            
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
