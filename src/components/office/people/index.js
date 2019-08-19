import React, {Component} from 'react';

import {fetchingStaff} from '../../../actions/';
import LoadingBar from '../../common/loading-bar'

import { connect } from 'react-redux';
//Action

import './people.scss'

import Card from './Card/index.js';

class Header2 extends React.Component {
	render() {
		return (
			<h2 style={{textAlign:'center'}}>
        {this.props.data}
			</h2>
		);
	}
}

class Button extends React.Component {
	render() {
		return (
			<div className="apply">
        {this.props.data}
			</div>
		);
	}
}

class People extends Component {
  state = {
    isLoading: this.props.isLoading,
    staff: this.props.staff
  };

  componentDidMount () { 
    this.props.getStaff()
  }


  static getDerivedStateFromProps(props, state) {
    if (props.staff !== state.staff) {
      return {
        staff: props.staff,
        isLoading: props.isLoading
      };
    }
    return null;
  }

  render() {

    const {staff, isLoading}= this.state;
    const {language} = this.props;

    const nonactiveStaff = (staff) ? staff.filter( human => human.active===false)
    : null

    const activeStaff = (staff) ? staff.filter( human => human.active===true && human.leader===false)
    : null

    const bossStaff = (staff) ? staff.filter( human => human.leader===true)
    : null


    return (this.props.visible===true) ?
    ( (isLoading===false && staff) ? ( 
      <div className="people">
        <div className="boss-wrapper">
          { 
            bossStaff.map(human => {
              return <Card key={human.id} openBottomBar={this.openBottomBar} language={language.lang} data={human}/> 
            })
          }
        </div>

        <div className="people-wrapper">
          {
            activeStaff.map(human => {
              return <Card key={human.id} language={language.lang} data={human}/> 
            })
          }
        </div>
        <hr/>
        <div className="people-ex-wrapper">
          <Header2 data={"Volt munkatársaink"}/>
          { (nonactiveStaff.length!==0) ? 
            nonactiveStaff.map(human => {
              return <div> {human.name} </div>
            }) : "-"
          }
        </div>
        <hr/>
        <div className="people-new-wrapper">

          <Header2 data={"Jövőbeli munkatársaink"}/>
          <a href="mailto:titkarsag@archikon.hu?subject=Archikon | jelentkezés"> 
            <Button data={"JELENTKEZZ!"}/>
          </a> 
        </div>

      </div>
    ) : <LoadingBar/>)
    : null }
    
}

const mapStateToProps = (state) => {
  return {
    staff: state.staff.staff,
    isLoading: state.staff.isLoading,
    language: state.localization
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStaff: () => dispatch(fetchingStaff())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);
