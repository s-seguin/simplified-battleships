// Run the tests through ESM to support ES6 syntax.
const esmImport = require('esm')(module);

// import the individual test like this:
const playerTest = esmImport('./player.assert.js');
const shipTest = esmImport('./ship.assert.js');
