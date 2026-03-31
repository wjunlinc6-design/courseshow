/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  BookOpen, 
  Lock, 
  FileText, 
  Video, 
  X,
  Menu,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- 数据定义 ---

const CATEGORIES = [
  { id: 'all', name: '全部课程' },
  { id: 'marketing', name: '新媒体/营销' },
  { id: 'ecommerce', name: '电商运营' },
  { id: 'design', name: '设计/技术' },
  { id: 'ai', name: '人工智能/管理' }
];

const EXTERNAL_COURSES = [
  { title: "元营销分析", url: "https://www.coursera.org/professional-certificates/facebook-marketing-analytics", category: "marketing", intro: "学习如何使用 Meta 的分析工具来衡量营销效果并优化广告策略。" },
  { title: "社交媒体营销", url: "https://www.coursera.org/learn/social-media-marketing-introduction", category: "marketing", intro: "掌握在主流社交平台上建立品牌影响力、吸引受众和推动业务增长的核心技能。" },
  { title: "创新方法学", url: "https://coursehome.zhihuishu.com/courseHome/1000007441#teachTeam", category: "ai", intro: "系统学习 TRIZ 等创新理论，提升解决复杂问题和产品创新的能力。" },
  { title: "直播间从0起号运营策略", url: "https://school.oceanengine.com/premium/course/7044091512052776990/intro", category: "ecommerce", intro: "针对新手商家的直播起号全流程教学，涵盖选品、话术及流量获取。" },
  { title: "巨量千川中小商家课程", url: "https://school.oceanengine.com/premium/course/7336028836495415910/intro", category: "ecommerce", intro: "深入解析巨量千川投放逻辑，帮助中小商家实现精准获客。" },
  { title: "直播带货选品组品", url: "https://school.oceanengine.com/premium/course/7011032163852222471/intro", category: "ecommerce", intro: "学习如何构建高转化率的直播间货盘，掌握排品与定价策略。" },
  { title: "企业号短视频内容运营", url: "https://school.oceanengine.com/premium/course/6844477941544386574/intro", category: "marketing", intro: "探索企业号在抖音生态下的内容生产逻辑与品牌经营之道。" },
  { title: "企业号运营宝典", url: "https://school.oceanengine.com/premium/course/6952781754667106318/intro", category: "marketing", intro: "全面覆盖企业号从认证到私域转化的经营全链路。" },
  { title: "短视频拍剪实操课", url: "https://school.oceanengine.com/premium/course/6844016208027582478/intro", category: "marketing", intro: "零基础学习短视频拍摄技巧与后期剪辑实操，打造爆款内容。" },
  { title: "头条号运营", url: "https://study.163.com/course/introduction/1209133822.htm", category: "marketing", intro: "掌握今日头条平台的算法推荐逻辑，提升图文与视频的阅读量。" },
  { title: "公众号SVG排版", url: "https://study.163.com/course/introduction/1212839815.htm", category: "design", intro: "学习高级 SVG 交互排版技术，让公众号文章视觉效果脱颖而出。" },
  { title: "微信公众号零基础教学", url: "https://study.163.com/course/introduction/1004572006.htm", category: "marketing", intro: "系统化讲解公众号后台操作、内容创作及粉丝运营基础。" },
  { title: "市场营销策划", url: "https://study.163.com/course/introduction/1208924814.htm", category: "marketing", intro: "学习市场调研、品牌定位及整合营销传播方案的策划与执行。" },
  { title: "English Communication Skills", url: "https://www.edx.org/certificates/professional-certificate/tsinghuax-english-communication-skills", category: "marketing", intro: "Enhance your professional English communication for global business environments." },
  { title: "Proposal Writing", url: "https://www.edx.org/certificates/professional-certificate/alaskax-fundamentals-of-grant-proposal-writing-and-management", category: "ai", intro: "Master the art of writing winning grant proposals and project management." },
  { title: "Google AI for Web", url: "https://www.edx.org/certificates/professional-certificate/google-fundamentals-of-google-ai-for-web-based-machine-learning", category: "ai", intro: "Learn how to integrate machine learning models into web applications using Google AI tools." },
  { title: "Results-Based Project Management", url: "https://www.edx.org/certificates/professional-certificate/idbx-results-based-project-management", category: "ai", intro: "Focus on achieving measurable outcomes and impact in project execution." },
  { title: "Build business brand (Canva)", url: "https://www.coursera.org/projects/build-your-business-brand-using-canva", category: "design", intro: "Use Canva to design professional brand assets and visual identities." },
  { title: "Meta Social Media Marketing", url: "https://www.coursera.org/professional-certificates/facebook-social-media-marketing", category: "marketing", intro: "Professional certificate program covering the full spectrum of social media marketing." },
  { title: "TikTok Marketing & Ads", url: "https://www.coursera.org/learn/tiktok", category: "marketing", intro: "Learn how to leverage TikTok's unique ecosystem for brand promotion and advertising." },
  { title: "Getting Started with TikTok", url: "https://www.coursera.org/learn/getting-started-with-tiktok", category: "marketing", intro: "A beginner's guide to creating content and building a presence on TikTok." },
  { title: "平面设计基础", url: "https://www.coursera.org/learn/fundamentals-of-graphic-design", category: "design", intro: "学习视觉设计的基本原则，包括色彩、构图、字体及排版。" },
  { title: "建站全流程实战", url: "https://www.bilibili.com/cheese/play/ss196284568", category: "design", intro: "从域名购买到网站上线，全流程实操建设属于自己的专业网站。" },
  { title: "短视频副业", url: "https://www.bilibili.com/cheese/play/ss12992", category: "marketing", intro: "探索短视频创作的变现路径，开启灵活的副业经营模式。" },
  { title: "轻创业条件评估", url: "https://www.bilibili.com/cheese/play/ss30381", category: "ai", intro: "科学评估创业项目的可行性，降低初创阶段的风险。" },
  { title: "TEMU零基础实战", url: "https://www.bilibili.com/cheese/play/ss15669", category: "ecommerce", intro: "针对跨境电商新手的 TEMU 平台入驻及运营实战教学。" },
  { title: "打通Office", url: "https://www.bilibili.com/cheese/play/ss164", category: "design", intro: "提升办公效率，深度掌握 Word, Excel, PPT 的高级应用技巧。" },
  { title: "SPSS数据分析实战", url: "https://www.bilibili.com/cheese/play/ss337", category: "ai", intro: "学习使用 SPSS 进行科学的数据统计与分析，支持决策制定。" },
  { title: "AI商业设计师", url: "https://www.bilibili.com/cheese/play/ss541010040", category: "design", intro: "结合 AI 工具提升设计效率，探索 AI 在商业设计中的前沿应用。" },
  { title: "字体设计商业课", url: "https://www.gogoup.com/course/GMzcyNQ==", category: "design", intro: "深入学习字体的结构与美感，掌握商业字体设计的核心技法。" },
  { title: "AI动漫短剧", url: "https://www.gogoup.com/course/GMzY5OA==", category: "ai", intro: "学习利用 AI 技术创作动漫短剧，涵盖剧本生成到视觉呈现。" },
  { title: "游戏UI设计PS技巧", url: "https://www.gogoup.com/course/GMzMwOA==", category: "design", intro: "针对游戏行业的 UI 设计实战，掌握 PS 在界面设计中的高级应用。" },
  { title: "Midjourney基础应用", url: "https://www.gogoup.com/course/GMzQwMw==", category: "ai", intro: "掌握 AI 绘画工具 Midjourney 的核心指令与商业出图技巧。" }
];

