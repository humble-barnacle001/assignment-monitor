import Link from "next/link";
import noAuth from "../components/NotLoggedRoute";

const Showcase = () => {
    return (
        <div className='container'>
            <h1 className='mt-20 pt-10 text-center font-weight-light text-extra-letter-spacing text-light-dm'>
                Showcase
            </h1>
            <div className='row'>
                <div className='mx-auto text-center'>
                    <Link href='/auth'>
                        <a className='btn btn-secondary'>Login/Sign-up</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default noAuth(Showcase);
