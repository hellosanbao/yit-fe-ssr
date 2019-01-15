import { observable, action } from 'mobx';

class Home {
  @observable dataSource;

  constructor() {
    this.dataSource = '123';
  }

  @action
  changeDataSource(dataSource) {
    this.dataSource = dataSource
  }

  getDataSource = (dataSource) => {
    this.changeDataSource(dataSource);
  }
}

export default new Home();
