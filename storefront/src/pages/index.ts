import { HomePage } from '../views/Home'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: true })(HomePage)
