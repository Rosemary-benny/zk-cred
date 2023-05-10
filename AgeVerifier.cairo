// SPDX-License-Identifier: MIT

import "STDL.sol";
import "./Utils.sol";
contract AgeVerifier {
    struct Proof {
        uint256 age;
        uint256[2] a;
        uint256[2][2] b;
        uint256[2] c;
    }

    function verifyAge(uint256 age, Proof calldata proof) external view returns (bool) {
        require(age >= 18, "AgeVerifier: user must be over 18 years old");

        uint256[1] memory input = [age];

        uint256[2] memory proofA = proof.a;
        uint256[2][2] memory proofB = proof.b;
        uint256[2] memory proofC = proof.c;

        return STDL.solVerifier(proofA, proofB, proofC, input);
    }
}
