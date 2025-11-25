<script setup>
</script>

<template>

  <section id="contact" class="font-modo-oscuro">

    <div class="message">
      <h1>Contact</h1>
      <p>
        Feel free to reach out if you want to talk about projects, collaborations,
        or if you simply want to say hi.
      </p>
      <p>
        I'm always open to connecting with other developers, designers, and creative people.
      </p>
      <img src="/public/imgs/my-notion-face-transparent.png" alt="">

      <div class="contIcons">
        <a href="https://github.com/vickyvillalba22" target="_blank"><i class="fa-brands fa-github"></i></a>
        <a href="https://www.linkedin.com/in/victoria-villalba-a05a66293/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=villalbavictoria120@gmail.com" target="_blank"><i class="fa-solid fa-envelope"></i></a>
      </div>
    </div>

  </section>

</template>

<style scoped>

#contact{
    width: 90vw;
    height: 90vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.message{
  width: 70%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-evenly;
}

#contact img{
  width: 10%;
  object-fit: cover;
}

p{
  text-align: center;
}

.contIcons{
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

i{
  font-size: 1.8em;
  color: white;
}

</style>