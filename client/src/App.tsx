import { Route, Routes } from "react-router-dom";
import { appContainer } from "./App.css.ts";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";

function App() {
	return (
		<div className={appContainer}>
			<Routes>
				<Route
					index
					element={<LoginPage />}
				/>
				<Route
					path="register"
					element={<RegisterPage />}
				/>
				<Route
					path="chat"
					element={<ChatPage />}
				/>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>
		</div>
	);
}

export default App;
