# https://github.com/uBlockOrigin/uAssets/pull/3517
twitch-videoad.js application/javascript
const origFetch = window.fetch;
window.fetch = (url, init, ...args) => {
	if (typeof url === "string") {
		if (url.includes("/access_token")) {
			url = url.replace("player_type=site", "player_type=facebook");
		} else if (
			url.includes("/gql") &&
			init &&
			typeof init.body === "string" &&
			init.body.includes("PlaybackAccessToken")
		) {
			const newBody = JSON.parse(init.body);
			newBody.variables.playerType = "facebook";
			init.body = JSON.stringify(newBody);
		}
	}
	return origFetch(url, init, ...args);
};
