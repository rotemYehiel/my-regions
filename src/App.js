import SideBar from "./components/SideBar/SideBar";
import ImageEditor from "./components/ImageEditor/ImageEditor";
import { GlobalStyle } from "./GlobalStyle.style";
import { AppLayout } from "./App.style";

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
