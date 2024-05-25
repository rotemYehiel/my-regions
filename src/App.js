import SideBar from "./components/SideBar";
import { AppLayout } from "./App.style";
import ImageEditor from "./components/ImageEditor";
import { GlobalStyle } from "./GlobalStyle.style";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <ImageEditor />
        <SideBar />
      </AppLayout>
    </>
  );
}

export default App;
