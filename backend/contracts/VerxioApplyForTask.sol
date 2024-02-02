// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VerxioSubmitTask.sol";

contract TaskProposalSubmissionContract {
    TaskSubmissionContract private taskSubmissionContract;

    event TaskAssigned(string indexed taskId, address indexed jobPoster, address indexed assignee);

    constructor(address _taskSubmissionContractAddress) {
        taskSubmissionContract = TaskSubmissionContract(_taskSubmissionContractAddress);
    }

    struct TaskProposal {
        string taskId;
        string jobTitle;
        address jobPoster;
        address applicant;
        string proposalDetails;
    }

    TaskProposal[] public taskProposals;
    mapping(string => address[]) private taskAssignedUsers;

    function submitTaskProposal(
        string memory _taskId,
        string memory _proposalDetails
    ) public {
        TaskSubmissionContract.Task memory task = taskSubmissionContract.getTask(_taskId);

        require(msg.sender != task.jobPoster, "Job poster cannot apply for their own job");

        TaskProposal memory newProposal = TaskProposal({
            taskId: task.taskId,
            jobTitle: task.jobTitle,
            jobPoster: task.jobPoster,
            applicant: msg.sender,
            proposalDetails: _proposalDetails
        });

        taskProposals.push(newProposal);
    }

    function getAllSubmissions() public view returns (TaskProposal[] memory) {
        return taskProposals;
    }

function getSubmissionsByTask(string memory _taskId) public view returns (TaskProposal[] memory) {
    uint count = 0;
    for (uint i = 0; i < taskProposals.length; i++) {
        if (keccak256(abi.encodePacked(taskProposals[i].taskId)) == keccak256(abi.encodePacked(_taskId))) {
            count++;
        }
    }

    TaskProposal[] memory taskSubmissions = new TaskProposal[](count);
    count = 0;
    for (uint i = 0; i < taskProposals.length; i++) {
        if (keccak256(abi.encodePacked(taskProposals[i].taskId)) == keccak256(abi.encodePacked(_taskId))) {
            taskSubmissions[count] = taskProposals[i];
            count++;
        }
    }

    return taskSubmissions;
}


    function getSubmissionsByUser(address _user) public view returns (TaskProposal[] memory) {
        uint count = 0;
        for (uint i = 0; i < taskProposals.length; i++) {
            if (taskProposals[i].applicant == _user) {
                count++;
            }
        }

        TaskProposal[] memory userSubmissions = new TaskProposal[](count);
        count = 0;
        for (uint i = 0; i < taskProposals.length; i++) {
            if (taskProposals[i].applicant == _user) {
                userSubmissions[count] = taskProposals[i];
                count++;
            }
        }

        return userSubmissions;
    }

    function assignTaskToUsers(string memory _taskId, address assignedApplicant) public {
        TaskSubmissionContract.Task memory task = taskSubmissionContract.getTask(_taskId);
        require(task.status == TaskSubmissionContract.TaskStatus.Open, "Task is not open for assignment");
        require(task.jobPoster == msg.sender, "Only the job poster can assign tasks");

        // Ensure the task is not already assigned
        require(task.status == TaskSubmissionContract.TaskStatus.Open, "Task is not open for assignment");

        // Ensure enough proposals are available
        require(task.totalPeople > 0, "Not enough submissions for task assignment");

        // Mark the task as assigned to the current applicant
        task.status = TaskSubmissionContract.TaskStatus.Ongoing;

        // Assign the task to the current applicant
        emit TaskAssigned(_taskId, task.jobPoster, assignedApplicant);
    }

    function getAssignedUsers(string memory _taskId) public view returns (address[] memory) {
        TaskSubmissionContract.Task memory task = taskSubmissionContract.getTask(_taskId);
        require(task.status == TaskSubmissionContract.TaskStatus.Ongoing || task.status == TaskSubmissionContract.TaskStatus.Review, "Task is not ongoing or in review");

        address[] memory assignedUsers = new address[](task.totalPeople);

        for (uint i = 0; i < task.totalPeople; i++) {
            assignedUsers[i] = taskAssignedUsers[_taskId][i];
        }

        return assignedUsers;
    }

    function getAllAssignedTasks() public view returns (string[] memory, address[] memory, address[] memory, string[] memory, string[] memory, uint[] memory) {
        uint assignedTaskCount = 0;

        // Count the number of assigned tasks
        for (uint i = 0; i < taskProposals.length; i++) {
            if (keccak256(abi.encodePacked(taskProposals[i].taskId)) == keccak256(abi.encodePacked(taskProposals[i].taskId))) {
                assignedTaskCount++;
            }
        }

        // Initialize arrays to store assigned task details
        string[] memory taskIds = new string[](assignedTaskCount);
        address[] memory jobPosterAddresses = new address[](assignedTaskCount);
        address[] memory applicantAddresses = new address[](assignedTaskCount);
        string[] memory proposalDetails = new string[](assignedTaskCount);
        string[] memory jobTitles = new string[](assignedTaskCount);
        uint[] memory totalPeopleAssigned = new uint[](assignedTaskCount);

        // Populate arrays with assigned task details
        uint currentIndex = 0;
        for (uint i = 0; i < taskProposals.length; i++) {
            if (keccak256(abi.encodePacked(taskProposals[i].taskId)) == keccak256(abi.encodePacked(taskProposals[i].taskId))) {
                TaskSubmissionContract.Task memory task = taskSubmissionContract.getTask(taskProposals[i].taskId);

                taskIds[currentIndex] = task.taskId;
                jobPosterAddresses[currentIndex] = task.jobPoster;
                applicantAddresses[currentIndex] = taskProposals[i].applicant;
                proposalDetails[currentIndex] = taskProposals[i].proposalDetails;
                jobTitles[currentIndex] = task.jobTitle;
                totalPeopleAssigned[currentIndex] = task.totalPeople;

                currentIndex++;
            }
        }

        return (taskIds, jobPosterAddresses, applicantAddresses, proposalDetails, jobTitles, totalPeopleAssigned);
    }

function markJobAsDone(string memory _taskId) public view {
    TaskSubmissionContract.Task memory task = taskSubmissionContract.getTask(_taskId);
    require(task.status == TaskSubmissionContract.TaskStatus.Ongoing, "Task is not ongoing");
    require(task.jobPoster == msg.sender, "Only the assigned applicant can mark the job as done");

    // Ensure that the caller is the assigned applicant
    bool isAssigned = false;
    for (uint i = 0; i < task.totalPeople; i++) {
        if (taskProposals[i].applicant == msg.sender) {
            isAssigned = true;
            break;
        }
    }
    require(isAssigned, "Only the assigned applicant can mark the job as done");

    // Mark the task as ready for review
    task.status = TaskSubmissionContract.TaskStatus.Review;
}

function markTaskAsCompleted(string memory _taskId) public view {
    TaskSubmissionContract.Task memory task = taskSubmissionContract.getTask(_taskId);
    require(task.status == TaskSubmissionContract.TaskStatus.Review, "Task is not ready for completion");
    require(task.jobPoster == msg.sender, "Only the job poster can mark the task as completed");

    // the payment logic implementation will be here

    // if payment is successful, then Mark the task as completed
    task.status = TaskSubmissionContract.TaskStatus.Completed;
}




}
