<template>
  <div class="agent_overview-page">
    <table class="agent_overview-cardTable">
      <thead>
        <tr>
          <th>总客户</th>
          <th>一级客户</th>
          <th>二级客户</th>
          <th>三级客户</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>39</td>
          <td>39</td>
          <td>39</td>
          <td>39</td>
        </tr>
      </tbody>
    </table>
    <a-select defaultValue="lucy" style="width: 120px">
      <a-select-option value="jack">所有</a-select-option>
      <a-select-option value="jack">一级</a-select-option>
      <a-select-option value="jack">二级</a-select-option>
      <a-select-option value="jack">三级</a-select-option>
    </a-select>
    <a-table bordered :dataSource="dataSource" :columns="columns">
    </a-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [{
          title: 'id',
          dataIndex: 'id',
        }, {
          title: '名字',
          dataIndex: 'name',
        }, {
          title: '手机号',
          dataIndex: 'phone',
        }, {
          title: '关系',
          dataIndex: 'operation',
        }, {
          title: '时间',
          dataIndex: 'operation',
        }],
        dataSource: []
      }
    }
  }
</script>
<style lang="scss">
  $prefix: "agent_overview";
  @import '@/styles/utils/cardTable.scss';
</style>

