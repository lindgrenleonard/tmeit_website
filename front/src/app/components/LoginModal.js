import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import {getApiFetcher} from "../api";

const StyledLoginModal = styled(LoginModal)({

    //overlay
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, .7)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,

    dialog: {
        position: "fixed",
        zIndex: 20,
        background: "#fff",
        width: "500px",

        /* Center the modal */
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
    },

    ".modalHeader": {
        background:" #44687d",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
    },

    ".modalMain": {
        padding: "20px",
    },

    form: {
        display: "flex",
        flexDirection: "column",
    },

    ".closeButton": {
        border: "none",
        background: "transparent",
        padding: "10px",
        cursor: "pointer",
        color: "#fff",
        fontSize: "36px",
    },

    ".closeButton:hover": {
        color: "yellow",
    },
});

function LoginModal({className, loggedIn, setLoggedIn, setLoginModalOpen}) {
    let navigate = useNavigate();

    useEffect(() => {
        async function check_if_logged_in() {
            if(loggedIn) {
                if(await getApiFetcher().get("/me").json()) {
                    console.log("Wtf, login modal is open and we're logged in, restarting the app");
                    navigate(0);
                } else {
                    console.log("We opened the login modal, but we thought we were logged in, but we weren't logged in, wtf?");
                    setLoggedIn(false);
                }
            }
        }
        check_if_logged_in()
    }, []);

    // login credentials
    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");

    // Error message for logins
    const [errorMessage, setError] = useState(0);


    function handleLogin(e) {
        e.preventDefault();

        const token = new XMLHttpRequest();
        token.open("POST", "/api/v1/token");
        token.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        token.responseType = "json";
        const data =
        "username=" + e.target["0"].value + "&password=" + e.target["1"].value;
        token.send(data);

        token.onload = function () {
            if (token.status === 401) {
                setError(1);
            } else if (token.status === 422) {
                setError(2);
            } else if (token.status === 200) {
                // handling of JWT
                const access_token = token.response.access_token;
                document.cookie = "access_token=" + access_token + ";SameSite=Strict;";
                setLoginModalOpen(false);
                setLoggedIn(true);
                setError(0);
                navigate(0);
            } else {
                alert(`Error ${token.status}: ${token.statusText}`);
            }
        };
    }

    return (
        <div className={className}>
            <dialog open>
                <header className="modalHeader">
                    <h2>Login</h2>
                    <button
                        onClick={() => setLoginModalOpen(false)}
                        className="closeButton"
                        >
                        &times;
                    </button>
                </header>
                <div className="modalMain">
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        <label htmlFor="pswrd">Password</label>
                        <input
                            type="password"
                            id="pswrd"
                            name="password"
                            value={pswrd}
                            onChange={(e) => setPswrd(e.target.value)}
                            ></input>
                        <input type="submit" value="login"></input>
                    </form>
                    <div className="errorMessage">
                        {(() => {
                            switch (errorMessage) {
                                case 0:
                                    return <></>;
                                case 1:
                                    return <>Incorrect email or password</>;
                                case 2:
                                    return <>Validation error</>;
                            }
                        })()}
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default StyledLoginModal;