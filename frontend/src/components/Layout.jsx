import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div className="mx-12 my-8">
      <header>
        <Header />
      </header>
      {children}
    </div>
  )
}

export default Layout
