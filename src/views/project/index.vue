<template>
  <div>
    <div class="project-nav" v-show="dialogFormVisible">
      <div style="margin: 0 30px;text-align: right">
        <ky-button type="primary" @click="createProject()">创建项目</ky-button>
      </div>
    </div>

    <div class="project-card" v-show="dialogFormVisible">
      <ky-row :gutter="20" v-for="(p,index) in item" :key="index" class="project-card_row">
        <ky-col v-for="(x,index) in p" :span="6" :key="index" style="margin-bottom: 20px;">
          <ky-card @click.native="goView(x)" style="cursor: pointer">
            <div slot="header" style="height: 18px">
              <span>{{x.NAME}}</span>
            </div>
            <div class="project-card_con">模拟地址:{{x.URL}}</div>
            <div class="project-card_con">说明:{{x.REMARK}}</div>
            <div style="padding: 10px;text-align: center;margin-top: 20px">
              <ky-button-group style="width: 100%;">
                <ky-button icon="edit" title="编辑项目" class="project_button" @click.stop="editProject(x)"></ky-button>
                <ky-button icon="delete" title="删除项目" class="project_button" @click.stop="deleteProject(x)"></ky-button>
              </ky-button-group>
            </div>
          </ky-card>
        </ky-col>
      </ky-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import bus from '../../services/businessServices'
  export default {
    props:{},
    data: () => ({
      item: [],
      dialogFormVisible: true,
      addOrEdit: '',
      title: '',
      form: {
        name: '',
        url: '',
        mockUrl: '',
        role: '',
        remark: '',
      },
    }),
    methods: {
      goView: function (params) {
        this.$store.commit('addProject',params)
        this.$router.push({path: '/interList'});
      },
      deleteProject: function (params) {
        let me = this;
        this.$confirm('确认删除当前项目？', '注意')
          .then(() => {
            bus._DeleteProject({ID: params._id}).then(function (data) {
              me.checkData(data);
            });
          })
          .catch(() => {

          });
      },
      getProject: function () {
        let me = this;
        bus._GetProject().then(function (data) {
          let List = data.data;
          let listRows = [];
          let row = [];
          for (let i = 0; i < List.length; i++) {
            row.push(List[i]);
            if ((i + 1) % 4 == 0) {
              listRows.push(row);
              row = [];
            } else if (i == List.length - 1) {
              listRows.push(row)
            }
          }
          me.item = listRows;
        });
      },
      createProject: function () {
        let me = this;
        me.dialogFormVisible = false;
        this.$router.push({path: '/edit',query:{isEdit:false}});
      },
      editProject: function (params) {
        let me = this;
        me.dialogFormVisible = false;
        this.$store.commit('addProject',params)
        this.$router.push({path: '/edit',query:{isEdit:true}});
      },
      checkData: function (data) {
        let type;
        if (data.success) {
          type = 'success';
          this.getProject();
        } else {
          type = 'error'
        }
        this.$message({
          message: data.message,
          type: type
        });
      }
    },
    mounted: function () {
      let me = this;
      me.getProject();
    }
  }
</script>

<style lang="scss" scoped>

  .project-card {
    width: 100%;
    margin: 0 auto;
    &_row{
      margin: 0px !important;
      padding: 20px;
    }
    &_con{
      color:#999;
      font-size: 14px;
      overflow: hidden;
    }
  }

  .project_button {
    font-size: 10px;
    width: 50%;
  }

  .project-nav {
    height: 50px;
    background-color: #f9fafc;
    line-height: 50px;
  }

  .project_input--item {
    background-color: #f1f1f1;
    border: none;
    height: 30px;
    border-radius: 6px;
    width: 95%;
    font-size: 12px;
    padding-left: 10px;
    color: #495060;
  }
  .ky-card {
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
  }
  .ky-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .ky-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .over_text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
