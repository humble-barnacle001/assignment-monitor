import { useContext } from "react";
import { Context } from "../context";
import Loader from "./Loader";
import Showcase from "./Showcase";

const withAuth = (Component) => {
    const EnsureAuth = (props) => {
        const {
            state: { user, loading },
        } = useContext(Context);

        return loading ? (
            <Loader />
        ) : user ? (
            <Component {...props} />
        ) : (
            <Showcase />
        );
    };

    if (Component.getInitialProps) {
        EnsureAuth.getInitialProps = Component.getInitialProps;
    }

    return EnsureAuth;
};

export default withAuth;
