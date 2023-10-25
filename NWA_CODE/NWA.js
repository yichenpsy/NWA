let selectedSubGoal = [];
let selectedCriterion = [];

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
  // document.body.innerHTML = '';
  const galleryContainer = document.getElementById("gallery");
  const imageFolder = "pic/gallery_phone/";

  galleryContainer.innerHTML = "";

  const imageNames = [
      "iphone_14.jpg",
      "iphone_14_pro.jpg",
      "iphone_14_pro_max.jpg",
      "iphone_14_plus.jpg",
      "iphone_SE_2022.jpg",
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

    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.appendChild(imageElement);
    gridItem.appendChild(paraElement);

    galleryContainer.appendChild(gridItem);
  });
}


// page 5 Select subGoal
function displaySubGoal(data) {
    nextPage();
    const container = document.getElementById("subGoalContainer"); 
    container.innerHTML = '';

    for (const subGoal in data) {
      // 创建一个标题元素来显示标准的名称
      const label = document.createElement("label");
      label.className = "selectSubGoal";

      // 创建一个 <input> 元素（复选框）
      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "subGoal";
      input.value = subGoal; 

      label.appendChild(input); 
      label.appendChild(document.createTextNode(subGoal));

      // 如果有解释性文本，创建新行并添加解释性文本
      if (subGoalData[subGoal].textExplain) {
        label.appendChild(document.createElement("br")); // 创建新行
        label.appendChild(document.createTextNode(subGoalData[subGoal].textExplain)); // 添加解释性文本
      }

      container.appendChild(label);

    }
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

const subGoalData = {
    "Low price": {
      textExplain: "xxxxx",
    },

    "Memory Size": {
      textExplain: "xxxx",
      criteria: {
        "RAM": {
          textExplain: "Random Access Memory (RAM) is an important component for the device's performance."
        },
        "ROM": {
          textExplain: "Read-Only Memory (ROM) stores the device's firmware and software."
        }
      }
    },

    "Good quality": {
      textExplain: "This criterion looks at the overall quality of the product.",
      Criteria: {
        "Camera": {
          textExplain: "Camera quality evaluates the performance and features of the device's camera.",
          subCriteria: {
            "Front Camera": {
              textExplain: "Expian for front Camera"
            },
            "Back Camera": {
              textExplain: "Expian for back Camera"
            }
          }
        },
        "Display": {
          textExplain: "good display"
        }
      }
  }
}
