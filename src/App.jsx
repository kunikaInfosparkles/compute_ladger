import Routes from "./routes/router"
import './assets/scss/index.scss'
import { Toaster } from 'react-hot-toast';
import { toastOptions } from "./config/toastConfig";
import { motion } from "framer-motion";

function App() {

  return (
    <>
      <Toaster toastOptions={toastOptions} reverseOrder={true} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        {/* <UserDetailProvider> */}
          <Routes />
        {/* </UserDetailProvider> */}
      </motion.div>
    </>
  )
}

export default App
