<script setup>

import { Icon } from '@iconify/vue';

</script>

<template>

  <section id="contact">

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
        
        <a href="https://github.com/vickyvillalba22" target="_blank"><Icon icon="hugeicons:github" class="i-mob"/></a>
        <a href="https://www.linkedin.com/in/victoria-villalba-a05a66293/" target="_blank"><Icon icon="hugeicons:linkedin-01" class="i-mob"/></a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=villalbavictoria120@gmail.com" target="_blank"><Icon icon="hugeicons:mail-at-sign-01" class="i-mob"/></a>

      </div>
    </div>

  </section>

</template>

<style scoped>

#contact{
    height: 90vh;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    color: var(--color-texto-principal);
}

.message{
  width: 70%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-evenly;
}

#contact img{
  width: 30%;
  object-fit: cover;
}

p{
  text-align: center;
}

.contIcons{
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.i-mob{
  color: var(--color-texto-principal);
}

</style>