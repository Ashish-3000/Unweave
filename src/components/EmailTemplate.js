import React from "react";

function EmailTemplate({ news }) {
  const WEBSITE = process.env.WEBSITE;
  return (
    <div>
      <h1>Top News</h1>
      {news.map((news) => {
        return (
          <div>
            <a
              href={WEBSITE + "/blog/" + news.title + "/" + news._id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h3>{news.title}</h3>
            </a>
            <hr />
          </div>
        );
      })}
      <a href="https://unweave-henna.vercel.app/latest">
        Check the latest updates
      </a>
      <a></a>
    </div>
  );
}

export default EmailTemplate;
