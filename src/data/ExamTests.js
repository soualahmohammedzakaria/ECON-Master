export const examsTests = [
    {
      title: "CI",
      name: "Intermediate Control",
      description: "Good for a revision of Chapters 1 and 2. The questions are based on the course material and previous CIs.",
      exam_link: "https://drive.google.com/file/d/1VkBfNiEVW9sX8_fc5jj408s4-ghlibtN/view?usp=sharing",
    },
    {
      title: "CF",
      name: "Final Control",
      description: "Good for a revision of the last three chapters. The questions taken from previous CFs and In-class quizes.",
      exam_link: "https://drive.google.com/file/d/1VkBfNiEVW9sX8_fc5jj408s4-ghlibtN/view?usp=sharing",
    },
    {
      title: "CM",
      name: "Mixed Control",
      description: "Good for a general revision (includes all the program). It's a combination of CI and CF questions.",
      exam_link: "https://drive.google.com/file/d/1VkBfNiEVW9sX8_fc5jj408s4-ghlibtN/view?usp=sharing",
    },
    {
      title: "CP",
      name: "Personalized Control",
      description: "Good for a personalized revision. You can choose the chapters you want to be tested on before starting.",
      exam_link: "https://drive.google.com/file/d/1VkBfNiEVW9sX8_fc5jj408s4-ghlibtN/view?usp=sharing",
    }
];

export const examData = {
  name: 'Economics Final Exam',
  duration: 60, // Duration in minutes
  questions: [
    {
      id: 1,
      question: "What is the primary function of money in an economy?",
      answers: [
        "Medium of exchange",
        "Store of value",
        "Unit of account",
        "All of the above",
      ],
      correctAnswers: [0, 1, 2, 3] // Indices of correct answers
    },
    {
      id: 2,
      question: "Which of the following is an example of a public good?",
      answers: [
        "National defense",
        "Tennis courts",
        "Cable television",
        "Air conditioning",
      ],
      correctAnswers: [0] // Only "National defense" is correct
    },
    {
      id: 3,
      question: "What does GDP stand for?",
      answers: [
        "Gross Domestic Product",
        "General Domestic Product",
        "Gross National Product",
        "General National Product",
      ],
      correctAnswers: [0] // Only "Gross Domestic Product" is correct
    },
    {
      id: 4,
      question: "Which economic theory advocates for minimal government intervention?",
      answers: [
        "Keynesian economics",
        "Monetarism",
        "Classical economics",
        "Behavioral economics",
      ],
      correctAnswers: [2] // Only "Classical economics" is correct
    },
    {
      id: 5,
      question: "What is inflation?",
      answers: [
        "Increase in the general price level",
        "Decrease in the general price level",
        "Stagnation of prices",
        "Increase in employment levels",
      ],
      correctAnswers: [0] // Only "Increase in the general price level" is correct
    },
    {
      id: 6,
      question: "What is the law of demand?",
      answers: [
        "As price decreases, quantity demanded increases",
        "As price increases, quantity demanded increases",
        "Price has no effect on quantity demanded",
        "Quantity supplied equals quantity demanded",
      ],
      correctAnswers: [0] // Only "As price decreases, quantity demanded increases" is correct
    },
    {
      id: 7,
      question: "What is a monopoly?",
      answers: [
        "A market structure with many sellers",
        "A market structure with a single seller",
        "A market structure with few sellers",
        "A market structure with high competition",
      ],
      correctAnswers: [1] // Only "A market structure with a single seller" is correct
    },
  ]
}