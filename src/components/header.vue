<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="item">Home</router-link>
      <router-link to="/about" class="item">About me</router-link>
      <router-link to="/projects" class="item">Projects</router-link>
      <router-link to="/contact" class="item">Contact</router-link>
    </nav>
  </header>
</template>

<style scoped>

header{
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

nav{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
}

.item{
    color: rgb(255, 255, 255);
    font-weight: 300;
    font-size: 0.9em;
    padding: 5px 15px;
    border-radius: 8px;
}
.item:hover{
    background: #eaeaea54;
    color: rgb(255, 255, 255);
}
.router-link-active {
    background: #eaeaea;
    color: black;
}

</style>