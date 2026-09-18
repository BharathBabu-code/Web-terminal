const terminalContainer = document.getElementById('terminal');
const commandInput = document.getElementById('command-input');
const outputLog = document.getElementById('output-log');

terminalContainer.addEventListener('click', () => {
    commandInput.focus();
});

commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const rawInput = commandInput.value.trim(); 
        
        if (rawInput !== "") {
            printHistoryLine(rawInput);
            processCommand(rawInput); 
        } else {
            printHistoryLine(""); 
        }
        
        commandInput.value = '';
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
});

function processCommand(input) {
    const args = input.split(" ");
    const command = args[0].toLowerCase(); 

    switch (command) {
        case "help":
            printOutput("Available commands: help, clear, echo, whoami, date");
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
        <span class="prompt">guest@device:~$</span>
        <span class="command-text">${inputString}</span>
    `;
    
    outputLog.appendChild(historyLine);
}