import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const MySplits = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-4 px-4 bg-base-100">
        <Navbar />
      </div>
      <div>My Splits</div>
      <Footer />
      </div>
  )
}

export default MySplits