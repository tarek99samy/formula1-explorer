export const prepareSeason = (season) => ({
  id: season.season,
  title: `Season ${season.season}`,
  bodyMetadata: [
    {
      type: 'text',
      content: season.season
    },
    {
      type: 'url',
      content: 'View more at Wekipedia',
      url: season.url
    }
  ],
  detailsUrl: `/races/${season.season}`
});
