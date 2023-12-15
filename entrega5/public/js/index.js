const socket = io();

const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const code = document.getElementById("code");
const stock = document.getElementById("stock");
const statuss = document.getElementById("status");
const category = document.getElementById("category");

const productData = document.getElementById("productos");

submit.addEventListener("click", (event) => {
  socket.emit("product", {
    title: title.value,
    description: description.value,
    price: parseInt(price.value),
    code: code.value,
    stock: parseInt(stock.value),
    status: statuss.value,
    category: category.value,
  });
});

socket.on("ProdLogs", (data) => {
    let showAll = () => {
        template(data);
  };
  let template = (arr) => {
    productData.innerHTML = "";
    const table = productData.appendChild(document.createElement("table"));
    table.style.border = "1px solid black";
    const tr = table.appendChild(document.createElement("tr"));
    tr.style.border = "1px solid black";
    [
      "Title",
      "Description",
      "Price",
      "Code",
      "Stock",
      "Status",
      "Category",
    ].map((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      tr.appendChild(th);
    });
    
             for (const item of arr) {
          const tr = table.appendChild(document.createElement('tr'));

          tr.appendChild(document.createElement('td')).textContent = item.title;
          tr.appendChild(document.createElement('td')).textContent = item.description;
          tr.appendChild(document.createElement('td')).textContent = item.price;
          tr.appendChild(document.createElement('td')).textContent = item.code;
          tr.appendChild(document.createElement('td')).textContent = item.stock;
          tr.appendChild(document.createElement('td')).textContent = item.status;
          tr.appendChild(document.createElement('td')).textContent = item.category;
        }

  };
 showAll();
});
