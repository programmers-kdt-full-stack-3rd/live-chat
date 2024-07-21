import { ChangeEvent, FC, FormEvent, useState } from "react";
import axios from "axios";

import { ILoginRequest, ILoginState } from "../../types/index";
import { useNavigate } from "react-router-dom";

const validateEmail = (email: string) => {
	const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regExp.test(email);
};

const LoginPage: FC = () => {
	// 회원가입 페이지로 라우팅하기 위한 navigate
	const navigate = useNavigate();

	// 이메일, 패스워드 상태
	const [loginState, setloginState] = useState<ILoginState>({
		email: "",
		password: "",
	});

	// 이메일 유효성 검사 메시지 상태
	const [emailValidationMsgState, setEmailValidationMsgState] =
		useState<string>("");

	const [error, setError] = useState<string>("");

	// 이메일, 패스워드 상태 저장 및 이메일 유효성 검사
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setloginState({
			...loginState,
			[event.target.name]: event.target.value,
		});

		if (event.target.name === "email") {
			if (!event.target.value || validateEmail(event.target.value)) {
				setEmailValidationMsgState("");
			} else {
				setEmailValidationMsgState("유효한 이메일이 아닙니다.");
			}
		}
	};

	// 로그인 버튼 클릭 시 서버에 로그인 요청 및 응답 처리
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (validateEmail(loginState.email)) {
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
			}
		} else {
			setEmailValidationMsgState("유효한 이메일이 아닙니다.");
		}
	};

	// 회원가입 페이지로 라우팅
	const handleRegisterClick = () => {
		navigate("/register");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						name="email"
						value={loginState.email}
						onChange={handleInputChange}
						required
					/>
					{emailValidationMsgState && (
						<label>{emailValidationMsgState}</label>
					)}
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={loginState.password}
						onChange={handleInputChange}
						maxLength={20}
						required
					/>
				</div>
				{error && <label>{error}</label>}
				<button type="submit">Login</button>
				<button
					type="button"
					onClick={handleRegisterClick}
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default LoginPage;
