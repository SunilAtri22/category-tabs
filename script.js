document.addEventListener("DOMContentLoaded", function () {
   
    let currentCategory = "Men";

    const tabButtons = document.querySelectorAll('.tab-container button');
    const productContainer = document.querySelector('.product-container');

    function showProducts(category) {
        fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
            .then(response => response.json())
            .then(data => {
                const categoryData = data.categories.find(cat => cat.category_name === category);

                if (categoryData) {
                    renderProducts(categoryData.category_products);
                }
            });
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.textContent;
            showProducts(currentCategory);
        });
    });

    function calculateDiscount(price, comparePrice) {
        const discount = ((comparePrice - price) / comparePrice) * 100;
        return discount.toFixed(0) + '% Off';
    }

    function renderProducts(products) {
        productContainer.innerHTML = '';

        products.forEach(product => {
            const discount = calculateDiscount(parseFloat(product.price), parseFloat(product.compare_at_price));

            const shortTitle = product.title.substring(0, 11);

            const productCard = `
                <div class="product-card">
                    <div class="img-badge">
                    <img class="image" src="${product.image}" alt="${product.title}" />
                    <div class="badge">${product.badge_text ? product.badge_text : ''}</div>
                    </div>
                    <div class="product">
                        <div class="product-title">${shortTitle}${product.title.length > 11 ? '...' : ''}</div>
                        <div class="vendor">${'• '}${product.vendor}</div>
                    </div>
                    <div class="price">
                        <strong class="selling-price">Rs ${product.price}.00</strong>
                        <div class="compare-price">${product.compare_at_price}.00</div>
                        <div class="discount">${discount}</div>
                    </div>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            `;

            productContainer.innerHTML += productCard;
        });
    }

    window.showProducts = showProducts;
    showProducts(currentCategory);
    tabButtons[0].classList.add('active');
});
