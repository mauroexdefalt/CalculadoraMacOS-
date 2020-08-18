import React from 'react';
import { Component } from 'react';
import './Calculadora.css'
import Button from './../components/button'
import Display from './../components/display'


const initialstate = {
    displayvalue :'0',
    cleardisplay: false ,
    operation : null,
    values : [0,0],
    current : 0
}
export default class Calculadora extends Component{
    state = {...initialstate}

    

    constructor(props){
        super(props);

        this.limpamemoria = this.limpamemoria.bind(this);
        this.setaroperacao = this.setaroperacao.bind(this);
        this.adcionardigito = this.adcionardigito.bind(this);

    }
   
limpamemoria() {
    this.setState({...initialstate})
      console.log('limpar display')
}

setaroperacao(operation){
if(this.state.current === 0){
    this.setState({operation , current: 1 , cleardisplay: true})
}else{
    const equals = operation === '='
    const currentoperation = this.state.operation
    const values = [...this.state.values]
    try{
    values[0] = eval(`${values[0]} ${currentoperation} ${values[1]}`)
    }catch(e){
        values[0] = this.state.values[0]
    }
    values[1] = 0

    this.setState({
        displayvalue : values[0],
        operation: equals ? null : operation ,
        current : equals ? 0 : 1 ,
        cleardisplay: !equals ,

    }) 
}
}

adcionardigito (n){
    if(n === '.' && this.state.displayvalue.includes('.')){
        return
    }
    const cleardisplay = this.state.displayvalue === '0'
    || this.state.cleardisplay
    const currentvalue = cleardisplay ? '' : this.state.displayvalue
    const displayvalue = currentvalue + n
    this.setState({ displayvalue , cleardisplay:false})

    if (n !== "." ){
        const i = this.state.current
        const newvalue = parseFloat(displayvalue)
        const values = [...this.state.values] 
        values[i] = newvalue
        this.setState({values})
    }

    console.log(n)
}



    render(){
    
        return(
           <div className="calculadora">
               <Display value={this.state.displayvalue}/>
               <Button label="AC"  click={ this.limpamemoria} triple/>
               <Button label='/' click={ this.setaroperacao}  operation />
               <Button label='7' click={ this.adcionardigito} />
               <Button label='8' click={ this.adcionardigito}  />
               <Button label='9' click={ this.adcionardigito} />              
               <Button label='*' click={ this.setaroperacao} operation   />
               <Button label='4' click={ this.adcionardigito} />
               <Button label='5' click={ this.adcionardigito} />
               <Button label='6' click={ this.adcionardigito} />
               <Button label='-' click={ this.setaroperacao}  operation  />
               <Button label='1' click={ this.adcionardigito} />
               <Button label='2' click={ this.adcionardigito} />
               <Button label='3' click={ this.adcionardigito} />
               <Button label='+' click={ this.setaroperacao}  operation  />
               <Button label='0' click={ this.adcionardigito} double/>
               <Button label='.' click={ this.setaroperacao}     />
               <Button label='=' click={ this.setaroperacao}   operation />

           </div>
        )
    }

}