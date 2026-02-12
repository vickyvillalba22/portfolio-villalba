<script setup>

import { Icon } from '@iconify/vue';

</script>

<template>

  <section id="contact">

    <div class="message">

      <h2 class="mayus">Contact</h2>

      <div class="text">
        <div>
          <p>
            Feel free to reach out if you want to talk about projects, collaborations,
            or if you simply want to say hi.
          </p>
          <p>
            I'm always open to connecting with other developers, designers, and creative people.
          </p>
          </div>
        <img src="/public/imgs/my-notion-face-transparent.png" alt="">
      </div>

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
    flex-direction: column;
    align-items: center;
    color: var(--color-texto-principal);
}

.message{
  width: 90%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

h2{
  font-size: 2.2em;
  font-family: var(--font-thin);
}

.text{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text div{
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 65%;
}

#contact img{
  width: 30%;
  object-fit: cover;
  transform: rotate(15deg);
}

p{
  text-align: left;
  font-size: 0.9em;
  font-family: var(--font-princ);
}

.contIcons{
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.i-mob{
  color: var(--color-texto-principal);
}

</style>
