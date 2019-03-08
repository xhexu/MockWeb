<template>
  <div class="interface-edit">
    <ky-form ref="form" :model="form" label-width="80px">
      <ky-form-item label="所属项目:">
        <ky-input :disabled="true" v-model="form.PROJECT_ID"></ky-input>
      </ky-form-item>
      <ky-form-item label="接口名称:">
        <ky-input placeholder="请输入接口OP_NAME" v-model="form.OP_NAME">
          <ky-select v-model="form.METHOD" slot="prepend" placeholder="请求方法">
            <ky-option label="post" value="post"></ky-option>
            <ky-option label="get" value="get"></ky-option>
          </ky-select>
        </ky-input>
      </ky-form-item>
      <ky-form-item label="URL:">
        <ky-input placeholder="请输入URL" v-model="form.URL"></ky-input>
      </ky-form-item>
      <ky-form-item label="入参:">
        <ky-input placeholder="请输入入参" rows="4" type="textarea" v-model="form.IN_PARAMS"></ky-input>
      </ky-form-item>
      <ky-form-item label="出参:">
        <ky-input placeholder="请输入出参" rows="4" type="textarea" v-model="form.OUT_PARAMS"></ky-input>
      </ky-form-item>
      <ky-form-item label="描述:">
        <ky-input placeholder="请输入接口描述" v-model="form.REMARK"></ky-input>
      </ky-form-item>
    </ky-form>

    <div class="interface-edit_button">
      <ky-button @click="goBack()">取 消</ky-button>
      <ky-button type="primary" @click="addInterface()">{{buttonText}}</ky-button>
    </div>

  </div>
</template>
<script>
  import _bus from '../../services/businessServices'
  export default {
    data: () => ({
      buttonText: '创建',
      form: {
        PROJECT_ID:'',
        OP_NAME: '',
        URL:'',
        REMARK:'',
        METHOD:'',
        IN_PARAMS:'',
        OUT_PARAMS:''
      },
    }),
    methods: {
      goBack () {
        this.$router.push({path: '/detail'});
      },
      addInterface () {
        let me = this;
        let params = me.form;
        if (!!!params.OP_NAME) {
          me.$message({
            message: 'OP_NAME不能为空',
            type: 'error'
          });
          return;
        } else if (!!!params.URL) {
          me.$message({
            message: 'URL不能为空',
            type: 'error'
          });
          return;
        } else if (!!!params.IN_PARAMS) {
          me.$message({
            message: '入参不能为空',
            type: 'error'
          });
          return;
        }else if (!!!params.OUT_PARAMS) {
          me.$message({
            message: '出参不能为空',
            type: 'error'
          });
          return;
        }

        if(me.buttonText==='创建'){
          _bus._AddInterface(me.form).then((data)=>{
            this.$message({
              message: data.message,
              type: data.success?"success":"error"
            });
            this.$router.push({path: '/detail'});
          },()=>{

          })
        }else{
          _bus._EditInterface(me.form).then((data)=>{
            this.$message({
              message: data.message,
              type: data.success?"success":"error"
            });
            this.$router.push({path: '/detail'});
          },()=>{

          })
        }
      }
    },
    beforeMount: function () {
      const isEdit = this.$route.query.isEdit;
      debugger
      if(isEdit){
        const item = this.$store.getters.getInterfaceObj;
        this.form = item;
        this.buttonText = '修改';
      }
      this.form.PROJECT_ID = this.$store.getters.getProjectObj._id;
    }
  }
</script>

<style lang="scss">
  .interface-edit{
    padding: 20px;
    width: 80%;
    margin: auto;
    background-color: white;

    &_button{
      text-align: center;
    }
  }
  .ky-select .ky-input {
    width: 100px;
  }

</style>
