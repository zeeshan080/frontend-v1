"use client";
import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "HRMS",
    dropdown: [
      { label: "Attendance", href: "/hrms/attendance" },
      { label: "Employees", href: "/hrms/employees" },
      { label: "Salary", href: "/hrms/salary" },
    ],
  },
  {
    label: "Sales",
    dropdown: [
      { label: "Orders", href: "/sales/orders" },
      { label: "Customers", href: "/sales/customers" },
    ],
  },
  {
    label: "Manufacturing",
    dropdown: [
      { label: "Orders", href: "/manufacturing/orders" },
      { label: "Machines", href: "/manufacturing/machines" },
      { label: "Bill of Material", href: "/manufacturing/bom" },
    ],
  },
  {
    label: "Inventory",
    dropdown: [
      { label: "Stock", href: "/inventory/stock" },
      { label: "Reports", href: "/inventory/reports" },
    ],
  },
   {
    label: "Configuration",
    dropdown: [
      { label: "Users", href: "/configuration/users" },
      { label: "Roles", href: "/configuration/roles" },
      { label: "Permissions", href: "/configuration/permissions" },
    ],
  },
];

export default function Navbar() {
  return (
    <nav>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) =>
            !item.dropdown ? (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={item.label}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid min-w-[180px] gap-2 p-2">
                    {item.dropdown.map((sub) => (
                      <li key={sub.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={sub.href}
                            className="block px-3 py-2 rounded-md hover:bg-accent transition"
                          >
                            {sub.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
