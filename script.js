// Whenever the user clicks ANYWHERE inside the terminal window, 
// force the blinking cursor back into the hidden input field.
document.getElementById('terminal').addEventListener('click', () => {
    document.getElementById('command-input').focus();
});