const TEXT_COURSES = [
  {
    id: "media",
    title: "新媒体运营实战",
    category: "marketing",
    intro: "本课程是一套系统化的新媒体运营实战指南，覆盖从入门认知到全平台运营的核心技能。课程内容围绕公众号、头条号、抖音、社群、短视频、直播等多个主流阵地，拆解内容创作、用户运营、数据分析、算法机制、商业变现等关键环节，帮助学员建立完整的运营知识体系。",
    catalog: [
      { title: "一、新媒体认知与基础", items: ["新媒体营销的底层逻辑", "运营岗位的日常工作内容", "主流新媒体平台对比分析", "运营人员必备的职业素养", "用户画像的构建方法"] },
      { title: "二、公众号运营实战", items: ["公众号核心功能详解", "后台基础设置操作指南", "图文排版编辑技巧", "公众号辅助工具推荐", "公众号文章的选题方法", "文案编写技巧", "文案结构分析", "产品文的结构解析", "标题与开头的撰写技巧", "素材库的搭建与管理"] },
      { title: "三、社群营销与转化", items: ["社群营销的核心目标", "社群的冷启动策略", "建群的准备工作", "用户的促活方式", "引流转化与商业变现"] },
      { title: "四、头条号运营", items: ["头条号的快速上手方法", "智能算法与推荐机制", "头条号的内容选题策略"] },
      { title: "五、短视频运营与拍摄", items: ["商品功能的作用与使用", "脚本速写的万能公式", "短视频拍摄全流程", "短视频拍摄器材选择", "短视频拍摄参数设置", "短视频后期制作技巧", "分镜头拍摄技巧"] },
      { title: "六、抖音运营与算法", items: ["抖音用户画像与人群分析", "抖音排名算法与推荐机制", "抖音的商业变现模式"] },
      { title: "七、企业号与矩阵运营", items: ["品牌玩转企业蓝V认证的5大优势", "抖音战略矩阵玩法"] },
      { title: "八、直播间打造与直播运营", items: ["直播间打造与设备清单", "直播带货脚本设计", "直播操作指南", "直播互动玩法", "直播后复盘与粉丝维护技巧"] }
    ]
  },
  {
    id: "live",
    title: "直播电商实战指南",
    category: "ecommerce",
    intro: "本课程是一套系统化的直播电商实战指南，围绕“人、货、场”三大核心要素，全面拆解从平台选择到直播落地的全流程。课程内容涵盖直播平台对比、团队分工与设备搭建、脚本策划与商品讲解、粉丝运营与引流转化、数据复盘与优化等关键环节。",
    catalog: [
      { title: "一、直播电商认知与平台选择", items: ["直播电商的“人、货、场”核心要素", "主流直播平台类型与特点", "主流直播平台的入驻流程", "如何选择适合自己的直播平台"] },
      { title: "二、团队配置与场景搭建", items: ["直播团队的分工与职责", "直播设备清单与选购建议", "直播间的搭建方法", "直播间的软装与氛围营造技巧"] },
      { title: "三、直播内容策划", items: ["直播选品的逻辑与方法", "直播脚本的规划与设计", "直播开场的技巧与策略", "直播商品讲解的方法与话术", "直播标题的撰写与首页制作"] },
      { title: "四、直播运营与粉丝管理", items: ["直播预热的方式与渠道", "直播间消费者需求分析", "粉丝运营的维护与互动技巧", "直播间的引流与转化策略"] },
      { title: "五、数据优化与实操", items: ["直播数据的深度分析与优化", "主流直播平台操作示范"] }
    ]
  },
  {
    id: "web",
    title: "自建站实战运营",
    category: "ecommerce",
    intro: "本课程是一套聚焦电商实战运营的系统化指南，围绕团队搭建、店铺管理、活动策划与引流转化等核心环节，拆解从基础运营到活动爆单的全流程。课程内容涵盖正规电商团队的组织架构、店铺注册与账号设置的操作方法、产品管理与物流售后效率提升的实用策略。",
    catalog: [
      { title: "一、团队搭建与基础运营", items: ["正规电商团队的组织架构", "店铺注册的成功方法", "账号设置的标准化操作"] },
      { title: "二、店铺管理与效率提升", items: ["店铺产品的高效管理技巧", "物流与售后效率的提升策略"] },
      { title: "三、活动策划与引流转化", items: ["O2O活动的必备工具", "O2O活动的成功策划方法", "活动效果的优化技巧", "免费引流的常见方式"] }
    ]
  },
  {
    id: "taobao",
    title: "淘宝运营实战指南",
    category: "ecommerce",
    intro: "本课程是一套系统化的淘宝运营实战指南，覆盖从店铺入驻到推广变现的全流程。课程内容按照店铺基础、商品优化、客服交易、营销工具、数据分析、直播带货、直通车推广、淘宝客等八大模块进行系统梳理。",
    catalog: [
      { title: "一、店铺基础与入驻", items: ["淘宝店铺类型与选择", "淘宝店铺注册流程", "店铺定位与基础设置", "千牛工作台与子账户使用"] },
      { title: "二、商品发布与优化", items: ["淘宝发布宝贝规则与技巧", "店铺基本信息与违规管理", "淘宝搜索排名规则", "关键词挖掘与筛选", "宝贝黄金标题打造策略", "宝贝类目属性与上下架时间优化", "淘宝宝贝权重优化"] },
      { title: "三、客服与交易流程", items: ["客服技巧与话术", "淘宝交易与售后流程"] },
      { title: "四、店铺营销工具", items: ["优惠券的订购、创建与应用", "店铺VIP会员等级设置", "第2件半价活动创建方法", "淘宝群聊的创建与运营", "店铺工具的常用功能"] },
      { title: "五、数据化运营", items: ["生意参谋的订购与功能介绍", "店铺流量来源解析", "访客特征与店铺转化率分析", "搜索进店关键词分析", "店铺实时数据与经营数据分析"] },
      { title: "六、淘宝直播实战", items: ["直播平台的选择与定位", "卖货直播间的快速搭建方法", "直播选品的实用技巧", "新手主播必学的直播技巧", "直播带货的变现路径"] },
      { title: "七、直通车推广", items: ["直通车的基础入门与发展历程", "直通车推广计划的新建与设置", "流量解析与关键词选词出价技巧", "关键词质量分优化方法", "直通车精准人群的使用策略"] },
      { title: "八、新店推广与淘宝客", items: ["新店推广的基本思路", "淘宝客的基础介绍与各计划详解"] }
    ]
  },
  {
    id: "social",
    title: "社交电商新思维",
    category: "marketing",
    intro: "本课程聚焦新零售背景下的社交电商运营，以微盟微商城为核心载体，系统拆解从店铺搭建到用户全生命周期运营的完整路径。课程围绕“拉新、互动、留存、成交、复购”五大运营环节。",
    catalog: [
      { title: "一、社交电商认知与平台基础", items: ["新零售时代的社交电商运营逻辑", "微盟微商城的功能与定位", "店铺搭建与用户购买力激发"] },
      { title: "二、营销推广与用户获取", items: ["微盟营销工具介绍与应用", "结合微盟推广：铺好营销路径，增加商品曝光（拉新）"] },
      { title: "三、用户运营与留存转化", items: ["互动：让用户参与，促进持续访问", "留存：留住用户，建立私域流量", "成交：优化成交流程，提升服务体验", "复购：激活老用户，持续带来订单"] },
      { title: "四、活动策划与全域联动", items: ["活动策划：用一场活动实现线上线下联动增长"] }
    ]
  },
  {
    id: "ads",
    title: "策划与制作实战",
    category: "design",
    intro: "本课程是一门系统化的网络广告设计实战课程，围绕广告策划、版式构图、色彩搭配、文字处理、视觉元素应用等核心模块，帮助学员建立从创意构思到视觉落地的完整设计能力。",
    catalog: [
      { title: "一、广告策划与创意", items: ["网络广告概述", "网络广告策划与创意构思"] },
      { title: "二、版式与色彩设计", items: ["广告版式构图原理", "色彩构成原理", "色彩搭配法则", "色彩平衡法则"] },
      { title: "三、文字设计与处理", items: ["文字分类与文字气质", "文字对齐与文字造型", "文字处理的常用技法"] },
      { title: "四、视觉元素与设计应用", items: ["装饰设计元素的绘制方法", "设计图片的解析与运用"] }
    ]
  }
];

