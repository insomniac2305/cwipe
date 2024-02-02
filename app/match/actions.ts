"use server";

import { DiscoverMovies } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";

const movieData: DiscoverMovies = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/cnqwv5Uz3UW5f086IWbQKr3ksJr.jpg",
      genre_ids: [28, 12, 14],
      id: 572802,
      original_language: "en",
      original_title: "Aquaman and the Lost Kingdom",
      overview:
        "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
      popularity: 3988.165,
      poster_path: "/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg",
      release_date: "2023-12-20",
      title: "Aquaman and the Lost Kingdom",
      video: false,
      vote_average: 7,
      vote_count: 1174,
    },
    {
      adult: false,
      backdrop_path: "/yOm993lsJyPmBodlYjgpPwBjXP9.jpg",
      genre_ids: [35, 10751, 14],
      id: 787699,
      original_language: "en",
      original_title: "Wonka",
      overview:
        "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
      popularity: 2113.854,
      poster_path: "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
      release_date: "2023-12-06",
      title: "Wonka",
      video: false,
      vote_average: 7.2,
      vote_count: 1669,
    },
    {
      adult: false,
      backdrop_path: "/ehumsuIBbgAe1hg343oszCLrAfI.jpg",
      genre_ids: [16, 10751, 14, 12],
      id: 1022796,
      original_language: "en",
      original_title: "Wish",
      overview:
        "Asha, a sharp-witted idealist, makes a wish so powerful that it is answered by a cosmic force – a little ball of boundless energy called Star. Together, Asha and Star confront a most formidable foe - the ruler of Rosas, King Magnifico - to save her community and prove that when the will of one courageous human connects with the magic of the stars, wondrous things can happen.",
      popularity: 1486.152,
      poster_path: "/AcoVfiv1rrWOmAdpnAMnM56ki19.jpg",
      release_date: "2023-11-13",
      title: "Wish",
      video: false,
      vote_average: 6.6,
      vote_count: 542,
    },
    {
      adult: false,
      backdrop_path: "/meyhnvssZOPPjud4F1CjOb4snET.jpg",
      genre_ids: [16, 12, 35, 10751, 28],
      id: 940551,
      original_language: "en",
      original_title: "Migration",
      overview:
        "After a migrating duck family alights on their pond with thrilling tales of far-flung places, the Mallard family embarks on a family road trip, from New England, to New York City, to tropical Jamaica.",
      popularity: 1320.292,
      poster_path: "/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
      release_date: "2023-12-06",
      title: "Migration",
      video: false,
      vote_average: 7.9,
      vote_count: 397,
    },
    {
      adult: false,
      backdrop_path: "/tLxjbT5ROZRwYcpNT3nfQbqkApk.jpg",
      genre_ids: [878, 12, 28],
      id: 609681,
      original_language: "en",
      original_title: "The Marvels",
      overview:
        "Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But unintended consequences see Carol shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole linked to a Kree revolutionary, her powers become entangled with that of Jersey City super-fan Kamala Khan, aka Ms. Marvel, and Carol’s estranged niece, now S.A.B.E.R. astronaut Captain Monica Rambeau. Together, this unlikely trio must team up and learn to work in concert to save the universe.",
      popularity: 1292.419,
      poster_path: "/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
      release_date: "2023-11-08",
      title: "The Marvels",
      video: false,
      vote_average: 6.4,
      vote_count: 1331,
    },
    {
      adult: false,
      backdrop_path: "/unvtbkgxh47BewQ8pENvdOdme0r.jpg",
      genre_ids: [28, 18],
      id: 1212073,
      original_language: "de",
      original_title: "60 Minuten",
      overview:
        "Desperate to keep custody of his daughter, a mixed martial arts fighter abandons a big match and races across Berlin to attend her birthday party.",
      popularity: 942.754,
      poster_path: "/cND79ZWPFINDtkA8uwmQo1gnPPE.jpg",
      release_date: "2024-01-19",
      title: "Sixty Minutes",
      video: false,
      vote_average: 6.9,
      vote_count: 173,
    },
    {
      adult: false,
      backdrop_path: "/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg",
      genre_ids: [28, 53],
      id: 866398,
      original_language: "en",
      original_title: "The Beekeeper",
      overview:
        "One man’s campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.",
      popularity: 906.305,
      poster_path: "/A7EByudX0eOzlkQ2FIbogzyazm2.jpg",
      release_date: "2024-01-10",
      title: "The Beekeeper",
      video: false,
      vote_average: 7.3,
      vote_count: 292,
    },
    {
      adult: false,
      backdrop_path: "/xCt3Ha6hhHep5pwiW2FSenC59Gn.jpg",
      genre_ids: [28, 10752],
      id: 965571,
      original_language: "ru",
      original_title: "Время патриотов",
      overview:
        "The brothers Sultan and Bekzat Ibrayev are serving faithfully in the Armed Forces of Kazakhstan, and at the same time they are in family disagreement. Sultan is a valiant intelligence officer and Bekzat is a talented fighter pilot. While an international terrorist organization prepares a carefully planned attack on the country's strategically important facilities, the brothers have to face not only a mortal threat, but also face a family confrontation related to their dead father. Circumstances force them to unite in order to save human lives, and the brothers eventually understand that their homeland and family are the most valuable thing they have.",
      popularity: 728.657,
      poster_path: "/A4QM6oF4UNNhQh1f9pRdXvyKW5s.jpg",
      release_date: "2022-04-28",
      title: "Patriots Time",
      video: false,
      vote_average: 9.7,
      vote_count: 16,
    },
    {
      adult: false,
      backdrop_path: "/p9DKeXp6FPJtAQ1k13Z4zPWrCbN.jpg",
      genre_ids: [18],
      id: 1058694,
      original_language: "en",
      original_title: "Radical",
      overview:
        "In a Mexican border town plagued by neglect, corruption, and violence, a frustrated teacher tries a radical new method to break through his students’ apathy and unlock their curiosity, their potential… and maybe even their genius.",
      popularity: 678.344,
      poster_path: "/eSatbygYZp8ooprBHZdb6GFZxGB.jpg",
      release_date: "2023-10-19",
      title: "Radical",
      video: false,
      vote_average: 8.6,
      vote_count: 143,
    },
    {
      adult: false,
      backdrop_path: "/ba9TgAO4I8RyA2LljzR3MspHaM9.jpg",
      genre_ids: [28, 878, 53],
      id: 799155,
      original_language: "hi",
      original_title: "Attack",
      overview:
        "With the Parliament under siege, India’s first super soldier Arjun Shergill is tasked to get hold of the terrorists in the nick of time, save the Prime Minister from their clutches and stop a dirty bomb from exploding and destroying Delhi. Will Arjun succeed in his mission?",
      popularity: 674.544,
      poster_path: "/5jGKbYuZtdxSNOocI6ZziQeiY4n.jpg",
      release_date: "2022-04-01",
      title: "Attack",
      video: false,
      vote_average: 7.4,
      vote_count: 85,
    },
    {
      adult: false,
      backdrop_path: "/f1AQhx6ZfGhPZFTVKgxG91PhEYc.jpg",
      genre_ids: [36, 10752, 18],
      id: 753342,
      original_language: "en",
      original_title: "Napoleon",
      overview:
        "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive, volatile relationship with his wife, Josephine.",
      popularity: 669.073,
      poster_path: "/vcZWJGvB5xydWuUO1vaTLI82tGi.jpg",
      release_date: "2023-11-22",
      title: "Napoleon",
      video: false,
      vote_average: 6.5,
      vote_count: 1511,
    },
    {
      adult: false,
      backdrop_path: "/rz8GGX5Id2hCW1KzAIY4xwbQw1w.jpg",
      genre_ids: [28, 35, 80],
      id: 955916,
      original_language: "en",
      original_title: "Lift",
      overview:
        "An international heist crew, led by Cyrus Whitaker, race to lift $500 million in gold from a passenger plane at 40,000 feet.",
      popularity: 660.29,
      poster_path: "/gma8o1jWa6m0K1iJ9TzHIiFyTtI.jpg",
      release_date: "2024-01-10",
      title: "Lift",
      video: false,
      vote_average: 6.5,
      vote_count: 619,
    },
    {
      adult: false,
      backdrop_path: "/1BFLsVxE1NzCIwicfOPtzzB4Kxh.jpg",
      genre_ids: [80, 53, 28],
      id: 982940,
      original_language: "en",
      original_title: "Due Justice",
      overview: "An attorney with a military past hunts down the gang who killed his wife and took his daughter.",
      popularity: 624.212,
      poster_path: "/35Uef7fz9ctYbJLXbJBCqvtttEQ.jpg",
      release_date: "2023-11-24",
      title: "Due Justice",
      video: false,
      vote_average: 7.1,
      vote_count: 7,
    },
    {
      adult: false,
      backdrop_path: "/pWsD91G2R1Da3AKM3ymr3UoIfRb.jpg",
      genre_ids: [28, 878, 18],
      id: 933131,
      original_language: "ko",
      original_title: "황야",
      overview:
        "After a deadly earthquake turns Seoul into a lawless badland, a fearless huntsman springs into action to rescue a teenager abducted by a mad doctor.",
      popularity: 621.228,
      poster_path: "/zVMyvNowgbsBAL6O6esWfRpAcOb.jpg",
      release_date: "2024-01-26",
      title: "Badland Hunters",
      video: false,
      vote_average: 6.8,
      vote_count: 90,
    },
    {
      adult: false,
      backdrop_path: "/vdpE5pjJVql5aD6pnzRqlFmgxXf.jpg",
      genre_ids: [18, 36],
      id: 906126,
      original_language: "es",
      original_title: "La sociedad de la nieve",
      overview:
        "On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby team to Chile, crashes into a glacier in the heart of the Andes.",
      popularity: 619.382,
      poster_path: "/2e853FDVSIso600RqAMunPxiZjq.jpg",
      release_date: "2023-12-13",
      title: "Society of the Snow",
      video: false,
      vote_average: 8.1,
      vote_count: 1552,
    },
    {
      adult: false,
      backdrop_path: "/kWyQh9fCrgcMfhqZmqtp89Q0TrT.jpg",
      genre_ids: [35, 10749],
      id: 1072790,
      original_language: "en",
      original_title: "Anyone But You",
      overview:
        "After an amazing first date, Bea and Ben’s fiery attraction turns ice cold — until they find themselves unexpectedly reunited at a destination wedding in Australia. So they do what any two mature adults would do: pretend to be a couple.",
      popularity: 560.976,
      poster_path: "/yRt7MGBElkLQOYRvLTT1b3B1rcp.jpg",
      release_date: "2023-12-21",
      title: "Anyone But You",
      video: false,
      vote_average: 7.4,
      vote_count: 170,
    },
    {
      adult: false,
      backdrop_path: "/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
      genre_ids: [878, 10749, 35],
      id: 792307,
      original_language: "en",
      original_title: "Poor Things",
      overview:
        "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
      popularity: 510.331,
      poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
      release_date: "2023-12-07",
      title: "Poor Things",
      video: false,
      vote_average: 8.2,
      vote_count: 663,
    },
    {
      adult: false,
      backdrop_path: "/yl2GfeCaPoxChcGyM5p7vYp1CKS.jpg",
      genre_ids: [28, 35, 10749],
      id: 848187,
      original_language: "en",
      original_title: "Role Play",
      overview:
        "Emma has a wonderful husband and two kids in the suburbs of New Jersey – she also has a secret life as an assassin for hire – a secret that her husband David discovers when the couple decide to spice up their marriage with a little role play.",
      popularity: 455.229,
      poster_path: "/7MhXiTmTl16LwXNPbWCmqxj7UxH.jpg",
      release_date: "2023-12-14",
      title: "Role Play",
      video: false,
      vote_average: 6.1,
      vote_count: 253,
    },
    {
      adult: false,
      backdrop_path: "/a0GM57AnJtNi7lMOCamniiyV10W.jpg",
      genre_ids: [16, 12, 14],
      id: 508883,
      original_language: "ja",
      original_title: "君たちはどう生きるか",
      overview:
        "While the Second World War rages, the teenage Mahito, haunted by his mother's tragic death, is relocated from Tokyo to the serene rural home of his new stepmother Natsuko, a woman who bears a striking resemblance to the boy's mother. As he tries to adjust, this strange new world grows even stranger following the appearance of a persistent gray heron, who perplexes and bedevils Mahito, dubbing him the \"long-awaited one.\"",
      popularity: 452.086,
      poster_path: "/y9xS5NQTBnFjDoXhSFQeGxlmkoM.jpg",
      release_date: "2023-07-14",
      title: "The Boy and the Heron",
      video: false,
      vote_average: 7.5,
      vote_count: 875,
    },
    {
      adult: false,
      backdrop_path: "/ycnO0cjsAROSGJKuMODgRtWsHQw.jpg",
      genre_ids: [18, 36],
      id: 872585,
      original_language: "en",
      original_title: "Oppenheimer",
      overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
      popularity: 446.574,
      poster_path: "/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
      release_date: "2023-07-19",
      title: "Oppenheimer",
      video: false,
      vote_average: 8.1,
      vote_count: 6469,
    },
  ],
  total_pages: 42252,
  total_results: 845038,
};

movieData.results.reverse();

export async function getMovies() {
  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization: "Bearer " + process.env.TMDB_API_TOKEN,
  //   },
  // };

  // const response = await fetch(
  //   process.env.TMDB_API_URL +
  //     "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  //   options
  // );
  // const data: DiscoverMovies = await response.json();
  // return data.results;

  return movieData.results;
}

export async function rateMovie(id: number, isLiked: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const removed = movieData.results.splice(movieData.results.findIndex((movie) => movie.id === id));
  revalidatePath("/match");
  return { removed, isLiked };
}
