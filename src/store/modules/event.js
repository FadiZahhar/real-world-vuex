import EventService from '@/services/EventService.js'

export const namespaced = true

export const state =  { 
    events: [],
    eventsTotal: 0,
    event: {}
}
export const mutations =  {
ADD_EVENT(state, event) {
  state.events.push(event)
},
SET_EVENTS(state,events) {
  state.events = events
},
SET_EVENTS_TOTAL(state, eventsTotal) {
  state.eventsTotal = eventsTotal
},
SET_EVENT(state, event) {
  state.event = event
}
}

export const actions =  {

createEvent({commit, dispatch, rootState}, event) {
    
    console.log('User creating Event is ' +  rootState.user.user.name)

    dispatch('moduleName/actionToCall', null, { root: true })
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
      const notification = {
        type: 'success',
        message: 'Your event has been created!'
      }
      dispatch('notification/add', notification, { root: true })
  }).catch(error => {
    const notification = {
      type: 'error',
      message: 'There was a problem creating your event: ' + error.message
    }
    dispatch('notification/add', notification, { root: true })
    throw error
  })
},
fetchEvents({commit, dispatch}, {perPage, page}) {
  EventService.getEvents(perPage, page)
  .then(response => {

   commit('SET_EVENTS',response.data);
  })
  .catch(error => {
    const notification = {
      type: 'error',
      message: 'There was a problem fetching events: ' + error.message
    }
    dispatch('notification/add', notification, { root: true })
})
},
fetchEvent({ commit, getters, dispatch }, id) {  // Send in the getters

  var event = getters.getEventById(id) // See if we already have this event

  if (event) { // If we do, set the event
    commit('SET_EVENT', event)
  } else {  // If not, get it with the API.
    EventService.getEvent(id)
      .then(response => {
        commit('SET_EVENT', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
      })
  }
}
}

export const getters = {
    getEventById: state => id => {
    return state.events.find(event => event.id === id)
    }
}
