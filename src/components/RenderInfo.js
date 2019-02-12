import React from 'react';
import SearchBox from './SearchBox';
import { Button, ButtonGroup } from 'reactstrap';  
import Trashday from './TrashDay';
import StateGovernmentInfo from './StateGovernmentInfo';
import FederalOfficialsInfo from './FederalOfficialsInfo';

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
                    <Button onClick={() => {this.handleClick('State Government')}} >State Officials</Button>
                    <Button onClick={() => {this.handleClick('electedOfficials')}} >Federal Legislative Officials</Button>
                </ButtonGroup>

                {this.state.displayInfo === "trash" && <Trashday bulkyItems={this.props.trashInfo.bulkyItems} trashProvider={this.props.trashInfo.trashProvider} trashDay={this.props.trashInfo.trashDay} />}

                {this.state.displayInfo === "State Government" && <StateGovernmentInfo electedState={this.props.electedState} />}

                {this.state.displayInfo === "electedOfficials" && < FederalOfficialsInfo electedFeds={this.props.electedFeds} />}
            </div>
        )
    }
}

export default RenderInfo;