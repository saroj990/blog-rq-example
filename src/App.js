import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Post from "./components/Post";
import ViewPost from "./components/Post/view";

import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 24 * 10,
      keepPreviousData: true,
    },
  },
  queryCache: new QueryCache(),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Post />
            </Route>
            <Route exact path="/posts">
              <Post />
            </Route>
            <Route exact path="/posts/:id">
              <ViewPost />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
