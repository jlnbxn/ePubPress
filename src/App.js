import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CreateEpub from "./pages/CreateEpub";
import Layout from "./components/Layout";

const theme = createTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  palette: {
    primary: {
      light: '#ff8a45',
      main: '#ec5814',
      dark: '#b22300'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <CreateEpub />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
