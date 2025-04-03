import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import { ThemeProvider } from "./providers/theme";
import { Provider } from "react-redux";
import { store } from "./providers/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);
