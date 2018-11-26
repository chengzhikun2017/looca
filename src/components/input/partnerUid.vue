<template>
  <span>
    <!-- <a-select style="width: 100px" v-model="partnerUid">
      <a-select-option v-for="item in partnerOpts" :key="item.value" :value="item.value">
        {{item.label}}
      </a-select-option>
    </a-select>
    <a-select style="width: 100px" v-model="selectedUserId.depth1">
      <a-select-option v-for="item in users.depth1" :key="item.uid" :value="item.uid">
        {{item.name}}
      </a-select-option>
    </a-select>
    <a-select style="width: 100px" v-model="selectedUserId.depth2">
      <a-select-option v-for="item in users.depth2" :key="item.uid" :value="item.uid">
        {{item.name}}
      </a-select-option>
    </a-select>
    <a-select style="width: 100px" v-model="selectedUserId.depth1">
      <a-select-option v-for="item in users.depth1" :key="item.uid" :value="item.uid">
        {{item.name}}
      </a-select-option>
    </a-select>
    <a-tag closable @close="onClose">Tag 2</a-tag> -->
    <!-- 使用缓存  -->
    <!-- 重新加载 -->
    <a-modal
      title="选择所属上级"
      :visible="showSeletor"
      @cancel="onCancel"
      @ok="onOk"
    >
      <!-- @ok="handleOk"
      :confirmLoading="confirmLoading"
       -->
     <a-tree
      :loadData="onLoadData"
       @select="onSelect"
      :treeNodes="partnerOpts"
      :selectedKeys="selectedNode.key?[selectedNode.key]:[]"
    />
    </a-modal>
    <!-- <a-tag>{{selectedNode.title}}</a-tag> -->
    <!-- <a-button @click="show">选择</a-button> -->
    <a-input-search placeholder="input search text" disabled style="width: 160px"  :value="selectedNode.title" @search="show" >
     <a-button slot="enterButton" type="primary">查看客户</a-button>
   </a-input-search>
  </span>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'partnerUid',
  data() {
    return {
      modelValue: null,
      showSeletor: false,
      // treeData: [
      //   { title: 'Expand to load', key: '0' },
      //   { title: 'Expand to load', key: '1' },
      //   { title: 'Tree Node', key: '2', isLeaf: true },
      // ],
      // partnerUid: '',
      partnerOpts: [],
      temp: 0,
      selectedNode: {},
    }
  },
  props: {
    containSelf: {
      default: false,
    },
    value: {
      required: true,
    },
  },
  methods: {
    onOk() {
      this.$emit('input', { ...this.selectedNode })
      this.hide()
    },
    onCancel() {
      this.selectedNode = this.value
      this.hide()
    },
    hide() {
      this.showSeletor = false
    },
    show() {
      // this.selectedNode = this.value
      this.showSeletor = true
    },
    onSelect(keys, node) {
      // console.log('on select ',args)
      // console.log('nodes', node)
      this.selectedNode = node.node.dataRef
    },
    onLoadData(treeNode) {
      console.log('%c treeNode','color:red',treeNode)
      if (treeNode.dataRef.depth >= 2 || treeNode.dataRef.isLeaf) {
        return Promise.resolve()
      }
      // console.log('%c children', 'color:red', treeNode.dataRef)
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        let nodeData = treeNode.dataRef
        let params = {
          partnerUid: treeNode.dataRef.partnerUid
        }
        if (nodeData.depth !== 0) {
          params.childUid = nodeData.key
        }
        this.getUserList(params).then((res) => {
          treeNode.dataRef.children = res.map((item) => {
            return {
              title: item.name,
              key: item.uid + '',
              childUid:item.uid,
              depth: nodeData.depth + 1,
              partnerUid: nodeData.partnerUid,
              isLeaf:nodeData.depth >= 1,
            }
          })
          this.partnerOpts = [...this.partnerOpts]
          resolve()
        })
      })
    },
    initRootTree() {
      this.getPartner()
        .then((res) => {
          let arr = res.map((item) => {
            return {
              title: item.name,
              key: item.partnerUid + '',
              depth: 0,
              partnerUid: item.partnerUid,
            }
          })
          let firstRoot = {
            title: "我的客户",
            key: this.userId + '',
            depth: 0,
            partnerUid: this.userId
          }
          arr.unshift(firstRoot)
          if (this.containSelf) {
            firstRoot = {
              title: "本人",
              key: '0',
              depth: 0,
              partnerUid: 0,
              isLeaf:true,
            }
            arr.unshift(firstRoot)
          }
          arr.forEach((item) => {
            item.isRoot = true 
          })
          this.partnerOpts = arr
          let valueInited = this.selectedNode.key!==undefined
          if(valueInited){

          }else {
            this.selectedNode = firstRoot
            this.$emit('input', firstRoot)
          }
          // return arr
        })
    },
    ...mapActions('broker', ['getPartner', 'getUserList'])
  },
  created() {
    this.selectedNode = this.value
    this.initRootTree()
  },
  watch: {
    value(value) {
      // console.log('%c selectedNode','color:red',value)
      this.selectedNode = value
    },
  },
  computed: {
    
    ...mapState('account', ['userId']),
    ...mapState('broker', ['partners'])
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
