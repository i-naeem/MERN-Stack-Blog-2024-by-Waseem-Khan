const fs = require('fs').promises;
const path = require('path');
// Handle Image Upload Function for Update User Profile

const handleImageUpload = async (req, user, field, previousImagePath) => {
  // Check if there is a previous image path
  if (previousImagePath) {
    const previousImagePathFull = path.join(`./uploads/${previousImagePath}`);

    try {
      // Check if the previous image file exists before trying to delete
      await fs.access(previousImagePathFull);

      // Unlink the previous image file
      await fs.unlink(previousImagePathFull);
      console.log(`Previous image deleted: ${previousImagePathFull}`);

      // Update MongoDB record to remove the file path
      user.profile[field] = ''; // or remove the field if appropriate
    } catch (error) {
      // Handle error if the file doesn't exist or cannot be accessed/unlinked
      if (error.code !== 'ENOENT') {
        console.error(`Error while trying to delete the previous image: ${error.message}`);
      }
    }
  }

  // Set the new image filename in the user profile
  user.profile[field] = req.files[field][0].filename;
};

module.exports = handleImageUpload;
