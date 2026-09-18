# Contributing

Bug reports, questions and pull requests are welcome on [GitHub](https://github.com/legrottagliegionata/angular-gridster2-plus).

## Setup

```bash
git clone https://github.com/legrottagliegionata/angular-gridster2-plus.git
cd angular-gridster2-plus
npm ci --legacy-peer-deps
```

| Command                             | Description                                            |
| ----------------------------------- | ------------------------------------------------------ |
| `npm start`                         | Demo application on http://localhost:4200              |
| `npm run test-lib -- --watch=false` | Library unit tests (Vitest, jsdom, zoneless)           |
| `npm run build-lib`                 | Build the library into `dist/angular-gridster2-plus`   |
| `npx ng build gridster-app`         | Production build of the demo (needs `build-lib` first) |
| `npm run lint`                      | ESLint                                                 |

## Repository layout

| Path                                             | Content                            |
| ------------------------------------------------ | ---------------------------------- |
| `projects/angular-gridster2-plus/src/lib/`       | The library                        |
| `projects/angular-gridster2-plus/src/lib/tests/` | Unit tests                         |
| `src/app/sections/`                              | Demo pages, one per feature        |
| `wiki/`                                          | These wiki pages                   |
| `docs/`                                          | Upstream tracking and issue triage |

## Pull requests

- Use [Conventional Commits](https://www.conventionalcommits.org) (`fix(drag): ...`, `feat(empty-cell): ...`); commit messages are checked by commitlint and files are formatted by Prettier on commit.
- Every bug fix comes with a unit test that fails without the fix.
- Behaviour or option changes update the wiki pages in `wiki/` in the same pull request. The `Publish Wiki` workflow publishes them when the pull request is merged.
- The `CI` workflow runs the tests and builds the library and the demo on every pull request.

## Releases

Version numbers follow the Angular major the library supports: `22.x` for Angular 22.

A release is a pull request that bumps `version` in `package.json` and `projects/angular-gridster2-plus/package.json`, followed by a `v<version>` tag on `master`. The `Publish Package` workflow then checks the tag against the package version, runs the tests, builds the library and publishes it to npm.

## How the library works

The architecture, the main concepts (the item working copy, how options are merged, the drag and resize lifecycle) and testing notes are described in [CLAUDE.md](https://github.com/legrottagliegionata/angular-gridster2-plus/blob/master/CLAUDE.md).

## Upstream

The fork integrates useful pull requests and fixes from [angular-gridster2](https://github.com/tiberiuzuld/angular-gridster2), keeping their authors. The status of upstream pull requests is in [docs/upstream-tracking.md](https://github.com/legrottagliegionata/angular-gridster2-plus/blob/master/docs/upstream-tracking.md) and the triage of upstream issues in [docs/issue-triage.md](https://github.com/legrottagliegionata/angular-gridster2-plus/blob/master/docs/issue-triage.md).
