<template>
  <div>
    <h1>Events Listing fpr {{ user.user.name }} </h1>
    <EventCard v-for="event in event.events" :key="event.id"  :event="event" />
    <template v-if="page != 1">
    <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
      Prev Page</router-link>
    </template>
     <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
      Next Page</router-link>
    <BaseIcon />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex'

export default {
    components: {
        EventCard
    },
    created() {
      this.perPage = 3

      this.$store.dispatch('event/fetchEvents', {
        perPage: this.perPage,
        page: this.page
      })
    },
    computed: {
      page() {
        return parseInt(this.$route.query.page) || 1
      },
      haxNextPage() {
        return this.event.eventsTotal > this.page * this.perPage
      },
      ...mapState(['event','eventsTotal','user'])
    }
}
</script>

<style>

</style>
