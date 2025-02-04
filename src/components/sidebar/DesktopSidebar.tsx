// DesktopSidebar.jsx
import { sidebarData } from "@/components/sidebar/sidebarData.ts";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react"; // Replace with actual icon library
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible"; // Assuming Radix UI for collapsible
import {
  SidebarGroup,

  SidebarGroupContent,
} from "../ui/sidebar"; // Adjust import path as necessary

const DesktopSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Check if current location matches any of the paths and return background styling
  const checkLocation = (paths: string[]): string => {
    if (paths.includes(location.pathname))
      return "bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow";
    return "";
  };

  return (
    <aside className="lg:flex flex-col hidden min-h-svh min-w-[220px] lg:min-w-[240px] bg-rose-200 h-full">
      <div className="flex flex-col items-center justify-center h-20">
        <h5 className="text-xl font-bold leading-4 cursor-pointer">
          {t("common.dashboard")} <span className="text-[8px]"></span>
        </h5>
        <h4 className="text-[10px] leading-[0.75] font-bold tracking-normal cursor-pointer">
          <b className="font-semibold">RETAIL MANAGEMENT APP</b>
        </h4>
      </div>

      <hr className="h-2" />

      <ul className="px-3 font-bold">
        {sidebarData.map((item) => (
          <div key={item.name}>
            {/* Render top-level items normally */}
            {!item.children ? (
              <NavLink to={item.routeNames[0]}>
                <li
                  className={`hover:bg-rose-300 flex items-center justify-between p-2 mb-3 rounded-sm cursor-pointer ${checkLocation(
                    item.routeNames
                  )}`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon className="w-6 h-6 font-bold" />}
                    <p className="text-[15px]">{t(item.name)}</p>
                  </div>
                </li>
              </NavLink>
            ) : (
              // Render collapsible section for "Manager" with children
              <li
                className={`flex flex-col items-start mb-3
                )}`}
              >
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarGroup>
                      <CollapsibleTrigger>
                        <div className="flex items-center gap-3 p-2 rounded-sm mb-3 hover:bg-rose-300">
                          {item.icon && (
                            <item.icon className="w-6 h-6 font-bold" />
                          )}
                          <p className="text-[15px]">{t(item.name)}</p>

                          <ChevronDown className="ml-auto rounded-sm transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </div>
                      </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <ul>
                            
                          {item.children.map((child) => (
                            <li key={child.name} >
                              <NavLink
                                to={child.route}
                                className={`flex rounded-sm p-2 pl-8 hover:bg-rose-300 ${checkLocation([child.route])} rounded-sm`}
                              >
                                <p className="text-sm">{t(child.name)}</p>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </li>
            )}
          </div>
        ))}
      </ul>
    </aside>
  );
};

export default DesktopSidebar;
