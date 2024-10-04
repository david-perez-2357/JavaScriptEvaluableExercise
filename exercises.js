
//-------------------- COMPONENTS --------------------//
const AlertSuccess = (title, text, icon='bi-chat-left-dots-fill') => {
    return `<div class="alert alert-success alert-dismissible fade show gap-3 d-flex align-items-center" role="alert">
                <i class="bi ${icon}"></i>
                <div>
                    <b>${title}:</b> <span id="resultado1">${text}</span>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
}

const WordItem = (word) => {
    return `<div class="p-2 flex-grow-1 border overflow-x-auto">${word}</div>`
}

//-------------------- VARIABLES --------------------//
const inputFor = (exerciseNumber) => document.getElementById(`ejercicio${exerciseNumber}Input`);
const inputInfoFor = (exerciseNumber) => document.getElementById(`ejercicio${exerciseNumber}InputInfo`);
const alertContainerFor = (exerciseNumber) => document.getElementById(`Ejercicio${exerciseNumber}Results`);

// EXERCISE 2
const searchWordInput = document.getElementById('ejercicio2Search');
const searchWordInputInfo = document.getElementById('ejercicio2SearchInfo');
const wordClasses = {};

//-------------------- FUNCTIONS --------------------//
function validatePhrase(phrase, minimumWords) {
    return phrase.split(' ').length >= minimumWords;
}

function addIsValidToInput(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function addIsInvalidToInput(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

function resetElementClasses(element, exception = '') {
    element.classList.forEach((className) => {
        if(className !== exception) {
            element.classList.remove(className);
        }
    });
}

function countNonSpaceCaracters(phrase) {
    return phrase.replace(/\s/g, '').length;
}

function replaceAllVowels(phrase, replacement) {
    return phrase.replace(/[aeiou]/gi, replacement);
}

function replaceEvenCaracters(phrase, replacement) {
    let result = '';
    let evenPosition = false;

    for (let i = 0; i < phrase.length; i++) {
        if (phrase[i] === ' ') {
            result += phrase[i];
        } else {
            result += evenPosition ? replacement : phrase[i];
            evenPosition = !evenPosition;
        }
    }
    return result;
}

function validateInput(isValid, input) {
    if(isValid) {
        addIsValidToInput(input);
    }else {
        addIsInvalidToInput(input);
    }
}

function toggleTextColor(element, isValid) {
    if(isValid) {
        element.classList.remove('text-danger');
    }else {
        element.classList.add('text-danger');
    }
}

function sortWords(words) {
    // Sort words by alphabetical order, not counting case
    words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    return words;
}

//-------------------- EXERCISES --------------------//
function exercise1() {
    const phrase = inputFor(1).value;
    const minimumWords = 5;
    const inputIsValid = validatePhrase(phrase, minimumWords);

    validateInput(validatePhrase(phrase, minimumWords), inputFor(1));
    toggleTextColor(inputInfoFor(1), inputIsValid);

    if (!inputIsValid) {
        return;
    }

    const exercise1Content = [
        {
            title: 'Longitud sin espacios',
            text: countNonSpaceCaracters(phrase),
            icon: 'bi-file-earmark-text-fill'
        },
        {
            title: 'Reemplazar vocales',
            text: replaceAllVowels(phrase, '*'),
            icon: 'bi-shield-lock-fill'
        },
        {
            title: 'Reemplazar pares',
            text: replaceEvenCaracters(phrase, '_')
        }
    ]

    alertContainerFor(1).innerHTML = '';
    alertContainerFor(1).classList.remove('d-none');

    for (let i = 0; i < exercise1Content.length; i++) {
        alertContainerFor(1).innerHTML += AlertSuccess(exercise1Content[i].title, exercise1Content[i].text, exercise1Content[i].icon);
    }
}

function exercise2() {
    const phrase = inputFor(2).value;
    const minimumWords = 7;
    const inputIsValid = validatePhrase(phrase, minimumWords);
    const wordListElement = document.getElementById('ejercicio2WordList');
    let words = phrase.split(' ');

    // Remove all words with less than 5 characters
    words = words.filter((word) => word.length >= 5);

    // Sort words by alphabetical order, not counting case
    words = sortWords(words);

    validateInput(validatePhrase(phrase, minimumWords), inputFor(2));
    toggleTextColor(inputInfoFor(2), inputIsValid);

    if (!inputIsValid) {
        return;
    }

    wordListElement.innerHTML = '';
    wordListElement.parentElement.classList.remove('d-none');
    alertContainerFor(2).classList.add('d-none');
    alertContainerFor(2).innerHTML = '';

    exercise2AppendWords(words);
}

function exercise2AppendWords(words) {
    const wordListElement = document.getElementById('ejercicio2WordList');

    words.forEach((word) => {
        wordListElement.innerHTML += WordItem(word);

        if (wordClasses[word]) {
            wordListElement.lastElementChild.classList.add(wordClasses[word]);
        }
    });
}

function exercise2ExtractWords() {
    const wordListElement = document.getElementById('ejercicio2WordList');
    const words = wordListElement.querySelectorAll('div');
    const extractedWords = [];

    words.forEach((word) => {
        extractedWords.push(word.innerText);
    });

    return extractedWords;
}

function exercise2SearchWord() {
    const wordListElement = document.getElementById('ejercicio2WordList');
    const searchWord = searchWordInput.value;
    const wordsElements = wordListElement.querySelectorAll('div');
    let words = exercise2ExtractWords();
    const foundClass = 'bg-warning-subtle';
    const createdClass = 'bg-success-subtle';
    const minWordLength = 5;

    validateInput(searchWord.length >= minWordLength, searchWordInput);
    toggleTextColor(searchWordInputInfo, searchWord.length >= minWordLength);

    if (searchWord.length < minWordLength) {
        return;
    }

    const foundAlert = AlertSuccess('Palabra encontrada', searchWord, 'bi-search');
    const addedWordAlert = AlertSuccess('Palabra agregada', searchWord, 'bi-plus-circle-fill');

    let found = words.find((word) => word === searchWord);
    wordClasses[searchWord] = found ? foundClass : createdClass;

    // Append word to word list and regenerate word list
    if (!found) {
        words.push(searchWord);
        words = sortWords(words);

        // Add class to new word
        wordsElements.forEach((word) => {
            if (word.innerText === searchWord) {
                word.classList.add(createdClass);
            }
        });

        // Prepend alert to alert container
        alertContainerFor(2).innerHTML = addedWordAlert + alertContainerFor(2).innerHTML;
    } else {
        // Prepend alert to alert container
        alertContainerFor(2).innerHTML = foundAlert + alertContainerFor(2).innerHTML
    }

    wordListElement.innerHTML = '';
    exercise2AppendWords(words);

    searchWordInput.value = '';
    alertContainerFor(2).classList.remove('d-none');
}

//-------------------- EVENT LISTENERS --------------------//
inputFor(1).addEventListener('input', function (event) {
    resetElementClasses(event.target, 'form-control');
    inputInfoFor(1).classList.remove('text-danger');
});

inputFor(2).addEventListener('input', function (event) {
    resetElementClasses(event.target, 'form-control');
    inputInfoFor(2).classList.remove('text-danger');
});

searchWordInput.addEventListener('input', function (event) {
    resetElementClasses(event.target, 'form-control');
    searchWordInputInfo.classList.remove('text-danger');
});

//--------------------------------------------------------//