const terminalContainer = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');
const outputLog = document.getElementById('output-log');
const activePrompt = document.querySelector('.input-line .prompt');

terminalContainer.addEventListener('click', () => {
    commandInput.focus();
});

const fileSystem = {
    "home": {
        "guest": {
            "projects": {
                "driftnet_config.json": '{"target": "grid_sense", "stealth": true}',
                "ahms_schema.sql": "CREATE TABLE customers (id INT, name VARCHAR);"
            },
            "research": {
                "fl_ids_notes.txt": "Federated Learning combined with Intrusion Detection."
            },
            "readme.txt": "Welcome to the terminal. Try exploring the directories."
        }
    }
};

let currentPath = ["home", "guest"];
let commandHistory = [];
let historyIndex = -1;

function getCurrentDir() {
    let dir = fileSystem;
    for (let folder of currentPath) {
        dir = dir[folder];
    }
    return dir;
}

function getPromptText() {
    let rawPath = "/" + currentPath.join("/");
    
    if (rawPath.startsWith("/home/guest")) {
        rawPath = "~" + rawPath.substring(11);
    } else if (rawPath === "/home") {
        rawPath = "/home";
    }
    
    return `guest@device:${rawPath}$ `;
}



commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const rawInput = commandInput.value.trim(); 
        
        if (rawInput !== "") {
            commandHistory.push(rawInput);
            historyIndex = commandHistory.length; 
            
            printHistoryLine(rawInput);
            processCommand(rawInput); 
        } else {
            printHistoryLine(""); 
        }
        
        commandInput.value = '';
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    } 
    else if (event.key === 'ArrowUp') {
        event.preventDefault(); // Stops the cursor from jumping to the start of the input
        
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
    } 
    else if (event.key === 'ArrowDown') {
        event.preventDefault();
        
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
        }
    }
});

function processCommand(input) {
    const args = input.split(" ");
    const command = args[0].toLowerCase(); 

    switch (command) {
        case "help":
            printOutput("Available commands: help, clear, echo, whoami, date, cd, ls, cat, pwd");
            break;
        case "clear":
            outputLog.innerHTML = "";
            break;
        case "echo":
            const textToEcho = args.slice(1).join(" ");
            printOutput(textToEcho);
            break;
        case "whoami":
            printOutput("guest user - member of Earth");
            break;
        case "date":
            printOutput(new Date().toString());
            break;
        case "pwd":
            printOutput("/" + currentPath.join("/"));
            break;

        case "ls":
            const currentDir = getCurrentDir();
            const contents = Object.keys(currentDir).join("   ");
            printOutput(contents);
            break;

        case "cat":
            const fileName = args[1];
            const targetDir = getCurrentDir();
            
            if (!fileName) {
                printOutput("cat: missing file operand");
            } else if (targetDir[fileName]) {
                if (typeof targetDir[fileName] === 'string') {
                    printOutput(targetDir[fileName]);
                } else {
                    printOutput(`cat: ${fileName}: Is a directory`);
                }
            } else {
                printOutput(`cat: ${fileName}: No such file or directory`);
            }
            break;

        case "cd":
            const targetFolder = args[1];
            const activeDir = getCurrentDir();

            if (!targetFolder || targetFolder === "~") {
                currentPath = ["home", "guest"];
            } else if (targetFolder === "..") {
                if (currentPath.length > 1) {
                    currentPath.pop();
                }
            } else if (activeDir[targetFolder]) {
                if (typeof activeDir[targetFolder] === 'object') {
                    currentPath.push(targetFolder);
                } else {
                    printOutput(`bash: cd: ${targetFolder}: Not a directory`);
                }
            } else {
                printOutput(`bash: cd: ${targetFolder}: No such file or directory`);
            }
            activePrompt.textContent = getPromptText();
            break;
        default:
            printOutput(`bash: ${command}: command not found....Enter help to view valid commands`);
            break;
    }
}

function printOutput(text) {
    const outputLine = document.createElement('div');
    outputLine.classList.add('terminal-output');
    outputLine.textContent = text;
    outputLog.appendChild(outputLine);
}


function printHistoryLine(inputString) {
    const historyLine = document.createElement('div');
    historyLine.classList.add('input-line');     
    historyLine.innerHTML = `
        <span class="prompt">${getPromptText()}</span>
        <span class="command-text">${inputString}</span>
    `;
    
    outputLog.appendChild(historyLine);
}