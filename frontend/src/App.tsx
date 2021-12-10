import { Header } from "./components/Header";
import { ListQualificationLevel } from "./pages/ListQualificationLevel";
import { GlobalStyle } from "./styles/global";

export function App() {
    return (
        <>
            <GlobalStyle />
            <Header />
            <ListQualificationLevel />
        </>
    );
}
