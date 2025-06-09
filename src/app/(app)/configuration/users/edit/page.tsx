import UserFom from '@/components/configuration/user-form';
import * as React from 'react';

export interface IEditPageProps {
}
const data = {
        id: "b3b6e7e2-1c1a-4e3a-9c2a-1e2b3c4d5e6f",
        username: "alice",
        email: "alice@example.com",
        password: "password123",
        role: "admin",
        is_active: true,
        is_superuser: true,
    }

export default function EditPage (props: IEditPageProps) {
  return (
    <section>
        <UserFom defaultValues={data}/>
    </section>
  );
}
