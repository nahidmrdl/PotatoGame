function resetGame() {
    window.location.reload();
}

function initializeGame() {
    shuffleAndAssignMissions();
    displayAssignedMissions();
    showCurrentSeason();
    showCurrentMissions();

    displayGrid();
    setRandomCurrentElement();
    displayCurrentElementsGrid();
    showTimeValue();
    updateElapsedTimeInSeason();

    gridContainer.addEventListener("click", handleGridClick);
}

function newElement() {
    setRandomCurrentElement();
    getTimeValue();
    showTimeValue();
    displayCurrentElementsGrid();
}

const gridContainer = document.querySelector(".grid-container");
const currentElement = document.querySelector(".current-element");

const table = new Array(11).fill(0).map(() => new Array(11).fill(0));
const table1 = new Array(3).fill(0).map(() => new Array(3).fill(0));

for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        table[i][j] = "base_tile.png";
    }
}

for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        table1[i][j] = "base_tile.png";
    }
}

const mountainCells = [
    [2, 2],
    [4, 9],
    [6, 4],
    [9, 10],
    [10, 6]
];

mountainCells.forEach((cell) => {
    table[cell[0] - 1][cell[1] - 1] = "mountain_tile.png";
});

const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
            [0, 0, 0],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'village',
        shape: [[1, 1, 1],
            [0, 0, 0],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'plains',
        shape: [[1, 1, 1],
            [0, 0, 1],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
            [0, 0, 1],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'village',
        shape: [[1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'plains',
        shape: [[1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'village',
        shape: [[1, 1, 0],
            [1, 0, 0],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'village',
        shape: [[1, 1, 1],
            [1, 1, 0],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'plains',
        shape: [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'plains',
        shape: [[0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
            [1, 0, 0],
            [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
            [1, 1, 1],
            [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
            [1, 1, 0],
            [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]

let currElemData = null;

function setRandomCurrentElement() {
    const randomIndex = Math.floor(Math.random() * elements.length);
    const selectedElement = elements[randomIndex];

    currElemData = selectedElement;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const tileType = selectedElement.shape[i][j] ? `${selectedElement.type}_tile.png` : "base_tile.png";
            table1[i][j] = tileType;
        }
    }
}

function selectedCurrentElement() {
    return currElemData;
}

function getTimeValue() {
    return selectedCurrentElement().time;
}

function setTimeValue(time) {
    selectedCurrentElement().time = time;
}

function showTimeValue() {
    const ElementtimeValueSpan = document.getElementById("element-time-value");
    ElementtimeValueSpan.textContent = getTimeValue();
}

function updateElapsedTimeInSeason() {
    const elapsedTimeSpan = document.getElementById("time-count");
    elapsedTimeSpan.textContent = `${elapsedTime}/7`;
}

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
let currentSeasonIndex = 0;
let totalGameScore = 0;

function updateSeason() {
    if (elapsedTime >= 7) {
        const currentSeason = seasons[currentSeasonIndex];

        elapsedTime = 0;

        let seasonMissions = [];
        switch (currentSeason) {
            case 'Spring':
                seasonMissions = ['A', 'B'];
                break;
            case 'Summer':
                seasonMissions = ['B', 'C'];
                break
            case 'Autumn':
                seasonMissions = ['C', 'D'];
                break;
            case 'Winter':
                seasonMissions = ['D', 'A'];
                break;
            default:
                console.error(`Unknown season: ${currentSeason}`);
                return;
        }

        let seasonScore = 0;

        for (let missionKey of seasonMissions) {
            const mission = assignedMissions[missionKey];

            seasonScore += scoreMission(mission.title, currentSeason);
        }

        totalGameScore += seasonScore;

        console.log(`${currentSeason} Score: ${seasonScore}`);
        console.log(`Total Game Score: ${totalGameScore}`);

        const totalGameScoreSpan = document.getElementById("total-game-score");

        const currentSeasonScoreSpan = document.getElementById("current-season-score");
        const currentSeasonScoreItem = document.createElement("div");
        currentSeasonScoreItem.classList.add("current-season-score");
        currentSeasonScoreItem.innerHTML = `<p>${currentSeason} Score: ${seasonScore}</p>`;
        currentSeasonScoreSpan.appendChild(currentSeasonScoreItem);

        totalGameScoreSpan.textContent = totalGameScore;

        totalTimeUnits -= 7;

        if (totalTimeUnits <= 0) {

            totalGameScore += scoreMountainEncirclement();


            totalGameScoreSpan.textContent = totalGameScore;

            gameOver();
        }

        currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;

        showCurrentSeason();
        showCurrentMissions();
    }
}


function showCurrentSeason() {
    const seasonNameSpan = document.getElementById("season-name");
    seasonNameSpan.textContent = seasons[currentSeasonIndex];
}

function showCurrentMissions() {
    const missionA = assignedMissions['A'];
    const missionB = assignedMissions['B'];
    const missionC = assignedMissions['C'];
    const missionD = assignedMissions['D'];

    const currentSeason = seasons[currentSeasonIndex];

    const currentMissionsSpan = document.getElementById("missions-list");

    switch (currentSeason) {
        case 'Spring':
            currentMissionsSpan.textContent = ` ${missionA.title}, ${missionB.title}`;
            break;
        case 'Summer':
            currentMissionsSpan.textContent = ` ${missionB.title}, ${missionC.title}`;
            break;
        case 'Autumn':
            currentMissionsSpan.textContent = ` ${missionC.title}, ${missionD.title}`;
            break;
        case 'Winter':
            currentMissionsSpan.textContent = ` ${missionD.title}, ${missionA.title}`;
            break;
        default:
            break;
    }

}


function gameOver() {
    const gameOverMessage = document.getElementById("game-over-message");
    gameOverMessage.style.display = "block";
}

function openWarningPopup() {
    const warningPopup = document.getElementById("warning-popup");
    warningPopup.style.display = "block";
}

function closeWarningPopup() {
    const warningPopup = document.getElementById("warning-popup");
    warningPopup.style.display = "none";
}

function gameOverCantPlacePopup() {
    const gameOverCantPlaceMessage = document.getElementById("game-over-cant-place-message");
    gameOverCantPlaceMessage.style.display = "block";
}

function closeGameOverCantPlacePopup() {
    const warningPopup = document.getElementById("game-over-cant-place-message");
    warningPopup.style.display = "none";
}

let totalTimeUnits = 28;
let elapsedTime = 0;

function placeCurrentElement(row, col) {
    if (totalTimeUnits <= 0) {
        gameOverCantPlacePopup();
        gameOver();
        return;
    }


    if (row >= 0 && row < 11 && col >= 0 && col < 11) {

        let canPlace = true;
        for (let i = 0; i < 3 && canPlace; i++) {
            for (let j = 0; j < 3 && canPlace; j++) {
                const currentTileType = table1[i][j];
                const targetCellType = table[row + i][col + j];

                if (currentTileType !== "base_tile.png") {
                    if (targetCellType !== "base_tile.png") {

                        canPlace = false;
                    }
                }
            }
        }


        if (canPlace) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const currentTileType = table1[i][j];
                    if (currentTileType !== "base_tile.png") {
                        table[row + i][col + j] = currentTileType;
                    }
                }

            }


            elapsedTime += selectedCurrentElement().time;


            if (elapsedTime >= 7) {
                updateSeason();

                console.log("New season started!");
                elapsedTime = 0;
            }

            updateElapsedTimeInSeason();

            displayGrid();
            setRandomCurrentElement();
            displayCurrentElementsGrid();
            showTimeValue();


            if (totalTimeUnits <= 0) {
                console.log("Game Over!");
                gameOver();
            }
        } else {
            console.log("Cannot place the element here.");
            openWarningPopup();
        }

    }
}


function handleGridClick(event) {

    const rect = gridContainer.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const cellSize = rect.width / 11;
    const selectedRow = Math.floor((mouseY - cellSize) / cellSize);
    const selectedCol = Math.floor((mouseX - cellSize) / cellSize);

    placeCurrentElement(selectedRow, selectedCol);
}

function displayGrid() {
    gridContainer.innerHTML = "";
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            gridContainer.innerHTML += `<div class="grid-cell"><img class="grid-img" src="assets/tiles/${table[i][j]}"></div>`;
        }
    }
}

function displayCurrentElementsGrid() {
    currentElement.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            currentElement.innerHTML += `<div class="grid-cell"><img class="grid-img" src="assets/tiles/${table1[i][j]}"></div>`;
        }
    }
}

function rotateCurrentElement() {
    const rotatedElement = rotateMatrix(table1);
    updateCurrentElement(rotatedElement);
}

function mirrorCurrentElement() {
    const mirroredElement = mirrorMatrix(table1);
    updateCurrentElement(mirroredElement);
}

function rotateMatrix(matrix) {

    const size = matrix.length;
    const rotatedMatrix = new Array(size).fill(0).map(() => new Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            rotatedMatrix[j][size - 1 - i] = matrix[i][j];
        }
    }

    return rotatedMatrix;
}

function mirrorMatrix(matrix) {

    const size = matrix.length;
    const mirroredMatrix = new Array(size).fill(0).map(() => new Array(size).fill(0));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            mirroredMatrix[i][size - 1 - j] = matrix[i][j];
        }
    }

    return mirroredMatrix;
}

function updateCurrentElement(newElement) {

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            table1[i][j] = newElement[i][j];
        }
    }

    displayCurrentElementsGrid();

}

