// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerxioLearnContract {
    address public owner;

    struct Quiz {
        string question;
        string[] options;
        uint256 correctOption;
    }

    struct Comment {
        address commenter;
        string comment;
    }

    struct Course {
        uint256 courseId;
        address instructor;
        string name;
        string description;
        string videoUrl;
        Quiz[] quizzes;
        uint256 upvotes;
        uint256 downvotes;
        Comment[] comments;
        uint256 rewardPointsForQuiz;
        address[] voters; // Added array to track voters
    }

    mapping(uint256 => Course) public courses;
    uint256 public courseCounter;

    mapping(address => uint256) public userPoints;

    event CourseUploaded(uint256 courseId, address instructor, string name);
    event LessonWatched(uint256 courseId, address student);
    event QuizAnswered(uint256 courseId, address student, bool isCorrect);
    event CourseUpvoted(uint256 courseId, address voter);
    event CourseDownvoted(uint256 courseId, address voter);
    event CourseCommented(uint256 courseId, address commenter, string comment);
    event RewardPointsUpdated(address user, int256 pointsChange);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function uploadCourse(
        string memory _name,
        string memory _description,
        string memory _videoUrl,
        string[] memory _questions,
        string[][] memory _options,
        uint256[] memory _correctOptions,
        uint256 _rewardPointsForQuiz
    ) public {
        require(_questions.length == _options.length && _questions.length == _correctOptions.length, "Invalid quiz data");

        courseCounter++;
        Course storage newCourse = courses[courseCounter];
        newCourse.courseId = courseCounter;
        newCourse.instructor = msg.sender;
        newCourse.name = _name;
        newCourse.description = _description;
        newCourse.videoUrl = _videoUrl;
        newCourse.rewardPointsForQuiz = _rewardPointsForQuiz;

        for (uint256 i = 0; i < _questions.length; i++) {
            newCourse.quizzes.push(Quiz({
                question: _questions[i],
                options: _options[i],
                correctOption: _correctOptions[i]
            }));
        }

        emit CourseUploaded(courseCounter, msg.sender, _name);
    }

      function watchLesson(uint256 _courseId) public {
        // Course storage course = courses[_courseId];
        emit LessonWatched(_courseId, msg.sender);
    }

    function answerQuiz(uint256 _courseId, uint256 _quizNumber, uint256 _chosenOption) public {
        Course storage course = courses[_courseId];
        Quiz storage quiz = course.quizzes[_quizNumber];

        bool isCorrect = (_chosenOption == quiz.correctOption);
        emit QuizAnswered(_courseId, msg.sender, isCorrect);

        if (isCorrect) {
            updateRewardPoints(msg.sender, int256(course.rewardPointsForQuiz));
        }
    }

    function upvoteCourse(uint256 _courseId) public {
        Course storage course = courses[_courseId];
        require(!hasUserVoted(course, msg.sender), "Already voted");

        course.upvotes++;
        course.voters.push(msg.sender);
        emit CourseUpvoted(_courseId, msg.sender);
        updateRewardPoints(msg.sender, 1); // Increase points for upvoting
    }

    function downvoteCourse(uint256 _courseId) public {
        Course storage course = courses[_courseId];
        require(!hasUserVoted(course, msg.sender), "Already voted");

        course.downvotes++;
        course.voters.push(msg.sender);
        emit CourseDownvoted(_courseId, msg.sender);
        updateRewardPoints(msg.sender, -1); // Decrease points for downvoting
    }

    function hasUserVoted(Course storage course, address voter) internal view returns (bool) {
        for (uint256 i = 0; i < course.voters.length; i++) {
            if (course.voters[i] == voter) {
                return true;
            }
        }
        return false;
    }

    function commentCourse(uint256 _courseId, string memory _comment) public {
        Course storage course = courses[_courseId];
        course.comments.push(Comment({
            commenter: msg.sender,
            comment: _comment
        }));
        emit CourseCommented(_courseId, msg.sender, _comment);
    }

    function viewAllCourses() public view returns (Course[] memory) {
        Course[] memory allCourses = new Course[](courseCounter);
        for (uint256 i = 1; i <= courseCounter; i++) {
            allCourses[i - 1] = courses[i];
        }
        return allCourses;
    }

    function updateRewardPoints(address _user, int256 _pointsChange) internal {
    if (_pointsChange > 0) {
        userPoints[_user] += uint256(_pointsChange);
    } else {
        // Handle the case when _pointsChange is negative
        uint256 absolutePointsChange = uint256(-_pointsChange);
        if (userPoints[_user] >= absolutePointsChange) {
            userPoints[_user] -= absolutePointsChange;
        } else {
            // Set userPoints to 0 if subtracting more than the current balance
            userPoints[_user] = 0;
        }
    }
    emit RewardPointsUpdated(_user, _pointsChange);
}

}
