import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import OrderOnline from "@/pages/OrderOnline";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Tiffin from "@/pages/Tiffin";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import DeliveryLogin from "@/pages/DeliveryLogin";
import DeliveryDashboard from "@/pages/DeliveryDashboard";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/order-online" component={OrderOnline} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contact" component={Contact} />
        <Route path="/tiffin" component={Tiffin} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/delivery/login" component={DeliveryLogin} />
        <Route path="/delivery/dashboard" component={DeliveryDashboard} />
        <Route path="/delivery" component={() => <Redirect to="/delivery/login" />} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
