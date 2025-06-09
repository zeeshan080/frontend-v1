// components/data-table-global-filter.tsx

"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

interface DataTableGlobalFilterProps<TData> {
  table: Table<TData>
  placeholder?: string
}

export function DataTableGlobalFilter<TData>({
  table,
  placeholder = "Search...",
}: DataTableGlobalFilterProps<TData>) {
  return (
    <Input
      value={table.getState().globalFilter ?? ""}
      onChange={(event) => table.setGlobalFilter(event.target.value)}
      placeholder={placeholder}
      className="max-w-sm"
    />
  )
}
