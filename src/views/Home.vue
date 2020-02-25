<template>
  <div class="container">
    <h1>Danh sách cuộc họp</h1>
    <table id="room" class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Tên cuộc họp</th>
          <th scope="col">Người tạo</th>
        </tr>
      </thead>
      <tbody v-for="item in items" v-bind:key="item.id">
        <tr class="clickable-row" v-on:click="navigate(item)">
          <td>{{item.name}}</td>
          <td>{{item.creator}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import store from "../store"
import MeetingService from "../services/meeting.service";
export default {
  name: "Home",
  store,
  data() {
    return {
      items: {}
    };
  },
  mounted() {
    MeetingService.getAllMeetingRoom().then(
      response => {
        this.items = response;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    navigate: function(room) {
      localStorage.setItem("id", room.id)
      localStorage.setItem("isEdit", room.is_edit)
      this.$router.push({ name: "resource", params: { roomId: room.id } });
    }
  }
};
</script>