import { PageView } from '@temp/views/Page'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: true })(PageView)
