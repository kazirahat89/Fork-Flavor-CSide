/* eslint-disable prettier/prettier */
"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/avatar";

import { logout } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";

export default function NavbarDropdown() {
  const router = useRouter();

  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    router.push("/");
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const dropdownItems = [
    {
      label: "Profile",
      action: () => handleNavigation("/dashboard"),
      condition: true,
    },
    {
      label: "Manage Recipes",
      action: () => handleNavigation("/dashboard/manage-recipies"),
      condition: user?.role === "admin",
    },
    {
      label: "Manage Users",
      action: () => handleNavigation("/dashboard/manage-users"),
      condition: user?.role === "admin",
    },
    {
      label: "Manage Admins",
      action: () => handleNavigation("/dashboard/manage-admins"),
      condition: user?.role === "admin",
    },
    {
      label: "Create Recipe",
      action: () => handleNavigation("/dashboard/create-recipe"),
      condition: user?.role === "user",
    },
    {
      label: "Change Password",
      action: () => handleNavigation("/dashboard/change-password"),
      condition: true,
    },
    {
      label: "Logout",
      action: handleLogout,
      condition: true,
      isDanger: true,
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer bg-white"
          src={user?.profilePicture}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Static Actions" className="bg-white">
        {dropdownItems
          .filter((item) => item.condition)
          .map((item, index) => (
            <DropdownItem
              key={index}
              className={`${item.isDanger ? "text-warning" : ""}`}
              color={item.isDanger ? "danger" : "default"}
              onClick={item.action}
            >
              {item.label}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
}
