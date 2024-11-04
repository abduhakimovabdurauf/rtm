<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-info">
        <p>Bo'glanish: <a href="tel:+998732542404">+998 73 254 24 04</a></p>
        <p class="copy">&copy; 2020-2024 Margilon Raqamli Texnologiyalar Markazi</p>
      </div>
      <div class="social-icons">
        <a href="https://www.youtube.com/@rtm_margilan" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-youtube'></i>
        </a>
        <a href="https://t.me/rtm_margilan" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-telegram'></i>
        </a>
        <a href="https://www.instagram.com/explore/locations/101168078379003/margilon-raqamli-texnologiyalar-markazi/" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-instagram-alt' ></i>
        </a>
        <a href="https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Frtm.margilan%2F" target="_blank" rel="noopener noreferrer">
          <i class='bx bxl-facebook-circle'></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ResponsiveFooter',
};
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  padding: 20px 0;
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

.footer-info {
  flex: 1;
  text-align: left;
  margin-bottom: 15px;
}

.footer-info p {
  margin: 5px 0;
  font-size: 14px;
}

.footer-info a {
  color: #00bfff;
  text-decoration: none;
}

.footer-info a:hover {
  text-decoration: underline;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  color: white;
  font-size: 24px;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #089124;
}

.copy {
  transform: translateY(30px);
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #bfbfbf;
}

/* Tablet va kichikroq ekranlar uchun */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
    padding: 0 10px;
  }

  .footer-info {
    text-align: center;
    margin-bottom: 20px;
  }

  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 15px 0;
  }

  .footer-info p {
    font-size: 13px;
  }

  .social-icons a {
    font-size: 20px;
  }

  .copy {
    font-size: 11px;
    transform: translateY(20px);
  }
}

</style>
