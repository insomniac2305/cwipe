import { BrandLogo } from "@/app/components/Brand";
import Image from "next/image";
import TMDBLogo from "@/public/tmdb-logo.svg";
import JustWatchLogo from "@/public/justwatch-logo.webp";

export function Footer() {
  return (
    <footer className="flex w-full flex-wrap justify-around gap-8 bg-default-50 p-8">
      <div className="flex items-center">
        <BrandLogo size="text-4xl" />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <h1 className="font-heading text-lg">External data sources</h1>
        <div>
          <h2>
            <Image src={TMDBLogo} width={200} height={20} alt="TMDB Logo" />
          </h2>
          <p className="text-foreground/75">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>
        <div>
          <h2>
            <Image
              src={JustWatchLogo}
              width={150}
              height={20}
              alt="JustWatch Logo"
            />
          </h2>
          <p className="text-foreground/75">
            Source of streaming availability data by country and provider is
            JustWatch
          </p>
        </div>
      </div>
    </footer>
  );
}
