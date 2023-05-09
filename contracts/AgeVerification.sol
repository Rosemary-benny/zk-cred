// SPDX-License-Identifier: MIT
pragma cairo >= 0.4.0;

// Import the verifier and NFT interfaces
import "./Verifier.sol";
import "./NFT.sol";

contract AgeVerifier is Verifier {
    // Age verification circuit constants
    uint256 constant A = 0x231978d9f3c9c1c2f5a14c3078b3b3a0e221d12964d3f717f9835f7b6b95a4;
    uint256 constant B = 0x125e0454a0d16c67ad7c3629a9e94d963b9e6666f16b0c1459f9269e778cd4f;
    uint256[2] constant G = [
        0x07bf2d0a5f3a5c9e987a9da1f7a26e64bafde45a2831f36635b10f957b7b6ef3,
        0x0815b5e6af5ffddc67a4f3b4099e525f00e2a2b81d72dd83c8bb0db46b0ca74d
    ];
    uint256 constant H = 0x109f13d0261c38a8e2d9b071262719c84dd91c8de9c9e01e17ee0fa4d2ba8c2b;

    // Reference to the NFT contract
    NFT nft;

    constructor(NFT _nft) public {
        nft = _nft;
    }

    // Verify the user's age using a zero-knowledge proof
    function verifyAge(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256 age
    ) public {
        require(verifyTx(a, b, c), "Invalid proof");

        // Check if the user is over 18 years old
        require(age >= 18, "Must be over 18 years old");

        // Mint the NFT to the user
        nft.mint(msg.sender);
    }

    // Verifier interface implementation
    function getA() external pure returns (uint256) {
        return A;
    }

    function getB() external pure returns (uint256[2] memory) {
        return G;
    }

    function getG() external pure returns (uint256[2][2] memory) {
        return [G, G];
    }

    function getH() external pure returns (uint256) {
        return H;
    }
}
