// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract TrustBlockContract {
    event AddPost(address recipient, uint postId);
    event DeletePost(uint postId, bool isDeleted);
    event AddSubmission(address indexed recipient, uint submissionId);

    struct Post {
        uint id;
        address username;
        string newUrl;
        string text;
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

    Post[] private postList;
    Submission[] private submissions;
     


    // Mapping of Post id to the wallet address of the user
    mapping(uint256 => address) textToOwner;

    // Method to be called by our frontend when trying to add a new Post
    function addPost(string memory text,string memory newsUrl, bool isDeleted) external {
        uint textId = postList.length;
        postList.push(Post(textId, msg.sender,newsUrl,  text, isDeleted));
        textToOwner[textId] = msg.sender;
        emit AddPost(msg.sender, textId);
    // Method to get all the postList
    }
    
    function getAllPosts() external view returns (Post[] memory) {
        Post[] memory temporary = new Post[](postList.length);
        uint counter = 0;
        for (uint i = 0; i < postList.length; i++) {
            if (postList[i].isDeleted == false) {
                temporary[counter] = postList[i];
                counter++;
            }
        }

        Post[] memory result = new Post[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to get only your Posts
    function getMyPosts() external view returns (Post[] memory) {
        Post[] memory temporary = new Post[](postList.length);
        uint counter = 0;
        for (uint i = 0; i < postList.length; i++) {
            if (textToOwner[i] == msg.sender && postList[i].isDeleted == false) {
                temporary[counter] = postList[i];
                counter++;
            }
        }

        Post[] memory result = new Post[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

    // Method to Delete a Post
    function deletePost(uint textId, bool isDeleted) external {
        if (textToOwner[textId] == msg.sender) {
            postList[textId].isDeleted = isDeleted;
            emit DeletePost(textId, isDeleted);
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
         textToOwner[submissionId] = msg.sender;
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
