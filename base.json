<Provider>: {
  id,
    name,
    title,
    description,
    email,
    phone,
    contract, // № договора с оператором
    api: {
    url,
      username,
      password,
  }
}

<Phone>: {
  codeCountry: '+7',
    codeCity: 812,
    number: 1234567, // https://www.kody.su/api, https://www.kody.su/api/v2.1/search.json?q=+78183450059&key=test
    phone: '+78121234567'
}

<LinkType>: {
  id,
    name, // web, map, facebook, vkontakte, instagram, wikipedia
    title
}

<Link>: {
  type: <LinkType>.id,
    url,
    title
}

<Address>: {
  country,
    city,
    street,
    location: {
    lat,
      lng
  },
  phones: [ <Phone> ],
}

<Contact>: {
  addresses: [ <Address> ],
  phones: [ <Phone> ],
  links: [ <Link> ],
}

<Pier>,
<Sight>,
<Character>: {
  id,
    title,
    description,
    contacts: [ <Contact> ]
}

<galleryItem>: {
}

// Экскурсия
<Tour>: {
  id,
    name,
    title,
    description,
    descriptionBefore,
    descriptionAfter,
    descriptionRSS,
    advice, // совет от организатора
…,
  features: [],
    PriceDefault, // ??? вычисляемо?
    PriceDescription, // ??? Текст с призывом перед последней ценой на странице экскурсии
    PriceAlt, // стоимость на причале
    popularity, // ??? популярность — можно организовать через индекс в массиве <Category>.items
    schedule: 'Lorem …' // текстовое описание расписания
  category: [ <Category> ],
  gallery: [ <galleryItem> ],
…,
  trips: [ <Trip> ],
}

<Category>: {
  id,
    name,
    title,
    description,
    items: [ <Tour> ],
}

// На корабле
<onPlaceItem>: {
  id,
    title,
    name,
}

<onPlaceItem>: [
  экскурсия → язык экскурсии( [ русский, английский, … ] )
бар
еда
музыка
туалет
]

<ticketPrint>: [
  { title: 'Да' },
  { title: 'Нет' },
  { title: 'Не знаю' }, // ???
]

// Направление
<Trip>: {
  id,
    title,
    description,
  …,
  endSeason, // дата окончания сезона
    schedule: 'Lorem …' // текстовое описание расписания
  tripMap, // карта маршрута
    ticketPrint: <ticketPrint>.id,
    onPlace: [ <onPlaceItem> ],
  sights: [ <Sight> ],
  events: [ <Event> ],
}

<Event>: {
  id,
    title,
    description,
    isAllDay,
    start,
    end,
    recurrenceException,
    recurrenceId,
    recurrenceRule,
    startTimezone,
    endTimezone,
  …,
  stopBefore, // прекратить продажу за N мин. до рейса
    pier: <Pier>.id,
    place: <Place>.id,
    provider: <Provider>.id,
    providerReference: '', // название экскурсии у партнёра
    tickets: [ <Ticket> ],
…,
  actions: [ <Action> ],
}

<Action>: {
  id,
    start,
    pier: <Pier>.id,
    place: <Place>.id,
}

<PlaceLevelSeat>: {
  id,
    title,
    description,
    schema,
    category: <SeatCategory>.id,
    provider: {
  <Provider>.name: []
  }
}

<PlaceLevel>: {
  id,
    title,
    description,
    schema,
    seats: [ <PlaceLevelSeat> ]
}

<Place>: {
  id,
    title,
    description,
    schema,
    levels: [ <PlaceLevel> ]
}

<SeatCategory>: {
  id,
    title,
    description,
    count, // количество мест
    volume, // количество человек на место,
    provider: {
  <Provider>.name: []
  }
}

<TicketType>: {
  id,
    title,
    description,
    provider: {
  <Provider>.name: ''
  }
}

<Ticket>: {
  id,
    title,
    description,
    ticketTypes: [
  <TicketType>
],
  seatCategory: <SeatCategory>.id,
    price,
    sold,
}