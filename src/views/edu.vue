<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs11>
      <v-card class="text-xs-center no-gutters">
        <v-card-title class="headline justify-center">
          Education
        </v-card-title>
            <v-divider></v-divider>
            <v-row no-gutters justify-content='space-evenly'>
               <v-col :key="item.title" v-for="(item) in lessons" cols='4'>
                 <v-card
                   class="ma-3 primary"
                 >
                 <v-card-title class="headline justify-center">
                   {{item.title}}
                 </v-card-title>
                 <v-row >
                  <v-col cols='2' offset='5'>
                    <v-icon x-large color="black" class="">mdi-{{item.icon}}</v-icon>
                  </v-col>
                </v-row>
                 <v-card-actions class="justify-center">
                   <v-btn
                     color="deep-purple accent-4"
                     @click.stop="openDialog(item.title)"
                   >
                     Explore
                   </v-btn>
                 </v-card-actions>
                 </v-card>
               </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-flex>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity='1'
    >
    <component
    v-bind:is="currentMain"
    v-on:exit="dialog = false"/>
    </v-dialog>
    </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    lessons: [
      { title: 'Introduction', icon: 'atom-variant' },
      { title: 'Wallet Security', icon: 'lock' },
      { title: 'Wallet Operations', icon: 'wallet' },
      { title: 'Blockchain Mechanics', icon: 'bitcoin' },
      { title: 'General Information', icon: 'book-information-variant' },
      { title: 'Visualizations', icon: 'gamepad-variant' }
    ]
  }),
  methods: {
    openDialog: function (section) {
      console.log(section)
      this.dialog = true
    }
  },
  computed: {
    currentMain () {
      // const currentStage = this.currentStage
      const componentName = 'main'
      return () => import(`@/components/edu/intro/${componentName}.vue`)
    }
  }
}
</script>
