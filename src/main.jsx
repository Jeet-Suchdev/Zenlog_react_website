const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          ),
        },
        {
          path: "/all-posts",
          element: (
            <AuthLayout authentication>
              <AllPosts />
            </AuthLayout>
          ),
        },
        {
          path: "/add-post",
          element: (
            <AuthLayout authentication>
              <AddPost />
            </AuthLayout>
          ),
        },
        {
          path: "/edit-post/:slug",
          element: (
            <AuthLayout authentication>
              <EditPost />
            </AuthLayout>
          ),
        },
        {
          path: "/post/:slug",
          element: <Post />,
        },
      ],
    },
  ],
  {
    basename: "/Zenlog_react_website",
  }
);
