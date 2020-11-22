// import * as C from "./constants";
import { createMuiTheme } from "@material-ui/core";
import {red, orange, grey} from "@material-ui/core/colors";

export const defaultTheme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			light: "#444",
			main: "#222",
			dark: "#000"
		},
		secondary: grey,
		background: {
			paper: '#FFFFFF',
			default: '#F7F7F7'
		},
		error: red
	},
	typography:{
		htmlFontSize: 10,
		h1:{
			fontSize: "3.6rem",
			fontWeight: "inherit"
		},
		h2:{
			fontSize: "2.8rem",
			fontWeight: "inherit"
		},
		h3:{
			fontSize: "2.2rem",
			fontWeight: "inherit"
		},
		h4:{
			fontSize: "2rem",
			fontWeight: "inherit"
		},
		h5:{
			fontSize: "1.8rem",
			fontWeight: "inherit"
		},
		h6:{
			fontSize: "1.6rem",
			fontWeight: "inherit"
		},
		body1: {
			fontSize: '1.4rem'
		},
		body2: {
			fontSize: '1.6rem'
		},
		fontFamily: [
			'system-ui',
			'-apple-system',
			'BlinkMacSystemFont',
			'Muli',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'"Noto Sans"',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
			'"Noto Color Emoji"',
		].join(', ')
	},
	// shape:{
	// 	borderRadius: 0
	// },
	// props:{
	// 	MuiTableCell:{
	// 		padding: 'checkbox'
	// 	}
	// },
	// typography:{
	// 	fontSize: 12
	// },

	/* Buttons */
	overrides: {
		MuiIconButton:{
			sizeSmall:{
				padding: 0,
				fontSize: 18,
				"& svg":{
					fontSize: '2rem'
				}
			},
			root:{
				padding: 8,
				'&:hover svg':{
					fill: orange[800]
				},
				'&:hover': {
					backgroundColor: 'transparent'
				}
			}
		},
		MuiButton: {
			root: {
				borderRadius: 0
			},
			containedSizeLarge: {
				padding: '12px 22px'
			}
		},

		/* Icons */
		// MuiSvgIcon:{
		// 	root:{
		// 		'&:hover':{
		// 			fill: orange[800]
		// 		}
		// 	}
		// },

		/* Form Components */
		MuiOutlinedInput:{
			root:{
				borderRadius: 2
			},
			inputMarginDense:{
				paddingTop: '1.4rem',
				paddingBottom: '1.4rem'
			}
		},
		MuiInputBase:{
			root:{
				fontSize: '1.4rem',
				fontWeight: 500
			}
		},
		MuiInputLabel:{
			outlined:{
				'&$marginDense':{
					transform: "translate(14px, 16px) scale(1)"
				}
			},
			shrink: {
				transform: "translate(14px, -6px) scale(0.75)"
			}
		},
		MuiFormLabel:{
			root:{
				fontSize: '1.4rem'
			}
		},
		MuiTableCell:{
			root: {
				fontSize: "1.4rem"
			}
		},
		MuiDrawer: {
			root: {
				maxWidth: "calc(100% - 20px)"
			}
		},
		MuiTreeItem: {
			label: {
				paddingLeft: 15
			}
		},
		MuiFormControlLabel: {
			root: {
				paddingRight: 16,
				marginRight: 0
			}
		}
	}
} as any);

// export type DefaultTheme = typeof defaultTheme;
// export const styled = baseStyled as ThemedStyledInterface<DefaultTheme>;