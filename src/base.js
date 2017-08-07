import Rebase from 're-base'

//Safe to expose, obfuscated anyways.
//https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
const base = Rebase.createClass({
    apiKey: process.env.REACT_APP_RCOTDV2apiKey,
    authDomain: process.env.REACT_APP_RCOTDV2authDomain,
    databaseURL: process.env.REACT_APP_RCOTDV2databaseURL,
});

export default base;