import {
  observable,
  action,
  computed,
} from 'mobx'

class AppState {
  @observable count = 0

  @observable name = "宝爷"

  @action add() {
    this.count += 1
  }
  @computed get total() {
    return this.count;
  }
}

const appState = new AppState()

export default appState
