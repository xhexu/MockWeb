<template>
  <div class="document">
    <ky-row>
      <ky-col :span="24">
        <div>
          <img id="x1" src="../../common/image/001.png"/>
          <img id="x2" src="../../common/image/002.png"/>
          <img id="x3" src="../../common/image/003.png"/>
          <img id="x4" src="../../common/image/004.png"/>
          <img id="x5" src="../../common/image/005.png"/>
          <img id="x6" src="../../common/image/006.png"/>
          <div>----参考以下示例----</div>
          <img id="x7" src="../../common/image/007.png"/>
        </div>
      </ky-col>
    </ky-row>

  </div>
</template>

<script>
	export default {
		data: () => ({}),
    methods: {
      goAnchor (selector) {
        var anchor = this.$el.querySelector(selector)
        document.body.scrollTop = anchor.offsetTop
      }
    },
    mounted:function () {

    }
	}
</script>

<style lang="scss">
  .document{
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }

</style>
