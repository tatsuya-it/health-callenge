<template>
    <div>
      <h3>受診の記録</h3>
      <input type="hidden" id="missionComment" v-model="missionComment">
      <h4> {{ missionComment }} </h4>
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
        <button @click="record">記録</button>
    </div>
</template>

<script>
import axios from 'axios';
import Datepicker from "vuejs-datepicker"
import { ja } from 'vuejs-datepicker/dist/locale'

export default {
  data() {
    return {
        ja:ja,
        DatePickerFormat: 'yyyy年M月d日',
        examinationName_1: '',
        examinationName_2: '',
        examinationName_3: '',
        medicalInstitutionName_1: '',
        medicalInstitutionName_2: '',
        medicalInstitutionName_3: '',
        consultationDate_1: '',
        consultationDate_2: '',
        consultationDate_3: '',
        missionComment: '',
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
  },
  created() {
    console.log(' --- created ---')
    axios
      .get('/user/', {
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      })
      .then(response => {
        console.log(response.data.documents)
        let matchObj = []
        for (var item of response.data.documents) {
          if (item.fields.localId.stringValue === localStorage.getItem('localId')) {
            let updateTime = item.updateTime
            if (matchObj.length == 0) {
              matchObj.push(item)
            } else {
              if (updateTime < item.updateTime) {
                matchObj = []
                matchObj.push(item)
              }
            }
          } 
        }
        console.log(matchObj)
        if (matchObj.length > 0) {
          console.log(matchObj[0])
          let newRecord = matchObj[0].fields
          this.examinationName_1 = newRecord.examinationName_1.stringValue
          this.examinationName_2 = newRecord.examinationName_2.stringValue
          this.examinationName_3 = newRecord.examinationName_3.stringValue
          this.medicalInstitutionName_1 = newRecord.medicalInstitutionName_1.stringValue
          this.medicalInstitutionName_2 = newRecord.medicalInstitutionName_2.stringValue
          this.medicalInstitutionName_3 = newRecord.medicalInstitutionName_3.stringValue
          this.consultationDate_1 = newRecord.consultationDate_1.stringValue
          this.consultationDate_2 = newRecord.consultationDate_2.stringValue
          this.consultationDate_3 = newRecord.consultationDate_3.stringValue
          console.log(newRecord.missionComment)
          this.missionComment = newRecord.missionComment.stringValue
        }
      })
  },
  components: {
    Datepicker
  },
  methods: {
    async record() {
      let completeCount = 0
      let completeComment = ''
      if (this.examinationName_1 != '' && this.medicalInstitutionName_1 != '' && this.consultationDate_1 != '') {
        completeCount++
      }
      if (this.examinationName_2 != '' && this.medicalInstitutionName_2 != '' && this.consultationDate_2 != '') {
        completeCount++
      }
      if (this.examinationName_3 != '' && this.medicalInstitutionName_3 != '' && this.consultationDate_3 != '') {
        completeCount++
      }
      if (completeCount == 0) {
        completeComment = "3つの受診でポイント獲得です"
      } else if (completeCount == 1)  {
        completeComment = "あと2つの受診でポイント獲得です"
      } else if (completeCount == 2)  {
        completeComment = "あと1つの受診でポイント獲得です"
      } else if (completeCount == 3)  {
        completeComment = "ポイントを獲得しました"
      } else {
        completeComment = "ポイントを獲得しました."
      }
      console.log(completeComment)
      await axios.post(
        '/user',
        {
          fields: {
            localId: {
              stringValue: localStorage.getItem('localId')
            },
            examinationName_1: {
              stringValue: this.examinationName_1
            },
            examinationName_2: {
              stringValue: this.examinationName_2
            },
            examinationName_3: {
              stringValue: this.examinationName_3
            },
            medicalInstitutionName_1: {
              stringValue: this.medicalInstitutionName_1
            },
            medicalInstitutionName_2: {
              stringValue: this.medicalInstitutionName_2
            },
            medicalInstitutionName_3: {
              stringValue: this.medicalInstitutionName_3
            },
            consultationDate_1: {
              stringValue: this.consultationDate_1
            },
            consultationDate_2: {
              stringValue: this.consultationDate_2
            },
            consultationDate_3: {
              stringValue: this.consultationDate_3
            },
            missionComment: {
              stringValue: completeComment
            }
          },
          createTime: new Date()
        },
        {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
      );
    },
  }
};
</script>