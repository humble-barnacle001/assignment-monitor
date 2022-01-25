import { useContext } from "react";
import { Context } from "../context";
import Loader from "./Loader";
import Home from "../pages/index";

const noAuth = (Component) => {
    const EnsureNoAuth = (props) => {
        const {
            state: { user, loading },
        } = useContext(Context);

        return loading ? (
            <Loader />
        ) : !user ? (
            <Component {...props} />
        ) : (
            <Home />
        );
    };

    if (Component.getInitialProps) {
        EnsureNoAuth.getInitialProps = Component.getInitialProps;
    }

    return EnsureNoAuth;
};

export default noAuth;
