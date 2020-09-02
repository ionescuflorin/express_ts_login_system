"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\">\n        <div>\n            <label>Email</label>\n            <input name=\"email\" />\n        </div>    \n        <div>\n            <label>Password</label>\n            <input name=\"password\" type=\"password\" />\n        </div>    \n        <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    // to parse the submitted form content we use 'body-parser'
    // now ew'll have access to 'req.body' which will contain the form content
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
        // mark this person as logged in
        req.session = { loggedIn: true };
        // redirect them to the root route
        res.redirect('/');
    }
    else {
        res.send('Invalid email or password');
    }
});
router.get('/', function (req, res) {
    // req.session - checking login status
    // req.session && - type guard
    if (req.session && req.session.loggedIn) {
        res.send("\n            <div>\n                <div>You are logged in</div>\n                <a href=\"/logout\">Logout</div>\n            </div>\n        ");
    }
    else {
        res.send("\n            <div>\n                <div>You are not logged in</div>\n                <a href=\"/login\">Login</div>\n            </div>\n        ");
    }
});
