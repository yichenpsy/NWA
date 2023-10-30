let selectedSubGoal = [];
let selectedCriterion = [];
let selectedPhone = [];

const pages = document.querySelectorAll('.page');
let currentPage = 1;
let pageData = {};
let currentPageID;


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
function nextPage() {
    pages.forEach((page, index) => {
      page.style.display = page.getAttribute('data-page') == currentPage + 1 ? 'block' : 'none';
      currentPageID = (page.style.display === 'block') ? page.id : currentPageID;
     });
    currentPage++;
    console.log('currentPage:',currentPage,currentPageID);
}

function prevPage() {
  pages.forEach((page, index) => {
    page.style.display = page.getAttribute('data-page') == currentPage - 1 ? 'block' : 'none';
    currentPageID = (page.style.display === 'block') ? page.id : currentPageID;
   });
  currentPage--;
  console.log('currentPage:',currentPage,currentPageID);
}

// Page 3 Gallery
const folderPath = 'pic/gallery_phone';
const galleryContainer = document.getElementById('gallery');

function populateGallery() {
  nextPage();
  const galleryContainer = document.getElementById("gallery");
  const imageFolder = "pic/gallery_phone/";

  galleryContainer.innerHTML = "";

  const imageNames = [
      "iPhone_15.jpg",
      "iPhone_15_Plus.jpg",
      "iPhone_15_Pro.jpg",
      "iPhone_15_Pro_Max.jpg",
      "iPhone_14.jpg",
      "iPhone_14_pro.jpg",
      "iPhone_14_pro_max.jpg",
      "iPhone_14_plus.jpg",
      "iPhone_SE_2022.jpg",
      "Samsung_Galaxy_S23_Ultra.jpg",
      "Samsung_Galaxy_S23.jpg",
      "Google_pixel_6.jpg",
      "OPPO_Find X5_Pro.jpg",
      "Samsung_Galaxy_S22.jpg",
      "Xiaomi_13_Pro.png",
      "Google_Pixel_7.jpg",
      "Google_Pixel_7_Pro.jpg",
      "Honor_50.jpg",
      "Nothing_Phone_1.jpg",
    ];

  imageNames.forEach((imageName) => {
    const imageSrc = imageFolder + imageName;
    const imageAlt = imageName.replace(".jpg", "").replace(/_/g, " ");
    const imageElement = document.createElement("img");
    imageElement.classList.add("gallery-pic");
    imageElement.src = imageSrc;

    const paraElement = document.createElement("p");
    paraElement.classList.add("gallery-para");
    paraElement.textContent = imageAlt;
  
    // user select phone
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = imageName; 

    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.appendChild(imageElement);
    gridItem.appendChild(paraElement);
    gridItem.appendChild(input);

    galleryContainer.appendChild(gridItem);
  });
}

function saveSelectedPhone(){
    // save selectedPhone in an array.
    const checkboxes = document.querySelectorAll('.grid-item');
    selectedPhone = Array.from(checkboxes)
        .filter(phone => phone.querySelector('input').checked)
        .map(phone => phone.querySelector('input').value);
    
    console.log(selectedPhone);
    nextPage();
}


// page 5 Select subGoal
// input: criterion data
function displaySubGoal(data) {
    nextPage();
    const container = document.getElementById("subGoalContainer"); 
    container.innerHTML = '';

    for (const subGoal in data) {
      // Create a title element to display the criteria name
      const label = document.createElement("label");
      label.className = "selectSubGoal";

      // Create an <input> element (checkbox)）
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "subGoal";
      input.value = subGoal; 

      label.appendChild(input); 
      label.appendChild(document.createTextNode(subGoalData[subGoal].title));

      // If there is explanatory text, create a new line and add the explanatory text
      if (subGoalData[subGoal].textExplain) {
        label.appendChild(document.createElement("br")); // create new line
        label.appendChild(document.createTextNode(subGoalData[subGoal].textExplain)); // add new explanation
      }

      container.appendChild(label);
    }
 }

// Page 6 Select criterion
function showSelectedSubGoal() {
    // save selectedSubGoal in an array.
    const checkboxes = document.querySelectorAll('.subGoal');
    selectedSubGoal = Array.from(checkboxes)
        .filter(subGoal => subGoal.checked)
        .map(subGoal => subGoalData[subGoal.value].title);
        
    console.log(selectedSubGoal)

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

const subGoalData = {
    sb1: {
      title: "Low price",
      textExplain: "xxxxx",
    },

    sb2: {
      title: "Memory Size",
      textExplain: "xxxx",
      criterion: {
        sb2_1: {
          title: "RAM",
          textExplain: "Random Access Memory (RAM) is an important component for the device's performance."
        },
        sb2_2: {
          title: "ROM",
          textExplain: "Read-Only Memory (ROM) stores the device's firmware and software."
        }
      }
    },

    sb3: {
      title: "Good quality",
      textExplain: "This criterion looks at the overall quality of the product.",
      criterion: {
        sb3_1: {
          title: "Camera",
          textExplain: "Camera quality evaluates the performance and features of the device's camera.",
          subCriterion: {
            sb3_1_1: {
              title: "Front Camera",
              textExplain: "Expian for front Camera"
            },
            sb3_1_2: {
              title: "Back Camera",
              textExplain: "Expian for back Camera"
            }
          }
        },
        sb3_2: {
          title: "Display",
          textExplain: "good display"
        }
      }
  }
}

// Page 7