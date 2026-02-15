<script setup lang="ts">

import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { provide } from 'vue'
import IconCarousel from '@/components/small ui/iconCarousel.vue'

import { useTypewriter } from '@/animations/composables';

const { displayed } = useTypewriter("About me")

const loaded = ref<boolean>(false)

function handleLoad(): void {
  loaded.value = true
}

const introLoaded = ref<boolean>(false)
const cierreLoaded = ref<boolean>(false)

function handleIntroLoad(): void {
  introLoaded.value = true
}

function handleCierreLoad(): void {
  cierreLoaded.value = true
}

interface SkillCategory {
  id: number
  title: string
  type: "technical" | "soft"
  skills: string[]
}

//SKILLS
const listSkills: SkillCategory[] = [
  {
    id: 0,
    title: "Technical Skills",
    type: "technical",
    skills: [
      "Responsive Design",
      "JavaScript (ES6+)",
      "TypeScript",
      "Front-End Development",
      "UI/UX Design"
    ]
  },
  {
    id: 1,
    title: "Soft Skills",
    type: "soft",
    skills: [
      "Problem-Solving",
      "Attention to Detail",
      "Time Management",
      "Team Collaboration",
      "Continuous Learning"
    ]
  }
]

const technicalSkills = computed(() =>
  listSkills.find(cat => cat.type === "technical")
)

const softSkills = computed(() =>
  listSkills.find(cat => cat.type === "soft")
)


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

  <h2 class="mayus">{{ displayed }}</h2>

  <main id="about">

    <!--INTRO-->
    <section class="intro">

      <img 
        src="/imgs/foto Victoria Villalba.png"
        alt="Victoria Villalba"
        @load="handleIntroLoad"
        :class="['image-reveal-base', { 'is-loaded': introLoaded }]"
      />
      <p>I am a Multimedia Technology student focused on front-end web development and UX/UI design. I am interested in creating clear, functional, and user-centered digital experiences.</p>

    </section>

    <!--SKILLS-->
    <section class="skills">

      <h4>Skills</h4>

      <div class="wrapSkills">

        <div>
          <Icon icon="hugeicons:pen-tool-02" class="i-mob" />

          <transition-group
            name="slide-left"
            tag="ul"
            appear
            class="listSkills"
          >
            <li
              v-for="(skill, index) in technicalSkills?.skills"
              :key="skill"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              {{ skill }}
            </li>
          </transition-group>
          
        </div>

        <div>
          <Icon icon="hugeicons:user-group-02" class="i-mob" />
                    <transition-group
            name="slide-left"
            tag="ul"
            appear
            class="listSkills"
          >
            <li
              v-for="(skill, index) in technicalSkills?.skills"
              :key="skill"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              {{ skill }}
            </li>
          </transition-group>
        </div>

      </div>
      
    </section>

    <!--FOCUS ON-->
    <section class="focuson">
      <h4>Focus on...</h4>
      <div class="focuses">
        <div v-for="foc in focusItems" :key="foc.id">
          <Icon :icon="foc.icon" class="foc-icon i-mob" />
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
      <img 
        src="/imgs/def project.jpg"
        alt="Project"
        @load="handleCierreLoad"
        :class="['image-reveal-base', { 'is-loaded': cierreLoaded }]"
      />
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
  font-size: 2.2em;
  width: 100%;
  font-family: var(--font-thin);
  width: 90%;
  margin-bottom: 16px;
}

h4{
  font-size: 1.5em;
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

@media (min-width: 700px){

  .intro{
    display: flex;
  }
  .intro img{
    width: 40%;
  }
  .intro p{
    width: 60%;
  }

  .wrapSkills{
    width: 60%;
  }
}

@media (min-width: 920px){

section{
  background-color: #26262667;
  border-radius: 16px;
  padding: 24px;
}
h4{
  font-size: 1.7em;
  font-family: var(--font-thin);
}

#about {
  min-height: 70vh;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 10vh);
  gap: 16px;
}

.intro { 
  height: 100%;
  grid-area: 1 / 1 / 4 / 3;
  overflow: hidden;
}
.intro img{
  height: 100%;
}
.focuson { 
  grid-area: 4 / 1 / 7 / 3;
  height: 100%;
}
.foc-icon{
  width: 60px;
  height: 60px;
}
.focuses p{
  font-size: 1em;
  font-family: var(--font-thin);
}
.skills { 
  grid-area: 1 / 3 / 7 / 5;
  height: 100%;
  padding: 30px; 
  gap: 24px;
}
.wrapSkills{
  gap: 24px;
  width: 100%;
}
.skills .i-mob{
  width: 60px;
  height: 60px;
}
.listSkills{
  font-size: 1.2em;
  gap: 20px;
}
.tools { 
  grid-area: 1 / 5 / 3 / 7;
  height: 100%; 
}
.cierre { 
  grid-area: 3 / 5 / 7 / 7;
  height: 100%; 
}

}



</style>