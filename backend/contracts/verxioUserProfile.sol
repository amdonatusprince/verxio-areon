// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerxioUserProfile {
    struct Profile {
        string firstName;
        string lastName;
        string phoneNumber;
        string email;
        string websiteUrl;
        string profilePictureUrl;
        string documentUrl;
        string bio;
    }

    mapping(address => Profile) public profiles;

    function updateProfile(
        string memory _firstName,
        string memory _lastName,
        string memory _phoneNumber,
        string memory _email,
        string memory _websiteUrl,
        string memory _profilePictureUrl,
        string memory _documentUrl,
        string memory _bio
    ) public {
        Profile memory newProfile = Profile({
            firstName: _firstName,
            lastName: _lastName,
            phoneNumber: _phoneNumber,
            email: _email,
            websiteUrl: _websiteUrl,
            profilePictureUrl: _profilePictureUrl,
            documentUrl: _documentUrl,
            bio: _bio
        });

        profiles[msg.sender] = newProfile;
    }

    function getProfile(address userAddress) public view returns (Profile memory) {
        return profiles[userAddress];
    }
}
