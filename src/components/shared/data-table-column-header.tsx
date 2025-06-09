"use client"
import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

// Extend ColumnMeta to include 'type'
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    type?: string;
  }
}
import { Checkbox } from "@/components/ui/checkbox" 

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isBooleanColumn = column.columnDef.meta?.type === "boolean"

  const filterValue = column.getFilterValue() as boolean | undefined

  const handleCheckboxFilter = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") {
      column.setFilterValue(undefined) // Show all
    } else {
      column.setFilterValue(checked) // true or false
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 h-4 w-4" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 h-4 w-4" />
            Desc
          </DropdownMenuItem>

          {isBooleanColumn && (
            <>
              <DropdownMenuSeparator />
              <div className="px-2 py-1">
                <Checkbox
                  checked={filterValue ?? "indeterminate"}
                  onCheckedChange={handleCheckboxFilter}
                  className="mr-2"
                />
                <span className="text-sm">Only show active</span>
              </div>
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className="mr-2 h-4 w-4" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
