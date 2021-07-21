import LoadingButton from "@material-ui/lab/LoadingButton";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/core/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import SaveIcon from "@material-ui/icons/Save";
import Stack from "@material-ui/core/Stack";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import jEpub from "jepub/dist/jepub.js";
import { v4 as uuidv4 } from "uuid";
import JSZip from "jszip";
import { getPosts, getSiteInfo } from "../api/wordpress";
import Examples from "../components/Examples";

window.JSZip = JSZip;

function CreateEpub() {
    const [url, setUrl] = useState();
    const [includeImages, setIncludeImages] = useState(true);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [progressStatus, setProgressStatus] = useState("Create .epub");
    const [open, setOpen] = useState(false);
    const [epubError, setEpubError] = useState("");
    const [epubSuccess, setEpubSuccess] = useState("");

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        setTimeout(() => {
            setEpubError("");
            setEpubSuccess("");
        }, 3000);
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setUrl(`Analyzing ${getBaseUrl(url)}`);
        setProgressStatus("Evaluating URL");

        e.preventDefault();
        const { isWp } = await fetch("/.netlify/functions/wpCheck", {
            method: "POST",
            body: url,
        }).then((res) => res.json());

        if (!isWp) {
            setError(true);
            setHelperText("This is not a Wordpress Site.");
            setIsLoading(false);
            setProgressStatus("Create .epub");
            return;
        }

        generateEpub(url, setIncludeImages);
    };

    const getBaseUrl = (url) => {
        url = url.replace(/https:\/\//g, "").replace(/\/$/g, "");
        return url;
    };

    const generateEpub = async () => {
        const baseUrl = getBaseUrl(url);

        try {
            const cover = await fetch("https://i.imgur.com/SEQutaS.jpg").then(
                (response) => {
                    if (response.ok) return response.arrayBuffer();
                    throw "Network response was not ok.";
                }
            );

            let posts = await getPosts(baseUrl, (progress) => {
                setProgressStatus("Fetching Posts");
                setUrl(progress);
            });

            const { siteName, siteCategories, siteAuthors } = await getSiteInfo(
                baseUrl
            );

            const epub = new jEpub();
            epub.init({
                i18n: "en",
                title: siteName,
                author: siteAuthors,
                publisher: siteName,
                description: "siteInfo.description",
                tags: ["Blog"],
            });

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, "0");
            let mm = String(today.getMonth() + 1).padStart(2, "0");
            let yyyy = today.getFullYear();
            today = mm + "/" + dd + "/" + yyyy;

            epub.date(new Date(yyyy, mm, dd));

            epub.cover(cover);

            epub.uuid(uuidv4());

            if (includeImages) {
                setProgressStatus("Fetching Images");

                for (let x of posts) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(x.content.rendered, "text/html");
                    const images = doc.querySelectorAll("img");

                    for (let img of images) {
                        try {
                            setUrl(`Downloading ${img.src.split("/").pop()}`);
                            const postImage = await fetch(`/cors-proxy/${img.src}`).then(
                                (response) => {
                                    if (response.ok) return response.blob();
                                    throw "Network response was not ok.";
                                }
                            );

                            img.alt = uuidv4();
                            img.outerHTML = `<%= image['${img.alt}'] %>`;

                            epub.image(postImage, img.alt);
                        } catch (error) {
                            console.log(error);
                        }
                    }

                    let postBody = doc.querySelector("body").innerHTML;

                    postBody = postBody.replace(/&lt;/g, "<");
                    postBody = postBody.replace(/&gt;/g, ">");

                    const replace = `${x.link}/`;
                    const regex = new RegExp(replace, "g");

                    postBody = postBody.replace(regex, "");

                    let postTitle = x.title.rendered;

                    postTitle = postTitle.replace(/&#8217;/g, "'");
                    postTitle = postTitle.replace(/&#8230;/g, "…");
                    postTitle = postTitle.replace(/&#8211;/g, "–");
                    postTitle = postTitle.replace(/&#038;/g, "&");

                    epub.add(postTitle, postBody);
                }
            }

            const file = await epub.generate("blob", (metadata) => {
                setProgressStatus("Generating File");
            });

            let fileUrl = URL.createObjectURL(file);

            var link = document.createElement("a");

            link.setAttribute("download", siteName);
            link.href = fileUrl;
            document.body.appendChild(link);
            link.click();
            link.remove();

            setEpubSuccess("Success! Happy Reading!");
            setOpen(true);
        } catch (error) {
            console.log(error);
            setEpubError("Failed to Fetch");
            setOpen(true);
        }

        setProgressStatus("Create .epub");

        setUrl("");

        setIsLoading(false);
    };

    return (
        <Grid item>
            <Typography
                align="center"
                fontWeight="fontWeightBold"
                component="h1"
                variant="h2"
            >
                <span style={{ color: "#EC5814" }}>e</span>PubPress
            </Typography>
            <Typography align="center" component="h2" variant="subtitle1">
                Convert Wordpress Blogs to .epubs
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={1} direction="column" alignItems="center">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        name="url"
                        type="url"
                        required={isLoading ? false : true}
                        disabled={isLoading ? true : false}
                        fullWidth
                        autoFocus
                        value={url || ""}
                        error={error}
                        helperText={helperText}
                        id="url"
                        label={isLoading ? "Progress" : "Enter Wordpress URL"}
                        autoComplete="url"
                        sx={{ marginBottom: 0 }}
                        onChange={(e) => {
                            setError(false);
                            setHelperText("");
                            setUrl(e.target.value);
                        }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked
                                onChange={() => setIncludeImages(!includeImages)}
                                disabled={isLoading ? true : false}
                                name="includeImages"
                                color="primary"
                            />
                        }
                        label="Include Images"
                    />

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        color="primary"
                        disableElevation
                        loading={isLoading}
                        loadingPosition="start"
                    >
                        {progressStatus}
                    </LoadingButton>
                </Stack>
            </form>

            <Box mt={4}>
                <Examples setUrl={setUrl} />
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={open && epubError ? true : false}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error">
                    {epubError}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={open && epubSuccess ? true : false}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    {epubSuccess}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default CreateEpub;
