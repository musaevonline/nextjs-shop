import { AddressesPage } from '@temp/views/UserProfile/pages/Addresses'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: false })(AddressesPage)