const missions =
    {
        "basic": [
            {
                "title": "Edge of the forest",
                "description": "You get one point for each forest field adjacent to the edge of your map."

            },
            {
                "title": "Sleepy valley",
                "description": "For every row with three forest fields, you get four points."
            },
            {
                "title": "Watering potatoes",
                "description": "You get two points for each water field adjacent to your farm fields."
            },
            {
                "title": "Borderlands",
                "description": "For each full row or column, you get six points."
            },
            {
                "title": "Tree line",
                "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts."
            },
            {
                "title": "Watering canal",
                "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."
            },
            {
                "title": "Wealthy town",
                "description": "You get three points for each of your village fields adjacent to at least three different terrain types."
            },
            {
                "title": "Magicians' valley",
                "description": "You get three points for your water fields adjacent to your mountain fields."
            },
            {
                "title": "Empty site",
                "description": "You get two points for empty fields adjacent to your village fields."
            },
            {
                "title": "Odd numbered silos",
                "description": "For each of your odd numbered full columns you get 10 points."
            },
            {
                "title": "Rich countryside",
                "description": "For each row with at least five different terrain types, you will receive four points."
            },
            {
                "title": "Row of houses",
                "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points."
            },
            {
                "title": "Mountain Encirclement",
                "description": "Score points for surrounded mountains at the end of the game."
            }
        ]
    };

