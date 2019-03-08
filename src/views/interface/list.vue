<template>
  <div v-loading="loading">
    <div class="intface_init" v-show="itemList.length==0">
      还没有创建接口~
      <router-link :to="{path:'/editor',query:{isEdit:false}}">去创建</router-link>
    </div>
    <div class="intface_menu" v-show="itemList.length>0">
      <div style="padding:0 10px 0 20px">
        <ky-row>
          <ky-col :span="16">
            <span v-for="item in navName">
              <router-link v-show="item.isUrl" :to="{path:item.url}">{{item.text}}</router-link>
              <span v-show="!item.isUrl">{{item.text}}</span>
            </span>
          </ky-col>
          <ky-col :span="8">
            <ky-input placeholder="请输入关键字" v-model="searchKey">
              <ky-button slot="append" @click="doSearch()">搜索</ky-button>
            </ky-input>
          </ky-col>
        </ky-row>
      </div>
    </div>
    <div style="margin-top: 10px">
      <ky-row v-for="(item,index) in itemList" :key="index" @click.native="goDetailView(item)" class="intface_cont">
        <ky-col :span="1">
          <div class="intface_cont-left">
            <span>I</span>
          </div>
        </ky-col>
        <ky-col :span="22" >
          <div class="intface_cont-right">
            <div>名称:{{item.OP_NAME}}</div>
            <div>时间:{{item.CREATE_TIME}}</div>
          </div>
        </ky-col>
        <ky-col :span="1" style="line-height: 50px;">
          <span>[{{(pageIndex-1)*pageSize+index+1}}]</span>
        </ky-col>

      </ky-row>
    </div>

    <div class="intface_fot" v-show="itemList.length>0">
      <ky-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="pageTotal">
      </ky-pagination>
    </div>

    <router-view></router-view>
  </div>

</template>

<script>
  import bus from '../../services/businessServices'
  export default {
    data: () => ({
      loading: true,
      searchKey: '',
      projectId: '',
      pageSize: 10,
      pageIndex: 1,
      pageTotal: 0,
      navName:[{
        text:'首页/',
        isUrl: true,
        url:'/project'
      }],
      itemList: []
    }),
    methods: {
      doQuery: function () {
          let me = this;
          let params = {
            PAGE_SIZE:me.pageSize,
            PAGE_INDEX:me.pageIndex,
            PROJECT_ID: me.projectId
          };
          bus._GetInterface(params).then(function (data) {
              if(data&&data.data){
                  me.itemList = data.data
                  me.pageTotal = data.total
              }
              me.loading = false;
          })
      },
      goDetailView: function (item) {
          this.$store.commit('addInterface',item)
          this.$router.push({path: '/detail'});
      },
      doSearch: function (index) {
        let me = this;
        let params = {
          PAGE_SIZE:me.pageSize,
          PAGE_INDEX:index||me.pageIndex,
          PROJECT_ID: me.projectId,
          SEARCH_KEY: me.searchKey
        };
        me.loading = true;
        bus._GetInterface(params).then(function (data) {
          if(data&&data.data){
            me.itemList = data.data
            me.pageTotal = data.total
          }
          me.loading = false;
        })
      },
      handleCurrentChange (index) {
          let me = this;
          me.pageIndex = index;
          me.doSearch(index);
      }
    },
    created () {
        this.projectId = this.$store.getters.getProjectObj._id
    },
    beforeMount (){
      this.navName.push({
        text:'接口列表',
        isUrl:false,
        url:'/'
      })
      this.doQuery();
    }
  }
</script>

<style lang="scss" scoped>

  .intface_menu{
    width: 80%;
    background-color: white;
    height: 45px;
    line-height: 45px;
    margin: auto;
  }
  .intface_init{
    width: 80%;
    padding: 50px;
    background-color: white;
    min-height: 400px;
    margin: 0 auto;
  }
  .intface_fot{
    width: 80%;
    background-color: white;
    text-align: center;
    margin: auto;
    margin-top: 10px;
  }
  .intface_cont{
    width: 80%;
    min-height: 50px;
    background-color: white;
    cursor: pointer;
    margin: auto;
    border-bottom: 1px solid #e0e0e0;

    &-left{
      line-height: 50px;
      padding: 0 10px 0 10px;
      font-size: 20px;
      text-align: center;
    }
    &-right{
      padding: 5px;
      line-height: 25px;
    }
  }
  .search_box .ky-input__inner {
    border: none;
  }
</style>
