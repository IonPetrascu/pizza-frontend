"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const images = [
  "https://images.pexels.com/photos/3682838/pexels-photo-3682838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export function CarouselBanner() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollTo((activeIndex + 1) % 5); // 5 - количество слайдов
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, api]);

  return (
    <Carousel
      setApi={(emblaApi) => {
        if (emblaApi) {
          setApi(emblaApi);
          emblaApi.on("select", () => {
            setActiveIndex(emblaApi.selectedScrollSnap());
          });
        }
      }}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-full rounded-lg"
    >
      <CarouselContent className="h-[390px]">
        {images.map((src, index) => (
          <CarouselItem className="p-0" key={index}>
            <div className="h-full">
              <Card className="h-full">
                <CardContent className="flex items-center justify-center p-0 h-full w-full">
                  <img
                    className="w-full h-full rounded-md object-cover"
                    src={src}
                    alt={`Slide ${index + 1}`}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="bg-gradient-to-r from-slate-800 h-full w-40 absolute top-0 left-0"></div>
      <div className="bg-gradient-to-l from-slate-800 h-full w-40 absolute top-0 right-0"></div>
      <CarouselPrevious className="left-5 text-white bg-black border-none w-10 h-10" />
      <CarouselNext className="right-5 text-white bg-black border-none w-10 h-10" />
    </Carousel>
  );
}
