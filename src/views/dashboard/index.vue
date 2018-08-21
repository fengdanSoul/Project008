<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import { todayRemind } from '@/api/homeInfo'

export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters({
      uuid: 'uuid',
      token: 'token'
    })
  },
  created() {
    this.fetchData()
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  },
  method: {
    fetchData() {
      todayRemind(this.uuid, this.token).then(response => {
        const data = response.data
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
