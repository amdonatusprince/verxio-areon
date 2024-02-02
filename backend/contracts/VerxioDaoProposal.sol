// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerxioDAOGovernance {
    address public owner;

    enum ProposalStatus { Review, Approved }

    uint256 public pointRewardForProposal = 3;
    uint256 public pointRewardForComment = 1;
    uint256 public pointRewardForUpvote = 2;
    uint256 public pointRewardForDownvote = 1;
    uint256 public pointRewardForIdea = 5;

    struct Proposal {
        uint256 proposalId;
        address proposer;
        string title;
        string description;
        ProposalStatus status;
        uint256 upvotes;
        uint256 downvotes;
        uint256 commentsCount;
        mapping(address => bool) hasVoted;
        mapping(uint256 => string) comments;
    }

    struct Idea {
        uint256 ideaId;
        address proposer;
        string title;
        string description;
        uint256 upvotes;
        uint256 downvotes;
        uint256 commentsCount;
        ProposalStatus status;
        uint256 totalFunds;
        uint256 fundingGoal;
        mapping(address => uint256) deposits;
        mapping(uint256 => string) comments;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Idea) public ideas;

    mapping(address => uint256) public userPoints;

    uint256 public proposalCounter;
    uint256 public ideaCounter;

    event ProposalSubmitted(uint256 proposalId, address proposer, string title);
    event IdeaSubmitted(uint256 ideaId, address proposer, string description);
    event ProposalApproved(uint256 proposalId, address approver);
    event IdeaFunded(uint256 ideaId, address funder, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setPointRewardForProposal(uint256 _newReward) public onlyOwner {
        pointRewardForProposal = _newReward;
    }

    function setPointRewardForComment(uint256 _newReward) public onlyOwner {
        pointRewardForComment = _newReward;
    }

    function setPointRewardForUpvote(uint256 _newReward) public onlyOwner {
        pointRewardForUpvote = _newReward;
    }

    function setPointRewardForDownvote(uint256 _newReward) public onlyOwner {
        pointRewardForDownvote = _newReward;
    }

    function setPointRewardForIdea(uint256 _newReward) public onlyOwner {
        pointRewardForIdea = _newReward;
    }

    function submitProposal(string memory _title, string memory _description) public {
        proposalCounter++;
        Proposal storage newProposal = proposals[proposalCounter];
        newProposal.proposalId = proposalCounter;
        newProposal.proposer = msg.sender;
        newProposal.title = _title;
        newProposal.description = _description;
        newProposal.status = ProposalStatus.Review;
        newProposal.upvotes = 0;
        newProposal.downvotes = 0;
        newProposal.commentsCount = 0;

        emit ProposalSubmitted(proposalCounter, msg.sender, _title);
        rewardUser(msg.sender, pointRewardForProposal);
    }

    function approveProposal(uint256 _proposalId) public onlyOwner {
        require(proposals[_proposalId].status == ProposalStatus.Review, "Proposal is not in review status");
        proposals[_proposalId].status = ProposalStatus.Approved;
        emit ProposalApproved(_proposalId, msg.sender);
    }

    function voteProposal(uint256 _proposalId, bool _upvote) public {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.hasVoted[msg.sender], "Already voted");

        if (_upvote) {
            proposal.upvotes++;
            rewardUser(msg.sender, pointRewardForUpvote);
        } else {
            proposal.downvotes++;
            rewardUser(msg.sender, pointRewardForDownvote);
        }

        proposal.hasVoted[msg.sender] = true;
    }

    function commentProposal(uint256 _proposalId, string memory _comment) public {
        Proposal storage proposal = proposals[_proposalId];
        proposal.commentsCount++;
        proposal.comments[proposal.commentsCount] = _comment;
        rewardUser(msg.sender, pointRewardForComment);
    }

    function proposeIdea(string memory _title, string memory _description, uint256 _fundingGoal) public {
        ideaCounter++;
        Idea storage newIdea = ideas[ideaCounter];
        newIdea.ideaId = ideaCounter;
        newIdea.proposer = msg.sender;
        newIdea.title = _title;
        newIdea.description = _description;
        newIdea.status = ProposalStatus.Review;
        newIdea.upvotes = 0;
        newIdea.downvotes = 0;
        newIdea.commentsCount = 0;
        newIdea.totalFunds = 0;
        newIdea.fundingGoal = _fundingGoal;

        emit IdeaSubmitted(ideaCounter, msg.sender, _description);
        rewardUser(msg.sender, pointRewardForIdea);
    }

    function fundIdea(uint256 _ideaId) public payable {
        Idea storage idea = ideas[_ideaId];
        require(idea.status == ProposalStatus.Approved, "Idea is not approved");
        require(idea.totalFunds + msg.value <= idea.fundingGoal, "Funding goal reached");

        idea.deposits[msg.sender] += msg.value;
        idea.totalFunds += msg.value;

        emit IdeaFunded(_ideaId, msg.sender, msg.value);
    }

    function rewardUser(address _user, uint256 _points) internal {
        userPoints[_user] += _points;
    }

    function getPointRewards() public view returns (uint256, uint256, uint256, uint256, uint256) {
        return (pointRewardForProposal, pointRewardForComment, pointRewardForUpvote, pointRewardForDownvote, pointRewardForIdea);
    }
}
