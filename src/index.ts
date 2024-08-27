import { Hono } from 'hono'

const app = new Hono()

app.get("/next-bin/:uprn", async (c) => {
  const uprn = c.req.param("uprn");
  try {
    const url = `https://waste-api.york.gov.uk/api/Collections/GetBinCollectionDataForUprn/${uprn}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      return c.json({ error: 'Failed to fetch data' }, 500)
    }

    const data = await response.json()

    const refuseService = data.services.find(service => service.service === "REFUSE");
    const recyclingService = data.services.find(service => service.service === "RECYCLING");

    const nextRefuse = new Date(refuseService.nextCollection);
    const nextRecycling = new Date(recyclingService.nextCollection);

    let nextUp;
    let nextDate;

    if (nextRefuse < nextRecycling) {
      nextUp = "rubbish";
      nextDate = nextRefuse;
    } else if (nextRecycling < nextRefuse) {
      nextUp = "recycling";
      nextDate = nextRecycling;
    } else {
      nextUp = "rubbish and recycling";
    }

    return c.json({"collection": nextUp, "date": nextDate});

  } catch (error) {
    return c.json({ error: 'Something went wrong', details: error.message }, 500)
  }
});

export default app
