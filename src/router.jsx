import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import C404 from './pages/404';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <MenuLayout></MenuLayout>,
				children: [
					{
						path: '',
						element: <Main />
					},
					{
						path: 'search',
						element: <Search />
					},
					{
						path: 'signin',
						element: <GoogleSignIn />
					},
					{
						path: 'detail/:id',
						element: <SubsidyDetail />
					},
					{
						path: 'mypage',
						element: <Mypage />
					}
				]
			}
		],
		errorElement: <C404 />
	}
]);

export default router;
