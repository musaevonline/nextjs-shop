import { ReviewsPage } from '@temp/views/UserProfile/pages/Reviews'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: false })(ReviewsPage)
