const notes = require('./notes')
const yargs = require('yargs')

yargs.command({
    command: 'add',
    describe: 'To add notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Add your notes body here',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNotes(argv.title, argv.body)
})

yargs.command({
    command: 'remove',
    describe: 'To remove notes',
    builder: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.removeNotes(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'To list notes',
    handler: () => notes.listNotes()
})

yargs.command({
    command: 'read',
    describe: 'To read notes',
    bulider: {
        title: {
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.readNotes(argv.title)
})

yargs.parse();
