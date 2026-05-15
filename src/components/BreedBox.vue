<template>
  <div
    class="locker"
    :class="{ 'locker--open': isOpen }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <RouterLink :to="`/breed/${breed}`" class="locker__link">

      <!-- Interior -->
      <div class="locker__interior">
        <div v-if="imageLoading || (!imageUrl && !imageError)" class="locker__loading">
          <div class="locker__spinner" />
        </div>
        <img
          v-else-if="imageUrl"
          :src="imageUrl"
          :alt="breed"
          class="locker__image"
          :class="{ 'locker__image--ready': imgReady }"
          @load="imgReady = true"
        />
      </div>

      <!-- Door -->
      <div class="locker__door" :style="{ background: color }">
        <span class="locker__name">{{ capitalize(breed) }}</span>
        <div class="locker__handle" />
      </div>

    </RouterLink>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const props = defineProps({
  breed:      { type: String, required: true },
  colorIndex: { type: Number, default: 0 },
})

const palette = ['#b8d4a0', '#9abf80', '#c8ddb0', '#a8c888', '#d4e8bc', '#b0cc98']
const color = computed(() => palette[props.colorIndex % palette.length])

const isOpen  = ref(false)
const imgReady = ref(false)

function onEnter() { isOpen.value = true }
function onLeave() { isOpen.value = false }

const { data: imageUrl, isLoading: imageLoading, isError: imageError } = useQuery({
  queryKey:  computed(() => ['breed-image', props.breed]),
  queryFn:   async () => {
    const res  = await fetch(`https://dog.ceo/api/breed/${props.breed}/images/random`)
    if (!res.ok) throw new Error('Failed')
    return (await res.json()).message
  },
  enabled:   isOpen,
  staleTime: Infinity,
  gcTime:    1000 * 60 * 30,
})

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
/* Block */
.locker {
  perspective: 600px;
  aspect-ratio: 2 / 3;
}

/* Element: link wrapper */
.locker__link {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  text-decoration: none;
  border-radius: 6px;
}

/* Element: interior (behind the door) */
.locker__interior {
  position: absolute;
  inset: 0;
  background: #111;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Element: loading state inside interior */
.locker__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Element: dog photo */
.locker__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

/* Modifier: image fully loaded */
.locker__image--ready {
  opacity: 1;
}

/* Element: door */
.locker__door {
  position: absolute;
  inset: 0;
  border-radius: 6px;
  overflow: hidden;
  transform-origin: left center;
  transform: rotateY(0deg);
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 14px 10px;
  box-shadow:
    inset 0 0 0 1.5px rgba(0,0,0,0.1),
    2px 0 8px rgba(0,0,0,0.15);
}

/* Modifier: locker is open — door swings */
.locker--open .locker__door {
  transform: rotateY(-110deg);
}

/* Element: breed name on the door */
.locker__name {
  width: 100%;
  font-size: clamp(0.6rem, 1.2vw, 0.8rem);
  font-weight: 700;
  color: rgba(0,0,0,0.55);
  text-align: center;
  line-height: 1.3;
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

/* Element: door handle */
.locker__handle {
  width: 6px;
  height: 22px;
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
  align-self: flex-end;
}

/* Element: loading spinner */
.locker__spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.1);
  border-top-color: rgba(255,255,255,0.5);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
