# Lsos Library for JavaScript

:information_source: This readme is meant for developers of open source projects who want to integrate the Lsos. Users of Lsos projects can get more infos at [lsos.org](https://lsos.org).

See [Lsos - FAQ - What does the Lsos library do?](https://lsos.org/faq#lib) for an overview of what the Lsos libray does.

## Usage

```js
import { verify } from "lsos"; // npm install lsos

verify({
  // Your project's name
  projectName: "My Open Source Project", // Required

  // Your npm package that calls this `verify()` function
  npm: "my-open-source-project", // Required

  // Only require an activation key when your user's repository had
  // `minNumberOfAuthors` Git authors in the last 3 months.
  minNumberOfAuthors: 3, // Optional (default value: 3)

  // Never block users, show a `console.warn` instead.
  trustMode: false, // Optional (default value: false)

  // Free trial
  freeTrialDays: 31, // Optional (default value: 31)
});
```

If your user needs an activation key but doesn't have one then `verify()` throws an error blocking your user from using your code.

Your user doesn't need an activation key if:

- Your user's repository had less than `minNumberOfAuthors` Git authors in the last 3 months.
  (We consider a repository with only few authors a small project; Lsos projects are free for small projects.)
- Your user's repository is public. (This means that your project can be developed and contributed to without activation key.)
- The free trial didn't end. (A `console.info` is shown to your user letting him know that he is using the free trial.)
- The [`trustMode` option](https://lsos.org/faq#trust-mode) is set to `true`.

`verify()` (and the Lsos in general) has no effects in these situations.

All checks are done by calling Git commands in the postinstall step.
Other than Git commands, nothing external to the `lsos` code is executed and no network calls are made.
The `verify` function has no dependencies and is isomorphic;
the `lsos` package can be used for Node.js libraries as well as browser libraries.

<br/>
