import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    constructor() {
        super();

        //Make this available.
        this.loadSamples = this.loadSamples.bind(this);
        this.addFish = this.addFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        // this.removeFish = this.removeFish.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

        //getInitialState.
        this.state = {
          fishes: {},
          order: {},
        };
    }

    componentWillMount() {
        //This runs right before the <App> is rendered.
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });

        //Check if there is any order in localStorage.
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

        if(localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
    }

    addFish(fish) {
        //Take a copy of our state.
        const fishes = {...this.state.fishes};
        //Add in our new fish.
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        //Update State.
        this.setState({fishes})
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder(key) {
        //Take a copy of our state.
        const order = {...this.state.order};
        //Update on add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        //Update state.
        this.setState({order});
    }

    removeFromOrder(key) {
        const order = {...this.state.order};
        delete order[key];
        this.setState({order});
    }

    updateFish(key, updateFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updateFish;
        this.setState({fishes});
    }

    removeFish = (key) => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({fishes});
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    removeFish={this.removeFish}
                    loadSamples={this.loadSamples}
                    fishes={this.state.fishes}
                    updateFish={this.updateFish}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default App;