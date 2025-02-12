import { Container } from "@/components/shared";
import { Api } from "@/services/api-client";
import { ProductGroupList, TopBar } from "@/components/shared";
import { Filters } from "@/components/shared/filters";


export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const categories = await Api.categories.getCategoriesWithProducts()
  console.log("locale", locale);

  return (<>
    <TopBar categories={categories.filter((el) => el.products.length > 0)} />
    <Container className="flex gap-10 mt-5 ">
      <Filters className="w-1/4" />
      <ProductGroupList className="w-3/4" locale={locale} categoryProductGroup={categories} />
    </Container>
  </>

  );
}



