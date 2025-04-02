"use client"; // Делаем клиентским

import { Filters } from "@/components/shared";
import { useSearchParams } from "next/navigation";

export function HomeClient({}) {
  const searchParams = useSearchParams();
  console.log("search params", searchParams.toString());

  return (
    <>
      <Filters />
    </>
  );
}
