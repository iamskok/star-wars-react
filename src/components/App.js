import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import useSound from 'use-sound'
import clickSound from '../assets/sounds/bite.mp3'
import Footer from './Footer'
import Button from './Button'
import Heading from './Heading'
import Text from './Text'
import PageContainer from './PageContainer'
import SelectorContainer from './SelectorContainer'
import Selector from './Selector'
import Stars from './Stars'
import { lightTheme, darkTheme } from '../theme'
import GlobalStyles from '../styles/global'

export default () => {
  // Check if the color mode has previously been selected.
  const stored = localStorage.getItem(`isDarkMode`)
  const [isDarkMode, setIsDarkMode] = useState(() =>
    stored === `true` ? true : false
  )

  const [play] = useSound(clickSound)

  const handleColorMode = () => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem(`isDarkMode`, !isDarkMode)
    play()
  }

  const [people, setPeople] = useState([])

  const initialPeopleFetch = async () => {
    const endpoint = `https://swapi.dev/api/people/`
    // Fetch the first page data.
    const result = await fetch(endpoint, {})
    // Get total count of people and the first page data.
    const { count, results } = await result.json()
    const pageSize = results.length
    const totalPages = Math.ceil(count / pageSize)
    // Construct paginated URL.
    const getUrl = index => `${endpoint}?page=${index}`
    // Construct an array of URLs to fetch.
    // We already got the first page and the count starts from 1,
    // not 0 that's why we add 2 to the current `index`.
    const urls = Array(totalPages - 1)
      .fill(0)
      .map((_, index) => getUrl(index + 2))

    const responses = await Promise.all(urls.map(url => fetch(url)))
    const jsonResponses = await Promise.all(
      responses.map(res => res.json())
    )

    // Combine results from the first page with the rest of the pages.
    return [
      ...results,
      ...jsonResponses.reduce((acc, res) => [...acc, ...res.results], []),
    ]
  }

  const [options, setOptions] = useState([])

  const constructOptions = data =>
    data.map(({ name }) => {
      return {
        value: name,
        label: name,
      }
    })

  useEffect(() => {
    initialPeopleFetch().then(data => {
      setOptions(constructOptions(data))

      const peopleMap = data.reduce((acc, value) => {
        acc[value.name] = value
        return acc
      }, {})

      setPeople(peopleMap)
    })
  }, [])

  const [firstCharacter, setFirstCharacter] = useState(null)
  const [secondCharacter, setSecondCharacter] = useState(null)

  const handleFirstCharacterSelection = event => {
    setFirstCharacter(event)
    play()
  }

  const handleSecondCharacterSelection = event => {
    setSecondCharacter(event)
    play()
  }

  const [films, setFilms] = useState(null)

  const getFilmsData = async films => {
    // API works over HTTPS, though all of it's internal URLs
    // start with HTTP protocol.
    // Replace HTTP => HTTPS to fix mixed content issue on production.
    const episodes = await Promise.all(
      films.map(film => fetch(film.replace(/^http:\/\//i, 'https://')))
    )
    const episodesJson = await Promise.all(
      episodes.map(episode => episode.json())
    )
    return episodesJson
  }

  useEffect(() => {
    if (firstCharacter && secondCharacter) {
      const {
        films: firstFilms,
        homeworld: firstHomeworld,
        starships: firstStarships,
        vehicles: firstVehicles,
      } = people[firstCharacter.value]

      const {
        films: secondFilms,
        homeworld: secondHomeworld,
        starships: secondStarships,
        vehicles: secondVehicles,
      } = people[secondCharacter.value]

      // Get films intersection between 2 characters
      const episodes = firstFilms.filter(value =>
        secondFilms.includes(value)
      )
      const episodesIntersection = []

      getFilmsData(episodes).then(data => {
        const formattedEpisodes = data.reduce((acc, episode) => {
          acc[episode.url] = episode
          return acc
        }, {})

        for (let episode of Object.values(formattedEpisodes)) {
          let { planets, starships, vehicles } = episode

          const planetsIntersection =
            firstHomeworld === secondHomeworld &&
            planets.includes(firstHomeworld)
              ? [firstHomeworld]
              : []

          const starshipsIntersection = starships
            .filter(starship => firstStarships.includes(starship))
            .filter(starship => secondStarships.includes(starship))

          const vehiclesIntersection = vehicles
            .filter(vehicle => firstVehicles.includes(vehicle))
            .filter(vehicle => secondVehicles.includes(vehicle))

          if (
            planetsIntersection.length ||
            starshipsIntersection.length ||
            vehiclesIntersection.length
          ) {
            episodesIntersection.push(episode)
          }
        }

        if (!episodesIntersection.length) {
          setFilms({})
        }

        setFilms(episodesIntersection)
      })
    }
  }, [firstCharacter, secondCharacter])

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <PageContainer>
        <header>
          <Heading>
            <Stars>Star Wars</Stars>
          </Heading>
          <Button onClick={handleColorMode}>
            {isDarkMode ? `Dark` : `Light`} Mode
          </Button>
        </header>
        <main>
          <SelectorContainer>
            <Selector
              label='Select first character'
              placeholder='First character'
              options={options}
              onChange={handleFirstCharacterSelection}
            />

            <Selector
              label='Select second character'
              placeholder='Second character'
              options={options}
              onChange={handleSecondCharacterSelection}
            />
          </SelectorContainer>

          {films &&
            Object.keys(films).length > 0 &&
            firstCharacter &&
            secondCharacter &&
            // 1. Same character case.
            (firstCharacter.value === secondCharacter.value ? (
              <Text center={true}>
                {`Select `}
                <strong>2</strong>
                {` different characters`}
              </Text>
            ) : (
              // 2. Characters seen together case.
              <Text center={true}>
                <strong>{firstCharacter.value}</strong>
                {` and `}
                <strong>{secondCharacter.value}</strong>
                {` were seen/lived together in `}
                {`${Object.values(films)
                  .map(film => `"${film.title}"`)
                  .join(`, `)
                  .concat(`.`)}
                `}
              </Text>
            ))}

          {
            // 3. Characters were not seen together case.
            films &&
              Object.keys(films).length === 0 &&
              firstCharacter &&
              secondCharacter && (
                <Text center={true}>
                  <strong>{firstCharacter.value}</strong>
                  {` and `}
                  <strong>{secondCharacter.value}</strong>
                  {` were not seen/lived together `}
                  <span role='img' aria-label='Crying emoji'>
                    😢
                  </span>
                </Text>
              )
          }
        </main>
        <Footer />
      </PageContainer>
    </ThemeProvider>
  )
}
