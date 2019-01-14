import {
  observable,
  computed,
  autorun,
  action,
} from 'mobx'

class AppState {
  @observable count = 0

  @observable name = "宝爷"

  @action
  add() {
    this.count += 1
  }

  @computed
  get msg() {
    return this.count
  }
}

const appState = new AppState()

autorun(() => {
  console.log(appState.msg)
})

setInterval(() => {
  appState.add()
}, 1000)

export default appState
