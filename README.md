# Crossword

## Overview
Crossword is an interactive web application designed to simulate a live quiz show experience. The system consists of two distinct interfaces that communicate in real-time: a main page (`index.html`) intended for the audience or players, and a control panel (`dashboard.html`) used by the host to manage the game flow.

## Architecture
The application is developed as a frontend solution using standard web technologies, organized via ES6 Modules to ensure a modular, maintainable, and encapsulated codebase.

The control mechanism relies on the Broadcast Channel API, which enables bidirectional messaging and state synchronization between the dashboard and the main page without the need for a backend or a database. The project is designed to be easily deployed on static hosting services such as GitHub Pages.

## Core Features
*   **Main Screen (Index):** Displays the game board, the timer, and visual feedback for the participants. It passively reacts to the inputs received from the control panel.
*   **Control Panel (Dashboard):** Allows the administrator or host to manage the entire state of the game. Features include:
    *   Revealing letters or words on the board.
    *   Manage team wildcards.
    *   Managing the game timer (start, pause).
    *   Triggering specific sound effects based on answer outcomes or game events.

## Technology Stack and Tools
*   **Languages:** HTML5, CSS3, JavaScript (ES6 Modules)
*   **Communication:** Broadcast Channel API
*   **Development & DevOps:** 
    *   [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for static code analysis and strict style guideline enforcement.
    *   [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged) for implementing pre-commit hooks, ensuring that the code is validated and formatted before every Git commit operation.

## System Requirements
To run the project in a development environment, a local web server (such as Nginx, Live Server, or http-server) is required. The use of ES6 Modules is subject to browser CORS policies, which strictly prohibit loading modules directly via the `file://` protocol.

[Node.js](https://nodejs.org/) and `npm` are also required to install and configure the development dependencies related to linting and formatting.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder-name>
   ```

2. Install the development dependencies (ESLint, Prettier, Husky, lint-staged):
   ```bash
   npm install
   ```

3. Initialize Husky pre-commit hooks (if not automatically configured via post-install scripts):
   ```bash
   npx husky install
   ```

4. Start a local HTTP server pointing to the project's root directory.

5. Open two browser windows (or tabs):
   * Window 1 (Audience): Navigate to `index.html`
   * Window 2 (Control): Navigate to `dashboard.html`

## Development Workflow
The repository is configured to ensure code quality through a strict development pipeline. Husky is configured to intercept `git commit` operations and automatically run ESLint and Prettier via lint-staged. Commits that fail the validation will be blocked until the errors are resolved.

To execute the static analysis manually:
```bash
npm run lint
```
