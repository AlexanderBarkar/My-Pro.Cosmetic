const products = [
  {
    id: 1,
    name: "Ніжний крем для обличчя",
    price: 1290,
    image: "https://images.prom.ua/5342844243_w600_h600_5342844243.jpg",
    description: "Зволожує та живить шкіру, надає свіжості та сяйва."
  },
  {
    id: 2,
    name: "Основа, що матує",
    price: 1590,
    image: "https://content2.rozetka.com.ua/goods/images/big/275935211.jpg",
    description: "Тримає макіяж протягом усього дня, контролює блиск."
  },
  {
    id: 3,
    name: "Блиск для губ з вітаміном Е",
    price: 850,
    image: "https://mona.com.ua/image/catalog/Product_photo_MONA/cherel/00000053946.jpg",
    description: "Надає губам ніжного блиску і піклується про них.."
  },
  {
    id: 4,
    name: "Тонік для обличчя з екстрактом троянди",
    price: 990,
    image: "https://livesta.com.ua/image/cache/import_files/ac/acd02025a46b11ed96413cecef28bac7_d35e1a45d79b11ed96423cecef28bac7-400x400.jpg",
    description: "Освіжає шкіру та звужує пори."
  },
  {
    id: 5,
    name: "Маска для обличчя зволожуюча",
    price: 1290,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpfqtdRnZtKGMG2n4EHD9caxGuDpzSZIxWJg&s",
    description: "Глибоке зволоження та відновлення шкіри."
  },
  {
    id: 6,
    name: "Тональний крем легкий",
    price: 1790,
    image: "https://media.prostor.ua/catalog/product/2/0/206988.png?width=370&height=370",
    description: "Природне покриття без ефекту маски."
  }
];

// Рендерим продукты
const productsContainer = document.getElementById('productsContainer');

function renderProducts() {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <div class="price">${product.price} грн</div>
      <button aria-label="Добавить ${product.name} в корзину">В корзину</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => addToCart(product.id));
    productsContainer.appendChild(card);
  });
}

// Работа с корзиной
const cart = document.getElementById('cart');
const cartItemsList = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartToggleBtn = document.getElementById('cartToggleBtn');
const closeCartBtn = document.getElementById('closeCartBtn');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function addToCart(id) {
  const found = cartItems.find(item => item.id === id);
  if (found) {
    found.count++;
  } else {
    const product = products.find(p => p.id === id);
    cartItems.push({...product, count: 1});
  }
  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function clearCart() {
  cartItems = [];
  saveCart();
  renderCart();
}

function calculateTotal() {
  return cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
}

function renderCart() {
  cartItemsList.innerHTML = '';
  if (cartItems.length === 0) {
    cartItemsList.innerHTML = '<li>Кошик порожній</li>';
    clearCartBtn.disabled = true;
    checkoutBtn.disabled = true;
    cartTotal.textContent = 'Разом: 0 грн';
    return;
  }
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} × ${item.count}</span>
      <span>${item.price * item.count} грн</span>
      <button aria-label="Відалити ${item.name} з кошика">&times;</button>
    `;
    const removeBtn = li.querySelector('button');
    removeBtn.addEventListener('click', () => removeFromCart(item.id));
    cartItemsList.appendChild(li);
  });
  clearCartBtn.disabled = false;
  checkoutBtn.disabled = false;
  cartTotal.textContent = `Разом: ${calculateTotal()} грн`;
}

function openCart() {
  cart.classList.remove('hidden');
}

function closeCart() {
  cart.classList.add('hidden');
}

cartToggleBtn.addEventListener('click', () => {
  if (cart.classList.contains('hidden')) {
    openCart();
  } else {
    closeCart();
  }
});

closeCartBtn.addEventListener('click', closeCart);
clearCartBtn.addEventListener('click', clearCart);

// Тема
const themeToggleBtn = document.getElementById('themeToggleBtn');

function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    themeToggleBtn.textContent = '🌙';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggleBtn.textContent = '🌙';
  }
}

themeToggleBtn.addEventListener('click', toggleTheme);
loadTheme();

// Модальное окно заказа
const orderModal = document.getElementById('orderModal');
const checkoutButton = checkoutBtn;
const closeOrderModalBtn = document.getElementById('closeOrderModal');
const orderForm = document.getElementById('orderForm');

checkoutButton.addEventListener('click', () => {
  orderModal.classList.remove('hidden');
});

closeOrderModalBtn.addEventListener('click', () => {
  orderModal.classList.add('hidden');
});

orderForm.addEventListener('submit', e => {
  e.preventDefault();
  alert(`Спасибо за заказ, ${orderForm.name.value}! Мы свяжемся с вами по телефону ${orderForm.phone.value}.`);
  orderForm.reset();
  orderModal.classList.add('hidden');
  clearCart();
  closeCart();
});

// Баннер слайдер
const slides = document.querySelectorAll('.banner-slide');
const prevBtn = document.querySelector('.banner-arrow.prev');
const nextBtn = document.querySelector('.banner-arrow.next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

prevBtn.addEventListener('click', () => {
  const newIndex = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(newIndex);
});

nextBtn.addEventListener('click', () => {
  const newIndex = (currentSlide + 1) % slides.length;
  showSlide(newIndex);
});

// Автопрокрутка слайдов каждые 6 секунд
setInterval(() => {
  showSlide((currentSlide + 1) % slides.length);
}, 6000);

renderProducts();
renderCart();
