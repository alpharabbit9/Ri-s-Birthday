import { MusicProvider } from "@/components/audio/MusicProvider";
import { SceneFlow } from "@/components/scrapbook/SceneFlow";
import { ScrapbookStage } from "@/components/scrapbook/ScrapbookStage";

export default function Home() {
  return (
    <MusicProvider>
      <ScrapbookStage>
        <SceneFlow />
      </ScrapbookStage>
    </MusicProvider>
  );
}
