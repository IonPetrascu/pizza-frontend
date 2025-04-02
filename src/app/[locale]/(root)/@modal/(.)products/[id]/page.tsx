
import { Api } from "@/services/api-client";
import { ChooseProductModal } from "@/components/shared/modal/chose-product-modal";
import { notFound } from "next/navigation";

type EventModalProps = {
  params: Promise<{ id: string }>;
};

export default async function EventModal({ params }: EventModalProps) {
  const { id } = await params; // Дожидаемся params
  const product = await Api.products.getSingleProduct(Number(id));

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
