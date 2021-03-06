import { OrderView } from '@temp/views/Order'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: false })(OrderView)
