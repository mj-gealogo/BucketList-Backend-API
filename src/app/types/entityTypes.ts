type countryReturn = {
    countries: country[],
    count: number
}

type country = {
    id: number,
    name: string,
    description: string
}

type placeReturn = {
    places: place[],
    count: number
}

type place = {
    id: number,
    name: string,
    description: string,
    country: string,
    cid: number
}

type activityReturn = {
    activities: activity[],
    count: number
}

type activity = {
    id: number,
    name: string,
    description: string,
    country: string,
    place: string,
    cid: number,
    pid: number
}