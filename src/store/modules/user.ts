import { Commit } from 'vuex';
export default {
  state: {
    familyMember: {}
  },

  mutations: {
    Set_user(state: any, familyMember: object) {
      state.familyMember = { ...familyMember };
    },
  },

  actions: {
    Set_user(context: { commit: Commit }, familyMember: object) {
      // console.log(familyMember, 'action里面')
      context.commit('Set_user', familyMember);
    },
  }
}