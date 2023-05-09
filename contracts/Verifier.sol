// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Verifier {
  function verifyProof(
    uint[2] memory a,
    uint[2][2] memory b,
    uint[2] memory c,
    uint[2] memory inputs
  ) external view returns (bool);
}
