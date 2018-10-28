// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App2.vue'
import flex from 'flex.css'
import router from './router.js'
import {
  // Button,
  // LocaleProvider,
  Carousel,
  Icon,
  // Menu,
  // Layout,
  // Form,
  // Input,
  // Select,
  // Tabs,
  // Checkbox,
  Spin,
  // Message,
  Modal,
  Dropdown,
  // Upload,
  List,
  // Table,
  // TreeSelect,
  // Radio,
  // Col,
  // Row,
  // Alert,
  // Steps,
  // Breadcrumb,
  // DatePicker,
  // Card,
  // Divider,
  Popover
} from 'vue-antd-ui';
Vue.config.productionTip = false
function registerComponentChild(vue, parentAntComponent) {
  var parent = parentAntComponent
  for (let key in parent) {
    let child = parent[key]
    if (child.name && child.name[0] === "A") {
      vue.component(child.name, child)
    }
  }
}

// Vue.component(Button.name, Button)
// Vue.component(LocaleProvider.name, LocaleProvider)
Vue.component(Modal.name, Modal)
Vue.component(Popover.name, Popover)
// Vue.component(Upload.name, Upload)
// registerComponentChild(Vue, Upload)
Vue.component(Spin.name, Spin)
// Vue.component(Input.name, Input)
Vue.component(Dropdown.name, Dropdown)
// registerComponentChild(Vue, Input)
Vue.component(Icon.name, Icon)
Vue.component(Carousel.name, Carousel)
// Vue.component(Checkbox.name, Checkbox)
// Vue.component(Menu.name, Menu)
// registerComponentChild(Vue, Menu)
// Vue.component(Layout.name, Layout)
// registerComponentChild(Vue, Layout)
Vue.component(List.name, List)
registerComponentChild(Vue, List)
// Vue.component(Select.name, Select)
// registerComponentChild(Vue, Select)
// Vue.component(Tabs.name, Tabs)
// registerComponentChild(Vue, Tabs)
// Vue.component(Form.name, Form)
// registerComponentChild(Vue, Form)
// Vue.component(Table.name, Table)
// registerComponentChild(Vue, Table)
// Vue.component(TreeSelect.name, TreeSelect)
// registerComponentChild(Vue, Radio)
// Vue.component(Radio.name, Radio)
// registerComponentChild(Vue, TreeSelect)
// registerComponentChild(Vue, Col)
// Vue.component(Col.name, Col)
// registerComponentChild(Vue, Row)
// Vue.component(Row.name, Row)
// Vue.component(Alert.name, Alert)
// registerComponentChild(Vue, Steps)
// Vue.component(Steps.name, Steps)
// registerComponentChild(Vue, Alert)
// Vue.component(Breadcrumb.name, Breadcrumb)
// registerComponentChild(Vue, Breadcrumb)
// Vue.component(DatePicker.name, DatePicker)
// registerComponentChild(Vue, DatePicker)
// Vue.component(Divider.name, Divider)
// Vue.component(Card.name, Card)

/* eslint-disable no-new */
new Vue({
  el: '#app_show',
  router,
  components: { App },
  template: '<App/>'
})

//如何实现 '/'读取 index.html
