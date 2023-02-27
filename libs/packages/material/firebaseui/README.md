# @ngpat/material/firebaseui

Secondary entry point of `@ngpat/material`. It can be used by importing from `@ngpat/material/firebaseui`.

This is a wrapper for [firebaseui](https://github.com/firebase/firebaseui-web#installation).

## Styles

Add `"firebaseui/dist/firebaseui.css"` to `/targets/build/options/styles` in `project.json`:

```json

{
  "targets": {
    "build": {
      "options": {
        "styles": [
          "apps/[app]/src/styles.scss",
          "firebaseui/dist/firebaseui.css"
        ]
      }
    }
  }
}

```
