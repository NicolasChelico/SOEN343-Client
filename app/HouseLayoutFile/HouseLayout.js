const roomsData = {
  homeId: "1",
  homeType: "simpleHome",
  roomCount: "3",
  roomList: [
    {
      roomId: 1,
      roomType: "LivingRoom",
      smartElements: [
        {
          type: "Door",
          elementId: 1,
          elementType: "Door",
        },
        {
          type: "Window",
          elementId: 2,
          elementType: "Window",
          open: false,
        },
        {
          type: "Light",
          elementId: 3,
          elementType: "Light",
          open: false,
        },
        {
          type: "Heater",
          elementId: 4,
          elementType: "Heater",
          open: false,
        },
      ],
    },
    {
      roomId: 2,
      roomType: "Kitchen",
      smartElements: [
        {
          type: "Door",
          elementId: 1,
          elementType: null,
        },
        {
          type: "Window",
          elementId: 2,
          elementType: "Window",
          open: false,
        },
        {
          type: "Light",
          elementId: 3,
          elementType: "Light",
          open: false,
        },
        {
          type: "Light",
          elementId: 4,
          elementType: "Light",
          open: false,
        },
        {
          type: "Light",
          elementId: 5,
          elementType: "Light",
          open: false,
        },
        {
          type: "Heater",
          elementId: 4,
          elementType: "Heater",
          open: false,
        },
      ],
    },
    {
      roomId: 3,
      roomType: "Bedroom",
      smartElements: [
        {
          type: "Door",
          elementId: 1,
          elementType: "Door",
        },
        {
          type: "Window",
          elementId: 2,
          elementType: "Window",
          open: false,
        },
        {
          type: "Light",
          elementId: 3,
          elementType: "Light",
          open: false,
        },
        {
          type: "Heater",
          elementId: 4,
          elementType: "Heater",
          open: false,
        },
      ],
    },
  ],
};

export  { roomsData };
