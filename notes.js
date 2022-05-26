const fs = require('fs');
const chalk = require('chalk');

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.JSON', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.JSON');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const addNotes = (title, body) => {
    const notesData = loadNotes();
    const duplicateNotes = notesData.filter(note => note.title === title);
    debugger
    if (duplicateNotes.length) {
        const errorMessage = 'The title entered already exists.'
        console.log(chalk.red.bold.italic.inverse(errorMessage))
    } else {
        notesData.push({
            title,
            body
        })
        saveNotes(notesData);
        console.log(chalk.green.bold.italic('Notes added successfully!'))
    }
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title != title);
    if (notes.length > filteredNotes.length) {
        saveNotes(filteredNotes)
        console.log(chalk.green.bold.italic('Notes removed successfully!'))
    } else {
        console.log(chalk.red.bold.italic.inverse('No valid title found.'))
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length) {
        notes.forEach((note) => {
            console.log(chalk.blue.bold(note.title))
        })
    } else {
        console.log(chalk.red.bold.italic.inverse('No notes present to be listed'))
    }
}

const readNotes = (title) => {
    const notes = loadNotes();
    if (notes.length) {
        const note = notes.find(note => note.title === title)
        note ? onNoteFound(note) : console.log(chalk.red.inverse('No notes found!'))
        
    } else {
        console.log(chalk.red.bold.italic.inverse('Notes is empty'))
    }
}

const onNoteFound = (note) => {
    console.log(chalk.green.bold('Title : ' + note.title))
    console.log(chalk.green.italic('Body : ' + note.body))
}

module.exports = {
    addNotes,
    removeNotes,
    listNotes,
    readNotes
};

