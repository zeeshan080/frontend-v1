"use client";
import * as React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export interface IUserMenuProps {
}

export default function UserMenu (props: IUserMenuProps) {
// Example user data (replace with real auth/user context as needed)
  const user = {
    name: "Ali Ahmad",
    email: "ali@example.com",
    image: "", // Add a real image URL for production
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm hidden sm:inline">
            {user.name}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Edit Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="flex items-center gap-2 w-full text-left"
            onClick={() => {
              // Add your logout logic here
              alert("Logged out!");
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
