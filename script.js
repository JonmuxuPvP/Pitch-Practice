
class NoteRandomizer {
    constructor(key) {
        this.map = this.generateMap();
        this.key = key;
        this.display = "N/A";
    }

    generateMap() {
        const map = new Map(); 
        map.set("C", ["C", "D", "E", "F", "G", "A", "B"]);
        map.set("D", ["D", "E", "F#-Gb", "G", "A", "B", "C#-Db"]);
        map.set("E", ["E", "F#-Gb", "G#-Ab", "A", "B", "C#-Db", "D#-Eb"]);
        map.set("F", ["F", "G", "A", "A#-Bb", "C", "D", "E"]);
        map.set("G", ["G", "A", "B", "C", "D", "E", "F#-Gb"]);
        map.set("A", ["A", "B", "C#-Db", "D", "E", "F#-Gb", "G#-Ab"]);
        map.set("B", ["B", "C#-Db", "D#-Eb", "E", "F#-Gb", "G#-Ab", "A#-Bb"]);
        return map;
    }

    setKey(key) {
        this.key = key;
    }

    randomNote() {
        const rnd = Math.floor(Math.random() * 7);
        this.display = this.map.get(this.key)[rnd];
    }

    rootNote() {
        this.display = this.map.get(this.key)[0];
    }

    updateText() {
        text.innerHTML = hideNoteBtn.innerHTML === "Hide" ? this.display.replace("-", "/") : "?";
    }

    play() {
        let note = new Audio();
        note.src = `./sound/${this.display.replace("#", "\%23")}.wav`; // replacing hash literal
        note.play();
        this.updateText();
    }
}

const text = document.querySelector("#note");
const randomNoteBtn = document.querySelector("#random-note");
const replayNoteBtn = document.querySelector("#replay-note");
const rootNoteBtn = document.querySelector("#root-note");
const hideNoteBtn = document.querySelector("#hide-note");
const option = document.querySelector("#keys");

const noteRandomizer = new NoteRandomizer(option.value);

text.innerHTML = noteRandomizer.display;

randomNoteBtn.addEventListener("click", () => {
    noteRandomizer.randomNote();
    noteRandomizer.play();
});

replayNoteBtn.addEventListener("click", () => {
    noteRandomizer.play();
});

rootNoteBtn.addEventListener("click", () => {
    noteRandomizer.rootNote();
    noteRandomizer.play();
});

hideNoteBtn.addEventListener("click", () => {
    hideNoteBtn.innerHTML = hideNoteBtn.innerHTML === "Hide" ? "Show" : "Hide"; 
    noteRandomizer.updateText();
});

option.addEventListener("click", () => {
    noteRandomizer.setKey(option.value);
});