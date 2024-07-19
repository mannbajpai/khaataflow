import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Main from "./Main"
import Footer from "./Footer"
const Home = () => {
  return (
    <div className="p-10 bg-primary">
        <Navbar/>
        <div className="flex flex-1 px-4 m-4 bg-secondary">
            <Sidebar/>
            <Main/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home