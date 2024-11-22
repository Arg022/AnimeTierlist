import { useState, useEffect } from "react";
import { Card } from "./Card";
import { ImageAnime } from "./ImageAnime";

interface Anime {
  id: number;
  title: {
    english: string;
  };
  coverImage: {
    medium: string;
  };
}

interface AniListResponse {
  data: {
    Page: {
      media: Anime[];
    };
  };
}

const AniListClient = () => {
  const buttonHandler = (id: number) => {
    window.open(`https://anilist.co/anime/${id}`, "_blank");
  };

  const [anime, setAnime] = useState<Anime[]>([]);
  const [error, setError] = useState<string>("");

  const fetchAnime = async () => {
    const query = `
      query {
        Page(page: 1, perPage: 10) {
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              english
            }
            coverImage {
              medium
            }
          }
        }
      }
    `;

    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result: AniListResponse = await response.json();

      if (result.data && result.data.Page && result.data.Page.media) {
        setAnime(result.data.Page.media);
      } else {
        setError("Dati non trovati nella risposta");
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      setError("Errore durante il recupero dei dati");
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {anime.map((item) => (
        <Card small key={item.id} contents={item.title.english}>
          <div className="relative group">
            <ImageAnime
              src={item.coverImage.medium}
              alt={item.title.english}
              className="w-full h-auto rounded"
            />
            <button
              onClick={() => buttonHandler(item.id)}
              className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"
            >
              {item.title.english}
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AniListClient;
