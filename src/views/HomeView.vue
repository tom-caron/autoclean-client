<template>
  <div class="bg-white">
    <section class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-20">
          
          <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">L'éclat du neuf pour</span>
                <span class="block text-primary">votre véhicule</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Gagnez du temps et retrouvez une voiture impeccable. Prenez rendez-vous en ligne dans l'une de nos agences. Nos experts s'occupent du reste avec des produits professionnels.
              </p>
              
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link to="/booking" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-md text-gray-900 bg-secondary hover:bg-primary transition duration-300 md:py-4 md:text-lg md:px-10">
                    Réserver un lavage
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#features" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-tertiary bg-opacity-50 hover:bg-opacity-100 transition duration-300 md:py-4 md:text-lg md:px-10">
                    En savoir plus
                  </a>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
      
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Lavage de voiture professionnel">
      </div>
    </section>

    <section id="features" class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary font-bold tracking-wide uppercase">Pourquoi nous choisir ?</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Un service premium, sans compromis
          </p>
        </div>

        <div class="mt-10">
          <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div class="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-tertiary text-gray-900 text-2xl">
                  ⏱️
                </div>
                <p class="ml-16 text-lg leading-6 font-bold text-gray-900">Réservation rapide</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                En quelques clics, choisissez votre agence, votre prestation et le créneau qui vous arrange.
              </dd>
            </div>

            <div class="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-tertiary text-gray-900 text-2xl">
                  ✨
                </div>
                <p class="ml-16 text-lg leading-6 font-bold text-gray-900">Qualité experte</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Nos équipes sont formées pour traiter votre véhicule avec le plus grand soin.
              </dd>
            </div>

            <div class="relative bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <dt>
                <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-tertiary text-gray-900 text-2xl">
                  💳
                </div>
                <p class="ml-16 text-lg leading-6 font-bold text-gray-900">Prix transparents</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">
                Le prix est calculé à l'avance selon vos options. Pas de mauvaises surprises.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>