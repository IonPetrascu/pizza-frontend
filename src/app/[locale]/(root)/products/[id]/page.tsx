import { NextPage } from 'next'
import { Api } from '@/services/api-client'
import { Container } from '@/components/shared'
import { notFound } from 'next/navigation'
interface Props { }

const ProductPage: NextPage = async ({ params }: any) => {
    const { id } = await params

    const product = await Api.products.getSingleProduct(id)

    if (!product) notFound()
    return (<Container>
        {product.name}
    </Container >)
}

export default ProductPage