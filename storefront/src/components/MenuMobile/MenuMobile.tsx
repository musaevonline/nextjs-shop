import './scss/MenuMobile.scss'

import React from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import { SwipeableDrawer } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { TreeView } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import TreeItem from '@material-ui/lab/TreeItem'
import {
	Categories_categories,
	Categories_categories_edges
} from '@sdk/queries/types/Categories'
import Link from 'next/link'
import { baseUrl, getCategoryUrl } from '@temp/app/routes'
import Logo from 'images/logo.svg'
import { ReactSVG } from 'react-svg'

const useStyles = makeStyles((theme) => ({
	root: {
		// height: 264,
		flexGrow: 1,
		maxWidth: 400
	},
	item: {
		padding: '10px 0',
		'&:not(:last-of-type)': {
			borderBottom: '1px solid #e6e6e6'
		}
	},
	logo: {
		'& svg': {
			height: 50,
			fill: theme.palette.secondary.main
		}
	}
}))

interface MenuProps {
	categories: Categories_categories | null
}

const MenuMobile: React.FC<MenuProps> = ({ categories }) => {
	const classes = useStyles()
	const [state, setState] = React.useState(false)

	const toggleDrawer = (open: boolean) => (
		event: React.KeyboardEvent | React.MouseEvent
	) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return
		}
		setState(open)
	}

	const renderTree = (edges: Categories_categories_edges[]) =>
		edges.map((edge) => (
			<TreeItem
				key={edge.node.id}
				nodeId={edge.node.id}
				label={
					<Link href={getCategoryUrl(edge.node.slug, edge.node.id)}>
						<a onClick={toggleDrawer(false)}>{edge.node.name}</a>
					</Link>
				}
				className={classes.item}
			>
				{!!edge.node.children
					? renderTree(
							edge.node.children?.edges as Categories_categories_edges[]
					  )
					: null}
			</TreeItem>
		))

	return (
		<div className='menu-mobile'>
			<IconButton onClick={toggleDrawer(true)}>
				<MenuIcon />
			</IconButton>
			<SwipeableDrawer
				anchor={'left'}
				open={state}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
				PaperProps={{
					className: 'w-350 max-w-full'
				}}
			>
				<div className='menu-mobile__body'>
					<div className='z-10 sticky top-0 bg-white text-center'>
						<Link href={baseUrl}>
							<a className={classes.logo}>
								<ReactSVG
									src={Logo}
									title='??????????????????'
									className='max-w-150 m-auto'
								/>
							</a>
						</Link>
					</div>
					{categories && (
						<TreeView
							className={classes.root}
							defaultCollapseIcon={<RemoveIcon />}
							defaultExpandIcon={<AddIcon />}
						>
							{renderTree(categories.edges)}
						</TreeView>
					)}
				</div>
			</SwipeableDrawer>
		</div>
	)
}

export default MenuMobile
