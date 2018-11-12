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
    <a-modal
      title="Title"
      :visible="showSeletor"
      @cancel="showSeletor=false"
    >
    <!-- @ok="handleOk"
    :confirmLoading="confirmLoading"
     -->
       <a-tree
        :loadData="onLoadData"
        :treeNodes="treeData"
      />
    </a-modal>
    <a-button @click="showSeletor=true">选择</a-button>
  </span>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'partnerUid',
  data() {
    return {
      showSeletor:true,
      treeData: [
        { title: 'Expand to load', key: '0' },
        { title: 'Expand to load', key: '1' },
        { title: 'Tree Node', key: '2', isLeaf: true },
      ],
      partnerUid: '',
      users: {
        depth1: [],
        depth2: [],
        depth3: [],
      },
      selectedUserId: {
        depth1: "",
        depth2: "",
        depth3: "",
      },
      currentDepth: 0,
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
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: 'Child Node', key: `${treeNode.eventKey}-0` },
            { title: 'Child Node', key: `${treeNode.eventKey}-1` },
          ]
          this.treeData = [...this.treeData]
          resolve()
        }, 1000)
      })
    },
    onChange(value) {
      console.log(arguments)
    },
    onClose() {
      console.log('%c tag closed', 'color:red', )
    },
    getUsers() {
      if (this.currentDepth >= 3) {
        return
      }
      this.currentDepth++
        this.getUserList({
          partnerUid: this.partnerUid
        })
        .then((res) => {
          this.users["depth" + this.currentDepth] = res
        })
    },
    ...mapActions('broker', ['getPartner', 'getUserList'])
  },
  created() {
    this.getPartner()
    if (!this.value) {
      this.partnerUid = this.userId
    } else {
      this.partnerUid = Number(this.value)
    }
  },
  watch: {
    selectedUserId(value) {
      console.log('%c selected user id changed', 'color:red', value)
      this.getUserList({
        partnerUid: this.partnerUid,
        childUid: value,
      })
    },
    partnerUid(val) {
      // this.getUsers()
      this.$emit('input', val)
    },
    value(value) {
      this.partnerUid = Number(value)
    },
  },
  computed: {
    partnerOpts() {
      let arr = this.partners.map((item) => {
        return {
          label: item.name,
          value: item.partnerUid,
        }
      })
      arr.unshift({ label: "我的客户", value: this.userId })
      if (this.containSelf) {
        arr.unshift({ label: "本人", value: 0 })
      }
      return arr
    },
    ...mapState('account', ['userId']),
    ...mapState('broker', ['partners'])
  },
  components: {},
}

</script>
<style lang='scss' scoped>


</style>
