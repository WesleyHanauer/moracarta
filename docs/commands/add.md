# `moracarta add`

The `add` command imports one letter from a public Google Docs tab into the project content file.

## Usage

Run this command from the project created by `moracarta setup`:

```bash
npx moracarta add
```

The command asks for:

1. A public Google Docs URL. Each letter must be in its own Google Docs tab.
2. A title for the letter.

The document tab is fetched as plain text. A new letter is appended to `src/content/letters.js` with the next available numeric ID and the current date. The content is escaped so backticks and `${...}` sequences remain valid inside the generated template literal.

## Requirements

- The Google Doc must be shared publicly so the export endpoint can read it.
- The URL must point to a Google Docs document and tab.
- Letter titles cannot be empty.
- Run the command from the project root so the generated file is written to the intended `src/content` directory.

## Troubleshooting

- **The document does not contain any text:** check that the selected tab has content and that the document is publicly accessible.
- **The URL is rejected:** copy the full Google Docs tab URL and try again.
- **The generated file is invalid:** do not edit the generated letter while the command is running; rerun the command after restoring `src/content/letters.js` to a valid exported array.

On success, the command prints the new letter ID, title, and date. Errors are printed with a concise message and the process exits with a non-zero status.
