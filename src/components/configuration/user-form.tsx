"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSchema, userSchema } from "./user-schema";
import { ZodField } from "../shared/zod-field";
import { Button } from "../ui/button";
import { ComboBoxWithCreate } from "../shared/combobox-with-create";
import { Checkbox } from "../ui/checkbox";

export interface IUserFormProps {
  defaultValues?: Partial<UserSchema>;
  readOnly?: boolean;
}

const customers = [
  { value: "f332e6aa-39df-466e-b3d4-c31db46f7b04", label: "HR Assistant" },
  { value: "d30dd5e5-e200-4862-b573-0f351c7bb54c", label: "HR Manager" },
];

// Dialog for creating new customer
interface CreateCustomerDialogProps {
  searchText: string;
  onCreated: (option: { value: string; label: string }) => void;
  onClose: () => void;
}

function CreateCustomerDialog({
  searchText,
  onCreated,
  onClose,
}: CreateCustomerDialogProps) {
  const [name, setName] = React.useState(searchText);
  return (
    <div>
      <h2 className="font-primary text-lg mb-3">Create New Customer</h2>
      <input
        className="input w-full mb-4 px-3 py-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Customer Name"
        autoFocus
      />
      <div className="flex gap-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            const newOption = { value: Date.now().toString(), label: name };
            customers.push(newOption);
            onCreated(newOption);
          }}
          disabled={!name}
        >
          Save
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function UserFom(props: IUserFormProps) {
  const fetchRolesBySearch = async (search: string) => {
    await new Promise((res) => setTimeout(res, 300));
    return customers.filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
  };

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      is_active: true,
      is_superuser: false,
      ...props.defaultValues,
    },
  });

  function onSubmit(values: any) {
    console.log("Submitted values:", values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 container mx-auto">
        {/* First Row*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ZodField name="username" label="Username">
            {(field) => (
              <Input
                {...field}
                placeholder="Enter username here..."
                readOnly={props.readOnly}
              />
            )}
          </ZodField>
          <ZodField name="email" label="Email">
            {(field) => (
              <Input
                {...field}
                placeholder="Enter email here..."
                readOnly={props.readOnly}
              />
            )}
          </ZodField>
        </div>

        {/* Second Row: Machine & Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ZodField name="password" label="Password">
            {(field) => (
              <Input {...field} type="password" readOnly={props.readOnly} />
            )}
          </ZodField>

          <ZodField name="role" label="Role">
            {(field) => (
              <ComboBoxWithCreate
                value={field.value}
                onChange={field.onChange}
                loadOptions={fetchRolesBySearch}
                disabled={props.readOnly}
                renderCreateDialog={({
                  searchText,
                  onCreated,
                  onClose,
                }: {
                  searchText: string;
                  onCreated: (option: { value: string; label: string }) => void;
                  onClose: () => void;
                }) => (
                  <CreateCustomerDialog
                    searchText={searchText}
                    onCreated={onCreated}
                    onClose={onClose}
                  />
                )}
              />
            )}
          </ZodField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ZodField name="is_active" label="Active">
            {(field) => (
              <Checkbox
                disabled={props.readOnly}
                checked={field.value}
                onCheckedChange={(checked: boolean) => field.onChange(checked)}
              />
            )}
          </ZodField>
          <ZodField name="is_superuser" label="Superuser">
            {(field) => (
              <Checkbox
                checked={field.value}
                disabled={props.readOnly}
                onCheckedChange={(checked: boolean) => field.onChange(checked)}
              />
            )}
          </ZodField>
        </div>

        <div className="flex justify-end">
          {props.readOnly ? (
            <Button type="submit" className="font-primary" disabled variant={"secondary"}>
              View Only
            </Button>
          ) : (
            <Button type="submit" className="font-primary">
              {props.defaultValues ? "Update" : "Create"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