const assignedMissions = {};

function shuffleAndAssignMissions() {
    const basicMissions = missions.basic.slice(0, -1);

    const shuffledMissions = shuffle(basicMissions);

    for (let i = 0; i < 4; i++) {
        const missionKey = String.fromCharCode(65 + i);
        assignedMissions[missionKey] = shuffledMissions[i];
        console.log(assignedMissions[missionKey]);
    }
}


function shuffle(array) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

function displayAssignedMissions() {
    const missionContainer = document.querySelector('.missions');

    for (let i = 0; i < 4; i++) {
        const missionKey = String.fromCharCode(65 + i);
        const mission = assignedMissions[missionKey];

        let missionImageSrc = '';

        switch (mission.title) {
            case 'Edge of the forest':
                missionImageSrc = 'assets/missions_eng/Group 69.png';
                break;
            case 'Sleepy valley':
                missionImageSrc = 'assets/missions_eng/Group 74.png';
                break;
            case 'Watering potatoes':
                missionImageSrc = 'assets/missions_eng/Group 70.png';
                break;
            case 'Borderlands':
                missionImageSrc = 'assets/missions_eng/Group 78.png';
                break;
            case 'Watering canal':
                missionImageSrc = 'assets/missions_eng/Group 75.png';
                break;
            case 'Wealthy town':
                missionImageSrc = 'assets/missions_eng/Group 71.png';
                break;
            case 'Magicians\' valley':
                missionImageSrc = 'assets/missions_eng/Group 76.png';
                break;
            case 'Empty site':
                missionImageSrc = 'assets/missions_eng/Group 77.png';
                break;
            case 'Odd numbered silos':
                missionImageSrc = 'assets/missions_eng/Group 73.png';
                break;
            case 'Rich countryside':
                missionImageSrc = 'assets/missions_eng/Group 79.png';
                break;
            case 'Tree line':
                missionImageSrc = 'assets/missions_eng/Group 68.png';
                break;
            case 'Row of houses':
                missionImageSrc = 'assets/missions_eng/Group 72.png';
                break;
            default:

                missionImageSrc = 'path/to/default_image.png';
        }

        const missionHTML = `<div style="text-align: center; margin-bottom: 50px; width: 355px; height: 130px;">
                                <h3 style="margin-left: 45px;border: 1px solid #ddd; padding: 5px; margin-top: 20px; border-radius: 5px; color: white; font-size: 18px; width: 250px; background-image: url('assets/bgback.png'); background-size: cover;">Mission ${missionKey}</h3>
                                <img src="${missionImageSrc}" alt="Mission ${missionKey} Image">
                            </div>`;
        missionContainer.innerHTML += missionHTML;
    }
}

