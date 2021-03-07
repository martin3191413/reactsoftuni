import React from 'react';
const axios = require('axios');

const Form = ({username,password,setUsername,setPassword}) => {

    const onChangeUsernameHandler = (e) => {
        setUsername(e.target.value);
    };

    const onChangePasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const payload = {
            username,
            password
        };

        axios({
            url: '/save',
            method: "POST",
            data: payload
        })
        .catch((err) => {
            console.log(`Server error: ${err}`);
        });

        resetHandler();

    };

    const resetHandler = (e) => {
        setPassword("");
        setUsername("");
    };

    return (
        <div>
            <form>
                <label for="username">Username</label>
                <input type="text" placeholder="Username" name="username" value={username} onChange={onChangeUsernameHandler}></input>
                <label for="password">Password</label>
                <input type="password" placeholder="Password" name="password" value={password} onChange={onChangePasswordHandler}></input>
                <button type='submit' onClick={submitHandler}>Submit</button>
            </form>
        </div>
    );
}
;
export default Form;
