const DUMMY_SUMMARY = `
  Officia dolor nostrud eiusmod commodo. Consequat do cupidatat do in tempor. Minim est sunt adipisicing incididunt ea ea irure. Nostrud qui qui nisi nostrud fugiat enim amet irure exercitation incididunt consequat nisi.
  Tempor aliqua consequat laborum ea et eiusmod velit tempor ut esse nulla sunt. Tempor commodo enim fugiat laboris excepteur aute nisi amet labore non sit quis proident dolor. Culpa laborum non sunt non adipisicing consectetur irure deserunt labore ut cupidatat commodo. Amet nisi ad ut ea dolore nulla. Tempor sint do Lorem aliqua dolor nostrud aute qui reprehenderit aliqua ex ex ut laborum. Et sint commodo eu sint voluptate mollit. Quis consectetur aute pariatur aute consectetur ex pariatur minim Lorem proident velit proident.
  Cupidatat consequat id dolor tempor sunt in eu est nostrud duis velit nisi duis. Excepteur cillum ipsum velit veniam id mollit veniam reprehenderit ut irure dolore pariatur occaecat. Anim laboris deserunt ex tempor deserunt amet exercitation id do dolor. In proident duis minim consequat nulla. Exercitation tempor mollit ut ullamco qui labore deserunt. Lorem reprehenderit duis dolore cillum incididunt Lorem nisi sint excepteur ex. Eiusmod et non eu adipisicing ut excepteur.
  Eu incididunt laboris do nisi adipisicing aliqua et cillum ex incididunt culpa consectetur culpa. Dolor proident duis veniam anim sint magna officia aliqua officia amet. Nisi incididunt nostrud cupidatat qui cupidatat enim Lorem. Enim labore dolor duis consectetur ut Lorem sunt sunt adipisicing ipsum qui occaecat. Proident aliquip ut sit anim incididunt aliqua consectetur qui consectetur exercitation. Velit reprehenderit est culpa ad.
  Ut laborum est est ad tempor consequat consectetur sit occaecat ad mollit. Consequat labore occaecat ipsum enim eu officia laborum fugiat do elit aute mollit sit. Anim elit incididunt eiusmod incididunt esse in amet do laborum laboris exercitation. Tempor do exercitation est et ad proident officia laboris nulla. Et adipisicing do minim id do exercitation. Deserunt pariatur aliqua excepteur ex amet aliquip Lorem adipisicing sit nulla eiusmod dolore.
  Ullamco anim proident et nulla consectetur tempor sunt consectetur. Laboris ea non et elit ut Lorem laboris officia culpa. Excepteur occaecat tempor sit sint anim esse.
  Tempor tempor qui sit officia velit nostrud. Quis id fugiat consectetur Lorem cupidatat fugiat excepteur quis ex ut mollit. Irure aliqua do esse veniam nisi aliqua labore et laboris nisi. Commodo est pariatur eu labore dolore ipsum ullamco proident fugiat ut consectetur sit elit officia. Sit cillum eiusmod non id mollit adipisicing.
  Laboris laboris amet fugiat exercitation velit elit laborum occaecat nulla eu nulla. Officia laborum pariatur culpa et officia aliquip qui officia esse dolor esse. Qui officia non sint do nisi. Ipsum ullamco aliquip voluptate labore do.
  Qui irure veniam do sint nostrud esse laborum in sit enim incididunt sint anim labore. Pariatur deserunt amet aliquip et duis adipisicing dolore. Sint ut sit sit anim eu Lorem.
  Do ad veniam labore qui adipisicing irure. Voluptate esse laborum adipisicing veniam cupidatat ullamco ullamco. Minim occaecat officia cillum nulla ut id id consectetur velit do enim voluptate dolor adipisicing. Dolore nostrud ea voluptate voluptate mollit. In excepteur deserunt exercitation aliqua commodo in.
`;

export const getSummaryFromLink = async (youtubeUrl: string) => {
  // HERE WE SHOULD CALL API WITH A GIVEN YOUTUBE URL

  // RETURN DUMMY RESPONSE
  const randomOk = Math.random() > 0.5; // fails randomnly for testing
  return {
    ok: randomOk,
    data: {
      id: Math.round(Math.random() * 100000000), // 8 digits id for testing
      youtubeUrl,
      summary: DUMMY_SUMMARY,
    },
  };
};