function scoreMission(missionTitle, season) {
    let score = 0;

    switch (missionTitle) {
        case 'Edge of the forest':
            score = scoreEdgeOfForest();
            break;
        case 'Sleepy valley':
            score = scoreSleepyValley();
            break;
        case 'Watering potatoes':
            score = scoreWateringPotatoes();
            break;
        case 'Borderlands':
            score = scoreBorderlands();
            break;
        case 'Tree line':
            score = scoreTreeLine();
            break;
        case 'Watering canal':
            score = scoreWateringCanal();
            break;
        case 'Wealthy town':
            score = scoreWealthyTown();
            break;
        case 'Magicians\' valley':
            score = scoreMagiciansValley();
            break;
        case 'Empty site':
            score = scoreEmptySite();
            break;
        case 'Odd numbered silos':
            score = scoreOddNumberedSilos();
            break;
        case 'Rich countryside':
            score = scoreRichCountryside();
            break;
        case 'Row of houses':
            score = scoreTerracedHouse();
            break;
        case 'Mountain Encirclement':

            break;
        default:

            console.error(`Unknown mission title: ${missionTitle}`);
    }

    console.log(`Season: ${season}, Mission: ${missionTitle}, Score: ${score}`);


    const missionDetailsContainer = document.getElementById("mission-details");

    const missionDetailsItem = document.createElement("div");
    missionDetailsItem.classList.add("mission-details-item");
    missionDetailsItem.innerHTML = `<p>Mission: ${missionTitle}, Score: ${score}</p>`;
    missionDetailsContainer.appendChild(missionDetailsItem);


    return score;

}

function isMountain(row, col) {
    return table[row][col] === 'mountain_tile.png';
}

function isFarm(row, col) {
    return table[row][col] === 'plains_tile.png';

}

function isWater(row, col) {
    return table[row][col] === 'water_tile.png';
}


function isForest(row, col) {
    return table[row][col] === 'forest_tile.png';
}


function isVillage(row, col) {
    return table[row][col] === 'village_tile.png';
}

function isNotBaseTile(row, col) {
    return table[row][col] !== 'base_tile.png';
}

function isBaseTile(row, col) {
    return table[row][col] === 'base_tile.png';
}


function scoreEdgeOfForest() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {

            if (isForest(i, j)) {

                if (i === 0 || j === 0 || i === 10 || j === 10) {
                    score += 1;
                }
            }
        }
    }

    return score;
}

function scoreTerracedHouse() {
    let maxVillage = 0;
    let currentVillage = 0;
    let maxVillageCount = 0;

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 10; j++) {

            if (isVillage(i, j)) {
                currentVillage++;

                if (j === 9 || !isVillage(i, j + 1)) {
                    if (currentVillage > maxVillage) {
                        maxVillage = currentVillage;
                        maxVillageCount = 1;
                    } else if (currentVillage === maxVillage) {
                        maxVillageCount++;
                    }

                    currentVillage = 0;
                }
            }
        }
    }
    return 2 * maxVillage * maxVillageCount;
}


function scoreSleepyValley() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        let forestCount = 0;
        for (let j = 0; j < 11; j++) {
            if (isForest(i, j)) {
                forestCount++;
            }
        }
        if (forestCount === 3) {
            score += 4;
        }
    }

    return score;
}


function scoreMountainEncirclement() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {

            if (isMountain(i, j)) {

                if (i > 0 && j > 0 && i < 10 && j < 10) {
                    let surrounded = true;
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (x !== 0 || y !== 0) {
                                if (!isNotBaseTile(i + x, j + y)) {
                                    surrounded = false;
                                    break;
                                }
                            }
                        }
                        if (!surrounded) {
                            break;
                        }
                    }
                    if (surrounded) {
                        score += 1;
                        console.log(`Mountain at (${i + 1},${j + 1}) is surrounded.`);
                    } else {
                        console.log(`Mountain at (${i + 1},${j + 1}) is NOT surrounded.`);
                    }
                }
            }
        }
    }


    console.log(`Mountain Encirclement Score: ${score}`);
    const mountainEncirclementScoreElement = document.getElementById("mountain-encirclement-score");
    mountainEncirclementScoreElement.textContent = `Mountain Encirclement Score: ${score}`;

    return score;
}


function scoreWateringPotatoes() {
    let score = 0;
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (isWater(i, j)) {
                if ((i > 0 && isFarm(i - 1, j)) || (i < 10 && isFarm(i + 1, j)) || (j > 0 && isFarm(i, j - 1)) || (j < 10 && isFarm(i, j + 1))) {
                    score += 2;
                    console.log(`Water at (${i + 1},${j + 1}) is adjacent to a farm field.`);
                }
            }
        }
    }
    return score;
}


