"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Container, CartButton, SearchInput } from "@/components/shared";
import { ProfileButton } from "@/components/shared";
import { AuthModal } from "@/components/shared";
import { Link } from "@/i18n/routing";

interface Props {
  className?: string;
  locale: string;
}

export const Header: React.FC<Props> = ({ className, locale }) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  return (
    <header className={cn("py-5 border-b border-gray-700 ", className)}>
      <Container className="flex items-center gap-5 justify-between">
        <Link href={"/"}>
          <h1 className="font-extrabold text-5xl">Pizza</h1>
        </Link>
        <SearchInput locale={locale} />
        <div className="flex gap-5">
          <CartButton />
          <ProfileButton setOpen={() => setIsOpenModal(true)} />
          <AuthModal
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
          />
        </div>
      </Container>
    </header>
  );
};
