const slugPattern = (str) => {
  // Replaces spaces and special characters with hyphens
  const slug = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');

  // Remove consecutive hyphens
  const cleanedSlug = slug.replace(/-+/g, '-');

  // Remove leading and trailing hyphens
  return cleanedSlug.replace(/^-+|-+$/g, '');
};

module.exports = slugPattern;
