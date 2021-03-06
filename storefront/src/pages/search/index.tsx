import { SearchPage } from '@temp/views/Search'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: true })(SearchPage)
