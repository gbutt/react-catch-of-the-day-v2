import Rebase from 're-base'

//Safe to expose, obfuscated anyways.
//https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
const base = Rebase.createClass({
    apiKey: "AIzaSyDY_tXsW3ksMsKRTZuWiPnbt7l6jsdIzRU",
    authDomain: "react-catch-of-the-day-v2.firebaseapp.com",
    databaseURL: "https://react-catch-of-the-day-v2.firebaseio.com",
});

export default base;