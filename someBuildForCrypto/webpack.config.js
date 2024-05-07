const path = require('path');

module.exports = {
    entry: './index.js',  // Your entry file
    output: {
        path: path.resolve(__dirname, 'dist'),  // Output directory
        filename: 'bundle.js'  // Output bundle name
    },
    module: {
        rules: [
            // Add any necessary loaders here (e.g., for Babel, CSS, etc.)
        ]
    }
};

