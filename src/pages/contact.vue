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

      <div>
        <p>icons</p>
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

</style>