import React from 'react';
import SearchBox from './SearchBox';
import { Button, ButtonGroup } from 'reactstrap';  
import Trashday from './TrashDay';
import StateGovernmentInfo from './StateGovernmentInfo';
import FederalOfficialsInfo from './FederalOfficialsInfo';
import Officials from './Officials'

class RenderInfo extends React.Component {
    state = {
        displayInfo: 'trash'
    }

    handleClick = (term) => {
        this.setState({ displayInfo: term })
    }

    render() {
        console.log(this.props.electedState);
        return (
            <div>
                <SearchBox setAddress={this.props.setAddress} address={this.props.address} />

                <ButtonGroup>
                    <Button onClick={() => {this.handleClick('trash')}} >Trash</Button>
                    <Button onClick={() => {this.handleClick('stateGovernment')}}>State Officials</Button>
                    <Button onClick={() => {this.handleClick('federalGovernment')}} >Federal Legislative Officials</Button>
                </ButtonGroup>

                {this.state.displayInfo === "trash" && <Trashday bulkyItems={this.props.trashInfo.bulkyItems} trashProvider={this.props.trashInfo.trashProvider} trashDay={this.props.trashInfo.trashDay} />} 

                {this.state.displayInfo === "stateGovernment" && <Officials list="stateList" offices={this.props.offices} officials={this.props.officials}/>}

                {this.state.displayInfo === "federalGovernment" && <Officials list="federalList" offices={this.props.offices} officials={this.props.officials}/>}
            </div>
        )
    }
}

export default RenderInfo;