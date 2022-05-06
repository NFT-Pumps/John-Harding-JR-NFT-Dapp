import Head from "next/head";
import EventComponents from "../components/admin/EventPage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>{process.env.siteTitle}</title>
        <meta
          name="description"
          content={process.env.siteTitle}
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventComponents />
    </div>
  );
}
