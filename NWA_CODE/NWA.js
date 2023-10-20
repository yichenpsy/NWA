let selectedSubGoal = [];
let selectedCriterion = [];

const criterionData = {
    "Low price": [],
    "Type of operating system": [],
    "Memory Size": ['RAM', 'ROM'],
    "Good Basic Functions": ['Voice quality', 'Network sensitivity', 'Wifi connection','Computing power', 'Localization'],
    "Good quality": ['Camera', 'Display','Battery', 'Handling','Stability'],
    "Design":['Suitable size','Suitable weight', 'Exterior design'],
    "Popularity":['number of ratings', 'Average customer rating']
};

const relatedCriterionData = {
    'Camera': ['Front Camera', 'Back Camera'],

};

// page turn
const pages = document.querySelectorAll('.page');
let currentPage = 0;
let pageData = {};

function updatePage() {
    pages.forEach((page, index) => {
        page.style.display = page.getAttribute('data-page') == currentPage + 1 ? 'block' : 'none';
    });
}

function nextPage() {
    currentPage++;
    updatePage();
}

function prevPage() {
    currentPage--;
    updatePage();
}

// Page 6 Select criterion
function showSelectedSubGoal() {
    const checkboxes = document.querySelectorAll('.subGoal');
    selectedSubGoal = Array.from(checkboxes)
        .filter(subGoal => subGoal.checked)
        .map(subGoal => subGoal.value);

    if (selectedSubGoal.length > 0) {
        nextPage();
        renderSelectedCriterion();
    } else {
        alert('please select!');
    }
}

function renderSelectedCriterion() {
    const selectedSubGoalElement = document.getElementById('selectedSubGoal');
    selectedSubGoalElement.innerHTML = '';

    selectedSubGoal.forEach(subGoal => {
        const subGoalContainer = document.createElement('div');
        subGoalContainer.classList.add('subGoal-container');

        const subGoalHeading = document.createElement('h4');
        subGoalHeading.style.marginTop = "10px"
        subGoalHeading.style.marginBottom = "3px"
        subGoalHeading.textContent = subGoal;

        const criterionList = document.createElement('ul');
        const criterion = criterionData[subGoal] || [];

        criterion.forEach(criterionName => {
            const criterionListItem = document.createElement('li');
            const criterionCheckbox = document.createElement('input');
            criterionCheckbox.type = 'checkbox';
            criterionCheckbox.value = criterionName;
            criterionCheckbox.addEventListener('change', handleCriterionChange);
            criterionListItem.appendChild(criterionCheckbox);
            criterionListItem.appendChild(document.createTextNode(criterionName));
            criterionList.appendChild(criterionListItem);
        });

        subGoalContainer.appendChild(subGoalHeading);
        subGoalContainer.appendChild(criterionList);
        selectedSubGoalElement.appendChild(subGoalContainer);
    });
}


function handleCriterionChange(event) {
    const criterionName = event.target.value;
    if (event.target.checked) {
        selectedCriterion.push(criterionName);
        // Get related criterions for this selection and add checkboxes
        const relatedCriterion = relatedCriterionData[criterionName] || [];
        if (relatedCriterion.length > 0) {
            const relatedCriterionList = document.createElement('ul');
            relatedCriterion.forEach(relatedCriterion => {
                const relatedCriterionListItem = document.createElement('li');
                const relatedCriterionCheckbox = document.createElement('input');
                relatedCriterionCheckbox.type = 'checkbox';
                relatedCriterionCheckbox.value = relatedCriterion;
                relatedCriterionCheckbox.addEventListener('change', handleCriterionChange);
                relatedCriterionListItem.appendChild(relatedCriterionCheckbox);
                relatedCriterionListItem.appendChild(document.createTextNode(relatedCriterion));
                relatedCriterionList.appendChild(relatedCriterionListItem);
            });
            event.target.parentElement.appendChild(relatedCriterionList);
        }
    } else {
        selectedCriterion = selectedCriterion.filter(criterion => criterion !== criterionName);
        // Remove related criterions when unchecking the main criterion
        const relatedCriterionList = event.target.parentElement.querySelector('ul');
        if (relatedCriterionList) {
            event.target.parentElement.removeChild(relatedCriterionList);
        }
    }
}



