let menuBtn = document.querySelector(".navbar__menu-btn");
let navLinks = document.querySelector(".navbar__links");
let overlay = document.querySelector(".overlay");
let closeBtn = document.querySelector(".navbar__close-btn");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("navbar__links--active");
    overlay.classList.toggle("overlay--active");
});

overlay.addEventListener("click", () => {
    navLinks.classList.remove("navbar__links--active");
    overlay.classList.remove("overlay--active");
});

closeBtn.addEventListener("click", () => {
    navLinks.classList.remove("navbar__links--active");
    overlay.classList.remove("overlay--active");
});

let minusBtn = document.querySelector(".product__minus-btn");
let plusBtn = document.querySelector(".product__plus-btn");
let quantityInput = document.querySelector(".product__quantity");

minusBtn.addEventListener("click", () => {
    let quantity = Number(quantityInput.value);
    
    if(quantity > 0) {
        quantityInput.value = quantity - 1;
    }
});

plusBtn.addEventListener("click", () => {
    let quantity = Number(quantityInput.value);

    quantityInput.value = quantity + 1;
});

let addToCartBtn = document.querySelector(".product__add-to-cart");
let products = [];
let cartBadge = document.querySelector(".navbar__cart-badge");

function renderCart(){
    let container = document.querySelector(".shopping-cart__text");

    if(products.length) {
        container.innerHTML = `<div class="shopping-cart__item-btn">
                                 <div class="shopping-cart__item">
                                 <img class="shopping-cart__img" src="${products[0].img}">
                                 <div class="shopping-cart__item-name-price">
                                   <span>${products[0].name}</span>
                                   <div class="shopping-cart__item-price">
                                     <span>${products[0].price} x ${products[0].quantity}</span>
                                     <strong>$${Number((products[0].price.replace("$", "")) * products[0].quantity).toFixed(2)}</strong>
                                   </div>
                                 </div>
                                 <div class="shopping-cart__delete">
                                   <button class="shopping-cart__delete-btn">
                                     <img src="images/icon-delete.svg">
                                   </button>
                                 </div>
                                 </div>
                                 <button class="shopping-cart__item-checkout-btn">
                                   <span>Checkout</span>
                                 </button>
                               </div>`;

        let totalQuantity = products.reduce((acc, p) => acc + p.quantity, 0);
        cartBadge.textContent = totalQuantity;
        cartBadge.classList.add("navbar__cart-badge--active");

        document.querySelector(".shopping-cart__delete-btn").addEventListener("click", () => {
            products = [];
            cartBadge.classList.remove("navbar__cart-badge--active");
            renderCart();
        });
    } else {
        container.innerHTML = `<span>Your cart is empty.</span>`;
    }
}

let productName = document.querySelector(".product__info h1").textContent;
let productPrice = document.querySelector(".product__price").textContent;
let productImgSrc = document.querySelector(".product__product-img").src;

addToCartBtn.addEventListener("click", () => {
    if(Number(quantityInput.value) > 0){
        let existing = products.find(p => p.name === productName);

        if(existing){
            existing.quantity += Number(quantityInput.value);
        } else {
            products.push({
                name: productName,
                price: productPrice,
                img: productImgSrc,
                quantity: Number(quantityInput.value)
            });
        }

        renderCart();

        quantityInput.value = 0;
    }
});

let cartBtn = document.querySelector(".navbar__cart-btn");

cartBtn.addEventListener("click", () => {
    let shoppingCart = document.querySelector(".shopping-cart");

    shoppingCart.classList.toggle("shopping-cart--active");
});

let images = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg"
];
let curIdx = 0;

let prevBtn = document.querySelector(".product__prev-btn");
let nextBtn = document.querySelector(".product__next-btn");
let productImg = document.querySelector(".product__product-img");
let lightboxOverlay = document.querySelector(".lightbox__overlay");

