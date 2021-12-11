import { AppRoutes } from "./routes";
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from "./styles/global";


export function App() {
    return (
        <>     
            <GlobalStyle />
            <AppRoutes />
            <ToastContainer autoClose={3000}/>
        </>
    );
}
