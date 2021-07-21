import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

function Layout({ children }) {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
            >
                {children}
            </Grid>
        </Container>
    );
}

export default Layout;
