
import React, { useRef, useState } from "react";
import Spinner from "./Spinner";

type ApiResponse = {
  result: string;
};

const ImagePromptCard = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setError(null);
    setResponse(null);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
    setError(null);
  };

  const validate = () => {
    if (!imageFile) {
      setError("Veuillez sélectionner une image.");
      return false;
    }
    if (!prompt.trim()) {
      setError("Veuillez entrer un prompt textuel.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse(null);
    if (!validate()) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // FormData for multipart upload
      const formData = new FormData();
      formData.append("image", imageFile as File);
      formData.append("prompt", prompt);

      const res = await fetch("/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la requête.");
      }

      const data: ApiResponse = await res.json();
      setResponse(data.result ?? "Aucune réponse reçue.");
    } catch (err: any) {
      setError(err?.message || "Une erreur s'est produite.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow p-4 mx-auto" style={{maxWidth: 460, width: "100%"}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="image-upload" className="form-label fw-semibold">
            Téléchargez une image
          </label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            id="image-upload"
            required
            ref={fileInputRef}
            onChange={handleImageChange}
            aria-describedby="imageHelp"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="prompt-input" className="form-label fw-semibold">
            Votre prompt texte
          </label>
          <input
            type="text"
            className="form-control"
            id="prompt-input"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Décrivez ce que vous voulez..."
            required
            maxLength={200}
            disabled={loading}
          />
        </div>
        {error && (
          <div className="alert alert-danger py-2 mb-3" role="alert">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary w-100 fw-bold"
          disabled={loading}
        >
          {loading ? "Génération..." : "Générer"}
        </button>
      </form>
      <div className="mt-4">
        {loading && <Spinner />}
        <div
          className="border rounded p-3 mt-2 bg-light"
          style={{
            minHeight: 70,
            borderColor: "#eee",
            fontFamily: "monospace",
            whiteSpace: "pre-line",
          }}
        >
          <span className="fw-bold mb-1 d-block text-secondary">Réponse de l&#39;IA :</span>
          {response && (
            <span className="text-dark">{response}</span>
          )}
          {!response && !loading && (
            <span className="text-muted" style={{ fontSize: 14 }}>
              La réponse s’affichera ici.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePromptCard;
