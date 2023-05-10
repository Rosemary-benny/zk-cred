const { Circuit, LinearCombination, ProvingKey, VerifyingKey } = require('snarkjs');
const fs = require('fs');

// Read the proving and verifying keys from file
const provingKey = fs.readFileSync('./proving_key.bin').buffer;
const verifyingKey = fs.readFileSync('./verifying_key.json').toString();

// Load the verifying key into a JS object
const vk = VerifyingKey.fromString(verifyingKey);

// Define the constraints for the circuit
const ageGreaterThan18 = (age, greaterThan18) => {
  const ageLC = new LinearCombination([age]);
  const greaterThan18LC = new LinearCombination([greaterThan18]);

  const diffLC = ageLC.sub(greaterThan18LC);

  const constraint = {
    a: [greaterThan18LC, ageLC],
    b: [1],
    c: [diffLC],
  };

  return constraint;
};

// Define the setupZKProof function
async function setupZKProof(age) {
  // Load the proving key into a ProvingKey object
  const pk = await ProvingKey.fromFile(provingKey);

  // Define the inputs and outputs for the circuit
  const input = {
    age,
    greaterThan18: BigInt(18),
  };

  const circuit = new Circuit(vk, pk);

  // Add the constraint to the circuit
  const ageGT18Constraint = ageGreaterThan18(input.age, input.greaterThan18);
  circuit.addConstraint(ageGT18Constraint);

  // Generate the proof
  const witness = circuit.calculateWitness(input);
  const proof = circuit.generateProof(witness);

  return proof;
}

// Define the verifyZKProof function
function verifyZKProof(proof) {
  return vk.verify(proof);
}

module.exports = { setupZKProof, verifyZKProof };
