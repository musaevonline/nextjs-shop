import { SignUpConfirmView } from '@temp/views/Auth'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: false })(SignUpConfirmView)
