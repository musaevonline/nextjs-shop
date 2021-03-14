import { ProductDetailsPage } from '@temp/views/ProductDetails'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: true })(ProductDetailsPage)
