const modules = import.meta.glob("./letters*.js", {
  eager: true,
  import: "letters",
});

export const letters =
  modules["./letters.js"] ?? modules["./letters.example.js"];