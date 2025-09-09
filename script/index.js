// helpers 
const BDT = (n) => `৳ ${Number(n || 0).toLocaleString("en-BD")}`;
const show = (el) => el.classList.remove("hidden");
const hide = (el) => el.classList.add("hidden");

// remove active class from all category buttons
const clearActiveCategory = () => {
    document.querySelectorAll("#categories-list li").forEach(li => li.classList.remove("bg-green-700", "text-white"));
};

// elements
const categoriesContainer = document.getElementById("categories-list");
const treesContainer = document.getElementById("trees-container");
const treesSpinner = document.getElementById("trees-spinner");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");

// modal elements
const modal = document.getElementById("tree-modal");
const modalImg = document.getElementById("modal-img");
const modalName = document.getElementById("modal-name");
const modalDesc = document.getElementById("modal-desc");
const modalCategory = document.getElementById("modal-category");
const modalPrice = document.getElementById("modal-price");
const modalAddBtn = document.getElementById("modal-add");
const modalClose = document.getElementById("modal-close");

// state
let cart = [];
let currentModalTree = null;

// open modal
function openModal(tree) {
    currentModalTree = tree;
    modalImg.src = tree.image || "";
    modalName.textContent = tree.name || "Unknown";
    modalDesc.textContent = tree.description || "No description available.";
    modalCategory.textContent = tree.category || "Uncategorized";
    modalPrice.textContent = BDT(tree.price || 0);
    show(modal);
}

// close modal
modalClose.addEventListener("click", () => hide(modal));
modal.addEventListener("click", (e) => { if (e.target === modal) hide(modal); });

// add to cart from modal
modalAddBtn.addEventListener("click", () => {
    if (currentModalTree) {
        const treeId = currentModalTree.plantId || currentModalTree.id || currentModalTree._id || Math.random().toString(36).substr(2, 9);
        addToCart(treeId, currentModalTree.name, currentModalTree.price);
        hide(modal);
    }
});


// add item to cart
function addToCart(id, name, price) {
    const key = String(id);               // ensure ID is string
    const numericPrice = Number(price) || 0;  // ensure price is number

    // check if item already exists
    const existing = cart.find(item => String(item.id) === key);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: key, name: name || "Unknown", price: numericPrice, qty: 1 });
    }

    renderCart();
}

// remove item from cart
function removeFromCart(id) {
    const key = String(id);
    cart = cart.filter(item => String(item.id) !== key);
    renderCart();
}

// render cart UI
function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<li class="text-gray-500">Cart is empty.</li>`;
        cartTotalEl.textContent = BDT(0);
        return;
    }

    cart.forEach(item => {
        const itemTotal = Number(item.price) * Number(item.qty); // make sure it's a number
        total += itemTotal;

        const li = document.createElement("li");
        li.className = "flex justify-between items-center mb-2";
        li.innerHTML = `
            <span class="text-sm font-medium">${escapeHtml(item.name)}</span>
            <div class="flex items-center gap-2">
            <button class="decrease bg-gray-200 px-2 rounded">-</button>
            <span class="text-sm">x${item.qty}</span>
            <button class="increase bg-gray-200 px-2 rounded">+</button>
            <span class="text-sm font-semibold">${BDT(itemTotal)}</span>
            <button class="remove-btn text-red-500 font-bold px-2">❌</button>
            </div>
            `;
        cartItemsEl.appendChild(li);

        // increase/decrease/remove
        li.querySelector(".increase").addEventListener("click", () => {
            item.qty++;
            renderCart();
        });

        li.querySelector(".decrease").addEventListener("click", () => {
            if (item.qty > 1) {
                item.qty--;
            } else {
                cart = cart.filter(i => i.id !== item.id);
            }
            renderCart();
        });

        li.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(item.id));
    });

    cartTotalEl.textContent = BDT(total);
}



// escape html for safety
function escapeHtml(str) {
    return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// display trees
function displayTrees(trees) {
    treesContainer.innerHTML = "";

    trees.forEach(tree => {
        const div = document.createElement("div");
        div.className = "bg-white rounded-lg shadow-md p-4 flex flex-col";
        div.innerHTML = `
            <img class="w-full h-48 object-cover rounded-lg mb-2" src="${tree.image}" alt="${escapeHtml(tree.name || '')}">
            <h3 class="font-bold text-xl my-3 cursor-pointer">${escapeHtml(tree.name || '')}</h3>
            <p class="font-light">${tree.description ? escapeHtml(tree.description.slice(0, 100)) + "..." : "No description available."}</p>
            <div class="flex justify-between my-3">
            <p class="btn bg-green-200 text-green-700 rounded-full">${escapeHtml(tree.category || "")}</p>
            <p class="font-bold">${BDT(tree.price)}</p>
            </div>
            <button class="btn add-to-cart bg-green-800 text-white rounded-full w-full mt-2">Add to Cart</button>
            `;
        treesContainer.appendChild(div);

        // Add to cart button
        const addBtn = div.querySelector(".add-to-cart");
        const treeId = tree.plantId || tree.id || tree._id || Math.random().toString(36).substr(2, 9);
        addBtn.addEventListener("click", () => addToCart(treeId, tree.name, tree.price));


        // open modal on click
        div.querySelector("h3").addEventListener("click", () => openModal(tree));
        div.querySelector("img").addEventListener("click", () => openModal(tree));
    });
}

// category functions
function displayCategories(categories) {
    categoriesContainer.innerHTML = "";

    // All Trees button
    const allLi = document.createElement("li");
    allLi.className = "cursor-pointer p-2 rounded bg-green-700 text-white hover:bg-green-800";
    allLi.textContent = "All Trees";
    allLi.addEventListener("click", () => loadAllTrees(allLi));
    categoriesContainer.appendChild(allLi);

    categories.forEach(cat => {
        const li = document.createElement("li");
        li.className = "cursor-pointer p-2 rounded";
        li.textContent = cat.category_name;
        li.addEventListener("click", () => loadTreesByCategory(cat.id, li));
        categoriesContainer.appendChild(li);
    });
}

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err));
}

function loadAllTrees(el) {
    show(treesSpinner);
    treesContainer.innerHTML = "";
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            displayTrees(data.plants);
            if (el) {
                clearActiveCategory();
                el.classList.add("bg-green-700", "text-white");
            }
        })
        .catch(err => console.log(err))
        .finally(() => hide(treesSpinner));
}

function loadTreesByCategory(id, el) {
    show(treesSpinner);
    treesContainer.innerHTML = "";
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            displayTrees(data.plants);
            if (el) {
                clearActiveCategory();
                el.classList.add("bg-green-700", "text-white");
            }
        })
        .catch(err => console.log(err))
        .finally(() => hide(treesSpinner));
}

// initial load
loadCategories();
loadAllTrees();  // ✅ show all plants by default