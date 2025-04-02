import React from "react";
import type { Product } from "@/types/products";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { Title } from "@/components/shared";
import { useTranslations } from "next-intl";
import { cn } from "@/lib";

interface Props {
  className?: string;
  item: Product;
  locale: string;
}

export const ProductCard: React.FC<Props> = ({ className, item }) => {
  const t = useTranslations("Product");
  return (
    <Link
      className={cn("relative flex flex-col gap-y-2 p-1 h-auto", className)}
      scroll={false}
      href={{
        pathname: "/products/[id]",
        params: { id: item.id },
      }}
    >
      <div className="rounded-3xl overflow-hidden">
        <img
          alt=""
          className="object-cover object-center w-full"
          src={item.imageUrl}
        />
      </div>
      <Title text={item.name} />
      <p className="font-light text-sm text-gray-500">
        Красный лук, Сочные ананасы, Итальянские травы, Сладкий перец
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span>{t("from", { count: item.price })}</span>
        <Button size={"sm"}>
          <span>{t("add")}</span>
          <Plus size={15} />
        </Button>
      </div>
    </Link>
  );
};
