import React, { Component } from 'react';
// import Possibility from '../Model/Possibility';
import Image from '../../Assets/img/Logo2.png';

class HomePage extends Component 
{
  componentWillMount() 
  {
    this.setState({ 
      possibilities: 
      [
        {
            id: 1,
            url: "https://blog.myagilepartner.fr/wp-content/uploads/2017/11/communaute-agile.jpg",
            text: "Une communauté"
        },
        {
            id: 2,
            url: "http://www.futurhebdo.fr/wp-content/uploads/2015/09/PartageTravail.jpg",
            text: "Un partage rapide et efficace"
        },
        {
            id: 3,
            url: "https://i.skyrock.net/9057/56789057/pics/3204160301_1_2_YVQZt7IY.jpg",
            text: "Des gens sympas"
        }
      ]
    });
  }

  render() 
  {
    return (
      <div className="homePage">
        <div className="container-fluid">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
            <div className="homePage-textaccroche">
              <img alt="" width="75%" src={Image} />
              <h1>Sharkwest</h1>
              <h2 className="pt-10">"Plongez dans les eaux profondes du questionnaire"</h2>
            </div>
          </div>
          {/* <hr width="100%" color="blue"/>
          <div className="row">
            {this.state.possibilities.map((possibility) =>
                <Possibility 
                    key={possibility.id}
                    id={possibility.id}
                    url={possibility.url}
                    text={possibility.text}
                    />
            )}
          </div> */}
          {/* /POSSIBILITIES */}
        </div> 
      </div>
    );
  }
}
export default HomePage;