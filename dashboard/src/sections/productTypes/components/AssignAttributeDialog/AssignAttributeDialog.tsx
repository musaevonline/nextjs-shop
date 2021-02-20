import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@temp/components/Checkbox'
import ConfirmButton, {
	ConfirmButtonTransitionState
} from '@temp/components/ConfirmButton'
import ResponsiveTable from '@temp/components/ResponsiveTable'
import useElementScroll, {
	isScrolledToBottom
} from '@temp/hooks/useElementScroll'
import useModalDialogErrors from '@temp/hooks/useModalDialogErrors'
import useModalDialogOpen from '@temp/hooks/useModalDialogOpen'
import useSearchQuery from '@temp/hooks/useSearchQuery'
import { buttonMessages } from '@temp/intl'
import { maybe, renderCollection } from '@temp/misc'
import { FetchMoreProps } from '@temp/types'
import classNames from 'classnames'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { FormattedMessage, useIntl } from 'react-intl'

import { SearchAttributes_productType_availableAttributes_edges_node } from '../../hooks/useAvailableAttributeSearch/types/SearchAttributes'

const useStyles = makeStyles(
	(theme) => ({
		actions: {
			boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
		},
		checkboxCell: {
			paddingLeft: 0
		},
		dropShadow: {
			boxShadow: `0px -5px 10px 0px ${theme.palette.divider}`
		},
		loadMoreLoaderContainer: {
			alignItems: 'center',
			display: 'flex',
			height: theme.spacing(3),
			justifyContent: 'center'
		},
		scrollArea: {
			overflowY: 'scroll',
			padding: '24px 0'
		},
		wideCell: {
			width: '100%'
		}
	}),
	{ name: 'AssignAttributeDialog' }
)

export interface AssignAttributeDialogProps extends FetchMoreProps {
	confirmButtonState: ConfirmButtonTransitionState
	errors: string[]
	open: boolean
	attributes: SearchAttributes_productType_availableAttributes_edges_node[]
	selected: string[]
	onClose: () => void
	onFetch: (query: string) => void
	onOpen: () => void
	onSubmit: () => void
	onToggle: (id: string) => void
}

const AssignAttributeDialog: React.FC<AssignAttributeDialogProps> = ({
	attributes,
	confirmButtonState,
	errors: apiErrors,
	hasMore,
	loading,
	open,
	selected,
	onClose,
	onFetch,
	onFetchMore,
	onOpen,
	onSubmit,
	onToggle
}: AssignAttributeDialogProps) => {
	const intl = useIntl()
	const classes = useStyles({})
	const [query, onQueryChange, resetQuery] = useSearchQuery(onFetch)
	const errors = useModalDialogErrors(apiErrors, open)
	const anchor = React.useRef(null)
	const position = useElementScroll(anchor)

	useModalDialogOpen(open, {
		onClose: resetQuery,
		onOpen
	})

	return (
		<Dialog onClose={onClose} open={open} fullWidth maxWidth='sm'>
			<DialogTitle>
				<FormattedMessage
					id='assign_attribute'
					defaultMessage='Assign Attribute'
					description='dialog header'
				/>
			</DialogTitle>
			<DialogContent className='min-h-100' dividers>
				<TextField
					name='query'
					value={query}
					onChange={onQueryChange}
					label={intl.formatMessage({
						id: 'search_attributes',
						defaultMessage: 'Search Attributes'
					})}
					placeholder={intl.formatMessage({
						id: 'search_by_attribute_name',
						defaultMessage: 'Search by attribute name'
					})}
					fullWidth
					InputProps={{
						autoComplete: 'off',
						endAdornment: loading && <CircularProgress size={16} />
					}}
				/>
			</DialogContent>
			<DialogContent className={classes.scrollArea} ref={anchor}>
				<InfiniteScroll
					pageStart={0}
					loadMore={onFetchMore}
					hasMore={hasMore}
					useWindow={false}
					loader={
						<div className={classes.loadMoreLoaderContainer}>
							<CircularProgress size={16} />
						</div>
					}
					threshold={100}
					key='infinite-scroll'
				>
					<ResponsiveTable key='table'>
						<TableBody>
							{renderCollection(
								attributes,
								(attribute) => {
									if (!attribute) {
										return null
									}
									const isChecked = !!selected.find(
										(selectedAttribute) => selectedAttribute === attribute.id
									)

									return (
										<TableRow key={maybe(() => attribute.id)}>
											<TableCell
												padding='checkbox'
												className={classes.checkboxCell}
											>
												<Checkbox
													checked={isChecked}
													onChange={() => onToggle(attribute.id)}
												/>
											</TableCell>
											<TableCell className={classes.wideCell}>
												{attribute.name}
												<Typography variant='caption' component='div'>
													{attribute.slug}
												</Typography>
											</TableCell>
										</TableRow>
									)
								},
								() =>
									!loading && (
										<TableRow>
											<TableCell colSpan={2}>
												<FormattedMessage
													id='no_results_found'
													defaultMessage='No results found'
												/>
											</TableCell>
										</TableRow>
									)
							)}
						</TableBody>
					</ResponsiveTable>
				</InfiniteScroll>
			</DialogContent>
			{errors.length > 0 && (
				<DialogContent>
					{errors.map((error, errorIndex) => (
						<DialogContentText color='error' key={errorIndex}>
							{error}
						</DialogContentText>
					))}
				</DialogContent>
			)}
			<DialogActions
				className={classNames(classes.actions, {
					[classes.dropShadow]: !isScrolledToBottom(anchor, position)
				})}
			>
				<Button onClick={onClose}>
					<FormattedMessage {...buttonMessages.back} />
				</Button>
				<ConfirmButton
					transitionState={confirmButtonState}
					color='primary'
					variant='contained'
					type='submit'
					onClick={onSubmit}
				>
					<FormattedMessage
						id='assign_attributes'
						defaultMessage='Assign attributes'
						description='button'
					/>
				</ConfirmButton>
			</DialogActions>
		</Dialog>
	)
}
AssignAttributeDialog.displayName = 'AssignAttributeDialog'
export default AssignAttributeDialog
