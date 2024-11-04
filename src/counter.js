// counter.js
export function startCounter(element, endValue, duration) {
    let startValue = 0;
    const increment = Math.ceil(endValue / (duration / 1000 * 60)); // Har daqiqa ko'paytirish
  
    const updateCount = () => {
      if (startValue < endValue) {
        startValue += increment;
        element.textContent = (startValue > endValue ? endValue : startValue) + '+';
        requestAnimationFrame(updateCount);
      }
    };
  
    requestAnimationFrame(updateCount);
  }
  