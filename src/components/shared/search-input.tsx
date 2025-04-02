"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types/products";
import { LoaderCircle, Search } from "lucide-react";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { Button } from "@/components/ui/button";
import * as Dialog from "@/components/ui/dialog";
import Image from "next/image";
import { Api } from "@/services/api-client";
import { useTranslations } from "next-intl";

interface Props {
  locale: string;
  className?: string;
}

export const SearchInput: FC<Props> = ({ locale, className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const ref = useRef(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const t = useTranslations("Header");

  useClickAway(ref, () => setFocused(false));

  useDebounce(
    () => {
      setLoading(true);
      const query = searchQuery.trim();
      (query
        ? Api.products.searchProducts(searchQuery)
        : Promise.resolve(initialProducts)
      )
        .then(setProducts)
        .catch((e) => (console.error(e), setProducts([])))
        .finally(() => setLoading(false));
    },
    350,
    [searchQuery]
  );

  useEffect(() => {
    setLoading(true);
    Api.products
      .getProducts()
      .then(setInitialProducts)
      .finally(() => setLoading(false));
  }, []);

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
    setActiveModal(false);
  };

  const renderSearchInput = () => (
    <>
      {focused && (
        <div className="hidden md:block fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-[30]" />
      )}
      <div
        ref={ref}
        className={cn(
          "hidden md:flex rounded-2xl  flex-1 w-full max-w-[350px] justify-between relative h-11 z-[30]",
          className
        )}
      >
        <input
          className="rounded-2xl outline-none w-full h-full border border-black pl-3 pr-11"
          type="text"
          placeholder={t("searchInput.placeholder")}
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading ? (
          <div className="absolute top-1/2 translate-y-[-50%] right-3 h-5">
            <LoaderCircle size={20} className="animate-spin" />
          </div>
        ) : (
          <Search className="absolute top-1/2 translate-y-[-50%] right-3 h-5 text-black" />
        )}

        {products.length > 0 ? (
          <ul
            className={cn(
              "absolute w-full bg-white rounded-xl p-2 top-14 shadow-md transition-all duration-200 invisible max-h-[400px] overflow-y-auto opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <li key={product.id}>
                <Link
                  scroll={false}
                  href={`/${locale}/products/${product.id}`}
                  onClick={onClickItem}
                  className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 rounded-lg  "
                >
                  {product.imageUrl && (
                    <Image
                      width={32}
                      height={32}
                      className="rounded-sm h-8 w-8"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  )}
                  <h3 className="">{product.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl p-2 top-14 shadow-md transition-all duration-300 invisible opacity-0 z-30  line-clamp-1",
              focused && "visible opacity-100 top-12"
            )}
          >
            {t("searchInput.emptyList")}
          </div>
        )}
      </div>
    </>
  );

  const renderDialog = () => (
    <>
      <Dialog.Dialog
        open={activeModal}
        onOpenChange={(state) => {
          if (!state) setActiveModal(false);
        }}
      >
        <Dialog.DialogTrigger
          className=""
          onClick={(e) => {
            e.preventDefault();
            setActiveModal(true);
          }}
          asChild
        >
          <Button className="bg-white shadow-none hover:bg-white">
            <Search width={20} height={20} className=" text-black" />
          </Button>
        </Dialog.DialogTrigger>
        <Dialog.DialogContent className="top-[100px] p-0  block ">
          <Dialog.DialogHeader>
            <Dialog.DialogTitle className="hidden" />
            <Dialog.DialogDescription className="hidden" />
          </Dialog.DialogHeader>
          <div
            ref={ref}
            className={cn(
              "flex rounded-2xl flex-1  justify-between relative h-11 z-[2] ab",
              className
            )}
          >
            <input
              className="rounded-2xl outline-none w-full pl-3 pr-11 "
              type="text"
              placeholder={t("searchInput.placeholder")}
              onFocus={() => setFocused(true)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {loading ? (
              <div className="absolute top-1/2 translate-y-[-50%] right-3 h-5">
                <LoaderCircle size={20} className="animate-spin" />
              </div>
            ) : (
              <Search className="absolute top-1/2 translate-y-[-50%] right-3 h-5 text-black" />
            )}
            {products.length > 0 ? (
              <ul
                className={cn(
                  "absolute w-full bg-white rounded-xl p-2 top-14 shadow-md transition-all duration-300 invisible opacity-0 max-h-[400px] overflow-y-auto z-30",
                  focused && "visible opacity-100 top-12"
                )}
              >
                {products.map((product) => (
                  <li key={product.id}>
                    <Link
                      onClick={onClickItem}
                      scroll={false}
                      href={`/${locale}/products/${product.id}`}
                      className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 rounded-lg  "
                    >
                      {product.imageUrl && (
                        <Image
                          width={32}
                          height={32}
                          className="rounded-sm h-8 w-8"
                          src={product.imageUrl}
                          alt={product.name}
                        />
                      )}
                      <h3>{product.name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={cn(
                  "absolute w-full bg-white rounded-xl p-2 top-14 shadow-md transition-all duration-300 invisible opacity-0 z-30",
                  focused && "visible opacity-100 top-12"
                )}
              >
                {t("searchInput.emptyList")}
              </div>
            )}
          </div>
          <Dialog.DialogFooter></Dialog.DialogFooter>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );

  return (
    <>
      <div className="block md:hidden">{renderDialog()}</div>
      {renderSearchInput()}
    </>
  );
};
