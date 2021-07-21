import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Stack from "@material-ui/core/Stack";

function Examples({ setUrl }) {
    const exampleSites = [
        {
            name: "bodyrecomposition.com",
            url: "https://bodyrecomposition.com/",
        },
        {
            name: "brainpickings.org",
            url: "https://www.brainpickings.org/",
        },
        {
            name: "waitbutwhy.com",
            url: "https://waitbutwhy.com/",
        },
    ];

    return (
        <Grid item>
            <Typography align="center" component="h2" variant="subtitle1">
                ...or check out some examples:
            </Typography>

            <Stack align="center">
                {exampleSites.map((site, index) => (
                    <Link href="#" key={index} onClick={() => setUrl(site.url)}>
                        {site.name}
                    </Link>
                ))}
            </Stack>
        </Grid>
    );
}

export default Examples;
