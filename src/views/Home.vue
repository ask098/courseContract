<template>
  <div class="home">
    <div>
      Name: {{name}}
    </div>
    <div>
      Account: {{coinbase}}
    </div>
    <div>
      Is Owner?: {{isOwner ? 'Yes' : 'No'}}
    </div>

    <div v-if="isOwner">
      Name: <input type="text" name="name" v-model="newName">
      <button type="button" @click="save">Guardar</button>
      Creación de curso

      Code : <input type="text" name="code" v-model="newCode">
      Name : <input type="text" name="name" v-model="newName">
      Cost : <input type="text" name="cost" v-model="newCost">
      Duration : <input type="text" name="duration" v-model="newDuration">
      <button type="button" @click="create">Create</button>


    </div>
    <div v-else>



    Inscripción a curso
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import * as constants from '@/store/constants'

  export default {
    name: 'home',
    data() {
      return {
        newName: null,
        newCourse: null,
        newCode: null,
        newDuration: null,
        newCost: null,


      }
    },
    computed: {
      ...mapState({
        name: state => state.Certifier.name,
        coinbase: state => state.Certifier.coinbase,
        isOwner: state => state.Certifier.isOwner,
        course: state => state.Certifier.course
      })
    },
    methods: {
      ...mapActions({
        init: constants.CERTIFIER_INIT,
        saveName: constants.CERTIFIER_SET_NAME_BY_OWNER,
        addCourse: constants.CERTIFIER_ADD_COURSE_BY_OWNER
      }),
      save() {
        this.saveName(this.newName);
      },
      create(){
        this.addCourse(this.newCourse);
      }
    },
    created() {
      this.init()
    }
  }
</script>
