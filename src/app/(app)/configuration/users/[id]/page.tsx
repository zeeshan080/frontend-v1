import UserFom from "@/components/configuration/user-form";
import * as React from "react";

export interface ISingleUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleUserPage({ params }: ISingleUserPageProps) {
  const { id } =await params;

  // You can use the id to fetch user data here
  console.log("id->", id);

  const data = {
    id,
    username: "alice",
    email: "alice@example.com",
    password: "password123",
    role: "admin",
    is_active: true,
    is_superuser: true,
  };

  return (
    <section>
      <UserFom readOnly={true} defaultValues={data} />
    </section>
  );
}
