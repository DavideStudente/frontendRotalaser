export const factory1 = [
    {
      id: 1,
      status: "warning",
      desc: "Die DIE cutter 1 in a critical status, click for details"
    },
    {
        id: 2,
        status: "warning",
        desc: "Die DIE cutter 2 in a critical status, click for details"
    },

    {
        id: 3,
        status: "ok",
        desc: ""
    }
    
  ];
 
  

  export const customers = [
    {
      name: "Carlo Rossi",
      factories: ["F1", "F2", "F3"]
    }
    
  ];

  export const factories = [
    {
      id: "F1",
      diecutters: ["D1", "D2", "D3","D4"],
      owner: "Carlo Rossi"
    },

    {
      id: "F2",
      diecutters: ["D5", "D6", "D7"],
      owner: "Carlo Rossi"
    }

  ];

  export const diecutters = [
    {
      id: "D1",
      factory: "F1",
      status: "warning",
      desc: "Die DIE cutter D1 in a warning status, click for details"

    },

    {
      id: "D2",
      factory: "F1",
      status: "critical",
      desc: "Die DIE cutter D2 in a critical status, click for details"
    },
    {
      id: "D3",
      factory: "F1",
      status: "ok",
      desc: ""
    },
    {
      id: "D4",
      factory: "F1",
      status: "ok",
      desc: ""
    },
    {
      id: "D5",
      factory: "F2",
      status: "ok",
      desc: ""
    },
    {
      id: "D6",
      factory: "F2",
      status: "ok",
      desc: ""
    },
    {
      id: "D7",
      factory: "F2",
      status: "warning",
      desc: "Die DIE cutter D7 in a warning status, click for details"
    }
  ]
  