function scoreBorderlands() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        let rowFull = true;
        let colFull = true;

        for (let j = 0; j < 11; j++) {
            if (table[i][j] === 'base_tile.png') {
                rowFull = false;
            }
            if (table[j][i] === 'base_tile.png') {
                colFull = false;
            }
        }
        if (rowFull) {
            score += 6;
        }
        if (colFull) {
            score += 6;
        }
    }
    return score;
}

function scoreTreeLine() {
    let maxTreeLine = 0;
    let currentTreeLine = 0;

    for (let j = 0; j < 11; j++) {
        for (let i = 0; i < 11; i++) {
            if (table[i][j] === 'forest_tile.png') {
                currentTreeLine++;

                if (i === 10 || table[i + 1][j] !== 'forest_tile.png') {
                    if (currentTreeLine > maxTreeLine) {
                        maxTreeLine = currentTreeLine;
                    }
                    currentTreeLine = 0;
                }
            }
        }
    }
    return 2 * maxTreeLine;
}

function scoreWateringCanal() {
    let score = 0;

    for (let j = 0; j < 11; j++) {
        let farmCount = 0;
        let waterCount = 0;

        for (let i = 0; i < 11; i++) {
            if (isFarm(i, j)) {
                farmCount++;
            } else if (isWater(i, j)) {
                waterCount++;
            }
        }

        if (farmCount > 0 && waterCount > 0) {
            if (farmCount === waterCount) {
                score += 4;
            }
        }
    }
    return score;
}

function scoreWealthyTown() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (isVillage(i, j)) {
                const adjacentTerrainTypes = new Set();

                if (i > 0 && table[i - 1][j] !== 'base_tile.png') adjacentTerrainTypes.add(table[i - 1][j]);
                if (i < 10 && table[i + 1][j] !== 'base_tile.png') adjacentTerrainTypes.add(table[i + 1][j]);
                if (j > 0 && table[i][j - 1] !== 'base_tile.png') adjacentTerrainTypes.add(table[i][j - 1]);
                if (j < 10 && table[i][j + 1] !== 'base_tile.png') adjacentTerrainTypes.add(table[i][j + 1]);

                const uniqueTerrainCount = adjacentTerrainTypes.size;

                if (uniqueTerrainCount >= 3) {
                    score += 3;
                }
            }
        }
    }
    return score;
}

function scoreMagiciansValley() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (isWater(i, j)) {
                if ((i > 0 && isMountain(i - 1, j)) || (i < 10 && isMountain(i + 1, j)) || (j > 0 && isMountain(i, j - 1)) || (j < 10 && isMountain(i, j + 1))) {
                    score += 3;
                    console.log(`Water at (${i + 1},${j + 1}) is adjacent to a mountain field.`);
                }
            }
        }
    }
    return score;
}

function scoreEmptySite() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (table[i][j] === 'base_tile.png') {
                if (
                    (i > 0 && isVillage(i - 1, j)) ||
                    (i < 10 && isVillage(i + 1, j)) ||
                    (j > 0 && isVillage(i, j - 1)) ||
                    (j < 10 && isVillage(i, j + 1))
                ) {
                    score += 2;
                }
            }
        }
    }
    return score;
}

function scoreOddNumberedSilos() {
    let score = 0;

    for (let j = 0; j < 11; j += 2) {
        let full = true;
        for (let i = 0; i < 11; i++) {
            if (isBaseTile(i, j)) {
                full = false;
                break;
            }
        }
        if (full) {
            score += 10;
        }
    }
    return score;
}

function scoreRichCountryside() {
    let score = 0;

    for (let i = 0; i < 11; i++) {
        const terrainTypes = new Set();

        for (let j = 0; j < 11; j++) {
            if (isNotBaseTile(i, j)) {
                terrainTypes.add(table[i][j]);
            }
        }
        if (terrainTypes.size >= 5) {
            score += 4;
            console.log(`Row ${i + 1} has at least 5 different terrain types.`);
        }
    }
    return score;
}


document.addEventListener('DOMContentLoaded', function () {
    const backgroundMusic = document.getElementById('backgroundMusic');
    function handleMusicEnd() {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play()
            .catch(error => {
                console.error('Play failed:', error);
            });
    }

    function toggleMusic() {
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    }

    function playMusic() {
        backgroundMusic.play()
            .catch(error => {
                console.error('Play failed:', error);
            });

        backgroundMusic.addEventListener('ended', handleMusicEnd);
    }

    function pauseMusic() {
        backgroundMusic.pause();
    }

    function changeVolume() {
        const volumeSlider = document.getElementById('volumeSlider');
        backgroundMusic.volume = volumeSlider.value;
    }

    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', toggleMusic);

    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider.addEventListener('input', changeVolume);
});



initializeGame();
