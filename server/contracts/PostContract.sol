// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract TwitterContract {
    event AddTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);
    event AddSubmission(address indexed recipient, uint submissionId);

    struct Tweet {
        uint id;
        address username;
        string newUrl;
        string tweetText;
        bool isDeleted;
    }

    struct Submission {
        uint id;
        address sender;
        string name;
        string email;
        string workField;
        string qualifications;
        string recentWork;
        string experience;
        string proofs;
    }

    Tweet[] private tweets;
    Submission[] private submissions;

    // Mapping of Tweet id to the wallet address of the user
    mapping(uint256 => address) tweetToOwner;

    // Method to be called by our frontend when trying to add a new Tweet
    function addTweet(string memory tweetText,string memory newsUrl, bool isDeleted) external {
        uint tweetId = tweets.length;
        tweets.push(Tweet(tweetId, msg.sender,newsUrl,  tweetText, isDeleted));
        tweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }

    // Method to get all the Tweets
    function getAllTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for (uint i = 0; i < tweets.length; i++) {
            if (tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to get only your Tweets
    function getMyTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for (uint i = 0; i < tweets.length; i++) {
            if (tweetToOwner[i] == msg.sender && tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to Delete a Tweet
    function deleteTweet(uint tweetId, bool isDeleted) external {
        if (tweetToOwner[tweetId] == msg.sender) {
            tweets[tweetId].isDeleted = isDeleted;
            emit DeleteTweet(tweetId, isDeleted);
        }
    }

    // Method to submit a new entry
    function submit(
        string memory _name,
        string memory _email,
        string memory _workField,
        string memory _qualifications,
        string memory _recentWork,
        string memory _experience,
        string memory _proofs
    ) external {
        uint submissionId = submissions.length;
        submissions.push(Submission(submissionId, msg.sender, _name, _email, _workField, _qualifications, _recentWork, _experience, _proofs));
         tweetToOwner[submissionId] = msg.sender;
        emit AddSubmission(msg.sender, submissionId);
    }

    function getSubmissions() external view returns (Submission[] memory) {
        Submission[] memory temporary = new Submission[](submissions.length);
        uint counter = 0;
        for (uint i = 0; i < submissions.length; i++) {
            temporary[counter] = submissions[i];
            counter++;
        }

        Submission[] memory result = new Submission[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }
}
