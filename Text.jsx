// <HashRouter>
    // <Router>
  
    //       <Route path="/" element={<Layout/>}>
    //       <Route
    //         path="/"
    //         element={
    //           isAuthenticated && isOnBoarded ? (
    //                 <Homepage />
                  
    //           ) : (
    //             <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/notification"
    //         element={
    //           isAuthenticated && isOnBoarded ? (
      
    //             <Notificationpage />
    //           ) : (
    //             <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/call/:id"
    //         element={
    //           isAuthenticated && isOnBoarded ? <Callpage /> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
    //         }
    //       />
    //       <Route
    //         path="/chat/:id"
    //         element={
    //           isAuthenticated && isOnBoarded ? <Chatpage />: <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    //         }
    //       />
    //       <Route
    //         path="/friends"
    //         element={
    //           isAuthenticated && isOnBoarded ? <FriendsPage />: <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    //         }
    //       />

    //       </Route>
    //       <Route
    //         path="/login"
    //         element={
    //           !isAuthenticated ? (
    //             <Loginpage />
    //           ) : (
    //             <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/signup"
    //         element={
    //           !isAuthenticated ? (
    //             <Signuppage />
    //           ) : (
    //             <Navigate to={!isOnBoarded ? "/onboarding" : "/"} />
    //           )
    //         }
    //       />
    //       <Route
    //         path="/onboarding"
    //         element={
    //           isAuthenticated ? (
    //             !isOnBoarded ? <Onboardingpage /> : <Navigate to="/" />
    //           ) : (
    //             <Navigate to="/login" />
    //           )
    //         }
    //       />
    //   <Toaster />
    //   </Router>
    // {/* </HashRouter> */}