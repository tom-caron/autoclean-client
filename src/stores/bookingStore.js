import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => ({
    step: 1,
    selectedAgency: null,
    selectedService: null,
    selectedOptions: [],
    selectedDate: null,
    selectedTimeSlot: null,
  }),
  
  // NOUVEAU : Les getters calculent des valeurs à la volée !
  getters: {
    totalDuration: (state) => {
      if (!state.selectedService) return 0
      let duration = state.selectedService.durationMinutes
      state.selectedOptions.forEach(opt => duration += opt.durationMinutes)
      return duration
    },
    totalPrice: (state) => {
      if (!state.selectedService) return 0
      let price = state.selectedService.price
      state.selectedOptions.forEach(opt => price += opt.price)
      return price
    }
  },
  
  actions: {
    nextStep() { this.step++ },
    prevStep() { if (this.step > 1) this.step-- },
    setAgency(agency) {
      this.selectedAgency = agency
      this.nextStep()
    },
    setService(service) { this.selectedService = service },
    toggleOption(option) {
      const index = this.selectedOptions.findIndex(o => o._id === option._id)
      if (index === -1) {
        this.selectedOptions.push(option)
      } else {
        this.selectedOptions.splice(index, 1)
      }
    },
    // NOUVEAU : Pour la date et l'heure
    setDate(date) {
      this.selectedDate = date
      this.selectedTimeSlot = null // On réinitialise l'heure si on change de jour
    },
    setTimeSlot(slot) {
      this.selectedTimeSlot = slot
    },
    resetBooking() {
      this.step = 1
      this.selectedAgency = null
      this.selectedService = null
      this.selectedOptions = []
      this.selectedDate = null
      this.selectedTimeSlot = null
    }
  }
})