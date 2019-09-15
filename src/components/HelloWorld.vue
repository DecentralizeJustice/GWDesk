<template>
  <div class="hello">
    <button @click="startNode">Start Node</button>
    <button @click="checkServer">Check Server</button>
  </div>
</template>

<script>
import asyncCall from '@/assets/connect.js'
import path from 'path'
import { fork } from 'child_process'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    startNode () {
      const remote = require('electron').remote
      const app = remote.app
      console.log(app.getPath('userData'))
      const location = app.getPath('userData')
      const args = [location]
      // eslint-disable-next-line
      const process = fork(path.join(__static, "spvNodeStart.js"), args)
    },
    async checkServer () {
      const result = await asyncCall()
      console.log(result)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
