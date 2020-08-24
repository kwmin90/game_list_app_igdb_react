export interface Games {
  id: number;
  name: string;
  cover: {
    url: string;
  };
  summary: string;
  platforms: [
    {
      name: string;
    }
  ];
  genres: [
    {
      name: string;
    }
  ];
}
