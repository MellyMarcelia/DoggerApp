<template>
  <div class="detail">
    <RouterLink to="/" class="detail__back">
      &#8592; All breeds
    </RouterLink>

    <div class="detail__card">
      <div class="detail__header">
        <p class="detail__eyebrow">Breed profile</p>
        <h1 class="detail__name">{{ capitalize(breedName) }}</h1>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="detail__placeholder">
        <PProgressSpinner
          style="width: 40px; height: 40px"
          stroke-width="3"
          animation-duration="0.8s"
        />
        <p class="detail__placeholder-label">Loading photo...</p>
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="detail__placeholder detail__placeholder--error">
        <p class="detail__error-text">Could not load image</p>
        <PButton label="Retry" rounded @click="refetch" class="detail__btn" />
      </div>

      <!-- Image -->
      <div
        v-else
        class="detail__image-wrap"
        :class="{ 'detail__image-wrap--loaded': imgLoaded }"
      >
        <img
          :src="imageUrl"
          :alt="`A ${capitalize(breedName)}`"
          class="detail__image"
          @load="imgLoaded = true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBreedImage } from '../composables/useDogApi'

const route = useRoute()
const breedName = computed(() => route.params.name)

const { data: imageUrl, isLoading, isError, refetch } = useBreedImage(breedName)
const imgLoaded = ref(false)

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}
</script>

<style scoped>
/* Block */
.detail {
  max-width: 620px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

/* to go back navigation link */
.detail__back {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 2rem;
  transition: color 0.18s;
}

.detail__back:hover {
  color: var(--primary);
}

/* card container */
.detail__card {
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: var(--shadow);
}

/* text header inside the card */
.detail__header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

/* small label above the breed name */
.detail__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
}

/* breed name heading */
.detail__name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 6vw, 2.8rem);
  font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
}

/* placeholder shown while loading or on error */
.detail__placeholder {
  aspect-ratio: 4 / 3;
  border-radius: 16px;
  background: var(--primary-soft);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

/* error variant of placeholder */
.detail__placeholder--error {
  border: 2px dashed var(--border-hover);
}

/*  label inside loading placeholder */
.detail__placeholder-label {
  font-size: 0.88rem;
  color: var(--text-muted);
}

/* error message inside placeholder */
.detail__error-text {
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* image wrapper (handles fade-in) */
.detail__image-wrap {
  border-radius: 16px;
  overflow: hidden;
  background: var(--primary-soft);
  opacity: 0;
  transform: scale(0.97);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

/* image has finished loading */
.detail__image-wrap--loaded {
  opacity: 1;
  transform: scale(1);
}

/* the dog photo */
.detail__image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

/* PrimeVue ProgressSpinner colour like to override */
:deep(.p-progress-spinner-circle) {
  stroke: var(--primary) !important;
}


/* PrimeVue Button colour like to override */
.detail__btn:deep(.p-button) {
  background: var(--primary);
  border-color: var(--primary);
  font-family: 'DM Sans', sans-serif;
}

.detail__btn:deep(.p-button:hover) {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}
</style>
