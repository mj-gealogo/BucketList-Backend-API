type countryReturn = {
    countries: country[],
    count: number
}

type country = {
    countryId: number,
    name: string,
    description: string
}

type placeReturn = {
    places: place[],
    count: number
}

type place = {
    placeId: number,
    name: string,
    description: string
}

type activityReturn = {
    activities: activity[],
    count: number
}

type activity = {
    activityId: number,
    name: string,
    description: string
}