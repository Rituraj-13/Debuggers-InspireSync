
const block_page = (pageName) => {
    return `
        <style>
            .block_page{
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f5f5f5;
            }
            .block_page_content{
                color: #f00 !important;
                text-align: center;
            }
        </style>
        <div class="block_page">
            <div class="block_page_content">
                <h1>Website Blocked</h1>
                <h2>${pageName} is blocked by Web Blocker</h2>
            </div>
        </div>
    `
}

if (window.location.hostname != "ajoniimcidlgepobpnciobkggcggienh") {
    chrome.storage.sync.get(["web_blocker"]).then((result) => {
        if (result.web_blocker) {
            switch (window.location.hostname) {
                case "www.youtube.com":
                    document.body.innerHTML = block_page('Youtube');
                    break;
                case "www.facebook.com":
                    document.body.innerHTML = block_page('Facebook');
                    break;
                case "www.instagram.com":
                    document.body.innerHTML = block_page('Instagram');
                    break;
                case "twitter.com":
                    document.body.innerHTML = block_page('Twitter');
                    break;
                case "www.reddit.com":
                    document.body.innerHTML = block_page('Reddit');
                    break;
                case "www.netflix.com":
                    document.body.innerHTML = block_page('Netflix');
                    break;
                case "www.amazon.com":
                    document.body.innerHTML = block_page('Amazon');
                    break;
                case "www.ebay.com":
                    document.body.innerHTML = block_page('Ebay');
                    break;

            }
        }
    });
}
