import axios from 'axios';
const KEY = '';


export default axios.create({
    baseURL: 'https://dev-api.codeforkc.org//address-attributes/V0/',
    params: {
            part: 'test',
            key: KEY
    }
})




// In index js


import kcdata from '../apis/kcdata';


onSubmit = async term => {
    const response = await kcdata.get('./${address}?city=Kansas%20City&state=mo', {
        params: {
            q: term
        }
    })
    this.setState({
        videos: response.data.item,
        
    })
}































