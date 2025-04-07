export interface ISearchResult {
    displayLink: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    htmlSnippet: string;
    htmlTitle: string;
    kind: string;
    link: string;
    pagemap: {
      cse_image: { src: string }[];
      cse_thumbnail: {
        height: string;
        src: string;
        width: string;
      }[];
      metatags?: Record<string, string>[];
      xfn?: Record<string, string>[];
    };
    snippet: string;
    title: string;
  }