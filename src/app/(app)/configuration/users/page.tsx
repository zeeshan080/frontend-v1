"use client";
import { getUserColumns } from "@/components/configuration/user-columns";
import { DataTable } from "@/components/shared/data-table";
import * as React from "react";
import { toast } from "sonner";

export interface IUserPageProps {}

const data = [
    {
        id: "b3b6e7e2-1c1a-4e3a-9c2a-1e2b3c4d5e6f",
        username: "alice",
        email: "alice@example.com",
        password: "password123",
        role: "admin",
        is_active: true,
        is_superuser: true,
    },
    {
        id: "c4d5e6f7-2b3c-4d5e-8f9a-0b1c2d3e4f5a",
        username: "bob",
        email: "bob@example.com",
        password: "password456",
        role: "user",
        is_active: true,
        is_superuser: false,
    },
    {
        id: "d5e6f7a8-3c4d-5e6f-9a0b-1c2d3e4f5a6b",
        username: "carol",
        email: "carol@example.com",
        password: "password789",
        role: "manager",
        is_active: false,
        is_superuser: false,
    },
    {
        id: "e6f7a8b9-4d5e-6f7a-0b1c-2d3e4f5a6b7c",
        username: "dave",
        email: "dave@example.com",
        password: "password321",
        role: "user",
        is_active: true,
        is_superuser: false,
    },
    {
        id: "f7a8b9c0-5e6f-7a8b-1c2d-3e4f5a6b7c8d",
        username: "eve",
        email: "eve@example.com",
        password: "password654",
        role: "admin",
        is_active: false,
        is_superuser: true,
    },
    {
        id: "a8b9c0d1-6f7a-8b9c-2d3e-4f5a6b7c8d9e",
        username: "frank",
        email: "frank@example.com",
        password: "password111",
        role: "user",
        is_active: true,
        is_superuser: false,
    },
    {
        id: "b9c0d1e2-7a8b-9c0d-3e4f-5a6b7c8d9e0f",
        username: "grace",
        email: "grace@example.com",
        password: "password222",
        role: "manager",
        is_active: true,
        is_superuser: false,
    },
    {
        id: "c0d1e2f3-8b9c-0d1e-4f5a-6b7c8d9e0f1a",
        username: "heidi",
        email: "heidi@example.com",
        password: "password333",
        role: "user",
        is_active: false,
        is_superuser: false,
    },
    {
        id: "d1e2f3a4-9c0d-1e2f-5a6b-7c8d9e0f1a2b",
        username: "ivan",
        email: "ivan@example.com",
        password: "password444",
        role: "admin",
        is_active: true,
        is_superuser: true,
    },
    {
        id: "e2f3a4b5-0d1e-2f3a-6b7c-8d9e0f1a2b3c",
        username: "judy",
        email: "judy@example.com",
        password: "password555",
        role: "user",
        is_active: false,
        is_superuser: false,
    },
    {
        id: "f3a4b5c6-1e2f-3a4b-7c8d-9e0f1a2b3c4d",
        username: "mallory",
        email: "mallory@example.com",
        password: "password666",
        role: "manager",
        is_active: true,
        is_superuser: false,
    },
    {
        id: "a4b5c6d7-2f3a-4b5c-8d9e-0f1a2b3c4d5e",
        username: "oscar",
        email: "oscar@example.com",
        password: "password777",
        role: "user",
        is_active: true,
        is_superuser: false,
    },
];

export default function UserPage(props: IUserPageProps) {
  const [userData, setUserData] = React.useState(data);
  //   const handleDelete = async (id: string) => {
  //     try {
  //       const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  //       if (!res.ok) throw new Error("Failed to delete");

  //       setUserData((prev) => prev.filter((user) => user.id !== id));
  //     } catch (err) {
  //       console.error(err);
  //       // Show toast here if you want
  //     }
  //   };
  const handleDelete = (id: string) => {
    setUserData((prev) => prev.filter((user) => user.id !== id));
    toast.success("User deleted successfully", {
      style: { background: "#22c55e", color: "#fff" },
    });
  };

  return (
    <section className="container mx-auto">
      <DataTable columns={getUserColumns(handleDelete)} data={userData} />
    </section>
  );
}
