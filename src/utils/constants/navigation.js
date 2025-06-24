import dashboardIcon from "@/assets/icons/dashbaord.svg";
import userIcon from "@/assets/icons/user.svg";
import whatsnewIcon from "@/assets/icons/whatsnew.svg";
import sectionIcon from "@/assets/icons/section.svg";
import reportingIcon from "@/assets/icons/reporting.svg";
import settingIcon from "@/assets/icons/setting.svg";

export const navItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    icon: dashboardIcon,
  },
  {
    id: "user-management",
    title: "User Management",
    path: "/user-management",
    icon: userIcon,
  },
  {
    id: "whats-new",
    title: "What's New?",
    path: "/whats-new",
    icon: whatsnewIcon,
  },
  {
    id: "sections",
    title: "Sections",
    path: "/sections",
    icon: sectionIcon,
  },
  {
    id: "reporting",
    title: "Reporting",
    path: "/reporting",
    icon: reportingIcon,
  },
  {
    id: "settings",
    title: "Settings",
    path: "/settings",
    icon: settingIcon,
  },
];

export const mockUser = {
  name: "Jaydeep",
  email: "jaydeep@gmail.com",
  avatar: "https://i.pravatar.cc/300",
};
