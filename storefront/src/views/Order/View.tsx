import React from 'react'
import { MetaWrapper } from '@temp/components'
import Page from '@temp/views/Order/Page'
import { useOrder } from '@sdk/queries/order'
import { getDBIdFromGraphqlId } from '@temp/core/utils'
import { useRouter } from 'next/router'

const View: React.FC = () => {
	const router = useRouter()
	const { data, loading } = useOrder({
		variables: {
			token: router.query?.token as string
		}
	})
	const pk = getDBIdFromGraphqlId(data?.orderByToken?.id, 'Order')
	return (
		<MetaWrapper
			meta={{
				title: `Заказ №${pk || ''}`
			}}
		>
			<Page order={data?.orderByToken} loading={loading} />
		</MetaWrapper>
	)
}

export default View
