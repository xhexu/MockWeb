<template>
  <div>
    <div class="project-edit">
      <ky-form :model="form" label-width="100px" :label-position="'left'">
        <ky-form-item label="项目名称">
          <ky-input placeholder="项目名称用于项目区分" :span="12" v-model="form.NAME" auto-complete="off"></ky-input>
        </ky-form-item>
        <ky-form-item label="项目URL">
          <ky-input placeholder="项目URL用于项目实际测试请求" :span="12" v-model="form.URL" auto-complete="off"></ky-input>
        </ky-form-item>
        <ky-form-item label="模拟数据URL">
          <ky-input placeholder="模拟数据URL用于获取模拟数据的请求地址" :span="12" v-model="form.MOCK_URL"
          auto-complete="off"></ky-input>
        </ky-form-item>
        <ky-form-item label="解参规则">
          <ky-input placeholder="解参规则用于模拟数据出参解析" :rows="3" type="textarea" v-model="form.RESPONSE_ROLE" auto-complete="off"></ky-input>
        </ky-form-item>
        <ky-form-item label="项目描述">
          <ky-input placeholder="描述信息" :rows="3" type="textarea" v-model="form.REMARK" auto-complete="off"></ky-input>
        </ky-form-item>
      </ky-form>
      <div class="project-edit_button">
        <ky-button @click="goProject()">取 消</ky-button>
        <ky-button type="primary" @click="addProject()">{{buttonText}}</ky-button>
      </div>
    </div>
  </div>

</template>

<script>
  import bus from '../../services/businessServices'
  export default {
    data: () => ({
      buttonText:'创建',
      form: {
        NAME: '',
        URL: '',
        MOCK_URL: '',
        RESPONSE_ROLE: '',
        REMARK: '',
      }
    }),
    methods: {
      goProject: function () {
        this.$emit('refresh-parent');
        this.$router.push({path: '/project'})
      },
      addProject: function () {
        let me = this;
        let params = me.form;
        if (!!!params.NAME) {
          me.$message({
            message: '项目名称不能为空',
            type: 'error'
          });
          return;
        } else if (!!!params.URL) {
          me.$message({
            message: 'URL不能为空',
            type: 'error'
          });
          return;
        } else if (!!!params.MOCK_URL) {
          me.$message({
            message: '模拟数据URL不能为空',
            type: 'error'
          });
          return;
        }

        if(me.buttonText=='修改'){
          bus._EditProject(params).then(function (data) {
            me.checkData(data);
          });
        }else{
          bus._AddProject(params).then(function (data) {
            me.checkData(data);
          });
        }
      },
      checkData: function (data) {
        if (data.success) {
          this.goProject();
        }
        this.$message({
          message: data.message,
          type: data.success?'success':'error'
        });
      }
    },
    beforeMount: function () {
      const isEdit = this.$route.query.isEdit;
      if(isEdit){
        this.form = this.$store.getters.getProjectObj
        this.buttonText = '修改';
      }
    }
  }
</script>

<style lang="scss" scoped>

  .project-edit{
    width: 80%;
    min-height: 400px;
    background-color: white;
    line-height: 45px;
    margin: 10px auto;
    padding: 20px;

    &_button{
      text-align: center;
    }
  }

</style>
