<template>
    <div>
      <h3>受診の記録</h3>
        <table align="center">
            <thead>
            <tr>
                <th>検診名</th>
                <th>受診医療機関名</th>
                <th>受診日</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <select id="examinationName_1" v-model="examinationName_1">
                  <option disabled value="">以下の中から選択してください</option>
                  <option>特定健診</option>
                  <option>後期高齢者検診</option>
                  <option>特定保険指導（初回）</option>
                  <option>国保35〜39歳検診</option>
                  <option>職場で行う検診</option>
                  <option>胃がん検診</option>
                  <option>大腸がん検診</option>
                  <option>肺がん検診</option>
                  <option>子宮がん検診</option>
                  <option>乳がん検診</option>
                  <option>歯周疾患検診</option>
                  <option>骨粗しょう症検診</option>
                  <option>歯っぴーファミリー検診</option>
                  <option>個人が任意で受ける検診</option>
                  <option>個人が任意で受ける歯科検診</option>
                </select>
              </td>
              <td>
                <input
                  id="medicalInstitutionName_1"
                  type="text"
                  v-model="medicalInstitutionName_1"
                >
              </td>
              <td>
                <datepicker 
                  id="consultationDate_1"
                  v-model="consultationDate_1"
                  :format="DatePickerFormat" 
                  :language="ja" 
                  placeholder="日付を選択してください"></datepicker>
              </td>
            </tr>
            <tr>
              <td>
                <select id="examinationName_2" v-model="examinationName_2">
                  <option disabled value="">以下の中から選択してください</option>
                  <option>特定健診</option>
                  <option>後期高齢者検診</option>
                  <option>特定保険指導（初回）</option>
                  <option>国保35〜39歳検診</option>
                  <option>職場で行う検診</option>
                  <option>胃がん検診</option>
                  <option>大腸がん検診</option>
                  <option>肺がん検診</option>
                  <option>子宮がん検診</option>
                  <option>乳がん検診</option>
                  <option>歯周疾患検診</option>
                  <option>骨粗しょう症検診</option>
                  <option>歯っぴーファミリー検診</option>
                  <option>個人が任意で受ける検診</option>
                  <option>個人が任意で受ける歯科検診</option>
                </select>
              </td>
              <td>
                <input
                  id="medicalInstitutionName_2"
                  type="text"
                  v-model="medicalInstitutionName_2"
                >
              </td>
              <td>
                <datepicker 
                  id="consultationDate_2"
                  v-model="consultationDate_2"
                  :format="DatePickerFormat" 
                  :language="ja" 
                  placeholder="日付を選択してください"></datepicker>
              </td>
            </tr>
            <tr>
              <td>
                <select id="examinationName_3" v-model="examinationName_3">
                  <option disabled value="">以下の中から選択してください</option>
                  <option>特定健診</option>
                  <option>後期高齢者検診</option>
                  <option>特定保険指導（初回）</option>
                  <option>国保35〜39歳検診</option>
                  <option>職場で行う検診</option>
                  <option>胃がん検診</option>
                  <option>大腸がん検診</option>
                  <option>肺がん検診</option>
                  <option>子宮がん検診</option>
                  <option>乳がん検診</option>
                  <option>歯周疾患検診</option>
                  <option>骨粗しょう症検診</option>
                  <option>歯っぴーファミリー検診</option>
                  <option>個人が任意で受ける検診</option>
                  <option>個人が任意で受ける歯科検診</option>
                </select>
              </td>
              <td>
                <input
                  id="medicalInstitutionName_3"
                  type="text"
                 v-model="medicalInstitutionName_3"
                >
              </td>
              <td>
                <datepicker 
                  id="consultationDate_3"
                  v-model="consultationDate_3"
                  :format="DatePickerFormat" 
                  :language="ja"
                  placeholder="日付を選択してください"></datepicker>
              </td>
            </tr>
            </tbody>
        </table>
        <button @click="record">記録する</button>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
import Datepicker from "vuejs-datepicker"
import { ja } from 'vuejs-datepicker/dist/locale'

export default {
  data() {
    return {
        ja:ja,
        DatePickerFormat: 'yyyy年M月d日',
        examinationName_1: this.$store.getters.examinationName_1,
        examinationName_2: '',
        examinationName_3: '',
        medicalInstitutionName_1: '',
        medicalInstitutionName_2: '',
        medicalInstitutionName_3: '',
        consultationDate_1: '',
        consultationDate_2: '',
        consultationDate_3: '',
    };
  },
  created() {
    console.log('---- created -----')
    console.log(this.$store.getters.idToken)
    console.log(this.$store.getters.examinationName_1)
    this.examinationName_1 = this.$store.getters.examinationName_1
    this.examinationName_2 = this.$store.getters.examinationName_2
    this.examinationName_3 = this.$store.getters.examinationName_3
    this.medicalInstitutionName_1 = this.$store.getters.medicalInstitutionName_1
    this.medicalInstitutionName_2 = this.$store.getters.medicalInstitutionName_2
    this.medicalInstitutionName_3 = this.$store.getters.medicalInstitutionName_3
    this.consultationDate_1 = this.$store.getters.consultationDate_1
    this.consultationDate_2 = this.$store.getters.consultationDate_2
    this.consultationDate_3 = this.$store.getters.consultationDate_3
  },
  components: {
    Datepicker
  },
  methods: {
    record() {
      console.log('---- dispatch record ----')
      this.$store.dispatch('record', {
        examinationName_1: this.examinationName_1,
        examinationName_2: this.examinationName_2,
        examinationName_3: this.examinationName_3,
        medicalInstitutionName_1: this.medicalInstitutionName_1,
        medicalInstitutionName_2: this.medicalInstitutionName_2,
        medicalInstitutionName_3: this.medicalInstitutionName_3,
        consultationDate_1: this.consultationDate_1,
        consultationDate_2: this.consultationDate_2,
        consultationDate_3: this.consultationDate_3,
      })
    }
  }
};
</script>