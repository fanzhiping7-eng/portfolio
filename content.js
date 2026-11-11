/*
  在这里更换个人资料和项目。项目 id 使用不重复的英文、数字和短横线。
  图片放在 assets/ 内，然后把相对路径写在 cover 或 images 的 src 中。
*/
window.portfolio = {
  profile: {
    name: "范志平",
    signature: "FAN ZHIPING",
    role: "视觉设计师",
    portrait: "assets/portrait.png",
    bio: "一名专注于跨境电商的视觉设计师。过去做过跨境电商运营，让我熟悉海外用户的审美偏好，也更懂得从买家的角度提炼产品卖点。我会结合产品特点和使用场景，把功能、材质和细节转化成直观的画面，让用户一眼看懂产品的优势。\n\n我有丰富的独立接单经验，可以从前期沟通、拍摄策划到产品实拍、修图和排版，提供拍摄加做图的一站式服务。我也擅长运用 AI 工具拓展场景和构图，在保留产品真实细节的基础上，让画面更丰富、更有表现力。",
    motto: "把灵感剪下来，贴进日常。",
    skills: ["亚马逊品牌视觉", "产品海报排版", "产品图片设计", "Photoshop", "Illustrator", "Figma"],
    experience: [
      { period: "2024 — 至今", title: "自由视觉设计", note: "品牌与独立创作" },
      { period: "2019 — 2024", title: "亚马逊运营", note: "工作室经历示例" }
    ],
    wechat: "Gabrielle_TUTU",
    contactNote: "想聊一个项目，或交换一张好看的海报？给我发消息。",
    links: [],
    footerNote: "DEMO PORTFOLIO · 人物资料与作品为演示内容"
  },
  projects: [
    {
      id: "lost-signal", title: "高速蜘蛛车", english: "Spider RC Car", category: "亚马逊视觉", year: "2026",
      description: "多地形越野玩具车",
      images: [
        { src: "assets/works/高速蜘蛛车2.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/高速蜘蛛车3.jpg", title: "多场景展示", alt: "" },
        { src: "assets/works/高速蜘蛛车4.jpg", title: "场景展示", alt: "" },
        { src: "assets/works/高速蜘蛛车6.jpg", title: "细节展示", alt: "" }
      ]
    },
    {
      id: "peach-please", title: "漂移车", english: "RC Drift Car", category: "亚马逊视觉", year: "2026",
      description: "遥控漂移车",
      images: [
        { src: "assets/works/漂移车2.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/漂移车3.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/漂移车4.jpg", title: "功能展示", alt: "" },
        { src: "assets/works/漂移车5.jpg", title: "场景展示", alt: "" }
      ]
    },
    {
      id: "slow-travel", title: "开花车", english: "RC 360° Rotating Car", category: "亚马逊视觉", year: "2026",
      description: "一款遥控操作可以多种玩法的玩具车",
      images: [
        { src: "assets/works/开花车2.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/开花车4.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/开花车5.jpg", title: "多地形展示", alt: "" },
        { src: "assets/works/开花车6.jpg", title: "使用场景", alt: "" }
      ]
    },
    {
      id: "paper-moon", title: "足球桌", english: "Kids Foosball Table Toy", category: "亚马逊视觉", year: "2026",
      description: "家庭足球对战桌",
      images: [
        { src: "assets/works/足球桌2.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/足球桌3.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/足球桌4.jpg", title: "细节展示", alt: "" },
        { src: "assets/works/足球桌5.jpg", title: "场景展示", alt: "" }
      ]
    },
    {
      id: "after-bloom", title: "儿童DJ台", english: "Kids DJ Mixer Table Toy", category: "亚马逊视觉", year: "2026",
      description: "儿童dj台玩具",
      images: [
        { src: "assets/works/dj-2.jpg", title: "产品展示", alt: "" },
        { src: "assets/works/dj-3.jpg", title: "细节展示", alt: "" },
        { src: "assets/works/dj-4.jpg", title: "功能介绍", alt: "" },
        { src: "assets/works/dj-7.jpg", title: "场景展示", alt: "" }
      ]
    },
    {
      "id": "first-cup",
      "title": "篮球架",
      "english": "Kids Basketball Hoop",
      "category": "亚马逊视觉",
      "year": "2026",
      "description": "儿童篮球架",
      "images": [
        {
          "src": "assets/works/篮球架主副图4.jpg",
          "title": "产品展示",
          "alt": ""
        },
        {
          "src": "assets/works/篮球架主副图3.jpg",
          "title": "场景展示",
          "alt": ""
        },
        {
          "src": "assets/works/篮球架主副图5.jpg",
          "title": "场景展示",
          "alt": ""
        },
        { "src": "assets/works/篮球架主副图6.jpg", "title": "细节展示", "alt": "" }
      ]
    }
  ]
};
