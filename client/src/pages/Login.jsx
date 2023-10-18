import { Footer, Header } from "../layout";

function Home() {
  return (
    <div className="bg-white">
      <Header />
      <div className="flex h-full items-center justify-center m-40">
        <div className="flex items-center justify-center border-orange-400 border-4 rounded-md">
          <div className="m-8">a</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
