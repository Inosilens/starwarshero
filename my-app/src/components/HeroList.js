import React, {Component} from 'react';

class HeroList extends Component {
    constructor(props) {
        super(props);
        this.state={

        }


    }

    addToLovely=(i)=>{
      console.log(i)
    }


    render() {
        return (
            <div>
                {this.props.heroList.map((item,i) => <><div key={item}>{item.name}</div><button key={i} onClick={()=>this.addToLovely(i)} type="button">Like</button></>)}
            </div>
        );
    }
}

export default HeroList;