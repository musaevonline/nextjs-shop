import { OrdersPage } from '@temp/views/UserProfile/pages/Orders'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: false })(OrdersPage)
