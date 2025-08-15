// --------------------
// سلايدر الصور التلقائي + اليدوي
// --------------------
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".slider");
    
    sliders.forEach(slider => {
        let slides = slider.querySelectorAll("img");
        let index = 0;
        let interval = setInterval(nextSlide, 3000); // تشغيل تلقائي كل 3 ثواني

        // عرض شريحة معينة
        function showSlide(i) {
            slides.forEach((slide, idx) => {
                slide.style.display = idx === i ? "block" : "none";
            });
        }

        // الشريحة التالية
        function nextSlide() {
            index = (index + 1) % slides.length;
            showSlide(index);
        }

        // الشريحة السابقة
        function prevSlide() {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
        }

        // تشغيل أول صورة
        showSlide(index);

        // أزرار التحكم اليدوي
        const nextBtn = slider.querySelector(".next");
        const prevBtn = slider.querySelector(".prev");

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                restartAuto();
            });
            prevBtn.addEventListener("click", () => {
                prevSlide();
                restartAuto();
            });
        }

        // إعادة تشغيل المؤقت بعد التفاعل اليدوي
        function restartAuto() {
            clearInterval(interval);
            interval = setInterval(nextSlide, 3000);
        }
    });
});

// --------------------
// أنيميشن عند التمرير
// --------------------
const scrollElements = document.querySelectorAll(".fade-in");

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

window.addEventListener("scroll", () => { 
    handleScrollAnimation();
});

// --------------------
// إشعار صغير (Toast)
// --------------------
function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// مثال: تشغيل إشعار بعد تحميل الصفحة
window.onload = function() {
    setTimeout(() => {
        showToast("👋 مرحباً بك! استمتع بالربح من أفضل المواقع 🚀");
    }, 1000);
};
