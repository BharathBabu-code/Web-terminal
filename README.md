# Web Terminal Emulator

A browser-based Linux-style terminal emulator built with **HTML, CSS, and Vanilla JavaScript**. This webpage simulates an interactive command-line environment with a virtual file system, command history, directory navigation, and stateful terminal behavior — entirely on the client side.

The project focuses on applying core JavaScript, DOM manipulation, state management, and event handling to create a familiar terminal experience in the browser.



## 📸 Preview



![Web Terminal Preview](.screenshots/Screenshot 2026-09-30 200550.png)
![Web Terminal Preview](.screenshots/Screenshot 2026-09-30 200556.png)
![Web Terminal Preview](.screenshots/Screenshot 2026-09-30 200638.png)


## ✨ Features

* **Virtual File System (VFS):**
  Uses a nested JavaScript object to simulate directories and files in memory.

* **Shell Commands:**
  Supports commands including `ls`, `cd`, `cat`, `pwd`, `clear`, `echo`, `help`, and `whoami`.

* **Directory Navigation:**
  Supports changing directories with `cd <dir>` and moving to the parent directory using `cd ..`.

* **Stateful Terminal:**
  The terminal prompt dynamically reflects the user's current working directory.

* **Command History:**
  Previously executed commands can be accessed using `ArrowUp` and `ArrowDown`, similar to a traditional shell.

* **Interactive Terminal UI:**
  Clicking anywhere inside the terminal automatically restores focus to the command input.

* **Client-Side Only:**
  No backend, database, package manager, or external framework is required.

## 🛠 Tech Stack

* **HTML5** — Terminal structure and UI elements
* **CSS3** — Flexbox layout, scrolling behavior, and terminal styling
* **Vanilla JavaScript (ES6+)** — Command parsing, DOM manipulation, event handling, state management, and virtual file-system traversal

## 🧠 How It Works

It is built around three core components:

### 1. Terminal Interface

The terminal UI consists of an output log and an interactive command input.

JavaScript dynamically writes command output to the DOM while CSS recreates the appearance of a traditional command-line interface.

A click handler on the terminal container automatically returns focus to the command input, allowing the user to continue typing without manually selecting the input field.

### 2. Command Parser

When the user presses `Enter`:

1. The input is trimmed.
2. The command is stored in the command-history array.
3. The entered command is displayed in the terminal output.
4. The input is separated into a command and its arguments.
5. The corresponding command handler is executed.

For example:

```text
cat readme.txt
```

is interpreted as:

```text
Command → cat
Argument → readme.txt
```

The parser then executes the appropriate logic for the requested operation.

### 3. Virtual File System

The file system is represented using nested JavaScript objects.

For example:

```text
/
├── home
│   └── guest
│       ├── readme.txt
│       └── projects
└── etc
```

The current directory is tracked using a `currentPath` array:

```javascript
["home", "guest"]
```

Navigation commands modify this path, while the application traverses the virtual file system to determine the active directory.

## 💻 Getting Started

This demo has no build process or external dependencies.

### 1. Clone the repository

```bash
git clone https://github.com/BharathBabu-code/Web-terminal
```

### 2. Open the project

Navigate to the project directory:



### 3. Run

Open `index.html` directly in a modern web browser.

No server, package manager, or installation is required.

## 🎮 Available Commands

| Command       | Description                     |
| ------------- | ------------------------------- |
| `help`        | Lists available commands        |
| `ls`          | Lists files and directories     |
| `cd <dir>`    | Changes the current directory   |
| `cd ..`       | Moves to the parent directory   |
| `cat <file>`  | Displays the contents of a file |
| `pwd`         | Displays the current path       |
| `echo <text>` | Prints text to the terminal     |
| `clear`       | Clears the terminal output      |
| `whoami`      | Displays the current user       |

## 📚 What This Project Demonstrates

* DOM manipulation
* JavaScript event handling
* Keyboard interaction
* Command parsing
* Arrays and objects
* Recursive/nested object traversal
* Client-side state management
* Dynamic UI updates
* Browser-based application architecture
* Git/GitHub workflow

## 🔮 Possible Improvements

Future versions could introduce:

* Tab completion
* Command aliases
* File creation and deletion
* `mkdir` and `touch`
* Persistent file-system state using `localStorage`
* Command flags and more advanced argument parsing
* Mobile-friendly terminal controls
* Additional shell commands
* A more complete Unix-like permission model

