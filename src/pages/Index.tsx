
import NavBar from "@/components/NavBar";
import ImagePromptCard from "@/components/ImagePromptCard";

const Index = () => {
  return (
    <div className="bg-gray-100 min-vh-100 min-h-screen">
      <NavBar />
      <main className="d-flex flex-column justify-content-center align-items-center py-5" style={{minHeight: "70vh"}}>
        <ImagePromptCard />
      </main>
    </div>
  );
};

export default Index;
