import { BlogView } from '@temp/views/Blog'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: true })(BlogView)
