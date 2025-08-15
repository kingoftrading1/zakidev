/* ===== Slider JS ===== */
document.addEventListener("DOMContentLoaded", () => {

  class Slider {
    constructor(sliderElement) {
      this.slider = sliderElement;
      this.slides = this.slider.querySelectorAll(".slides img");
      this.prevBtn = this.slider.querySelector(".prev");
      this.nextBtn = this.slider.querySelector(".next");
      this.navDotsContainer = this.slider.querySelector(".slider-nav");
      this.total = this.slides.length;
      this.current = 0;
      this.interval = null;

      this.createDots();
      this.showSlide(this.current);
      this.startAuto();
      this.addEvents();
    }

    createDots() {
      this.navDots = [];
      for(let i=0;i<this.total;i++){
        const dot = document.createElement("span");
        dot.addEventListener("click", ()=> this.goToSlide(i));
        this.navDotsContainer.appendChild(dot);
        this.navDots.push(dot);
      }
    }

    showSlide(index) {
      // تحديث الموضع
      this.slides.forEach((slide,i)=>{
        slide.style.display = (i===index) ? "block" : "none";
      });

      // تحديث النقاط
      this.navDots.forEach((dot,i)=>{
        dot.classList.toggle("active", i===index);
      });

      this.current = index;
    }

    nextSlide() {
      let nextIndex = this.current + 1;
      if(nextIndex >= this.total) nextIndex = 0;
      this.showSlide(nextIndex);
    }

    prevSlide() {
      let prevIndex = this.current - 1;
      if(prevIndex < 0) prevIndex = this.total - 1;
      this.showSlide(prevIndex);
    }

    goToSlide(index) {
      this.showSlide(index);
      this.restartAuto();
    }

    startAuto() {
      this.interval = setInterval(()=> this.nextSlide(), 3000);
    }

    restartAuto() {
      clearInterval(this.interval);
      this.startAuto();
    }

    addEvents() {
      if(this.nextBtn) this.nextBtn.addEventListener("click", ()=> { this.nextSlide(); this.restartAuto(); });
      if(this.prevBtn) this.prevBtn.addEventListener("click", ()=> { this.prevSlide(); this.restartAuto(); });
    }
  }

  // تفعيل جميع السلايدر الموجودين في الصفحة
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach(sliderEl => new Slider(sliderEl));

  // ===== زر العودة للأعلى =====
  const topBtn = document.querySelector(".floating-top");
  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 300){
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

  topBtn.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));
});
