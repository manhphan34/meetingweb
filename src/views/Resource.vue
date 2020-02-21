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
              <button class="btn btn-danger" v-on:click="deleteResource(item)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import MeetingService from "../services/meeting.service";
import meetingService from "../services/meeting.service";

export default {
  el: "resource",
  name: "Resource",
  data() {
    return {
      items: {}
    };
  },
  mounted() {
    var id = localStorage.getItem("id")
    console.log(id);
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
        meetingService.createResource(localStorage.getItem("id"), files[i].name, formData).then(
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