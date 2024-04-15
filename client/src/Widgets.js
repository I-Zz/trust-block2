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
  const [selectedUser, setSelectedUser] = useState("timesofindia"); // Default user

  // List of Twitter users to display in the dropdown
  const twitterUsers = [
    { username: "timesofindia", displayName: "Times of India" },
    { username: "BBCWorld", displayName: "BBC World News" },
    { username: "CNN", displayName: "CNN" },
    { username: "nytimes", displayName: "The New York Times" },
    { username: "guardian", displayName: "The Guardian" },
  ];

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

  // Function to handle user selection from the dropdown
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search on TrustBlock" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <div className="news-embed-container">
          <h2>Read Today's Top News</h2>
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
          <select value={selectedUser} onChange={handleUserChange}>
            {twitterUsers.map((user) => (
              <option
                key={user.username}
                value={user.username}
                style={{ color: "black" }}
              >
                Top Tweets from {user.displayName}
              </option>
            ))}
          </select>

          <TwitterTimelineEmbed
            key={selectedUser}
            sourceType="profile"
            screenName={selectedUser}
            options={{ height: 800 }}
            style={{ margin: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
