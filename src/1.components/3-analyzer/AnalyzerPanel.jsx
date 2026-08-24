/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import HeaderInputArea from "./HeaderInputArea";
import LoadSafeExample from "./LoadSafeExample";
import LoadVulnerableExample from "./LoadVulnerableExample";
import MetricsOverview from "./MetricsOverview";
import SecurityScoreBadge from "./SecurityScoreBadge";
import SecurityCardsGrid from "./SecurityCardsGrid";
import RecommendationsBox from "./RecommendationsBox";
import { analyzeHeaders } from "../../2.utils/headerAnalysis";

export default function AnalyzerPanel({ setRawHeaders, setAnalysisFromApp }) {
  const [headersFromUser, setHeadersFromUser] = useState({});
  const [externalHeaders, setExternalHeaders] = useState("");
  const [url, setUrl] = useState("");

  const [analysis, setAnalysis] = useState({
    score: 0,
    url: "",
    results: {},
    recommendations: [],
  });

  // Recalcular análisis cuando cambian las cabeceras
  useEffect(() => {
    const total = Object.keys(headersFromUser).length;

    if (total === 0) {
      const empty = {
        score: 0,
        url: "",
        results: {},
        recommendations: [],
      };

      setAnalysis(empty);
      setAnalysisFromApp(empty);
      return;
    }

    const result = analyzeHeaders(headersFromUser);
    setAnalysis(result);
    setAnalysisFromApp(result);
  }, [headersFromUser, setAnalysisFromApp]);

  // Enviar cabeceras crudas al sidebar
  useEffect(() => {
    const total = Object.keys(headersFromUser).length;

    if (total === 0) {
      setRawHeaders("");
      return;
    }

    setRawHeaders(JSON.stringify(headersFromUser, null, 2));
  }, [headersFromUser, setRawHeaders]);

  return (
    <section className="p-6 rounded-lg bg-bg-panel text-text-main border">
      <div className="mb-4">
        <SearchBar
          setHeadersFromUser={setHeadersFromUser}
          setUrl={setUrl}
        />
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
          url={url}
          totalHeaders={Object.keys(headersFromUser || {}).length}
        />

        <SecurityScoreBadge score={analysis.score} />
      </div>

      <SecurityCardsGrid items={Object.values(analysis.results)} />

      <RecommendationsBox
        items={analysis.recommendations}
        totalHeaders={Object.keys(headersFromUser).length}
      />
    </section>
  );
}
