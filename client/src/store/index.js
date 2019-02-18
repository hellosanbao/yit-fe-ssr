import {
  observable,
  action,
  computed,
} from 'mobx'

class AppState {
  constructor({ count, name } = { count: 0, name: 'baoye' }) {
    this.count = count
    this.name = name
  }
  @observable count

  @observable name

  @action add() {
    this.count += 1
  }
  @computed get total() {
    return this.count * 3;
  }
  toJson() {
    return {
      count: this.count,
      name: this.name,
    }
  }
}

export default AppState
