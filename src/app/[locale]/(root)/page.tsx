import { CarouselBanner, Container } from "@/components/shared";
import { Api } from "@/services/api-client";
import { ProductGroupList, TopBar, Filters } from "@/components/shared";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params; // Await the params Promise
  const categories = await Api.categories.getCategoriesWithProducts();

  return (
    <Container>
      <CarouselBanner />
      <TopBar categories={categories.filter((el) => el.products.length > 0)} />
      <div className="flex flex-col sm:flex-row gap-10 mt-5">
        <Filters className="sm:w-1/4" />
        <ProductGroupList
          className="sm:w-3/4"
          locale={locale}
          categoryProductGroup={categories}
        />
      </div>
    </Container>
  );
}
