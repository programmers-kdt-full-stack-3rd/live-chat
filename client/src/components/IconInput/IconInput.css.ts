import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../../App.css";

export const container = style({
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

globalStyle(`${container} > :first-child`, {
	color: vars.color.mainDarker,
	marginLeft: vars.spacing.medium,
});

export const inputContainer = style({
	width: "100%",
	position: "relative",
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
