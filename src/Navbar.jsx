import {Link} from 'react-router-dom'
function Navbar() {
    return (
            <div className='navbar'>
                <h2>Saroj's Blog.</h2>

                <div className='navbar__list'>
                    <ul>
                        <li>
                            <Link to="/Login">Login</Link>
                        </li>
                        <li>
                            <Link to="/Register">Register</Link>
                        </li>
                        <li>
                            <Link to="/posts">Write a Story</Link>
                        </li>
                    </ul>
                </div>
            </div>
    )
}
export default Navbar