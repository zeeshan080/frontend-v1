import * as React from 'react';
import Navbar from './navbar';
import UserMenu from './user-menu';

export interface IHeaderProps {
}

export default function Header (props: IHeaderProps) {
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-bold tracking-tight">LOGO</span>
        </div>
        <Navbar />
        <UserMenu />
      </div>
    </header>
  );
}
