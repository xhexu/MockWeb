<template>
  <div class="intface_div">
    <div class="intface_menu">
      <div style="padding:0 10px 0 30px">
        <ky-row>
          <ky-col :span="16">
            <span v-for="item in navName">
              <router-link v-show="item.isUrl" :to="{path:item.url}">{{item.text}}</router-link>
              <span v-show="!item.isUrl">{{item.text}}</span>
            </span>
          </ky-col>
          <ky-col :span="8" style="text-align: right">
            <router-link :to="{path:'/editor',query:{isEdit:false}}">新增</router-link>
            <router-link :to="{path:'/editor',query:{isEdit:true}}">修改</router-link>
            <span @click="doDele()" style="cursor: pointer;color:#4285F4">删除</span>
          </ky-col>
        </ky-row>
      </div>
    </div>
    <router-view ></router-view>
    <div class="intface_content">
      <div style="padding: 20px">
        <span class="intface_content-title">接口详情</span>
        <ky-row style="margin: 20px">
          <ky-col :span="12">
            <span>ID:{{detailItem._id}}</span>
            <span>接口名:{{detailItem.OP_NAME}}</span>
            <span>说明:{{detailItem.REMARK||'---'}}</span>
            <span>出参:
              <pre>
                {{detailItem.OUT_PARAMS}}
              </pre>
            </span>
          </ky-col>
          <ky-col :span="12">
            <span>模拟地址:{{mockUrl}}</span>
            <span>创建时间:{{detailItem.CREATE_TIME}}</span>
            <span>方法:{{detailItem.METHOD}}</span>
            <span></span>
            <span>入参:
              <pre>
                {{detailItem.IN_PARAMS}}
              </pre>
            </span>
          </ky-col>
        </ky-row>
      </div>

      <div style="padding: 20px">
        <span class="intface_content-title">模拟数据</span>
        <ky-row :gutter="20" style="margin-left: 5px">
          <ky-col :span="12" >
            <ky-button @click="doMock()">手动模拟</ky-button>
            <ky-button @click="doMockAuto()">{{mockText}}</ky-button>
              <pre>
                {{mockData}}
              </pre>
          </ky-col>
          <ky-col :span="12">
            <ky-button @click="doMock()">接口测试</ky-button>
              <pre>
                todo...
              </pre>
          </ky-col>
        </ky-row>
      </div>
    </div>
  </div>
</template>

<script>
  import _bus from '../../services/businessServices'
  export default {
    data: () => ({
      loading: false,
      projectObj: '',
      detailItem: '',
      interval: null,
      mockData: null,
      mockText: '自动模拟',
      mockUrl:'',
      navName: [{
        text:'首页/',
        isUrl:true,
        url:'/project'
      },{
        text:'接口列表/',
        isUrl:true,
        url:'/interList'
      }]
    }),

    methods: {
      doMock: function () {
          let url = this.projectObj.MOCK_URL+this.detailItem.URL,me = this
          _bus._DoMock(url).then(function (data) {
            me.mockData = JSON.parse(JSON.stringify(data).replace(/\s/g,""));
          })
      },
      doMockAuto: function () {

          if(this.mockText=='自动模拟'){
            this.interval = setInterval(()=>{
              this.doMock();
              this.mockText = '关闭模拟';
            },3000)
          }else{
            this.closeInterval()
          }

      },
      closeInterval: function () {
        this.mockText = '自动模拟';
        clearInterval(this.interval);
      },
      doDele: function () {
        this.$confirm('确认删除当前接口？', '注意')
          .then(() => {
            _bus._DeleteInterface({ID:this.detailItem._id}).then((data)=>{
              if(data&&data.success){
                this.$router.push({path:'/interList'});
              }
              this.$message({
                message: data.message,
                type: data.success?'success':'error'
              });
            })
          }).catch(() => {
          });
      }
    },
    computed: {},
    beforeMount: function () {
      this.projectObj = this.$store.getters.getProjectObj;
      this.detailItem = this.$store.getters.getInterfaceObj;
      this.mockUrl = this.$config.SERVER_ADDRESS+'/mock'+this.projectObj.MOCK_URL+this.detailItem.URL;
      this.navName.push({
        text:this.detailItem.OP_NAME,
        isUrl:false,
        url:'/'
      })
    }
  }
</script>

<style lang="scss" scoped>

  .intface_div{
    margin: auto;
    width: 80%;
  }
  .intface_content {
    background-color: white;
    margin-top: 10px;
    span{
      display: block;
      margin: 10px;
    }
    pre{
      margin-top: 20px;
    }
    &-title{
      color: #4285F4;
      font-size: 16px;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 10px;
    }
  }
  .intface_menu{
    background-color: white;
    height: 45px;
    line-height: 45px;
  }

</style>
