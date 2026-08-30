const modules = import.meta.glob("../content/letters*.js", {
  eager: true,
  import: "letters",
});

export const letters =
  modules["../content/letters.js"] ?? modules["../content/letters.example.js"];