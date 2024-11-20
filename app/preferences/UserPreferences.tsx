import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Genre } from "@/app/components/Genre";
import { LogoImage } from "@/app/components/LogoImage";
import { getUserPreferences } from "@/app/preferences/actions";
import { PreferenceCard } from "@/app/preferences/PreferenceCard";
import { FaEarthAmericas, FaIcons, FaLanguage, FaVideo } from "react-icons/fa6";

export async function UserPreferences() {
  const { data: userPreferences, error } = await getUserPreferences();

  return error ? (
    <div className="flex justify-center">
      <ErrorMessage>{error.message}</ErrorMessage>
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <PreferenceCard icon={<FaLanguage />} title="Language">
        {userPreferences.language?.name}
      </PreferenceCard>
      <PreferenceCard icon={<FaEarthAmericas />} title="Region">
        {userPreferences.region?.native_name}
      </PreferenceCard>
      <PreferenceCard icon={<FaVideo />} title="Streaming Providers" isList>
        {userPreferences.providers?.map((provider) => (
          <LogoImage
            key={provider.provider_id}
            src={provider.logo_path}
            name={provider.provider_name}
          />
        ))}
      </PreferenceCard>
      <PreferenceCard icon={<FaIcons />} title="Favorite Genres" isList>
        {userPreferences.genres?.map((genre) => (
          <Genre key={genre.id} id={genre.id} size="md">
            {genre.name}
          </Genre>
        ))}
      </PreferenceCard>
    </div>
  );
}
