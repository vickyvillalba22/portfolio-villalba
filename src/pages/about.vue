<script setup>
</script>

<template>

  <section id="about" class="font-modo-oscuro">

    <h1>About Me</h1>

    <div class="contCards">
      <div class="cardAbout fondoNaranja">
        <p>Hi! I'm a front-end developer and multimedia design student passionate about creating original, efficient, and user-centered digital experiences</p>
        <img src="/public/imgs/foto Victoria Villalba.png" alt="">
      </div>

      <div class="cardAbout fondoVerde">
        <p>This portfolio showcases my journey, the projects I've built, and the skills I'm developing as I continue learning modern technologies.</p>
        <img src="/public/imgs/def project.jpg" alt="">
      </div>

      <div class="cardAbout fondoCeleste">
        <p>I love building intuitive interfaces, experimenting with animations,and designing products that feel simple, modern, and meaningful.</p>
        <img src="/public/imgs/def project.jpg" alt="">
      </div>
    </div>

  </section>

</template>

<style scoped>

#about{
    width: 90%;
    height: 90vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    justify-content: space-evenly;

}

.contCards{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.cardAbout{

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 20px;
  width: 30%;
  height: 50vh;
  border-radius: 20px;

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cardAbout img{
  height: 70%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  object-position: top;
}

@media (max-width: 600px) {
  #about{
    gap: 30px;
    margin-top: 30px;
  }
  .contCards{
    flex-direction: column;
    gap: 20px;
  }
  .cardAbout{
    width: 90%;
  }
  .cardAbout img{
    height: 50%;
  }
}

</style>