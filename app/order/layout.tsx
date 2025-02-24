import ThemeToggle from "@/components/themes/ThemeToggle";
import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="fixed top-4 right-8 z-50">
        <ThemeToggle />
      </div>

      <div className="md:flex bg-slate-50 dark:bg-slate-900 text-black dark:text-white">
        <OrderSidebar />

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        <OrderSummary />
      </div>

      <ToastNotification />
    </>
  );
}
