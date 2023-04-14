async function fetchRSSFeed(url) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  return xml;
}

function generateHTML(feed) {
  const container = document.getElementById("rss-feed-container");

  const title = feed.querySelector("channel > title").textContent;
  const description = feed.querySelector("channel > description").textContent;

  const h1 = document.createElement("h1");
  h1.textContent = title;
  container.appendChild(h1);

  const p = document.createElement("p");
  p.textContent = description;
  container.appendChild(p);

  const hr = document.createElement("hr");
  container.appendChild(hr);

  const ul = document.createElement("ul");
  container.appendChild(ul);

  const items = feed.querySelectorAll("channel > item");
  items.forEach((item) => {
    const li = document.createElement("li");

    const link = item.querySelector("link").textContent;
    const title = item.querySelector("title").textContent;
    const pubDate = item.querySelector("pubDate").textContent;
    const summary = item.querySelector("description").textContent;

    const a = document.createElement("a");
    a.href = link;
    a.textContent = title;
    li.appendChild(a);

    const pubDateParagraph = document.createElement("p");
    pubDateParagraph.textContent = pubDate;
    li.appendChild(pubDateParagraph);

    const summaryParagraph = document.createElement("p");
    summaryParagraph.textContent = summary;
    li.appendChild(summaryParagraph);

    ul.appendChild(li);
  });
}

(async () => {
  const rssFeedUrl = "http://rss.cnn.com/rss/edition.rss";
  const feed = await fetchRSSFeed(rssFeedUrl);
  generateHTML(feed);
})();
