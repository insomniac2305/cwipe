import { Genre } from "@/app/components/Genre";
import { LogoImage } from "@/app/components/LogoImage";
import { PreferenceCard } from "@/app/preferences/PreferenceCard";
import { FaEarthAmericas, FaIcons, FaLanguage, FaVideo } from "react-icons/fa6";

export function UserPreferences() {
  return (
    <div className="flex flex-col gap-2">
      <PreferenceCard icon={<FaLanguage />} title="Language">
        English
      </PreferenceCard>
      <PreferenceCard icon={<FaEarthAmericas />} title="Region">
        Germany
      </PreferenceCard>
      <PreferenceCard icon={<FaVideo />} title="Streaming Providers" isList>
        <LogoImage src="/9ghgSC0MA082EL6HLCW3GalykFD.jpg" name="Apple TV" />
        <LogoImage src="/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg" name="Netflix" />
        <LogoImage
          src="/dQeAar5H991VYporEjUspolDarG.jpg"
          name="Amazon Prime Video"
        />
      </PreferenceCard>
      <PreferenceCard icon={<FaIcons />} title="Favorite Genres" isList>
        <Genre id={28} size="md">
          Action
        </Genre>
        <Genre id={12} size="md">
          Adventure
        </Genre>
        <Genre id={16} size="md">
          Animation
        </Genre>
      </PreferenceCard>
    </div>
  );
}
