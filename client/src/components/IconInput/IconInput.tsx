import { ChangeEvent, Children, FC, ReactElement, useRef } from "react";
import { IconType } from "react-icons/lib";

import {
	container,
	input,
	inputContainer,
	inputPlaceholder,
} from "./IconInput.css";

interface IIconInputProps {
	children: ReactElement<IconType>;
	type: string;
	name: string;
	value: string;
	placeholder: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const IconInput: FC<IIconInputProps> = ({
	children,
	type,
	name,
	value,
	onChange,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	// children 개수 검사(1개만 통과)
	const childrenArray = Children.toArray(children);
	if (childrenArray.length !== 1) {
		console.warn("icon이 없습니다.");
		return null;
	}

	// 해당 컴포넌트와 input 연결
	const handleInputOnMouseUp = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<div
			className={container}
			onMouseUp={handleInputOnMouseUp}
		>
			{children}
			<div className={inputContainer}>
				<input
					className={input}
					type={type}
					name={name}
					value={value}
					ref={inputRef}
					onChange={onChange}
					placeholder=" "
				/>
				<div className={inputPlaceholder}>{name}</div>
			</div>
		</div>
	);
};

export default IconInput;
