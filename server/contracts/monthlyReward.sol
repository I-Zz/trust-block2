// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrustBlock {
    struct Post {
        address author;
        string content;
        string sourceUrl;
        uint timestamp;
    }

    mapping(uint => Post) public posts;
    
    uint public totalPosts;

    mapping(address => uint) public userPostsCount;
    mapping(address => uint) public userInformativeContent;

    uint constant REWARD_PER_POST = 0.00001 ether;
    uint constant REWARD_PER_LIKES = 0.0001 ether;

    event PostAdded(uint postId, address indexed author, string content, string sourceUrl, uint timestamp);
    event PostDeleted(uint postId, address indexed author);
    event RewardPaid(address indexed user, uint amount);

    function payRewards() external {
        for (uint i = 1; i <= totalPosts; i++) {
            address author = posts[i].author;
            uint reward = REWARD_PER_POST + REWARD_PER_LIKES * bytes(posts[i].content).length;
            // Pay the reward to the author
            payable(author).transfer(reward);
            emit RewardPaid(author, reward);
        }
    }
}
