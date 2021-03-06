import { BlogCategoryView } from '@temp/views/Blog'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: true })(BlogCategoryView)
