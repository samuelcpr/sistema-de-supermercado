let products = [];
let stock = [];

// Função para atualizar a tabela de produtos
function updateProductTable() {
  const productTableBody = document.querySelector("#productTable tbody");
  productTableBody.innerHTML = "";

  products.forEach((product) => {
    const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.barcode}</td>
                <td>${product.manufacturer}</td>
                <td>${product.category}</td>
                <td>${product.unit}</td>
            </tr>
        `;
    productTableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Função para adicionar produtos
document.querySelector("#productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Coleta os dados do formulário
  const product = {
    name: document.querySelector("#productName").value,
    description: document.querySelector("#productDescription").value,
    price: parseFloat(document.querySelector("#productPrice").value),
    barcode: document.querySelector("#productBarcode").value,
    manufacturer: document.querySelector("#productManufacturer").value,
    category: document.querySelector("#productCategory").value,
    unit: document.querySelector("#productUnit").value,
  };

  // Adiciona o produto no array
  products.push(product);

  // Atualiza a tabela de produtos
  updateProductTable();

  // Limpa o formulário
  this.reset();
});

// Função para atualizar o dropdown de produtos na página de estoque
function updateProductDropdown() {
  const productDropdown = document.querySelector("#productNameStock");
  productDropdown.innerHTML = "";

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productDropdown.appendChild(option);
  });
}

// Função para atualizar a tabela de estoque
function updateStockTable() {
  const stockTableBody = document.querySelector("#stockTable tbody");
  stockTableBody.innerHTML = "";

  stock.forEach((item) => {
    const alertStatus = item.quantity < item.minStock ? "Estoque Baixo!" : "";
    const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.minStock}</td>
                <td class="alert">${alertStatus}</td>
            </tr>
        `;
    stockTableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Função para adicionar ou atualizar o estoque
document.querySelector("#stockForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const productName = document.querySelector("#productNameStock").value;
  const quantity = parseInt(document.querySelector("#productQuantity").value);
  const minStock = parseInt(document.querySelector("#minStockLevel").value);

  const existingStock = stock.find((item) => item.name === productName);

  if (existingStock) {
    existingStock.quantity = quantity;
    existingStock.minStock = minStock;
  } else {
    stock.push({ name: productName, quantity, minStock });
  }

  updateStockTable();

  this.reset();
});

// Função para adicionar classificação de produtos
document
  .querySelector("#classificationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const classification = {
      category: document.querySelector("#productCategory").value,
      subcategory: document.querySelector("#productSubcategory").value,
      brand: document.querySelector("#productBrand").value,
    };

    const classificationTableBody = document.querySelector(
      "#classificationTable tbody"
    );
    const row = `
        <tr>
            <td>${classification.category}</td>
            <td>${classification.subcategory}</td>
            <td>${classification.brand}</td>
        </tr>
    `;
    classificationTableBody.insertAdjacentHTML("beforeend", row);

    // Limpa o formulário
    this.reset();
  });
