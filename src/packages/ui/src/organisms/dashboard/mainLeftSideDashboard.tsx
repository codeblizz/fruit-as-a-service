import Span from "../../atoms/span";
import Section from "../../atoms/section";
import { Button } from "../../atoms/button";
import Paragraph from "../../atoms/paragraph";
import { cn } from "@/packages/helpers/src/utils";
import { signOut, useSession } from "next-auth/react";
import React, { useState, useTransition } from "react";
import CONSTANT from "@/packages/helpers/src/constants";
import NavItem from "@/packages/ui/src/molecules/navItems";
import { useRouter, useSearchParams } from "next/navigation";
import useDashboard from "../../molecules/hooks/useDashboard";
import useAuth from "@/packages/ui/src/molecules/hooks/useAuth";
import { ChevronLeft, ChevronRight, LogOutIcon } from "lucide-react";
import DashBoardSubMenuAccordion from "../../molecules/dashboardSubMenu";
import AppLogoComponent from "@/packages/ui/src/molecules/appLogoComponent";

function MainLeftSideDashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");
  const [isPending, startTransition] = useTransition();
  const isActive = searchParams.get("active") === "true";
  const [toggleMainMenu, setToggleMainMenu] = useState(false);
  const [menuName, setMenuName] = useState<null | string>(null);
  const {
    activeTab,
    updateToast,
    setActiveTab,
    isMobileOpen,
    setMobileOpen,
    isSidebarCollapsed,
    setSidebarCollapsed,
  } = useDashboard();

  const dashboardMenu = Object.keys(CONSTANT.fruitMenu.categories);

  const toggleSubMenu = (menu: string) => {
    setMenuName((prev) => (prev === menu ? null : menu));
  };

  const onSignOut = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: "/auth/signin" });
      updateToast(true, "User Signed Out", "text-success");
      activeTab !== "overview" && setActiveTab("overview");
    });
  };

  return (
    <aside
      className={`
          fixed inset-y-0 left-0 z-50 bg-ghost-apple border-r border-slate-200 transition-all duration-300 ease-in-out lg:relative
          ${isSidebarCollapsed ? "w-20" : "w-64"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
    >
      <Section className="flex flex-col h-full">
        <div className="h-[5rem] flex justify-start items-center border-b border-slate-200 bg-gradient-to-tr from-peach via-quaternary to-peach/70">
          <AppLogoComponent imageClassName="" containerClassName="" />
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
          <div
            className={`px-3 mb-2 text-[10px] font-bold uppercase text-slate-400 tracking-wider ${
              isSidebarCollapsed ? "text-center" : ""
            }`}
          >
            {isSidebarCollapsed ? "•••" : "Navigation"}
          </div>

          {CONSTANT.menuItems.map((item) => (
            <NavItem
              item={item}
              key={item.id}
              className={cn(
                session?.user.permissions.includes(item.permission)
                  ? ""
                  : "hidden"
              )}
              isActive={activeTab === item.id}
              isCollapsed={isSidebarCollapsed}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
                setToggleMainMenu(!toggleMainMenu);
                item.id === "overview"
                  ? router.push(`/dashboard`)
                  : item.id === "manage-fruits"
                  ? router.push(`/dashboard/fruits/manage`)
                  : router.push(`/dashboard/${item.id}`);
              }}
            >
              {toggleMainMenu &&
                activeTab === "fruits" &&
                item.id === "fruits" && (
                  <Section className="w-full flex justify-center items-center">
                    <Section className="flex item-center justify-center h-auto w-[90%] rounded-xl border-l border-r border-gray-100">
                      <Section className="flex flex-col item-center justify-center gap-y-1 h-full w-full">
                        {dashboardMenu.map((menu, idx) => (
                          <Span
                            name=""
                            key={idx}
                            className="flex flex-col items-center justify-center w-full text-quaternary"
                          >
                            <Paragraph
                              id={String(idx)}
                              onClick={() => toggleSubMenu(menu)}
                              className={cn([
                                "text-sm text-center min-w-max cursor-pointer !text-primary/60 w-full border-b border-gray-100 h-6 px-3 flex justify-between hover:text-apple-green/70 hover:bg-apple-green/5 items-center",
                              ])}
                            >
                              {menu}
                              <span
                                className={cn(
                                  "transition-transform duration-200",
                                  menuName === menu ? "rotate-90" : ""
                                )}
                              >
                                <ChevronRight size={12} />
                              </span>
                            </Paragraph>
                            <DashBoardSubMenuAccordion
                              menu={menu}
                              selected={selected}
                              isActive={isActive}
                              menuName={menuName}
                            />
                          </Span>
                        ))}
                      </Section>
                    </Section>
                  </Section>
                )}
            </NavItem>
          ))}

          <div
            className={`px-3 pt-6 mb-2 text-[10px] font-bold uppercase text-slate-400 tracking-wider ${
              isSidebarCollapsed ? "text-center" : ""
            }`}
          >
            {isSidebarCollapsed ? "•••" : "System"}
          </div>

          {CONSTANT.secondaryItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
              isCollapsed={isSidebarCollapsed}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
                item.id === "overview"
                  ? router.push(`/dashboard`)
                  : router.push(`/dashboard/${item.id}`);
              }}
            />
          ))}
        </nav>

        {/* Collapse Control */}
        <Section className="p-3 border-t border-slate-100">
          <Button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full bg-ghost-apple hidden lg:flex items-center justify-start p-2 text-slate-400 hover:text-apple-green/70 hover:bg-apple-green/5 rounded-xl transition-colors"
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                <ChevronLeft size={16} /> COLLAPSE
              </div>
            )}
          </Button>
          <Button
            onClick={onSignOut}
            variant="destructive"
            loading={isPending}
            leftIcon={<LogOutIcon />}
            className="inline-flex items-center justify-center w-full h-8 px-3 text-quaternary rounded-xl"
          >
            <Paragraph className="text-center text-md">Sign Out</Paragraph>
          </Button>
        </Section>
      </Section>
    </aside>
  );
}

export default MainLeftSideDashboard;
