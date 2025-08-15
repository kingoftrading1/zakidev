// === سلايدر الصور ===
const slides = document.querySelectorAll('.slides img');
const dotsContainer = document.querySelector('.slider-dots');
let currentIndex = 0;

// إنشاء النقاط أسفل السلايدر
slides.forEach((slide, index) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});
updateDots();

// وظيفة الانتقال إلى شريحة محددة
function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

// تحديث السلايدر
function updateSlider() {
  const slideWidth = slides[0].clientWidth;
  const slidesWrapper = document.querySelector('.slides');
  slidesWrapper.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  updateDots();
}

// تحديث النقاط
function updateDots() {
  const dots = dotsContainer.querySelectorAll('span');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

// الانتقال إلى الصورة التالية
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

// الانتقال إلى الصورة السابقة
function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

// إضافة أحداث لأزرار السلايدر
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// تشغيل السلايدر تلقائيًا كل 5 ثواني
setInterval(nextSlide, 5000);

// إعادة تهيئة عند تغيير حجم الشاشة
window.addEventListener('resize', updateSlider);
