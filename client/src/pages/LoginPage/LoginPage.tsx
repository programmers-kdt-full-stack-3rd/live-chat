import axios from "axios";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { GrChat } from "react-icons/gr";
import { FiLock, FiUser } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
	buttonContainer,
	buttonWrapper,
	errorContainer,
	errorLabel,
	loginButton,
	loginMainIcon,
	mainContainer,
	mainFormContainer,
	mainIconContainer,
	mainWrapper,
	registerButton,
	spinner,
} from "./LoginPage.css";
import { ILoginRequest, ILoginState } from "../../types/index";
import IconInput from "../../components/IconInput/IconInput";

const validateEmail = (email: string) => {
	const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regExp.test(email);
};

const LoginPage: FC = () => {
	// navigate
	const navigate = useNavigate();

	// 상태
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [loginState, setloginState] = useState<ILoginState>({
		email: "",
		password: "",
	});
	const [error, setError] = useState<string>("");

	// input
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setloginState({
			...loginState,
			[event.target.name]: event.target.value,
		});

		if (event.target.name === "email") {
			if (!event.target.value || validateEmail(event.target.value)) {
				setError("");
			} else {
				setError("유효한 이메일이 아닙니다.");
			}
		}
	};

	// 로그인 버튼 클릭 시 서버에 로그인 요청 및 응답 처리
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (validateEmail(loginState.email)) {
			// 로딩
			setIsLoading(true);
			try {
				// POST /api/users/login
				await axios.post<ILoginRequest>(
					`${process.env.API_URL}/api/users/login`,
					{
						email: loginState.email,
						password: loginState.password,
					}
				);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					if (error.response) {
						// 응답을 받았을 경우

						const { data, status } = error.response;

						if (status === 303) {
							// 성공적인 로그인 & 메인 페이지로 리다이렉트
							navigate("/chat");
						} else {
							// 실패
							setError(data.message);
						}
					} else if (error.request) {
						// 응답을 못받았을 경우

						navigate("/not-found");
					} else {
						// 요청이 아닌 다른 문제로 발생한 오류
						console.error(error.message);
					}
				} else {
					// 클라 오류
					console.error(error);
				}
			} finally {
				setIsLoading(false);
			}
		} else {
			setError("유효한 이메일이 아닙니다.");
		}
	};

	// 회원가입 페이지로 라우팅
	const handleRegisterClick = () => {
		navigate("/register");
	};

	return (
		<div className={mainWrapper}>
			<div className={mainContainer}>
				<div className={mainIconContainer}>
					<GrChat className={loginMainIcon} />
				</div>
				<form
					className={mainFormContainer}
					onSubmit={handleSubmit}
				>
					<IconInput
						type="text"
						name="email"
						value={loginState.email}
						placeholder="email"
						onChange={handleInputChange}
					>
						<FiUser />
					</IconInput>
					<IconInput
						type="password"
						name="password"
						value={loginState.password}
						placeholder="password"
						onChange={handleInputChange}
					>
						<FiLock />
					</IconInput>
					<div className={errorContainer}>
						<label className={errorLabel}>{error}</label>
					</div>
					<div className={buttonWrapper}>
						{isLoading ? (
							<FaSpinner className={spinner} />
						) : (
							<div className={buttonContainer}>
								<button
									className={loginButton}
									type="submit"
								>
									Login
								</button>
								<button
									className={registerButton}
									type="button"
									onClick={handleRegisterClick}
								>
									Register
								</button>
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
