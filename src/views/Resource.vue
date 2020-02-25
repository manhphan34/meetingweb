<template>
  <div class="container">
    <h1>Danh sách tài liệu</h1>
    <div id="btn-add">
      <input type="file" id="myfile" name="myfile" multiple @change="onFileChange" />
      <br />
      <br />
    </div>

    <div>
      <table id="resource" class="table">
        <tbody v-for="item in items" v-bind:key="item.id">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button
                id="btn-delete"
                class="btn btn-danger"
                v-on:click="deleteResource(item)"
                v-show="isEdit==1"
              >Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import VueSimpleAlert from "vue-simple-alert";
import MeetingService from "../services/meeting.service";
import meetingService from "../services/meeting.service";
Vue.use(VueSimpleAlert)

export default {
  name: "Resource",
  data() {
    return {
      items: {},
      isEdit : localStorage.getItem("isEdit")
    };
  },
  mounted() {
    var id = localStorage.getItem("id");
    var isEdit = localStorage.getItem("isEdit");
    if (isEdit == 0) {
      var elementAdd = document.getElementById("btn-add");
      elementAdd.style.display = "none";
    }
    MeetingService.getAllResource(id).then(
      response => {
        this.items = response;
      },
      error => {
        console.log(error);
      }
    );
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      for (var i = 0; i <= files.length; i++) {
        var formData = new FormData();
        formData.append("file", files[i]);
        console.log(files[i].name);
        meetingService
          .createResource(localStorage.getItem("id"), files[i].name, formData)
          .then(
            response => {
              if (response == 1) {
                MeetingService.getAllResource(localStorage.getItem("id")).then(
                  response => {
                    this.items = response;
                  },
                  error => {
                    console.log(error);
                  }
                );
              }
            },
            error => {
              console.log(error);
            }
          );
      }
    },
    deleteResource(resource) {
      if (localStorage.getItem("isEdit") == 0) {
        this.$alert("Bạn không có quyền xóa tài liệu của cuộc họp này.")
        return;
      }
      MeetingService.deleteResource(localStorage.getItem("id"), resource).then(
        response => {
          if (response == 1) {
            MeetingService.getAllResource(localStorage.getItem("id")).then(
              response => {
                this.items = response;
              },
              error => {
                console.log(error);
              }
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>
<style scoped>
div #btn-add {
  margin-bottom: 20px;
}
</style>