import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavOnPaths = [];
  const shouldHideNav = hideNavOnPaths.some((path) =>
    location.pathname.startsWith(path),
  );

  const navItems = [
    { path: "/convert", icon: "swap_horiz", label: "Convert" },
    {
      path: "/favorites",
      icon: "favorite",
      label: "Favourite",
      filled: true,
    },
    { path: "/alerts", icon: "notifications", label: "Alerts" },
    {
      path: "/profile",
      icon: "account_circle",
      label: "Profile",
    },
  ];

  return (
    <div className="bg-[#fafafa] flex flex-col overflow-clip relative rounded-[16px] size-full">
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>

      {!shouldHideNav && (
        <div className="bg-white flex gap-[19px] h-[80px] items-center p-[8px] relative shrink-0 w-full border-t border-[#e4e4e7]">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/convert" &&
                (location.pathname.startsWith("/rates") ||
                  location.pathname.startsWith(
                    "/multi-currency",
                  )));
            const iconClass =
              item.filled && isActive
                ? 'font-["Material_Icons:Regular",sans-serif]'
                : 'font-["Material_Icons_Outlined:Regular",sans-serif]';

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex-1 flex flex-col gap-[8px] h-[64px] items-center justify-center py-[8px] rounded-[8px] hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center">
                  <span
                    className={`${iconClass} leading-[normal] not-italic text-[24px] ${
                      isActive
                        ? "text-[#0077e9]"
                        : "text-[#71717a]"
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <p
                    className={`font-["Avenir_Next:${isActive ? "Bold" : "Medium"}",sans-serif] leading-[${isActive ? "22px" : "24px"}] not-italic text-[16px] whitespace-nowrap ${
                      isActive
                        ? "text-[#0077e9]"
                        : "text-[#71717a]"
                    }`}
                  >
                    {item.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};