"use client";
import { ColumnDef } from "@tanstack/react-table";
import { UserSchema } from "./user-schema";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "@/components/shared/data-table-column-header";
import { Badge } from "../ui/badge";
import { MoreHorizontal, PenBox, Trash2, View } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmAlertDialog } from "../shared/confirm-alert-dialog";

export const getUserColumns = (
  onDelete: (id: string) => void
): ColumnDef<UserSchema>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-gray-400" // Add a border color for better visibility
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-gray-400" // Add a border color for better visibility
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),

    cell: ({ getValue }) => {
      const value = String(getValue() ?? "").toLowerCase();
      let variant: "destructive" | "default" | "secondary" = "secondary";
      if (value.includes("admin")) {
        variant = "destructive";
      } else if (value.includes("manager")) {
        variant = "default";
      }
      return <Badge variant={variant}>{getValue() as string}</Badge>;
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" />
    ),
    cell: ({ getValue }) => (
      <Checkbox
        checked={!!getValue()}
        disabled
        className="border-gray-400" // Add a border color for better visibility
      />
    ),
    meta: {
      type: "boolean",
    },
  },
  {
    accessorKey: "is_superuser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Superuser" />
    ),
    cell: ({ getValue }) => (
      <Checkbox
        checked={!!getValue()}
        disabled
        className="border-gray-400" // Add a border color for better visibility
      />
    ),
    meta: {
      type: "boolean",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [open, setOpen] = useState(false);
      const router = useRouter();
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push(`/configuration/users/${user.id}`)}>
                <View className="mr-2 h-4 w-4" /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/configuration/users/edit?id=${user.id}`)}
              >
                <PenBox className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4 text-destructive" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmAlertDialog
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {
              onDelete(user.id); // this function comes from parent and is passed into column
            }}
            title="Confirm deletion"
            description={`Are you sure you want to delete ${user.username}?`}
          />
        </>
      );
    },
  },
];
