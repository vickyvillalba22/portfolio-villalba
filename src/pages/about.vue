<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { provide } from 'vue'
import IconCarousel from '@/components/small ui/iconCarousel.vue'

// items de focus on
const focusItems = [
  {
    id: 0,
    title: 'Development',
    icon: 'hugeicons:source-code'
  },
  {
    id: 1,
    title: 'Interaction',
    icon: 'hugeicons:tap-01',
  },
  {
    id: 2,
    title: 'User Experience',
    icon: 'hugeicons:ai-user'
  }
]

// Carousel de herramientas
interface CarouselItem {
  id: number
  icon: string
  alt: string
}

const toolsItems: CarouselItem[] = [
  {
    id: 0,
    icon: 'devicon:illustrator',
    alt: 'Adobe Illustrator'
  },
  {
    id: 1,
    icon: 'devicon:figma',
    alt: 'Figma'
  },
  {
    id: 2,
    icon: 'devicon:javascript',
    alt: 'JavaScript'
  },
  {
    id: 3,
    icon: 'devicon:typescript',
    alt: 'TypeScript'
  },
  {
    id: 4,
    icon: 'devicon:vuejs',
    alt: 'Vue.js'
  },
  {
    id: 5,
    icon: 'devicon:html5',
    alt: 'HTML5'
  },
  {
    id: 6,
    icon: 'devicon:css3',
    alt: 'CSS3'
  },
  {
    id: 7,
    icon: 'devicon:git',
    alt: 'Git'
  },
  {
    id: 8,
    icon: 'devicon:vitejs',
    alt: 'Vite'
  },
  {
    id: 9,
    icon: 'devicon:photoshop',
    alt: 'Adobe Photoshop'
  }
]

provide('carousel-items', toolsItems)

</script>

<template>

  <main id="about">

    <h2 class="mayus thin">About Me</h2>

    <!--INTRO-->
    <section class="intro">
      <img src="/public/imgs/foto Victoria Villalba.png" alt="">
      <p class="blanco">I am a Multimedia Technology student focused on front-end web development and UX/UI design. I am interested in creating clear, functional, and user-centered digital experiences.</p>
    </section>

    <!--SKILLS-->
    <section class="skills">

      <h4>Skills</h4>

      <div class="wrapSkills">

        <div>
          <Icon icon="hugeicons:pen-tool-02" class="i-mob" />
          <ul>
            <li>Responsive Design</li>
            <li>JavaScript (ES6+)</li>
            <li>TypeScript</li>
            <li>Front-End Development</li>
            <li>UI/UX Design</li>
          </ul>
        </div>

        <div>
          <Icon icon="hugeicons:user-group-02" class="i-mob" />
          <ul>
            <li>Problem-Solving</li>
            <li>Attention to Detail</li>
            <li>Time Management</li>
            <li>Team Collaboration</li>
            <li>Continuous Learning</li>
          </ul>
        </div>

      </div>
      
    </section>

    <!--FOCUS ON-->
    <section class="focuson">
      <h4>Focus on...</h4>
      <div class="focuses">
        <div v-for="foc in focusItems" :key="foc.id">
          <Icon :icon="foc.icon" class="foc-icon" />
          <p class="skill-title">{{ foc.title }}</p>
        </div>
      </div>
    </section>

    <!--TOOLS-->
    <section class="tools">
      <h4>Tools</h4>
      <IconCarousel />
    </section>

    <!--CIERRE-->
    <section class="cierre">
      <p class="thin">I’m looking to continue developing my skills through <span class="thin">real-world projects</span> real-world projects that combine front-end development, UX/UI design, and meaningful user experiences.</p>
      <img src="/public/imgs/def project.jpg" alt="">
    </section>


  </main>

</template>

<style scoped>

#about{
    width: 90%;
    min-height: 90vh;

    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 60px;
    margin-bottom: 50px;

    color: var(--color-texto-principal);
}

h2{
  font-size: 40px;
  width: 100%;
}
h4{
  font-size: 24px;
}

section{
  width: 100%;
  display: flex;
}

/*INTRO*/
.intro{
  gap: 20px;
  height: 18vh;
}
.intro img{
  height: 20vh;
  object-fit: cover;
  object-position: top;
}
.intro p{
  font-size: 1em;
}

/*SKILLS*/
.skills{
  flex-direction: column;
  gap: 15px;
}
.skills .i-mob{
  width: 45px;
  height: 45px;
  color: var(--celeste);
}
.wrapSkills{
  display: flex;
  width: 90%;
  justify-content: space-between;
}
:deep(.i-mob g),
:deep(.i-mob path) {
  stroke-width: 0.5;
}
ul{
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
li{
  font-family: "creatoThin", 'openSans';
}

/*FOCUS*/
.focuson{
  flex-direction: column;
  gap: 15px;
}
.focuses{
  display: flex;
  justify-content: space-between;
}
.focuses div{
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.focuses p{
  font-size: 1em;
  text-align: center;
}
.foc-icon{
  color: var(--celeste);
  width: 40px;
  height: 40px;
}

/*TOOLS */
.tools{
  flex-direction: column;
  gap: 30px;
}

/*CIERRE*/
.cierre{
  gap: 15px;
}
.cierre p{
  font-size: 20px;
}
.cierre img{
  width: 40%;
  object-fit: cover;
}
.cierre span{
  color: var(--celeste)
}



</style>