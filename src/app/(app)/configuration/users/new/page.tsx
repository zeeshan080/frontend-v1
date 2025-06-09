import UserFom from "@/components/configuration/user-form";
import * as React from "react";

export interface ICreateUserPageProps {}

export default function CreateUserPage(props: ICreateUserPageProps) {
  return (
    <section>
      <UserFom />
    </section>
  );
}