productImg.addEventListener("click", () => {
    if(window.innerWidth >= 900) {
        lightBoxCurIdx = 0;
        lightboxImg.src = images[0];

        lightboxThumbnailBtns.forEach((btn, index) => {
            btn.classList.remove("lightbox__thumbnail-btn--active");
            if(index === 0) {
                btn.classList.add("lightbox__thumbnail-btn--active");
            }
        });
        
        lightBox.classList.toggle("lightbox--active");
        lightboxOverlay.classList.toggle("lightbox__overlay--active");
    }
});

lightboxOverlay.addEventListener("click", () => {
    if(window.innerWidth >= 900) {
        lightBox.classList.remove("lightbox--active");
        lightboxOverlay.classList.remove("lightbox__overlay--active");
    }
});

prevBtn.addEventListener("click", () => {
    if(curIdx > 0) {
        curIdx -= 1;
        productImg.src = images[curIdx];
    }
});

nextBtn.addEventListener("click", () => {
    if(curIdx < images.length - 1) {
        curIdx += 1;
        productImg.src = images[curIdx];
    }
});

let thumbnailBtns = document.querySelectorAll(".product__thumbnail-btn");

thumbnailBtns[0].classList.add("product__thumbnail-btn--active");

thumbnailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        productImg.src = btn.dataset.img;

        thumbnailBtns.forEach((b) => {
            b.classList.remove("product__thumbnail-btn--active");
        });

        btn.classList.add("product__thumbnail-btn--active");
    });
});

let lightboxThumbnailBtns = document.querySelectorAll(".lightbox__thumbnail-btn");
let lightBox = document.querySelector(".lightbox");
let lightboxImg = document.querySelector(".lightbox__product-img");
let lightBoxCloseBtn = document.querySelector(".lightbox__close-btn");
let lightBoxPrevBtn = document.querySelector(".lightbox__prev-btn");
let lightBoxNextBtn = document.querySelector(".lightbox__next-btn");
let lightBoxCurIdx = 0;

lightboxThumbnailBtns[0].classList.add("lightbox__thumbnail-btn--active");

lightboxThumbnailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        lightboxImg.src = btn.dataset.img;
        lightBoxCurIdx = Number(btn.dataset.idx);

        lightboxThumbnailBtns.forEach((b) => {
            b.classList.remove("lightbox__thumbnail-btn--active");
        });

        btn.classList.add("lightbox__thumbnail-btn--active");
    });
});

lightBoxCloseBtn.addEventListener("click", () => {
    if(window.innerWidth >= 900) {
        lightBox.classList.remove("lightbox--active");
        lightboxOverlay.classList.remove("lightbox__overlay--active");
    }
});

lightBoxPrevBtn.addEventListener("click", () => {
    if(window.innerWidth >= 900) {
        if(lightBoxCurIdx > 0){
            lightBoxCurIdx -= 1;
            lightboxImg.src = images[lightBoxCurIdx];
            lightboxThumbnailBtns.forEach((btn) => {
                if(images[lightBoxCurIdx] === btn.dataset.img) {
                    lightboxThumbnailBtns.forEach((b) => {
                        b.classList.remove("lightbox__thumbnail-btn--active");
                    });

                    btn.classList.add("lightbox__thumbnail-btn--active");
                }
            });
        }
    }
});

lightBoxNextBtn.addEventListener("click", () => {
    if(window.innerWidth >= 900) {
        if(lightBoxCurIdx < images.length - 1){
            lightBoxCurIdx += 1;
            lightboxImg.src = images[lightBoxCurIdx];
            lightboxThumbnailBtns.forEach((btn) => {
                if(images[lightBoxCurIdx] === btn.dataset.img) {
                    lightboxThumbnailBtns.forEach((b) => {
                        b.classList.remove("lightbox__thumbnail-btn--active");
                    });

                    btn.classList.add("lightbox__thumbnail-btn--active");
                }
            });
        }
    }
});