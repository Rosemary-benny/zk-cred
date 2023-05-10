// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Utils {
function ecdsa_verify(bytes32 hash, bytes memory signature, uint256 pubKeyX, uint256 pubKeyY) public pure returns (bool) {
    bytes32 r;
    bytes32 s;
    uint8 v;

    assembly {
        r := mload(add(signature, 0x20))
        s := mload(add(signature, 0x40))
        v := byte(0, mload(add(signature, 0x60)))
    }

    if (v < 27) {
        v += 27;
    }

    require(v == 27 || v == 28, "Invalid v value");

    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, hash));

    bytes memory pubKeyBytes = abi.encodePacked(pubKeyX, pubKeyY);
    address recoveredAddress = address(uint256(keccak256(abi.encodePacked(pubKeyBytes))));
function ecdsa_verify(bytes32 hash, bytes memory signature, uint256 pubKeyX, uint256 pubKeyY) public pure returns (bool) {
    bytes32 r;
    bytes32 s;
    uint8 v;

    assembly {
        r := mload(add(signature, 0x20))
        s := mload(add(signature, 0x40))
        v := byte(0, mload(add(signature, 0x60)))
    }

    if (v < 27) {
        v += 27;
    }

    require(v == 27 || v == 28, "Invalid v value");

    bytes memory prefix = "\x19Ethereum Signed Message:\n32";
    bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, hash));

    bytes memory pubKeyBytes = abi.encodePacked(pubKeyX, pubKeyY);
    address recoveredAddress = address(uint256(keccak256(abi.encodePacked(pubKeyBytes))));

    return (recoveredAddress == ecrecover(prefixedHash, v, r, s));
}

}


    function sha256(bytes memory data) public pure returns (bytes32) {
        return sha256(abi.encodePacked(data));
    }
}
