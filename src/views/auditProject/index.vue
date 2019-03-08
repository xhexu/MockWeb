<template>
  <div class="audit">
    <div class="content_left">
      <ky-menu default-active="1-0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark" style="height: 100%;">
        <ky-submenu index="1">
          <template slot="title">待审核项目</template>
            <ky-menu-item v-for="(x,index) in data" :key="x" :index="'1-'+index" @click="showDetail(x)">{{x.NAME}}</ky-menu-item>
        </ky-submenu>
        <ky-submenu index="2">
          <template slot="title">待审核接口</template>
          <ky-menu-item index="2-1">选项1</ky-menu-item>
          <ky-menu-item index="2-2">选项2</ky-menu-item>
          <ky-menu-item index="2-3">选项3</ky-menu-item>
          <ky-menu-item index="2-4">选项4</ky-menu-item>
        </ky-submenu>
      </ky-menu>
    </div>
    <div style="margin: 20px auto;float: left;width: 85%;height: 100%;position: relative;">
      <ky-row  class="text item" style="height: 100%;">
        <ky-col :span="12" style="padding-left: 10%;padding-top: 5%">
          <ky-form style="width: 60%;" :label-position="'top'" label-width="80px" :model="beforeList">
            <ky-form-item label="项目名称">
              <ky-input disabled v-model="beforeList.name"></ky-input>
            </ky-form-item>
            <ky-form-item label="项目路径">
              <ky-input disabled v-model="beforeList.url"></ky-input>
            </ky-form-item>
            <ky-form-item label="创建时间">
              <ky-input disabled v-model="beforeList.createTime"></ky-input>
            </ky-form-item>
            <ky-form-item label="更新时间">
              <ky-input disabled v-model="beforeList.updateTime"></ky-input>
            </ky-form-item>
            <ky-form-item label="项目描述">
              <ky-input disabled type="textarea" v-model="beforeList.remark"></ky-input>
            </ky-form-item>
            <!--<ky-row class="text item" style="margin-top: 10px;">-->
              <!--<ky-col :span="12">-->
                <!--<ky-button @click.stop="editProject(p)">驳 回</ky-button>-->
              <!--</ky-col>-->
              <!--<ky-col :span="12" style="text-align: right">-->
                <!--<ky-button type="primary" @click.stop="deleteProject(p)">审 核</ky-button>-->
              <!--</ky-col>-->
            <!--</ky-row>-->
          </ky-form>
        </ky-col>
        <ky-col :span="12" style="padding-left: 10%;padding-top: 5%">
          <ky-form style="width: 60%;" :label-position="'top'" label-width="80px" :model="afterList">
            <ky-form-item label="项目名称">
              <ky-input disabled v-model="afterList.name"></ky-input>
            </ky-form-item>
            <ky-form-item label="项目路径">
              <ky-input disabled v-model="afterList.url"></ky-input>
            </ky-form-item>
            <ky-form-item label="创建时间">
              <ky-input disabled v-model="afterList.createTime"></ky-input>
            </ky-form-item>
            <ky-form-item label="更新时间">
              <ky-input disabled v-model="afterList.updateTime"></ky-input>
            </ky-form-item>
            <ky-form-item label="项目描述">
              <ky-input disabled type="textarea" v-model="afterList.remark"></ky-input>
            </ky-form-item>
            <ky-row class="text item" style="margin-top: 10px;">
              <ky-col :span="12">
                <ky-button @click="backProject()">驳 回</ky-button>
              </ky-col>
              <ky-col :span="12" style="text-align: right">
                <ky-button type="primary" @click="auditProject()">审 核</ky-button>
              </ky-col>
            </ky-row>
          </ky-form>
        </ky-col>
      </ky-row>
    </div>
  </div>
</template>

<script>
  import bus from "../../services/businessServices";
  import moment from "moment/min/moment.min"
  export default {
    data: () => ({
      data:[],
      id: '',
      beforeList: {
        name: '',
        url: '',
        remark: '',
        createTime: '',
        updateTime: ''
      },
      afterList: {
        name: '',
        url: '',
        remark: '',
        createTime: '',
        updateTime: ''
      }
    }),
    methods: {
      showDetail: function (params) {
      	let me = this;
        me.afterList = {
      		id: params._id,
          _project: params._PROJECT,
          name: params.NAME,
          url: params.URL,
          remark: params.REMARK,
          createTime: moment(params.CREATE_TIME).format('YYYY-MM-DD HH:mm:ss'),
          updateTime: moment(params.UPDATE_TIME).format('YYYY-MM-DD HH:mm:ss')
        };
        me.getProjectByID(params);
      },
      getProject: function () {
        let me = this;
        let params = {
        	STATE: 0
        };
        bus._getWAProject(params).then(function (data) {
          me.data = data.data;
          if(me.data.length == 0){
            me.beforeList = {
              name: '',
              url: '',
              remark: '',
              createTime: '',
              updateTime: ''
            };
            me.afterList = {
              name: '',
              url: '',
              remark: '',
              createTime: '',
              updateTime: ''
            }
          }else{
            me.id = data.data[0]._PROJECT;
            me.afterList = {
              id: me.data[0]._id,
              _project: me.data[0]._PROJECT,
              name: me.data[0].NAME,
              url: me.data[0].URL,
              remark: me.data[0].REMARK,
              createTime: moment(me.data[0].CREATE_TIME).format('YYYY-MM-DD HH:mm:ss'),
              updateTime: moment(me.data[0].UPDATE_TIME).format('YYYY-MM-DD HH:mm:ss')
            };
            me.getProjectByID();
          }
        });
      },
      getProjectByID: function (x) {
        let me = this;
        let params = {};
        params.ID = x ? x._PROJECT:me.id;
        bus._GetProject(params).then(function (data) {
          me.beforeList = {
            name:data.data[0].NAME,
            url: data.data[0].URL,
            remark: data.data[0].REMARK,
            createTime: moment(data.data[0].CREATE_TIME).format('YYYY-MM-DD HH:mm:ss'),
            updateTime: moment(data.data[0].UPDATE_TIME).format('YYYY-MM-DD HH:mm:ss')
          }
        })
      },
      auditProject: function () {
        let me = this;
        let params = {
          ID: me.afterList.id,
          _PROJECT: me.afterList._project,
          NAME: me.afterList.name,
          URL: me.afterList.url,
          REMARK: me.afterList.remark,
          CREATE_TIME: me.afterList.createTime,
          UPDATE_TIME: me.afterList.updateTime
        };
        bus._AuditProject(params).then(function (data) {
          me.$message({
            message: data.message,
            type:'success'
          });
          me.getProject();
        });
      },
      backProject: function () {
        let me = this;
        let params = {
        	ID: me.afterList.id
        };
        bus._BackProject(params).then(function (data) {
          me.$message({
            message: data.message,
            type:'success'
          });
          me.getProject();
        });
      },
      _checkData: function () {
      	let me = this;
        if(me.data.length == 0){
          me.beforeList = {
            name: '',
            url: '',
            remark: '',
            createTime: '',
            updateTime: ''
          };
          me.afterList = {
            name: '',
            url: '',
            remark: '',
            createTime: '',
            updateTime: ''
          }
        }
      }
    },
    mounted:function () {
    	let me = this;
      me.getProject();
    }
  }
</script>

<style lang="scss">
  .audit{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .content_left{
    width: 15%;
    position: relative;
    float: left;
    height: 100%;
    box-shadow:0 3px 10px #e0e0e0;
  }

</style>
