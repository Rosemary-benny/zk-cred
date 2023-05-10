const { Cairo } = require("@cairo-lang/core");
const { HttpProvider } = require("@cairo-lang/http-provider");
const snarkjs = require("snarkjs");

// Define the URL of the Cairo blockchain node
const nodeUrl = "http://localhost:8843";

// Define the AgeVerification contract code
const contractCode = ``
namespace AgeVerification {

    // Define the age verification function with a ZKP proof
    function verifyAgeWithProof(age : felt) -> (verified : bool) {
        // Generate the ZKP proof
        let verificationKey = {
            "type": "BoweHopwood",
            "input": ["field", "field"],
            "lookup": {
                "0": "3e7d9de7b5b3a3d1f4cccf5e2e66a0a0b8559f3e8f52709a2b0b4ed3c3d0b78",
                "1": "2a6f7a8d6b7f247cc5ad844cfc7f40c2e3a6d88b5b542eabdd4fbcf0673bb40a"
            }
        };
        let publicInputs = [age, 18];
        let proof = snarkjs.groth16.fullProve(verificationKey, publicInputs, {
            "0": BigInt(18),
            "1": BigInt(age)
        });
        
        // Verify the ZKP proof
        let verificationResult = snarkjs.groth16.verify(
            verificationKey,
            [snarkjs.utils.toBN(proof.pi_a[0]), snarkjs.utils.toBN(proof.pi_a[1])],
            [snarkjs.utils.toBN(proof.pi_b[0][1]), snarkjs.utils.toBN(proof.pi_b[1][1])],
            [snarkjs.utils.toBN(proof.pi_c[0]), snarkjs.utils.toBN(proof.pi_c[1])],
            [snarkjs.utils.toBN(publicInputs[1]), snarkjs.utils.toBN(publicInputs[0])]
        );
        
        return (verificationResult === true);
    }

}
