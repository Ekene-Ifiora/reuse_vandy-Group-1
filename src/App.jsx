import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";


function App() {
  const [authUser] = useAuthState(auth);
  return (
	// <PageLayout>
	// 	    <Routes>
	// 			{/* If user is authenticated, show the home page, else navigate to the authentication page */}
	// 			<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
				
	// 			{/* If user is not authenticated, show the authentication page, else navigate to the home page */}
	// 			<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
				
	// 			{/* Route to the profile page with dynamic username parameter */}
	// 			<Route path='/:username' element={<ProfilePage />} />
	// 		</Routes>
	// </PageLayout>

// We can comment this part out because I wrapped the routes in another tag <BrowserRouter>
    <BrowserRouter>
    <Routes>
				{/* If user is authenticated, show the home page, else navigate to the authentication page */}
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
				
				{/* If user is not authenticated, show the authentication page, else navigate to the home page */}
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
				
				{/* Route to the profile page with dynamic username parameter */}
				<Route path='/:username' element={<ProfilePage />} />
			</Routes>
    </BrowserRouter>

  );
}

export default App;
