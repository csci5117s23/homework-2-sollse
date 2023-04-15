import Link from 'next/link';
import 'bulma/css/bulma.min.css';
import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton, UserProfile } from '@clerk/nextjs';

const Nav = () => {
    return (
        <aside className="menu">
            {/* <p class="menu-label">My To-do</p> */}
            <ul className="menu-list">
                <li>
                    <UserButton></UserButton>
                </li>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/myAccount">My Account</Link>
                </li>
                <li>
                    <Link href="/todos">To-do</Link>
                </li>
                <li>
                    <Link href="/done">Done</Link>
                </li>
            </ul>
            <p className="menu-label">Categories</p>
            <ul className="menu-list">
                <li>
                    <Link href="/done">Done</Link>
                </li>
            </ul>
        </aside>
    )
}

export default Nav