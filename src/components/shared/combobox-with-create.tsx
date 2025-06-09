"use client";

import * as React from "react";
import { ChevronsUpDownIcon, CheckIcon, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Simple shimmer skeleton loader
function OptionSkeleton() {
  return (
    <div className="px-4 py-2 flex items-center animate-pulse space-x-2">
      <div className="w-5 h-5 rounded bg-accent dark:bg-accent/60" />
      <div className="w-24 h-3 rounded bg-accent/60 dark:bg-accent" />
    </div>
  );
}

// Option type
type Option = { label: string; value: string };

// Props for ComboBoxWithCreate
type ComboBoxWithCreateProps = {
  label?: string;
  value: string | null;
  onChange: (val: string | null, option?: Option | null) => void;
  loadOptions: (search: string) => Promise<Option[]>;
  renderCreateDialog: (params: {
    searchText: string;
    onCreated: (option: Option) => void;
    onClose: () => void;
  }) => React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
};

export function ComboBoxWithCreate({
  label,
  value,
  onChange,
  loadOptions,
  renderCreateDialog,
  placeholder = "Select...",
  disabled = false,
}: ComboBoxWithCreateProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    setLoading(true);
    loadOptions(search).then((opts) => {
      if (isMounted) {
        setOptions(opts);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [search, loadOptions]);

  // Current option (for displaying label)
  const currentOption = options.find((opt) => opt.value === value) || null;

  // Show "Create" if nothing matches and user typed something
  const showCreate =
    !loading &&
    search.length > 0 &&
    !options.some((o) => o.label.toLowerCase() === search.toLowerCase());

  // Handler for when new item is created
  const handleCreated = (option: Option) => {
    setShowCreateDialog(false);
    onChange(option.value, option);
    setSearch("");
    setTimeout(() => setOpen(false), 120); // close popover after small delay
  };

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-foreground font-primary">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-secondary"
            disabled={disabled}
          >
            {currentOption?.label || placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${(label ?? "").toLowerCase()}...`}
              value={search}
              onValueChange={setSearch}
              className="font-secondary"
            />
            <CommandList>
              {loading && (
                <>
                  <OptionSkeleton />
                  <OptionSkeleton />
                </>
              )}
              {!loading && (
                <>
                  <CommandEmpty>
                    No {(label ?? "option").toLowerCase()} found.
                    {showCreate && (
                      <div
                        onClick={() => setShowCreateDialog(true)}
                        className="cursor-pointer mt-2 text-primary flex items-center gap-2 px-3 py-2 rounded hover:bg-accent"
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setShowCreateDialog(true);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        Create "{search}"
                      </div>
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          onChange(option.value, option);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <CheckIcon
                          className={`mr-2 h-4 w-4 ${
                            value === option.value ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  {/* If you want the create option to show at bottom even if options found, move the showCreate render here */}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Custom Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-md">
          {renderCreateDialog({
            searchText: search,
            onCreated: handleCreated,
            onClose: () => setShowCreateDialog(false),
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}
