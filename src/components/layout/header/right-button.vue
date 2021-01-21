<template>
  <div>
    <ul class="head-menu">
      <li class="notify-item" @click="onNotifyClick">
        <md-badge md-content="12" md-dense md-position="top">
          <i class="fa fa-bell-o menu-icon"></i>
        </md-badge>
        <!-- <router-link :to="{name: 'Notify'}"><i class="fa fa-bell-o"></i></router-link> -->
      </li>
      <li>
        <router-link :to="{name: 'Setting'}"><i class="fa fa-cog menu-icon"></i></router-link>
      </li>
      <li class="user-item always-hover">
        <div><i class="ui-icon login-user-man menu-icon"></i></div>
        <div>
          <p>{{userName}}</p>
          <p>{{$t('m.common.tenant')}}</p>
        </div>
      </li>
      <li>
        <Dropdown trigger="click" placement="bottom-end" @on-click="onDropdownClick">
          <a href="javascript:void(0)" class="sc-dpd-a">
            <Icon type="ios-more"></Icon>
          </a>
          <DropdownMenu slot="list">
            <Dropdown placement="left-start" @on-click="onThemeChange">
              <DropdownItem>
                {{$t('m.common.theme')}}
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem v-for="item in $store.getters['config/themeList']" :key="item.key" :name="item.key"
                  :selected="item.key===$store.getters['config/theme']">
                  <i class="sc-dot sc-dot-default" :style="{backgroundColor:item.color}"></i>
                  {{$t('m.common.' + item.i18nKey)}}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="left-start" @on-click="onLangChange">
              <DropdownItem>
                {{$t('m.common.language')}}
              </DropdownItem>
              <DropdownMenu slot="list">
                <DropdownItem v-for="item in $store.getters['config/getLangList']" :key="item.key" :name="item.key"
                  :selected="item.key===$store.getters['config/getLang']">
                  {{item.text}}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <DropdownItem name="about">{{$t('m.common.about')}}</DropdownItem>
            <DropdownItem name="doc">{{$t('m.common.help')}}</DropdownItem>
            <DropdownItem name="logout">{{$t('m.common.logout')}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!-- <md-menu md-size="small" md-align-trigger :mdCloseOnClick="false" :md-offset-y="5">
          <i class="fa fa-ellipsis-h" md-menu-trigger></i>
          <md-menu-content>
            <md-menu-item></md-menu-item>
            <md-menu-item>联机帮助</md-menu-item>
            <md-menu-item @click="onAboutClick">关于</md-menu-item>
            <md-menu-item @click="onLogoutClick">退出</md-menu-item>
          </md-menu-content>
        </md-menu> -->
      </li>
    </ul>
    <md-dialog :md-active.sync="showAboutDialog" :md-click-outside-to-close="false">
      <md-dialog-title>关于</md-dialog-title>
      <div class="sc-about-wrap">
        <img src="../../../assets/image/logo-light.svg" />
        <p style="margin-top: 20px;">技术支持</p>
        <detailList v-model="aboutData" style="margin: 5px 15px 15px auto;"></detailList>
        <p style="font-size: 12px;">警告：本计算机程序受著作权法和国际公约保护，未经授权擅自复制或传播本程序的部分或全部，可能受到严厉的民事及刑事制裁。并将在法律允许的范围内受到最大可能的起诉。</p>
        <p style="font-size: 12px;">版权所有 2003-2020 新华三技术有限公司.保留一切权利.</p>
      </div>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAboutDialog = false">关闭</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-drawer class="md-right sc-notify-wrap" :md-active.sync="showNotifyDrawer">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">通知</span>
      </md-toolbar>
      <md-list>
        <md-list-item v-for="(item,idx) in notifyData" :key="'n_'+idx">
          <md-avatar>
            <i :class="levelIcon[item.level][0]" :style="{color:levelIcon[item.level][1]}"></i>
          </md-avatar>
          <div class="md-list-item-text">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
            <p>{{item.datetime}}</p>
          </div>
          <!-- <span class="md-list-item-text">{{item.title}}</span>
          <i :class="levelIcon[item.level][0]" :style="{color:levelIcon[item.level][1]}"></i> -->
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>
<script>
import detailList from '@/components/display/detail-list'
export default {
  components: { detailList },
  data () {
    return {
      showAboutDialog: false,
      showNotifyDrawer: false,
      aboutData: [
        { title: '用户支持邮箱', text: 'service@h3c.com' },
        { title: '技术支持热线电话', text: '400-810-0504' },
        { title: '网站', text: 'http://www.h3c.com' }
      ],
      notifyData: [
        { level: 'error', title: 'CPU上限告警', content: 'CPU使用率达到99.12%，报警时间：2021/01/09 03:21:37', datetime: '2021/01/09 03:21:37' },
        { level: 'warn', title: 'CPU上限告警', content: 'CPU使用率达到99.12%，报警时间：2021/01/09 03:21:37', datetime: '2021/01/09 03:21:37' },
        { level: 'info', title: 'CPU上限告警', content: 'CPU使用率达到99.12%，报警时间：2021/01/09 03:21:37', datetime: '2021/01/09 03:21:37' },
        { level: 'error', title: 'CPU上限告警', content: 'CPU使用率达到99.12%，报警时间：2021/01/09 03:21:37', datetime: '2021/01/09 03:21:37' }
      ],
      levelIcon: {
        info: ['fa fa-info-circle', 'var(--color-info)'],
        warn: ['fa fa-exclamation-circle', 'var(--color-warning)'],
        error: ['fa fa-exclamation-circle', 'var(--color-error)']
      }
    }
  },
  methods: {
    onDropdownClick (name) {
      switch (name) {
        case 'about':
          this.onAboutClick()
          break
        case 'logout':
          this.handleLogout()
          break
      }
    },
    onThemeChange (name) {
      this.$store.commit('config/setTheme', name)
    },
    onLangChange (name) {
      this.$store.commit('config/setLang', name)
    },
    onNotifyClick () {
      this.showNotifyDrawer = true
    },
    onAboutClick () {
      this.showAboutDialog = true
    },
    handleLogout () {
      this.$UI.confirm({
        content: '确认退出当前帐号吗？',
        onOk: () => {
          this.doLogout()
        }
      })
    },
    doLogout () {
      this.$store.dispatch('config/logout')
    }
  },
  computed: {
    userName () {
      return this.$store.getters['config/userName']
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../style/size";
@import "../../../style/layout-color";
ul.head-menu {
  list-style: none;
  color: #fff;
  padding-right: 16px;
  display: flex;
  & > li {
    height: $header-height;
    min-width: 60px;
    cursor: pointer;
    text-align: center;
    display: flex;
    &.active {
      i.menu-icon {opacity: 1;}
    }
    &.dot-red {
      position: relative;
      &:after {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 50%;
        right: 25%;
        top: $header-height / 4;
        opacity: 1;
      }
    }
    a {
      text-decoration: none;
      color: #fff;
      display: block;
      width: 100%;
      &.router-link-active {
        i {opacity: 1;}
      }
      &:hover {
        color: #fff;
      }
    }
    i.menu-icon {
      font-size: 18px;
      line-height: $header-height;
      margin: 0 auto;
    }
    &:not(.always-hover) {
      i.menu-icon {opacity: .7;}
      &:hover {
        i.menu-icon {opacity: 1;}
      }
    }
    &.notify-item {
      padding: 8px 0;
      box-sizing: border-box;
      & > div {
        width: 100%;
        line-height: $header-height - 16px;
        i.fa-bell-o {
          line-height: $header-height - 16px;
        }
      }
    }
    &.user-item {
      & > div {
        &:first-child {
          flex-shrink: 0;
          line-height: $header-height;
          margin-right: 5px;
          line-height: 70px;
        }
        &:last-child {
          font-size:12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          & > p {
            line-height: 15px;
            &:last-child {
              color: var(--color-light-primary);
            }
          }
        }
      }
    }
    .md-menu {
      width: 100%;
    }
    & > .ivu-dropdown {
      margin: 0 auto;
      .sc-dpd-a {
        display: block;
        line-height: $header-height;
      }
      div.ivu-dropdown {
        line-height: normal;
      }
    }
  }
}
.sc-about-wrap {
  width: 600px;
  box-sizing: border-box;
  padding: 0 24px;
  img {
    height: 34px;
  }
}
.sc-notify-wrap {
  ul.md-list {
    & > li {
      padding: 2px 0;
      &:hover {
        background-color: var(--color-background);
      }
      .md-list-item-text {
        max-width: 100%;
        display:inline-block;
        vertical-align: top;
        & > p {
          &:first-child {
            color: var(--color-text-title);
            font-weight: bolder;
          }
          &:nth-child(2) {
            color: var(--color-text-subColor);
            font-size: 12px;
            margin: 5px 0;
          }
          &:nth-child(3) {
            color: var(--color-text-subColor);
            font-size: 12px;
          }
        }
      }
      &:not(:last-child) {
        .md-list-item-text {
          border-bottom: 1px solid var(--color-border);
        }
      }
    }
  }
}
</style>
