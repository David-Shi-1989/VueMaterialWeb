<template>
  <div class="sdnclass-login-wrap s-full">
    <div class="card-wrap">
      <div class="logo"></div>
      <div class="login-form s-full">
        <form novalidate class="md-layout">
          <md-field :class="getValidationClass('lang')">
            <label for="lang">{{$t('m.common.language')}}</label>
            <md-select name="lang" v-model="form.lang" @selectionChange="onLangChange">
              <md-option v-for="item in $store.getters['config/getLangList']" :key="item.key" :value="item.key">{{item.text}}</md-option>
            </md-select>
          </md-field>
          <md-field :class="getValidationClass('username')">
            <label for="username">{{$t('m.common.username')}}</label>
            <md-input name="username" v-model="form.username" matTooltip="test"/>
            <span class="md-error" v-if="!$v.form.username.required">必配项</span>
            <span class="md-error" v-if="$v.form.username.required && !$v.form.username.minLength">长度至少3位</span>
            <span class="md-error" v-if="!$v.form.username.maxLength">长度不能超过32位</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label for="password">{{$t('m.common.password')}}</label>
            <md-input name="password" type="password" v-model="form.password" />
            <span class="md-error" v-if="!$v.form.password.required">必配项</span>
            <span class="md-error" v-if="$v.form.password.required && !$v.form.password.minLength">长度至少3位</span>
            <span class="md-error" v-if="!$v.form.password.maxLength">长度不能超过32位</span>
          </md-field>
        </form>
        <md-button class="md-raised md-primary" @click="onSubmitClick">{{$t('m.common.login')}}</md-button>
      </div>
    </div>
    <footer class="foot-wrap">
      <p>推荐使用的浏览器及最低版本为：Google Chrome 55, Internet Explorer 11, Mozilla Firefox 50.</p>
      <p>推荐分辨率显示宽度为：1600</p>
      <p>版权所有© 2013-2021 新华三技术有限公司，保留一切权利.</p>
    </footer>
  </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        lang: this.$store.getters['config/getLang'],
        username: 'sdn',
        password: 'sdn123456'
      }
    }
  },
  validations: {
    form: {
      lang: { required },
      username: {
        required,
        mingLength: minLength(3),
        maxLength: maxLength(32)
      },
      password: {
        required,
        mingLength: minLength(3),
        maxLength: maxLength(32)
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.lang = this.$store.getters['config/getLang']
      this.form.username = ''
      this.form.password = ''
    },
    checkForm () {
      this.$v.$touch()
      return !this.$v.$invalid
    },
    async onSubmitClick () {
      if (this.checkForm()) {
        this.$UI.loading.show()
        this.doLogin().then(isLoginSucces => {
          // 登录成功
          if (isLoginSucces) {
            this.$store.commit('config/setUserInfo', { id: this.form.username, name: this.form.username, isLogin: true })
            // 跳转进页面
            if (this.$store.getters['config/getLoginLastUrl']) {
              this.$router.push({ path: this.$store.getters['config/getLoginLastUrl'] })
            } else {
              this.$router.push({ name: 'Home' })
            }
          }
        }).finally(() => {
          this.$UI.loading.hide()
        })
      }
    },
    doLogin () {
      // TODO 假登录
      return new Promise(function (resolve) {
        setTimeout(() => {
          resolve(true)
        }, 1800)
      })
    },
    // event
    onLangChange () {
      console.log('lang change')
    }
  }
}
</script>
<style lang="scss" scoped>
$cardWidth: 702px;
.sdnclass-login-wrap {
  background: url('../assets/image/login-bg.png') no-repeat;
  background-size: cover;
  & > .card-wrap {
    position: relative;
    top: 160px;
    margin: 0 auto;
    width: $cardWidth;
    height: 430px;
    display: flex;
    & > div.logo {
      flex-shrink: 0;
      width: 252px;
      height: 100%;
      opacity: .96;
      background-color: #292f39;
      background-image: url('../assets/image/security-logo.svg');
      background-repeat: no-repeat;
      background-size: 180px 140px;
      background-position: center;
    }
    & > div.login-form {
      $paddingGap: 95px;
      background-color: #fff;
      padding: $paddingGap $paddingGap 0 $paddingGap;
      button.md-raised.md-primary {
        margin-left: 0;
        margin-right: 0;
        width: 100%;
      }
    }
  }
  & > .foot-wrap {
    position: absolute;
    width: $cardWidth;
    top: 650px;
    left: calc((100% - #{$cardWidth}) / 2);
    color: #ccc;
    font-size: 12px;
    & > p {
      text-align: center;
    }
  }
}
</style>
