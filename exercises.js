
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

const AlertError = (title, text, icon='bi-chat-left-dots-fill') => {
    return `<div class="alert alert-danger alert-dismissible fade show gap-3 d-flex align-items-center" role="alert">
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

//-------------------- CLASSES ----------------------//
class tableCrud {
    constructor(tableElement, headers = [], data = []) {
        this.tableElement = tableElement;
        this.tbodyElement = tableElement.createTBody();
        this.data = data;
        this.createHeader(headers);

        this.renderData();
    }

    createHeader(headers) {
        // Create header row inside thead
        const headerRow = this.tableElement.createTHead().insertRow();
        headers.forEach((header) => {
            const headerElement = document.createElement('th');
            headerElement.innerText = header;
            headerRow.appendChild(headerElement);
        });
    }

    searchOneDataByKey(key, value) {
        return this.data.find((data) => data[key] === value);
    }

    searchAllDataByKeyContains(key, value) {
        return this.data.filter((data) => data[key].includes(value));
    }

    emptyTable() {
        while (this.tableElement.rows.length > 1) {
            this.tableElement.deleteRow(1);
        }
    }

    emptyData() {
        this.data = [];
        this.emptyTable();
    }

    addData(data) {
        this.data.push(data);
        // Append data to tbody
        const row = this.tbodyElement.insertRow();
        Object.values(data).forEach((cell) => {
            const cellElement = row.insertCell();
            cellElement.innerText = cell;
        });
    }

    renderData() {
        this.emptyTable();
        this.data.forEach((data) => {
            this.addData(data);
        });
    }

    sortDataByKey(key) {
        this.data.sort((a, b) => a[key].localeCompare(b[key]));
        this.renderData();
    }

    editData(index, data) {
        this.data[index] = data;
        this.renderData();
    }

    deleteData(index) {
        this.data.splice(index, 1);
        this.renderData();
    }

    filterData(callback) {
        return this.data.filter(callback);
    }
}

//-------------------- VARIABLES --------------------//
const inputFor = (exerciseNumber) => document.getElementById(`ejercicio${exerciseNumber}Input`);
const inputInfoFor = (exerciseNumber) => document.getElementById(`ejercicio${exerciseNumber}InputInfo`);
const alertContainerFor = (exerciseNumber) => document.getElementById(`Ejercicio${exerciseNumber}Results`);

// EXERCISE 2
const searchWordInput = document.getElementById('ejercicio2Search');
const searchWordInputInfo = document.getElementById('ejercicio2SearchInfo');
let wordClasses = {};

// EXERCISE 3
const exercise3MainContent = document.getElementById('Ejercicio3Content');
const exercise3Modal = new bootstrap.Modal(document.getElementById('Ejercicio3Modal'));
const minStudents = 4;
const studentTable = document.getElementById('Ejercicio3StudentTable');
const studentCrud = new tableCrud(studentTable, ['Nombre', 'Nota']);



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

// function emptyTable(table) {
//     while (table.rows.length > 1) {
//         table.deleteRow(1);
//     }
//
// }
//
// function appendToTable(data, table) {
//     const row = table.insertRow();
//     data.forEach((cell) => {
//         const cellElement = row.insertCell();
//         cellElement.innerText = cell;
//     });
// }
//
// function sortObjectArrayByKey(array, key) {
//     return array.sort((a, b) => a[key].localeCompare(b[key]));
// }

function unionArrays(array1, array2) {
    return array1.concat(array2);
}

function intersectionArrays(array1, array2) {
    return array1.filter((value) => array2.includes(value));
}

function differenceArrays(array1, array2) {
    return array1.filter((value) => !array2.includes(value));
}

function excludeSameValues(array1, array2) {
    return differenceArrays(unionArrays(array1, array2), intersectionArrays(array1, array2));
}

function removeAccents(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getAlphabeticCharacters(string) {
    return string.replace(/[^a-zA-Z]/g, '');
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

    // Empty word classes
    wordClasses = {};

    // Reset search word input
    searchWordInput.value = '';
    resetElementClasses(searchWordInput, 'form-control');
    searchWordInputInfo.classList.remove('text-danger');

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

function validateStudentName(name) {
    return name.length > 0;
}

function validateStudentGrade(grade) {
    return grade >= 0 && grade <= 10 && grade !== '';
}


function exercise3SaveStudent() {
    const inputStudentName = document.getElementById('ejercicio3StudentName');
    const inputStudentGrade = document.getElementById('ejercicio3StudentGrade');
    const studentAddButton = document.getElementById('Ejercicio3AddStudent');
    const searchStudentInput = document.getElementById('ejercicio3Search');
    const studentNameIsValid = validateStudentName(inputStudentName.value);
    const studentGradeIsValid = validateStudentGrade(inputStudentGrade.value);

    validateInput(studentNameIsValid, inputStudentName);
    validateInput(studentGradeIsValid, inputStudentGrade);

    if (!studentNameIsValid || !studentGradeIsValid) {
        return;
    }

    resetElementClasses(inputStudentName, 'form-control');
    resetElementClasses(inputStudentGrade, 'form-control');

    studentCrud.addData({
        name: inputStudentName.value,
        grade: inputStudentGrade.value
    });

    if (studentCrud.data.length === minStudents) {
        studentAddButton.classList.add('d-none');
        exercise3MainContent.classList.remove('d-none');

    }else if (studentCrud.data.length > minStudents) {
        // emptyTable(studentTable);
        //
        // sortObjectArrayByKey(students, 'name').forEach((student) => {
        //     appendToTable([student.name, student.grade], studentTable);
        // });
        studentCrud.sortDataByKey('name');
        const studentAdded = studentCrud.searchOneDataByKey('name', inputStudentName.value);
        alertContainerFor(3).innerHTML = AlertSuccess('Alumno agregado', `${studentAdded.name} con una nota de ${studentAdded.grade}`, 'bi-person-plus-fill')
            + alertContainerFor(3).innerHTML;
        alertContainerFor(3).classList.remove('d-none');
        searchStudentInput.value = '';
    }

    inputStudentName.value = '';
    inputStudentGrade.value = '';

    exercise3UpdateAverage();

    if(studentCrud.data.length >= minStudents) {
        exercise3Modal.hide();
    }
}

function exercise3UpdateAverage() {
    const average = studentCrud.data.reduce((acc, student) => acc + parseInt(student.grade), 0) / studentCrud.data.length;
    const averageElement = document.getElementById('Ejercicio3Average');

    averageElement.innerText = average.toFixed(2);
}

function exercise3SearchStudent() {
    const searchStudentInput = document.getElementById('ejercicio3Search');
    const searchStudentName = searchStudentInput.value;
    const searchStudentNameIsValid = validateStudentName(searchStudentName);
    const searchStudentGrade = studentCrud.searchOneDataByKey('name', searchStudentName);
    const modalBody = document.getElementById('Ejercicio3ModalBody');
    const inputStudentName = document.getElementById('ejercicio3StudentName');

    validateInput(searchStudentNameIsValid, searchStudentInput);

    if (!searchStudentNameIsValid) {
        return;
    }

    resetElementClasses(searchStudentInput, 'form-control');

    if (searchStudentGrade) {
        alertContainerFor(3).innerHTML = AlertSuccess('Alumno encontrado', `${searchStudentName} con una nota de ${searchStudentGrade.grade}`, 'bi-person-check-fill')
            + alertContainerFor(3).innerHTML;
        alertContainerFor(3).classList.remove('d-none');
    } else {
        // Seacrh others alerts in modal body and remove them
        modalBody.querySelectorAll('.alert').forEach((alert) => {
            alert.remove();
        });
        modalBody.insertAdjacentHTML('afterbegin', AlertError('Alumno no encontrado', `${searchStudentName} no se encuentra en la lista de alumnos`, 'bi-person-x-fill'));
        inputStudentName.value = searchStudentName;
        exercise3Modal.show();
    }
}

function exercise4() {
    const multiplesOfTwo = [];
    const multiplesOfThree = [];

    for (let i = 1; i <= 30; i++) {
        if (i % 2 === 0) {
            multiplesOfTwo.push(i);
        }

        if (i % 3 === 0) {
            multiplesOfThree.push(i);
        }
    }

    // Union of multiples of two and three
    const union = unionArrays(multiplesOfTwo, multiplesOfThree);

    // Intersection of multiples of two and three
    const intersection = intersectionArrays(multiplesOfTwo, multiplesOfThree);

    // Difference of multiples of two and three
    const difference = differenceArrays(multiplesOfTwo, multiplesOfThree);

    // Difference of multiples of three and two
    const difference2 = differenceArrays(multiplesOfThree, multiplesOfTwo);

    // Exclude same values of multiples of two and three
    const exclude = excludeSameValues(multiplesOfTwo, multiplesOfThree);

    alertContainerFor(4).innerHTML =
        AlertSuccess('Union', union.join(', '), 'bi-emoji-laughing-fill')
        + AlertSuccess('Intersección', intersection.join(', '), 'bi-emoji-laughing-fill')
        + AlertSuccess('Diferencia con multiplos de dos', difference.join(', '), 'bi-emoji-laughing-fill')
        + AlertSuccess('Diferencia con multiplos de tres', difference2.join(', '), 'bi-emoji-laughing-fill')
        + AlertSuccess('Excluir iguales', exclude.join(', '), 'bi-emoji-laughing-fill');

    alertContainerFor(4).classList.remove('d-none');
}

function exercise5() {
    const numbers = inputFor(5).value;
    const numbersArray = numbers.split(',').map((number) => parseInt(number));
    const allNumbers = numbersArray.every((number) => number > 0);

    validateInput(allNumbers, inputFor(5));
    toggleTextColor(inputInfoFor(5), allNumbers);

    if (!allNumbers) {
        return;
    }

    // Only numbers that appear once
    const uniqueNumbers = numbersArray.filter((number) => numbersArray.indexOf(number) === numbersArray.lastIndexOf(number));
    const numberSum = uniqueNumbers.reduce((prev, number) => prev + number, 0);
    const average = (numberSum / uniqueNumbers.length).toFixed(2);

    alertContainerFor(5).innerHTML =
        AlertSuccess('Numeros únicos', uniqueNumbers.join(', '), 'bi-inboxes-fill')
        + AlertSuccess('Promedio', average, 'bi-globe');

    alertContainerFor(5).classList.remove('d-none');
}

function exercise6() {
    const text = inputFor(6).value;
    const formattedText = getAlphabeticCharacters(removeAccents(text.toLowerCase()));
    const isPalindrome = formattedText === formattedText.split('').reverse().join('');

    validateInput(text !== '', inputFor(6));

    if (text === '') {
        return;
    }

    if (isPalindrome) {
        alertContainerFor(6).innerHTML = AlertSuccess('Resultado', `El texto "${text}" es un palíndromo`, 'bi-check-circle-fill');
    }else {
        alertContainerFor(6).innerHTML = AlertError('Resultado',`El texto "${text}" no es un palíndromo`, 'bi-x-circle-fill');
    }

    alertContainerFor(6).classList.remove('d-none');
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

inputFor(5).addEventListener('input', function (event) {
    resetElementClasses(event.target, 'form-control');
    inputInfoFor(5).classList.remove('text-danger');
});

inputFor(6).addEventListener('input', function (event) {
    resetElementClasses(event.target, 'form-control');
    inputInfoFor(6).classList.remove('text-danger');
});

//--------------------------------------------------------//