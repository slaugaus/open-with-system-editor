# Open with System Editor

Abuses the [Custom Editor API](https://code.visualstudio.com/api/extension-guides/custom-editors) to associate filetypes of your choice with the default program defined by your OS.

With respect to [sandcastle's Open](https://github.com/sandcastle/vscode-open), which I borrowed the file-opening code from.

## Why use this?

To my knowledge, all the other extensions like this are adding commands or context menu items. Because this one pretends to be a custom editor, you can set it as the primary handler of a filetype, meaning all you have to do from then on is click the file and it'll open in the external editor.

## Usage

From the Explorer view, right-click a file, `Open With...`, `System Editor`.

From that Open With dialog, you can also click "Configure default editor for ___" to always open files with the system editor.

Or edit the setting manually in your `settings.json` or the UI:

```json
"workbench.editorAssociations": {
    ...
    "*.docx": "open-with-system"
},
```

TODO: Record GIFs

## Known Issues

This took me like an hour to make, there's probably something.

Only tested on Windows.

## Release Notes

### 0.1.0

Initial release!
