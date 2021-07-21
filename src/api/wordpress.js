export const getPosts = async (value, onUpdate) => {
    let posts = [];
    let api;

    if (value.includes(`wordpress.com`)) {
        api = `https://public-api.wordpress.com/wp/v2/sites/${value}/pages`;
    } else {
        api = `https://${value}/wp-json/wp/v2/posts`;
    }

    let response = await fetch(api);

    const total = response.headers.get("X-WP-Total") || "";

    let i = 1;

    while (response.status === 200) {
        response = await fetch(`${api}?page=${i}`);
        onUpdate(`Downloading Page ${i}${total ? " of " + total : ""}`);

        if (response.status === 200) {
            posts = posts.concat(await response.json());
            i++;
        } else {
            posts = posts;
        }
    }

    return posts;
};

export const getSiteInfo = async (value) => {
    let siteName;
    let siteCategories;
    let siteAuthors;
    try {
        if (value.includes(`wordpress.com`)) {
            siteName = await fetch(
                `https://public-api.wordpress.com/rest/v1.1/sites/${value}`
            )
                .then((res) => res.json())
                .then((res) => res.name);
            siteCategories = await fetch(
                `https://public-api.wordpress.com/rest/v1.1/sites/${value}/categories`
            )
                .then((res) => res.json())
                .then((res) => res.map((category) => category.name).join(", "))
                .catch((error) => "");
            siteAuthors = await fetch(
                `https://public-api.wordpress.com/rest/v1.1/sites/${value}/users`
            )
                .then((res) => res.json())
                .then((res) => res.map((user) => user.name).join(", "))
                .catch((error) => "");
        } else {
            siteName = await fetch(`https://${value}/wp-json`)
                .then((res) => res.json())
                .then((res) => res.name);
            siteCategories = await fetch(`https://${value}/wp-json/wp/v2/categories`)
                .then((res) => res.json())
                .then((res) => res.map((category) => category.name).join(", "));
            siteAuthors = await fetch(`https://${value}/wp-json/wp/v2/users`)
                .then((res) => {
                    if (!res.ok) {
                        throw "401 Not Authorized";
                    }
                    res.json();
                })
                .then((res) => res.map((user) => user.name).join(", "));
        }

        return { siteName, siteCategories, siteAuthors };
    } catch {
        siteAuthors = siteName;
        return { siteName, siteCategories, siteAuthors };
    }
};
