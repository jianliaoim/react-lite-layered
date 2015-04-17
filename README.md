
React Lite Modal and Popover
----

Modal and Popover component from Talk by Teambition.

Demo http://teambition.github.io/react-lite-layered/

### Properties

### Supposition

### Usage

```bash
npm i --save react-lite-layered
```

Read [src/main.jsx](main) for details:

[main]: https://github.com/teambition/react-lite-layered/blob/gh-pages/src/main.jsx

```jsx
```

### Develop

```text
npm i
```

You need a static file server for the HTML files. Personally I suggest using Nginx.

Develop:

```bash
gulp html # regenerate index.html
webpack-dev-server --hot # enable live-reloading
```

Build (Pack and optimize js, reivision js and add entry in `index.html`):

```bash
gulp build
```

### License

MIT
