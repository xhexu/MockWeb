<template>
  <div ref="codeEditor" v-bind:style="{height: height}"></div>
</template>

<script>
  let ace = require('brace')
  require('brace/mode/javascript')
  require('brace/theme/monokai')
  require('brace/ext/language_tools')
  require('brace/ext/searchbox')
export default {
  props: {
    value: String,
    theme: String,
    height: String
  },
  data () {
    return {
      codeEditor: {}
    }
  },
  computed: {
  },
  mounted () {
    this.theme = !this.theme?'monokai':this.theme;
    this.codeEditor = ace.edit(this.$refs.codeEditor)
    this.codeEditor.getSession().setMode('ace/mode/javascript')
    this.codeEditor.setTheme('ace/theme/'+this.theme)
    this.codeEditor.setOption('tabSize', 2)
    this.codeEditor.setOption('fontSize', 18)
    this.codeEditor.setOption('enableLiveAutocompletion', true)
    this.codeEditor.setOption('enableSnippets', true)
    this.codeEditor.clearSelection()
    this.codeEditor.getSession().setUseWorker(false)
    this.codeEditor.on('change', this.onChange)
    this.codeEditor.setValue(this.value,1);
  },
  methods: {
    format () {

    },
    onChange () {
      this.$emit('aceToParent',this.codeEditor.getValue())
    }
  },
  watch: {
    value:function (val) {
      this.codeEditor.setValue(val,1)
    }
  },
  components: {

  }
}
</script>


<style lang="scss">

</style>
