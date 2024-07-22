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
