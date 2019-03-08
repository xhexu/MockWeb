const state = {
    projectObj: {},
    interfaceObj: {}
}
const mutations = {
  addProject(state,data){
    state.projectObj = data
  },
  addInterface(state,data){
    state.interfaceObj = data
  }
}
const getters = {
  getProjectObj(state) {
    return state.projectObj
  },
  getInterfaceObj(state) {
    return state.interfaceObj
  }
}

export default {
  state,
  mutations,
  getters
}
