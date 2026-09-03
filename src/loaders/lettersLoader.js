// This file checks wheter or not src/content/letters.js exists, if not
// it loads letters.example.js as the letter provider file.
// It is done this way so that the user doesn't have to manually remove the
// placeholder example letters before adding his own letters.

// Uses meta.glob to check files with given name.
const modules = import.meta.glob("../content/letters*.js", {
  eager: true,
  import: "letters",
});

export const letters =
  modules["../content/letters.js"] ?? modules["../content/letters.example.js"];