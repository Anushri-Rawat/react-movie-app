import { ContextProvider } from "./store/Context";
import SideBar from "./components/SIdeBar/SideBar";
import HomePage from "./components/HomePage/HomePage";
import DetailsPage from "./components/DetailsPage/DetailsPage";

function App() {
  return (
    <ContextProvider>
      <SideBar></SideBar>
      <HomePage />
    </ContextProvider>
  );
}

export default App;
