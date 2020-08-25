// import * as C from "./constants";
import { createMuiTheme } from "@material-ui/core";
import {red, orange, grey} from "@material-ui/core/colors";

export const defaultTheme = createMuiTheme({
	palette: {
		type: 'light',
		primary: {
			light: orange[400],
			main: orange[800],
			dark: orange[900]
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
			fontWeight: "inherit"
		},
		h2:{
			fontWeight: "inherit"
		},
		h3:{
			fontWeight: "inherit"
		},
		h4:{
			fontWeight: "inherit"
		},
		h5:{
			fontWeight: "inherit"
		},
		h6:{
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
			}
		},
		MuiFormLabel:{
			root:{
				fontSize: '1.4rem'
			}
		}
	}
});

// export type DefaultTheme = typeof defaultTheme;
// export const styled = baseStyled as ThemedStyledInterface<DefaultTheme>;