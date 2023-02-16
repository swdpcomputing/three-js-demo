import Game from "../components/Main";
import PageHead from "../components/PageHead";


export default function Home(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <PageHead></PageHead>

      <main>
        <Game />
      </main>
    </div>
  );
}
