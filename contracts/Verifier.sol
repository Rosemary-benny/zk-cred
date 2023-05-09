// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Verifier {
    function verifyTx(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c
    ) external view returns (bool);

    function getA() external view returns (uint256);

    function getB() external view returns (uint256[2] memory);

    function getG() external view returns (uint256[2][2] memory);

    function getH() external view returns (uint256);
}
