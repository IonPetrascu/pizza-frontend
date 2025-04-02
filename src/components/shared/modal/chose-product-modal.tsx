"use client";

import { Button, Dialog, DialogContent, DialogTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/products";
import { Title } from "@/components/shared";
import { useCartStore } from "@/store";
import { useSession } from "next-auth/react";
import { DialogDescription } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useToastMessage } from "@/hooks";
import Image from "next/image";
interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const { addCartItem } = useCartStore();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const { getToastMessage } = useToastMessage();
  const t = useTranslations();

  const handleAddToCart = async () => {
    const userId =
      status === "authenticated" && session?.user?.id
        ? Number(session.user.id)
        : undefined;

    try {
      setLoading(true);
      await addCartItem({ productId: product.id }, userId);
      const message = getToastMessage("add", product.name, true);
      toast.success(message);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      const message = getToastMessage("delete", product.name, false);
      toast.error(message);
    } finally {
      setLoading(false);
      router.back();
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogTitle className="hidden">title</DialogTitle>

      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <DialogDescription className="hidden" />
        <div className="flex gap-5">
          <div className="w-1/2 rounded-3xl overflow-clip h-full p-2">
              <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="w-1/2 p-2 flex flex-col ">
            <Title size="lg" text={product.name} />
            <span>
              {t("Ingredients.title", { count: product.ingredients?.length })}
            </span>
            <ul>
              {product.ingredients?.map((el) => (
                <li key={el.id}>{el.name}</li>
              ))}
            </ul>
            <Button
              disabled={loading}
              className="mt-auto"
              onClick={handleAddToCart}
            >
              {!loading ? (
                <span>{t("Product.add")}</span>
              ) : (
                <LoaderCircle className="animate-spin" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
