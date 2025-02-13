import { Api } from "@/services/api-client"
import { ChooseProductModal } from "@/components/shared/modal/chose-product-modal"

export default async function EventModal({ params }: { params: { id: string } }) {
    const { id } = await params
    const product = await Api.products.getSingleProduct(Number(id))

    return (<ChooseProductModal product={product} />)
}
