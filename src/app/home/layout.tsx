import Header2 from "../(app)/components/Header2";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <Header2 />
      {children}
    </div>
  );
}
