import React, { useEffect, useState } from "react";
import "./Widgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@mui/icons-material/Search";

function Widgets() {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=a07bb140c48c4a998ce694b35230fa8a"
        );
        const data = await response.json();
        setNewsArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search on TrustBlock" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        
      <div className="news-embed-container">
          <h2
            style={{
              backgroundImage: "linear-gradient(135deg, #ff8a00, #e52e71)",
              textAlign: "center",
            }}
          >
            Read Today's Top 5 News:
          </h2>
          <div className="news-card-container">
            {newsArticles.map((article, index) => (
              <div className="news-card" key={index}>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="twitter-embed-container">
           <TwitterTimelineEmbed
            sourceType="profile"
            screenName="timesofindia"
            options={{ height: 800 }}
          />
        </div>
        {/* <TwitterShareButton
          url={"https://twitter.com/rajpri8852"}
          options={{ text: "Trust the TrustBlock", via: "rajpri8852" }}
        /> */}
      </div>
    </div>
  );
}

export default Widgets;

// import React from "react";
// import "./Widgets.css";
// import {
//   TwitterTimelineEmbed,
//   TwitterShareButton,
//   TwitterTweetEmbed,
// } from "react-twitter-embed";
// import SearchIcon from "@mui/icons-material/Search";

// function Widgets() {
//   return (
//     <div className="widgets">
//       <div className="widgets__input">
//         <SearchIcon className="widgets__searchIcon" />
//         <input placeholder="Search on TrustBlock" type="text" />
//       </div>
//       <div className="widgets__widgetContainer">
//         <h2>What's happening</h2>
//         <div className="twitter-embed-container" style={{ backgroundColor: 'gray' }}>
//           <TwitterTimelineEmbed
//             sourceType="profile"
//             screenName="timesofindia"
//             options={{ height: 800 }}
//           />
//         </div>
//         <TwitterShareButton
//           url={"https://twitter.com/rajpri8852"}
//           options={{ text: "Trust the TrustBlock", via: "rajpri8852" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default Widgets;