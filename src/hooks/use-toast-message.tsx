import { useTranslations } from "next-intl";

export const useToastMessage = () => {
  const t = useTranslations("Toast.products");

  const getToastMessage = (
    action: "add" | "delete" | "update",
    productName: string,
    isSuccess: boolean
  ) => {
    const status = isSuccess ? "success" : "error";
    return t(`${action}.${status}`, { productName });
  };

  return { getToastMessage };
};
