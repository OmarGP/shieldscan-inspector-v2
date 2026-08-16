import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import HeaderInputArea from "./HeaderInputArea";
import LoadSafeExample from "./LoadSafeExample";
import LoadVulnerableExample from "./LoadVulnerableExample";
import MetricsOverview from "./MetricsOverview";
import SecurityScoreBadge from "./SecurityScoreBadge";
import SecurityCardsGrid from "./SecurityCardsGrid";
import RecommendationsBox from "./RecommendationsBox";
import { analyzeHeaders } from "../../3.utils/headerAnalysis";

export default function AnalyzerPanel({ setRawHeaders }) {
  const [headersFromUser, setHeadersFromUser] = useState({});
  const [externalHeaders, setExternalHeaders] = useState("");

  const analysis = analyzeHeaders(headersFromUser);

  // Enviar cabeceras crudas al sidebar
  useEffect(() => {
    setRawHeaders(JSON.stringify(headersFromUser, null, 2));
  }, [headersFromUser, setRawHeaders]);

    console.log("totalHeaders:", Object.keys(headersFromUser).length);
    console.log("score:", analysis.score);

  return (
    <section className="p-6 rounded-lg bg-[--bg-panel] text-[--text-main] border border-[--border-soft]">
      <div className="mb-4">
        <SearchBar setHeadersFromUser={setHeadersFromUser} />
      </div>

      <HeaderInputArea
        setHeadersFromUser={setHeadersFromUser}
        externalHeaders={externalHeaders}
      />

      <div className="text-sm flex gap-3 mt-1 mb-4">
        <LoadSafeExample setExternalHeaders={setExternalHeaders} />
        <LoadVulnerableExample setExternalHeaders={setExternalHeaders} />
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-6">
        <MetricsOverview
          url={analysis.url}
          totalHeaders={Object.keys(headersFromUser).length}
          score={analysis.score}
        />

        <SecurityScoreBadge score={analysis.score} />
      </div>

      <SecurityCardsGrid items={Object.values(analysis.results)} />

      <RecommendationsBox items={analysis.recommendations} />
    </section>
  );
}
