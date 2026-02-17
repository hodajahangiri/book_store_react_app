import { Link } from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { useTheme } from "../../contexts/ThemeContext";

function Footer() {

    const { isDarkMode } = useTheme();

    return (
        <footer className={`!p-6 text-center mx-auto w-full bg-[#588157] border-t-2 border-t-black ${isDarkMode ? 'text-black' : 'text-white'}`}>
            <div className="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3 justify-between">
                <div>
                    <h2 className="md:text-sm text-xs font-semibold text-heading uppercase text-left">Store Information:</h2>
                    <ul className="md:text-body text-sm font-light text-left">
                        <li>
                            <p href="#" className=" hover:underline"><LocationOnOutlinedIcon />: 725 Coleman Ave,San Jose, CA</p>
                        </li>
                        <li>
                            <p href="#" className="hover:underline"><LocalPhoneOutlinedIcon />: +1(805)123-1234</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className=" md:text-sm text-xs font-semibold text-heading uppercase text-left">Contact Info:</h2>
                    <ul className="md:text-body text-xs font-light text-left">
                        <li>
                            <p className="hover:underline text-left"><Link to={'/contact'}>Send message</Link></p>
                        </li>
                        <li className="flex gap-1 text-center">
                            <svg className={`size-5 ${isDarkMode ? 'fill-black' : 'fill-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                            <a href="#" className="hover:underline">bookshop@instagram</a>
                        </li>
                        <li className="flex gap-1 text-center">
                            <svg className={`size-5 ${isDarkMode ? 'fill-black' : 'fill-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8a248 248 0 1 0 0 496 248 248 0 1 0 0-496zM371 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5c-2.2 .5-37.1 23.5-104.6 69.1-9.9 6.8-18.9 10.1-26.9 9.9-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3 .6-4.5 6.7-9 18.4-13.7 72.3-31.5 120.5-52.3 144.6-62.3 68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9 2 1.7 3.2 4.1 3.5 6.7 .5 3.2 .6 6.5 .4 9.8z" /></svg>
                            <a href="#" className="hover:underline">@bookStore</a>
                        </li>
                        <li className="flex gap-1 text-center">
                            <svg className={`size-5 ${isDarkMode ? 'fill-black' : 'fill-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                            <a href="#" className="hover:underline">+1(805) 123-5678</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="md:text-sm text-xs font-semibold text-heading uppercase text-left">More Info:</h2>
                    <ul className="md:text-body text-xs font-light text-left">
                        <li>
                            <p href="#" className="hover:underline"><Link to={'/privacy'}>Privacy Policy</Link></p>
                        </li>
                        <li>
                            <p href="#" className="hover:underline"><Link to={'/terms'}>Terms &amp; Conditions</Link></p>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="md:text-sm text-xs text-body text-center !mt-4">© 2026 <a href="http://localhost:5173//">BookStore™</a>. All Rights Reserved.</p>
        </footer>

    )
}

export default Footer