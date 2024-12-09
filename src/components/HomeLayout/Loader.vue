<template>
    <div class="loader">
        <video autoplay loop muted playsinline class="video-bg" id="video-element">
            <source id="video-source" src="../../assets/loader/loader.mp4" type="video/mp4">
            Sizning brauzeringiz videoni qo‘llab-quvvatlamaydi.
        </video>
        <video autoplay loop muted playsinline class="video-mobile-bg" id="video-element">
            <source id="video-source" src="../../assets/loader/loader-mobile.mp4" type="video/mp4">
            Sizning brauzeringiz videoni qo‘llab-quvvatlamaydi.
        </video>
    </div>
</template>

<script>

</script>

<style scoped>
.loader {
    width: 100vw;
    height: 100vh;
    background: #fff;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* Video to'liq ekran qilish uchun */
}

.video-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-mobile-bg {
   width: 100%;
   height: 100%;
   object-fit: cover;
   display: none;
}

@media screen and (max-width: 550px) {
   .video-bg {
      display: none;
   }

   .video-mobile-bg {
      display: block;
   }
}
</style>
