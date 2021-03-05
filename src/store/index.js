import Vue from 'vue';
import Vuex from 'vuex';
import axiosAuth from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    examinationName_1: null,
    examinationName_2: null,
    examinationName_3: null,
    medicalInstitutionName_1: null,
    medicalInstitutionName_2: null,
    medicalInstitutionName_3: null,
    consultationDate_1: null,
    consultationDate_2: null,
    consultationDate_3: null
  },
  getters: {
    idToken: state => state.idToken,
    examinationName_1: state => state.examinationName_1,
    examinationName_2: state => state.examinationName_2,
    examinationName_3: state => state.examinationName_3,
    medicalInstitutionName_1: state => state.medicalInstitutionName_1,
    medicalInstitutionName_2: state => state.medicalInstitutionName_2,
    medicalInstitutionName_3: state => state.medicalInstitutionName_3,
    consultationDate_1: state => state.consultationDate_1,
    consultationDate_2: state => state.consultationDate_2,
    consultationDate_3: state => state.consultationDate_3
  },
  mutations: {
    updateIdToken(state, idToken) {
      state.idToken = idToken;
    },
    updateConsultationRecord(state, records) {
      console.log('--- updateConsultationRecord ---')
      console.log(records)
      console.log(records.examinationName_1)
      console.log(records.medicalInstitutionName_1)
      console.log(records.consultationDate_1)
      state.examinationName_1 = records.examinationName_1
      state.examinationName_2 = records.examinationName_2
      state.examinationName_3 = records.examinationName_3
      state.medicalInstitutionName_1 = records.medicalInstitutionName_1
      state.medicalInstitutionName_2 = records.medicalInstitutionName_2
      state.medicalInstitutionName_3 = records.medicalInstitutionName_3
      state.consultationDate_1 = records.consultationDate_1
      state.consultationDate_2 = records.consultationDate_2
      state.consultationDate_3 = records.consultationDate_3
      console.dir(records)
      console.log(state)
    }
  },
  actions: {
    async autoLogin({ commit, dispatch }) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) return;
      const now = new Date();
      const expiryTimeMs = localStorage.getItem('expiryTimeMs');
      const isExpired = now.getTime() >= expiryTimeMs;
      const refreshToken = localStorage.getItem('refreshToken');
      if (isExpired) {
        await dispatch('refreshIdToken', refreshToken);
      } else {
        const expiresInMs = expiryTimeMs - now.getTime();
        setTimeout(() => {
          dispatch('refreshIdToken', refreshToken);
        }, expiresInMs);
        commit('updateIdToken', idToken);
      }
    },
    login({ dispatch }, authData) {
      axiosAuth
        .post(
          '/accounts:signInWithPassword?key=AIzaSyBjKR0lSpwcEqvXUKoZUuyQZtABHAVgi1s',
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(response => {
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken
          });
          router.push('/');
        });
    },
    logout({ commit }) {
      commit('updateIdToken', null);
      localStorage.removeItem('idToken');
      localStorage.removeItem('expiryTimeMs');
      localStorage.removeItem('refreshToken');
      router.replace('/login');
    },
    async refreshIdToken({ dispatch }, refreshToken) {
      await axiosRefresh
        .post('/token?key=AIzaSyBjKR0lSpwcEqvXUKoZUuyQZtABHAVgi1s', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then(response => {
          dispatch('setAuthData', {
            idToken: response.data.id_token,
            expiresIn: response.data.expires_in,
            refreshToken: response.data.refresh_token
          });
        });
    },
    register({ dispatch }, authData) {
      axiosAuth
        .post('/accounts:signUp?key=AIzaSyBjKR0lSpwcEqvXUKoZUuyQZtABHAVgi1s', {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(response => {
          dispatch('setAuthData', {
            idToken: response.data.idToken,
            expiresIn: response.data.expiresIn,
            refreshToken: response.data.refreshToken
          });
          router.push('/');
        });
    },
    record({ commit }, records) {
      console.log('action record index.js')
      commit('updateConsultationRecord', records)
    },
    setAuthData({ commit, dispatch }, authData) {
      const now = new Date();
      const expiryTimeMs = now.getTime() + authData.expiresIn * 1000;
      commit('updateIdToken', authData.idToken);
      localStorage.setItem('idToken', authData.idToken);
      localStorage.setItem('expiryTimeMs', expiryTimeMs);
      localStorage.setItem('refreshToken', authData.refreshToken);
      setTimeout(() => {
        dispatch('refreshIdToken', authData.refreshToken);
      }, authData.expiresIn * 1000);
    }
  }
});
