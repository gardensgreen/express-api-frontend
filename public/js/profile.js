document.addEventListener("DOMContentLoaded", async () => {
    let userId = localStorage.getItem("TWITTER_LITE_CURRENT_USER_ID");

    try {
        console.log(userId);
        let res = await fetch(`http://localhost:8080/users/${userId}/tweets`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "TWITTER_LITE_ACCESS_TOKEN"
                )}`,
            },
        });

        if (res.status === 401) {
            window.location.href = "/log-in";
            return;
        }

        if (!res.ok) {
            throw res;
        }

        const parsedResponse = await res.json();
        const { tweets } = parsedResponse;

        let tweetsContainer = document.querySelector(".tweets-container");
        const tweetsHtml = tweets.map(
            ({ message, id }) => `
            <div class="card" id="tweet-${id}">
              <div class="card-body">
                <p class="card-text">${message}</p>
              </div>
            </div>
          `
        );

        tweetsContainer.innerHTML = tweetsHtml.join("");
    } catch (err) {
        console.error(err);
    }
});
