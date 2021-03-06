import { PersonalInformationPage } from '@temp/views/UserProfile/pages/PersonalInformation'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: false })(PersonalInformationPage)
