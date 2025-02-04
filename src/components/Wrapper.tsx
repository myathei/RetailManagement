import DefaultLayout from "@/layouts/DefaultLayout";
// import HomeView from "@/modules/home/HomeView";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginView from "@/modules/auth/login/LoginView";
import NotFoundView from "@/modules/not-found/NotFoundView";
import AuthLayout from "@/layouts/AuthLayout";
import ProductView from "@/modules/product-list/ProductView";
import SaleReportView from "@/modules/sale-report/sale-report/SaleReportView";
import SummaryView from "@/modules/sale-report/summary-report/SummaryView";
import CartView from "@/modules/cart-list/CartView";
import { store } from "@/store";
import { Provider } from "react-redux";
import Loader from "@/components/Loader.tsx";
import { Toaster } from "./ui/toaster";

const router = createBrowserRouter([
	{
		path: "",
		element: <DefaultLayout />,
		children: [
			{
				path: "/",
				element: <ProductView />,
			},
			{
				path: "/Manager/sale-report",
				element: <SaleReportView />,
			},
			{
				path: "/Manager/summary-report",
				element: <SummaryView />,
			},
			{
				path: "/cart",
				element: <CartView />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "",
				element: <Navigate to="login" replace />,
			},
			{
				path: "login",
				element: <LoginView />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundView />,
	},
]);

const Wrapper = () => {
	const queryClient = new QueryClient();

	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Loader />
					<Toaster />
					<RouterProvider router={router}></RouterProvider>
				</QueryClientProvider>
			</Provider>
		</>
	);
};

export default Wrapper;
