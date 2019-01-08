import React from 'react'
import { hot } from 'react-hot-loader'
class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            count1 : 1,
            count2 : 2
        }
        this.addCount1 = this.addCount1.bind(this)
        this.addCount2 = this.addCount2.bind(this)
    }
    addCount1(){
        this.setState({
            count1:this.state.count1+1
        })
    }
    addCount2(){
        this.setState({
            count2:this.state.count2+1
        })
    }
    render(){
        return (
            <div>
                <p>count12:{this.state.count1}</p>
                <p>count2:{this.state.count2}</p>
                <button onClick = {this.addCount1}>count1+</button>
                <button onClick = {this.addCount2}>count2+</button>
            </div>
        )
    }
}
//使用react-hot-loader的api包裹app组件，实现热替换功能
export default hot(module)(App)