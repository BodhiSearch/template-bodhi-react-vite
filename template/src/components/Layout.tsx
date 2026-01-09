import Header from './Header';
import ChatDemo from './ChatDemo';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ChatDemo />
    </div>
  );
}
