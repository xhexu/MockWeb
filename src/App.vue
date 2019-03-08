<template>
  <div id="app">
    <router-view transition="fade" transition-mode="out-in" style="height: 100%"></router-view>
  </div>
</template>

<script>
	export default {
		data: () => ({}),
    mounted:function () {
    }
	}
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #EEEEEE;
    font-family: 'inherit';
    color: #333;
    font-size: 14px;
    overflow: auto;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: #4285F4;
    text-decoration: none;
  }
  i {
    color:#4285F4;
  }

  pre{
    background-color: #f5f5f5;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-family:"Courier New";
    margin: 0px;
  }

  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

</style>
