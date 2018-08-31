<template>
  <div class="rebate_record-page">
    <table class="rebate_record-cardTable">
      <thead>
        <tr>
          <th>总收入</th>
          <th>点差收入</th>
          <th>跟单收入</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>$33.44</td>
          <td>$33.44</td>
          <td>$33.44</td>
        </tr>
      </tbody>
    </table>
    <a-select defaultValue="lucy" style="width: 120px">
      <a-select-option value="jack">所有</a-select-option>
      <a-select-option value="jack">一级</a-select-option>
      <a-select-option value="jack">二级</a-select-option>
      <a-select-option value="jack">三级</a-select-option>
    </a-select>
    <a-select defaultValue="lucy" style="width: 120px">
      <a-select-option value="jack">点差</a-select-option>
      <a-select-option value="jack">跟单</a-select-option>
    </a-select>
    <a-range-picker />
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
          title: '金额',
          dataIndex: 'operation',
        }, {
          title: '类型',
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
  $prefix: "rebate_record";
  @import '@/styles/utils/cardTable.scss';
</style>

