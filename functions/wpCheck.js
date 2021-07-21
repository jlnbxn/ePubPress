var fetch = require("node-fetch");

exports.handler = async (event, context) => {
    let isWp;

    const wpCheck = await fetch(event.body).then((res) => res.text());

    if (wpCheck.includes("/wp-")) {
        isWp = true;
    } else {
        isWp = false;
    }

    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                isWp: isWp,
            }),
        };
    } catch (error) {
        console.log(error);

        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
