<template>
  <div class="overview">

    <div class="overview__hero">
      <h1 class="overview__title">
        Open a locker,<br />
        <em class="overview__title-em">find your secret furry friend inside</em>

      </h1>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="overview__room">
      <div v-for="n in 30" :key="n" class="overview__skeleton" />
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="overview__error">
      <p class="overview__error-heading">Something went wrong</p>
      <p class="overview__error-body">{{ error?.message ?? 'Could not load breeds.' }}</p>
      <PButton label="Try again" rounded class="overview__btn" @click="refetch" />
    </div>

    <!-- Locker room -->
    <div v-else class="overview__room">
      <BreedBox
        v-for="(breed, i) in breeds"
        :key="breed"
        :breed="breed"
        :color-index="i"
      />
    </div>

  </div>
</template>

<script setup>
import { useBreeds } from '../composables/useDogApi'
import BreedBox from '../components/BreedBox.vue'

const { data: breeds, isLoading, isError, error, refetch } = useBreeds()
</script>

<style scoped>
/* Block */
.overview {
  padding: 2.5rem 2rem 5rem;
  max-width: 1300px;
  margin: 0 auto;
}

/* Element: hero section */
.overview__hero {
  text-align: center;
  margin-bottom: 2.5rem;
}

/* Element: main heading */
.overview__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text);
}

/* Element: italic part of the title */
.overview__title-em {
  font-style: italic;
  color: var(--primary);
}

/* Element: locker room wall */
.overview__room {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 6px;
  background: #1a2a12;
  padding: 14px 14px 18px;
  border-radius: 10px;
  box-shadow:
    0 12px 40px rgba(0,0,0,0.3),
    inset 0 -6px 0 rgba(0,0,0,0.2);
}

/* Element: skeleton locker placeholder */
.overview__skeleton {
  aspect-ratio: 2 / 3;
  border-radius: 4px;
  background: linear-gradient(160deg, #243818 25%, #2e4820 50%, #243818 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Element: error container */
.overview__error {
  text-align: center;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

/* Element: error heading */
.overview__error-heading {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 700;
}

/* Element: error description */
.overview__error-body {
  color: var(--text-muted);
  font-size: 0.92rem;
}

/* PrimeVue Button colour override */
.overview__btn:deep(.p-button) {
  background: var(--primary);
  border-color: var(--primary);
  font-family: 'DM Sans', sans-serif;
  margin-top: 0.5rem;
}

.overview__btn:deep(.p-button:hover) {
  background: var(--primary-hover);
  border-color: var(--primary-hover);
}
</style>
