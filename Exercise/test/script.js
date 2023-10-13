let selectedTypes = [];
let selectedProducts = [];

function goBack() {
    selectBeverageTypesPage.style.display = 'block';
    selectProductsPage.style.display = 'none';
}

function showSelectedBeverageTypes() {
    const checkboxes = document.querySelectorAll('.beverage-type');
    selectedTypes = Array.from(checkboxes)
        .filter(type => type.checked)
        .map(type => type.value);

    if (selectedTypes.length > 0) {
        selectBeverageTypesPage.style.display = 'none';
        selectProductsPage.style.display = 'block';
        renderSelectedBeverages();
    } else {
        alert('请选择至少一种饮料种类！');
    }
}

function renderSelectedBeverages() {
    const selectedBeverageTypesElement = document.getElementById('selectedBeverageTypes');
    selectedBeverageTypesElement.innerHTML = '';

    selectedTypes.forEach(type => {
        const typeContainer = document.createElement('div');
        typeContainer.classList.add('type-container');

        const typeHeading = document.createElement('h3');
        typeHeading.textContent = type;

        const productsList = document.createElement('ul');
        const products = productData[type] || [];

        products.forEach(productName => {
            const productListItem = document.createElement('li');
            const productCheckbox = document.createElement('input');
            productCheckbox.type = 'checkbox';
            productCheckbox.value = productName;
            productCheckbox.addEventListener('change', handleProductChange);
            productListItem.appendChild(productCheckbox);
            productListItem.appendChild(document.createTextNode(productName));
            productsList.appendChild(productListItem);
        });

        typeContainer.appendChild(typeHeading);
        typeContainer.appendChild(productsList);
        selectedBeverageTypesElement.appendChild(typeContainer);
    });
}

function handleProductChange(event) {
    const productName = event.target.value;
    if (event.target.checked) {
        selectedProducts.push(productName);
        // Get related products for this selection and add checkboxes
        const relatedProducts = relatedProductData[productName] || [];
        if (relatedProducts.length > 0) {
            const relatedProductsList = document.createElement('ul');
            relatedProducts.forEach(relatedProduct => {
                const relatedProductListItem = document.createElement('li');
                const relatedProductCheckbox = document.createElement('input');
                relatedProductCheckbox.type = 'checkbox';
                relatedProductCheckbox.value = relatedProduct;
                relatedProductCheckbox.addEventListener('change', handleProductChange);
                relatedProductListItem.appendChild(relatedProductCheckbox);
                relatedProductListItem.appendChild(document.createTextNode(relatedProduct));
                relatedProductsList.appendChild(relatedProductListItem);
            });
            event.target.parentElement.appendChild(relatedProductsList);
        }
    } else {
        selectedProducts = selectedProducts.filter(product => product !== productName);
        // Remove related products when unchecking the main product
        const relatedProductsList = event.target.parentElement.querySelector('ul');
        if (relatedProductsList) {
            event.target.parentElement.removeChild(relatedProductsList);
        }
    }
}

const productData = {
    Tea: ['Green Tea', 'Black Tea', 'Herbal Tea'],
    Coffee: ['Espresso', 'Cappuccino', 'Latte'],
    Soda: ['Cola', 'Lemon-Lime', 'Orange'],
    Juice: ['Apple Juice', 'Orange Juice', 'Grape Juice'],
    Water: ['Still Water', 'Sparkling Water']
};

const relatedProductData = {
    'Green Tea': ['Matcha', 'Pu-erh'],
    'Matcha': ['Matcha Latte', 'Matcha Frappe'],
    'Pu-erh': ['Pu-erh Loose Leaf', 'Pu-erh Cake'],
    'Espresso': ['Es1', 'Es2']
};
