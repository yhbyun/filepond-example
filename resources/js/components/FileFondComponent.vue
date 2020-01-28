<template>
  <form @submit.prevent="store" enctype="multipart/form-data">
    <input type="text" v-model="formData.username">
    <input type="email" v-model="formData.email">
    <file-pond
      name="test"
      ref="pond"
      label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
      allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      v-bind:files="myFiles"
      v-on:updatefiles="handleFilePondUpdateFile"
    />
    <button type="submit">Send</button>
  </form>
</template>

<script>
  // Import Vue FilePond
  import vueFilePond from 'vue-filepond'

  // Import FilePond styles
  import 'filepond/dist/filepond.min.css'

  // Import FilePond plugins
  // Please note that you need to install these plugins separately

  // Import image preview plugin styles
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

  // Import image preview and file type validation plugins
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

  // Create component
  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
  )

  export default {
    name: 'FilePondComponent',
    data: function() {
      return {
        myFiles: [],
        formData: {
          username: '',
          email: '',
        },
      }
    },
    components: {
      FilePond
    },
    methods: {
      handleFilePondUpdateFile(files){
        this.myFiles = files.map(files => files.file);
      },

      store() {
        //Assign all fields to formData to send via post
        const formData = new FormData();
        formData.append("username", this.formData.username);
        formData.append("email", this.formData.email);

        //Set all files to formData
        for (let i = 0; i < this.myFiles.length; i++) {
          let file = this.myFiles[i];
          formData.append("files[" + i + "]", file);
        }

        this.$store
          .dispatch("store", formData)
          .then(response => {
            this.$snotify.success("Success")
          })
          .catch(error => {
            this.$snotify.error("Error")
          });
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
