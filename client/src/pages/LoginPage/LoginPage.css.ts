import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "../../App.css";

const spin = keyframes({
	"0%": { transform: "rotate(0deg)" },
	"100%": { transform: "rotate(360deg)" },
});

export const mainWrapper = style({
	width: "100vw",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: vars.color.main,
	font: vars.font.body,
});

export const mainContainer = style({
	minHeight: 450,
	display: "flex",
	flexDirection: "column",
});

export const mainIconContainer = style({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	marginBottom: vars.spacing.big1,
});

export const loginMainIcon = style({
	width: 120,
	height: 120,
	color: vars.color.icon,
});

export const mainFormContainer = style({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	marginTop: vars.spacing.big1,
	padding: vars.spacing.big1,
	backgroundColor: vars.color.form,
	borderRadius: 10,
	boxShadow: vars.shadow.basic,
});

export const inputWrapper = style({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	border: "2px solid",
	borderRadius: 4,
	borderColor: vars.color.mainDarker,
	marginTop: vars.spacing.big1,
	marginBottom: vars.spacing.big1,
	fontSize: vars.fontSizing.T2,
	boxShadow: vars.shadow.basic,
	cursor: "text",
});

export const inputIcon = style({
	color: vars.color.mainDarker,
	marginLeft: vars.spacing.medium,
});

export const inputContainer = style({
	width: "100%",
	position: "relative",
});

export const input = style({
	display: "block",
	width: "100%",
	height: "100%",
	padding: vars.spacing.medium,
	border: "none",
	outline: "none",
	fontSize: vars.fontSizing.T3,
	color: vars.color.mainDarker,
	selectors: {
		[`&:-webkit-autofill`]: {
			boxShadow: `0 0 0 1000px white inset`,
			WebkitTextFillColor: vars.color.mainDarker,
			fontSize: vars.fontSizing.T3,
			padding: vars.spacing.medium,
			color: vars.color.mainDarker,
			border: "none",
			borderRadius: "4px",
		},
		// [`&:-moz-autofill`]: {
		// 	boxShadow: `0 0 0 1000px white inset`,
		// 	fontSize: vars.fontSizing.T3,
		// 	padding: vars.spacing.medium,
		// 	border: "none",
		// 	borderRadius: "4px",
		// },
	},
});

export const inputPlaceholder = style({
	display: "flex",
	alignItems: "center",
	width: "100%",
	height: "100%",
	padding: vars.spacing.medium,
	fontSize: vars.fontSizing.T3,
	color: vars.color.mainDarker,
	transition:
		"transform .15s cubic-bezier(.4,0,.2,1), opacity .15s cubic-bezier(.4,0,.2,1)",
	transformOrigin: "top left",
	pointerEvents: "none",
	position: "absolute",
	top: 0,
	left: 0,
	zIndex: 1,
	opacity: 0.7,
	selectors: {
		[`${inputContainer}:focus-within &`]: {
			transform: "translateX(-40px) translateY(-40px)",
			opacity: 1,
		},
		[`${inputContainer} input:not(:placeholder-shown) ~ &`]: {
			transform: "translateX(-40px) translateY(-40px)",
			opacity: 1,
		},
	},
});

export const errorContainer = style({
	height: 0,
	marginBottom: vars.spacing.big1,
});

export const errorLabel = style({
	fontSize: vars.fontSizing.T4,
	color: vars.color.errorText,
});

export const buttonWrapper = style({
	width: "100%",
	height: 41,
	display: "flex",
	justifyContent: "center",
	marginTop: vars.spacing.big1,
});

export const buttonContainer = style({
	width: "100%",
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-between",
});

export const loginButton = style({
	width: 120,
	padding: vars.spacing.medium,
	fontSize: vars.fontSizing.T3,
	color: vars.color.brightText,
	backgroundColor: vars.color.mainDarker,
	border: "none",
	borderRadius: 6,
	cursor: "pointer",
	":hover": {
		backgroundColor: vars.color.mainFaded,
	},
});

export const registerButton = style({
	width: 120,
	padding: vars.spacing.medium,
	fontSize: vars.fontSizing.T3,
	color: vars.color.brightText,
	backgroundColor: vars.color.mainDarker,
	border: "none",
	borderRadius: 6,
	cursor: "pointer",
	":hover": {
		backgroundColor: vars.color.mainFaded,
	},
});

export const spinner = style({
	width: 40,
	height: 40,
	color: vars.color.main,
	animation: `${spin} 1s linear infinite`,
});
