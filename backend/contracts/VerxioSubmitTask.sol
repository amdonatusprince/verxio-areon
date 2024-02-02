// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VerxioUserProfile.sol";

contract TaskSubmissionContract {

    address public owner;

    enum TaskStatus { Open, Ongoing, Review, Completed }

    struct Comment {
        address commenter;
        string text;
    }

    struct Task {
        string taskId;
        address jobPoster;
        string jobPosterFirstName;
        string jobPosterLastName;
        string jobPosterBio;
        string jobPosterProfileUrl;
        string jobTitle;
        string jobDescription;
        string jobResponsibilities;
        string jobRequirements;
        string jobType;
        string paymentMethod;
        uint totalPeople;
        uint amount;
        string fileDocUrl;
        TaskStatus status;
        uint upvotes;
        uint downvotes;
        uint postedTime;
    }

    mapping(string => Comment[]) private taskComments;
    mapping(string => Task) private tasks;
    string[] private taskIds;  

    event TaskSubmitted(
        string indexed taskId,
        address indexed jobPoster,
        string indexed jobTitle
    );

    event Upvoted(string indexed taskId, address indexed voter);
    event Downvoted(string indexed taskId, address indexed voter);
    event Commented(string indexed taskId, address indexed commenter, string commentText);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    VerxioUserProfile public userProfileContract;

    constructor(address _userProfileContract) {
        owner = msg.sender;
        userProfileContract = VerxioUserProfile(_userProfileContract);
    }

    function submitTask(
        string memory _taskId,
        string memory _jobTitle,
        string memory _jobDescription,
        string memory _fileDocUrl,
        uint _totalPeople,
        uint _amount,
        string memory _jobType,
        string memory _paymentMethod,
        string memory _jobResponsibilities,
        string memory _jobRequirements
    ) public {
        // Get job poster's profile information
        VerxioUserProfile.Profile memory jobPosterProfile = userProfileContract.getProfile(msg.sender);

        // Create a new task with job poster's profile information
        Task memory newTask = Task({
            taskId: _taskId,
            jobPoster: msg.sender,
            jobPosterFirstName: jobPosterProfile.firstName,
            jobPosterLastName: jobPosterProfile.lastName,
            jobPosterBio: jobPosterProfile.bio,
            jobPosterProfileUrl: jobPosterProfile.profilePictureUrl,
            jobTitle: _jobTitle,
            jobDescription: _jobDescription,
            jobResponsibilities: _jobResponsibilities,
            jobRequirements: _jobRequirements,
            jobType: _jobType,
            paymentMethod: _paymentMethod,
            totalPeople: _totalPeople,
            amount: _amount,
            fileDocUrl: _fileDocUrl,
            status: TaskStatus.Open,
            upvotes: 0,
            downvotes: 0,
            postedTime: block.timestamp
        });

        tasks[_taskId] = newTask;
        taskIds.push(_taskId);

        emit TaskSubmitted(_taskId, msg.sender, newTask.jobTitle);
    }

    function upvoteTask(string memory _taskId) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Task is not open for voting");

        task.upvotes++;
        emit Upvoted(_taskId, msg.sender);
    }

    function downvoteTask(string memory _taskId) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Task is not open for voting");

        task.downvotes++;
        emit Downvoted(_taskId, msg.sender);
    }

    function getTask(string memory _taskId) public view returns (Task memory) {
        return tasks[_taskId];
    }
    
    function commentOnTask(string memory _taskId, string memory _commentText) public {
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Task is not open for commenting");

        Comment memory newComment = Comment({
            commenter: msg.sender,
            text: _commentText
        });

        taskComments[_taskId].push(newComment);
        emit Commented(_taskId, msg.sender, _commentText);
    }

    function getTaskComments(string memory _taskId) public view returns (Comment[] memory) {
        return taskComments[_taskId];
    }

    function getAllTasks() public view returns (Task[] memory) {
        Task[] memory allTasks = new Task[](taskIds.length);

        for (uint i = 0; i < taskIds.length; i++) {
            Task storage task = tasks[taskIds[i]];
            allTasks[i] = task;
        }

        return allTasks;
    }
}