const RESOURCE_LINKS = [
  { name: "国家职业技能标准查询系统", url: "http://osta.mohrss.gov.cn/" },
  { name: "派代网 (PaiDai)", url: "https://www.paidai.com/" },
  { name: "国家创新方法训练样本", url: "https://www.hebut.edu.cn/" },
  { name: "创新PPT", url: "https://www.glzy8.com/" },
  { name: "国家职业技能标准查询系统 (新)", url: "https://www.osta.org.cn/" },
  { name: "商业模式画布评估", url: "https://doc.mbalib.com/view/08bc619f50d0bbaeaa08b56cbb50dd7d.html" },
  { name: "企业商业模式画布", url: "https://doc.mbalib.com/view/7365cf2c9c64c9102f5ec18014b98e89.html" },
  { name: "TRIZ官方资源库", url: "https://the-trizjournal.com/what-is-triz/" }
];

// --- 组件部分 ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'detail'>('home');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<number[]>([]);
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; title: string }>({ isOpen: false, title: '' });

  const bannerImages = [
    "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=1200&h=300&q=80",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&h=300&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&h=300&q=80"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredCourses = [
    ...TEXT_COURSES.map(c => ({ ...c, type: 'text' })),
    ...EXTERNAL_COURSES.map(c => ({ ...c, type: 'link' }))
  ].filter(c => activeCategory === 'all' || c.category === activeCategory);

  const handleCourseClick = (course: any) => {
    if (course.type === 'link') {
      window.open(course.url, '_blank');
    } else {
      setSelectedCourse(course);
      setCurrentPage('detail');
      setIsIntroExpanded(false);
      setCollapsedSections([]);
      window.scrollTo(0, 0);
    }
  };

  const toggleSection = (idx: number) => {
    setCollapsedSections(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const renderHome = () => (
    <div className="animate-in fade-in duration-500">
      {/* Banner */}
      <div className="relative h-[300px] w-full overflow-hidden bg-gray-200">
        {bannerImages.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === idx ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 text-white hover:bg-black/50"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 text-white hover:bg-black/50"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 课程展示区 */}
      <section id="courses" className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center border-l-4 border-[#003366] pl-4">
          <h2 className="text-2xl font-bold text-[#003366]">课程展示区</h2>
        </div>

        {/* 筛选按钮 */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-sm transition-colors ${
                activeCategory === cat.id 
                ? 'bg-[#003366] text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 课程网格 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course, idx) => (
            <motion.div
              layout
              key={course.title + idx}
              onClick={() => handleCourseClick(course)}
              className="group cursor-pointer border border-gray-200 bg-white p-4 transition-all hover:shadow-lg"
            >
              <div className="mb-4 aspect-video overflow-hidden bg-gray-100">
                <img 
                  src={`https://picsum.photos/seed/${course.title}/400/225`} 
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="mb-2 line-clamp-1 font-bold text-[#003366]">{course.title}</h3>
              <p className="mb-4 line-clamp-2 text-xs text-gray-500">
                {course.intro || '点击跳转至外部优质教育资源平台进行学习。'}
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 px-2 py-1 text-[10px] uppercase tracking-wider text-blue-600">
                  {course.category}
                </span>
                {course.type === 'link' ? <ExternalLink size={14} className="text-gray-400" /> : <BookOpen size={14} className="text-gray-400" />}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 资源技术区 */}
      <section id="resources" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center border-l-4 border-[#003366] pl-4">
            <h2 className="text-2xl font-bold text-[#003366]">资源技术区</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCE_LINKS.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border-b-2 border-gray-200 bg-white p-4 text-sm text-gray-700 transition-colors hover:bg-[#003366] hover:text-white"
              >
                <span>{link.name}</span>
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderAbout = () => (
    <div className="container mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12 flex items-center border-l-4 border-[#003366] pl-4">
        <h2 className="text-2xl font-bold text-[#003366]">关于我们 / About Us</h2>
      </div>
      
      <div className="prose prose-blue max-w-none space-y-8 text-justify leading-relaxed text-gray-700">
        <section className="space-y-4">
          <p className="indent-8">依据国家科技基础条件平台建设总体要求与发展目标，本平台秉持“整合、共享、创新、发展”的建设方针，聚焦数字化营销与创新教育领域，系统整合并优化配置国内外优质公共学习资源，广泛吸纳权威公开课、行业前沿洞察、实战案例解析、运营策略指南、设计美学素材与体系化教学资源等多维内容，初步构建形成布局合理、功能完善、体系健全、共享高效的数字化营销与创新教育科技基础条件平台。</p>
          <p className="indent-8">本平台是一个汇集国内外数字化营销、创新教育、人工智能、管理学、广告学等领域优质课程及好书分享的资源网站。所载内容为试用章节展示（通常为3节内容预览），旨在帮助学习者在正式学习或购买前快速了解课程内容，依据自身兴趣决定是否进一步参与。本站不进行课程直接售卖，仅为在线推荐与展示。若页面中包含跳转至第三方平台的链接，相关课程的学习或购买行为均在原平台完成，本站不参与任何交易环节。上述展示方式严格尊重原作者合法权益，不涉及侵权问题。</p>
          <p className="indent-8">本页面内容仅面向项目共同体成员开放，需提交申请后方可获取浏览权限。部分免费推荐课程可直接学习，如需访问全部课程资源，敬请与我们联系。</p>
          <p className="font-bold text-red-600">*近期网站进行系统维护，权限开放服务暂缓。为保障共同体成员权益，平台已对部分链接进行转化，并持续提供可持续学习支持。感谢您的理解与配合。</p>
        </section>

        <hr className="border-dashed border-gray-300" />

        <section className="space-y-4 text-sm text-gray-500 italic">
          <p>In accordance with the overall requirements and development goals of the National Science and Technology Infrastructure Platform, this platform adheres to the guiding principle of “Integration, Sharing, Innovation, and Development.” Focusing on the fields of digital marketing and innovative education, it systematically integrates and optimizes high-quality public learning resources from both domestic and international sources, incorporating a wide range of content such as authoritative open courses, industry frontier insights, practical case analyses, operational strategy guides, design aesthetic materials, and systematic teaching resources. A well-laid-out, fully functional, sound, and highly shared science and technology infrastructure platform for digital marketing and innovative education has been preliminarily established.</p>
          <p>This platform serves as a curated resource hub featuring outstanding courses and book recommendations in areas such as digital marketing, innovative education, artificial intelligence, management, and advertising studies—both from domestic and international sources. The content displayed consists of trial chapters (typically three lessons per course), designed to help learners quickly understand the course structure and content before officially studying or purchasing, allowing them to make informed decisions based on their interests. This platform does not directly sell courses; it only provides online recommendations and previews. Any links that lead to third-party platforms direct users to complete their learning or purchase transactions on the original sites; this platform does not participate in any transaction processes. This presentation method strictly respects the legitimate rights and interests of the original creators and does not involve any copyright infringement.</p>
          <p>The content on this page is accessible only to members of the project consortium. An application is required to obtain browsing permissions. Some free recommended courses are available for direct learning. To access the full course content, please contact us.</p>
          <p>* The website is currently undergoing maintenance, and access authorization is temporarily suspended. To protect the interests of consortium members, some links have been converted to provide continuous access to a sustainable learning platform. Thank you for your support and cooperation.</p>
        </section>
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedCourse) return null;
    let globalItemIndex = 0;

    return (
      <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
        <button 
          onClick={() => setCurrentPage('home')}
          className="mb-6 flex items-center gap-2 text-sm text-[#003366] hover:underline"
        >
          <ChevronLeft size={16} /> 返回首页
        </button>

        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-bold text-[#003366]">{selectedCourse.title}</h1>
          
          <div className="border border-gray-100 bg-white p-6 shadow-sm">
            <div className={`overflow-hidden transition-all duration-500 ${isIntroExpanded ? 'max-h-[1000px]' : 'max-h-[72px]'}`}>
              <p className="text-gray-600">{selectedCourse.intro}</p>
            </div>
            <button 
              onClick={() => setIsIntroExpanded(!isIntroExpanded)}
              className="mt-4 flex w-full items-center justify-end gap-1 text-sm font-medium text-[#003366]"
            >
              {isIntroExpanded ? <>收起内容 <ChevronUp size={14} /></> : <>了解更多内容 <ChevronDown size={14} /></>}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center border-l-4 border-[#003366] pl-4">
            <h2 className="text-xl font-bold text-[#003366]">学习内容</h2>
          </div>

          <div className="space-y-6">
            {selectedCourse.catalog.map((section: any, sIdx: number) => {
              const isCollapsed = collapsedSections.includes(sIdx);
              return (
                <div key={sIdx} className="bg-white border border-gray-100">
                  <button 
                    onClick={() => toggleSection(sIdx)}
                    className="flex w-full items-center justify-between p-4 text-left font-bold text-gray-800 hover:bg-gray-50"
                  >
                    <span>{section.title}</span>
                    {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </button>
                  
                  {!isCollapsed && (
                    <div className="divide-y divide-gray-100 border-t border-gray-100">
                      {section.items.map((item: string, iIdx: number) => {
                        globalItemIndex++;
                        const isLocked = globalItemIndex > 3;
                        return (
                          <div 
                            key={iIdx}
                            onClick={() => isLocked ? alert('课程陆续开放！') : setPreviewModal({ isOpen: true, title: item })}
                            className={`flex items-center justify-between p-4 transition-colors ${isLocked ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:bg-gray-50'}`}
                          >
                            <div className="flex items-center gap-3">
                              {isLocked ? <Lock size={16} className="text-gray-400" /> : <FileText size={16} className="text-blue-500" />}
                              <span className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-700'}`}>
                                {globalItemIndex}. {item}
                              </span>
                            </div>
                            {!isLocked && (
                              <div className="flex items-center gap-2 text-[10px] text-blue-400">
                                <Video size={12} />
                                <span>可预览 [视频/课件]</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-6 text-[11px] text-gray-400">
          课程内容源头来自：阿里万相台公开课 https://v.taobao.com/、巨量学： https://www.oceanengine.com/learning、数英网 (Digitaling)： https://www.digitaling.com/、私域电商运营指南、站酷 (ZCOOL)、国家开放大学素材包、行业协会共享资源等。
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#003366] text-white shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="hidden h-8 w-8 items-center justify-center bg-white text-[#003366] sm:flex">
              <BookOpen size={20} />
            </div>
            <h1 className="text-base font-bold tracking-tight sm:text-lg md:text-xl">数字化教育资源共享平台</h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-blue-200">首页</button></li>
              <li><a href="#courses" onClick={() => setCurrentPage('home')} className="hover:text-blue-200">课程展示</a></li>
              <li><a href="#resources" onClick={() => setCurrentPage('home')} className="hover:text-blue-200">资源技术</a></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-blue-200">关于我们</button></li>
            </ul>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-[#002244] md:hidden"
            >
              <ul className="flex flex-col border-t border-blue-800/50 py-4">
                <li>
                  <button 
                    onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} 
                    className="block w-full px-6 py-3 text-left text-sm hover:bg-blue-800"
                  >
                    首页
                  </button>
                </li>
                <li>
                  <a 
                    href="#courses" 
                    onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} 
                    className="block w-full px-6 py-3 text-left text-sm hover:bg-blue-800"
                  >
                    课程展示
                  </a>
                </li>
                <li>
                  <a 
                    href="#resources" 
                    onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} 
                    className="block w-full px-6 py-3 text-left text-sm hover:bg-blue-800"
                  >
                    资源技术
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('about'); setIsMobileMenuOpen(false); }} 
                    className="block w-full px-6 py-3 text-left text-sm hover:bg-blue-800"
                  >
                    关于我们
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'detail' && renderDetail()}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t-4 border-[#003366] bg-gray-100 py-12 text-center text-sm text-gray-500">
        <div className="container mx-auto px-4">
          <p className="mb-2">Copyright © 2020-2025 全国职业教育数字化建设办公室。本站资源由多方共建，仅供试点学校内部教学使用。</p>
          <p>版权所有：数字化教育资源建设委员会 (非盈利性机构)</p>
        </div>
      </footer>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white p-8 shadow-2xl"
            >
              <button 
                onClick={() => setPreviewModal({ isOpen: false, title: '' })}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
              <h3 className="mb-6 text-xl font-bold text-[#003366]">正在预览：{previewModal.title}</h3>
              <div className="aspect-video w-full bg-gray-900 flex items-center justify-center text-white flex-col gap-4">
                <Video size={48} className="animate-pulse" />
                <p className="text-sm text-gray-400">正在加载教学视频流与配套课件...</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setPreviewModal({ isOpen: false, title: '' })}
                  className="bg-[#003366] px-6 py-2 text-white hover:bg-blue-800"
                >
                  关闭预览
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
