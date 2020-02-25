<template>
  <div class="container">
    <form>
      <div class="form-group" style="margin-top:10px">
        <h5 for="select-group">Chọn group</h5>
        <select
          class="form-control"
          id="select-group"
          style="width:200px"
          @change="onChange($event)"
        >
          <option disabled="disabled" value="0" selected="selected" style="display:none;">Chọn group</option>
          <option value="1">Folder 1</option>
          <option value="2">Folder 2</option>
          <option value="3">Folder 3</option>
          <option value="4">Folder 4</option>
          <option value="5">Folder 5</option>
        </select>
      </div>
    </form>
    <div id="btn-add" v-show="isShow">
      <input type="file" id="myfile" name="myfile" multiple />
      <br />
      <br />
    </div>

    <div>
      <table id="resource" class="table">
        <tbody v-for="item in items" v-bind:key="item.id">
          <tr>
            <td>{{item.name}}</td>
            <td>
              <button id="btn-delete" class="btn btn-danger" v-on:click="deleteResource(item)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import DocumentService from "../services/docs.service"
export default {
  data() {
    return {
      items: {},
      isShow: false
    };
  },
  methods: {
    onChange(event) {
        this.isShow = true
        DocumentService.getDocs(event.target.name).then(
          response => {
            this.tems = response
          }
        )
    }
  }
};
</script>

<style scoped>
div #select-group {
  margin-top: 20px;
  width: 200px;
}
</style>