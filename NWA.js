let selectedSubGoal = [];
let selectedCriterion = [];

function goBack() {
    selectSubGoalPage.style.display = 'block';
    selectCriterionPage.style.display = 'none';
}

function showSelectedSubGoal() {
    const checkboxes = document.querySelectorAll('.subGoal');
    selectedSubGoal = Array.from(checkboxes)
        .filter(subGoal => subGoal.checked)
        .map(subGoal => subGoal.value);

    if (selectedSubGoal.length > 0) {
        selectSubGoalPage.style.display = 'none';
        selectCriterionPage.style.display = 'block';
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

        const subGoalHeading = document.createElement('h3');
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

const criterionData = {
    sg1: ['Green Tea', 'Black Tea', 'Herbal Tea'],
    sg2: ['Espresso', 'Cappuccino', 'Latte'],
    sg3: ['Cola', 'Lemon-Lime', 'Orange'],
    sg4: ['Apple Juice', 'Orange Juice', 'Grape Juice'],
    sg5: ['Still Water', 'Sparkling Water']
};

const relatedCriterionData = {
    'Green Tea': ['Matcha', 'Pu-erh'],
    'Matcha': ['Matcha Latte', 'Matcha Frappe'],
    'Pu-erh': ['Pu-erh Loose Leaf', 'Pu-erh Cake']
};
