require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const Admin = require('./src/models/Admin');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const Artisan = require('./src/models/Artisan');
const Testimonial = require('./src/models/Testimonial');
const Blog = require('./src/models/Blog');

// DB Connection is now handled in the require.main block or by the parent app

const seedAdmin = async () => {
  const exists = await Admin.findOne({ email: 'hieil@gmail.com' });
  if (!exists) {
    const hashed = await bcrypt.hash('admin@123', 10);
    await Admin.create({ email: 'hieil@gmail.com', password: hashed, name: 'Hieil Admin', role: 'superadmin' });
    console.log('Admin seeded successfully');
  } else {
    console.log('Admin already exists');
  }
};

const seedCategories = async () => {
  await Category.deleteMany();
  const categories = [
    { name: 'BLUE POTTERY', tag: '200+ DESIGNS', description: 'GI tagged authentic Jaipur Blue Pottery with intricate floral designs.', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500&auto=format&fit=crop' },
    { name: 'METAL CRAFTS', tag: '350+ DESIGNS', description: 'Exquisite handcrafted metal artistry bringing timeless elegance to your spaces.', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1577908976451-c67be8f9b940?q=80&w=500&auto=format&fit=crop' },
    { name: 'STONE PRODUCTS', tag: '400+ DESIGNS', description: 'Finely carved stone products reflecting the true heritage of Indian artisans.', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?q=80&w=500&auto=format&fit=crop' },
    { name: 'WOODEN CRAFTS', tag: '250+ DESIGNS', description: 'Premium Sheesham woodware showcasing intricate traditional carvings.', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=500&auto=format&fit=crop' },
    { name: 'LUXURY CLOCKS', tag: '150+ DESIGNS', description: 'Vintage and modern luxury clocks crafted with ultimate precision.', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1508013861974-9f6347ce682c?q=80&w=500&auto=format&fit=crop' },
    { name: 'HOME DECOR', tag: '280+ DESIGNS', description: 'A curated collection of artifacts to effortlessly elevate your living spaces.', status: 'ACTIVE', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=500&auto=format&fit=crop' }
  ];
  await Category.insertMany(categories);
  console.log('Categories seeded successfully');
};

const seedProducts = async () => {
  await Product.deleteMany();
  const products = [
    {
      category: 'Handcrafted Blue Pottery',
      productName: 'Jar',
      tag: 'TRENDING NOW',
      description: 'This Handcrafted Jaipur Blue Pottery Storage Jar is a vibrant fusion of Turco-Persian heritage and functional modern decor. Each jar is individually hand-painted by master artisans in Rajasthan, India, making it an exclusive addition to any global home.',
      materials: 'quartz stone powder',
      hsnCode: '69139000',
      productCode: 'NA-047',
      mainImage: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=500&auto=format&fit=crop',
      addImg1: 'https://images.unsplash.com/photo-1590725140246-2009214d02ce?q=80&w=600&auto=format&fit=crop',
      addImg2: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop',
      craftsmanship: 'Luxury Dining & Tableware'
    },
    {
      category: 'Handcrafted Blue Pottery',
      productName: 'Jewelry Drawer',
      tag: 'TOP PICK',
      description: 'This charming, handcrafted Mini Jewelry Chest is a perfect blend of traditional woodworking and the world-famous Jaipur Blue Pottery. It serves as both a functional organizer and a vibrant piece of Rajasthani folk art.',
      materials: 'quartz stone powder',
      hsnCode: '69131000',
      productCode: 'NA-044',
      mainImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500&auto=format&fit=crop',
      addImg1: 'https://images.unsplash.com/photo-1592397148564-90b9b32a76fa?q=80&w=600&auto=format&fit=crop',
      craftsmanship: 'Luxury Decorative Collections'
    },
    {
      category: 'Handcrafted Blue Pottery',
      productName: 'Lamp',
      tag: 'HOT SELLING',
      description: 'This decorative lantern is another beautiful example of Firozabad Glass Mosaic art. It combines traditional Indian craftsmanship with a vintage, lantern-style design, making it an ideal choice for adding ethnic charm and a "boho-chic" vibe to your home decor.',
      materials: 'quartz stone powder',
      hsnCode: '94052010',
      productCode: 'NA-046',
      mainImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500&auto=format&fit=crop',
      addImg1: 'https://images.unsplash.com/photo-1581428982868-e410dd127a90?q=80&w=400&auto=format&fit=crop',
      craftsmanship: 'Luxury Decorative Collections'
    },
    {
      category: 'Handcrafted Blue Pottery',
      productName: 'Decorative',
      tag: 'IN DEMAND',
      description: 'This decorative lantern is another beautiful example of Firozabad Glass Mosaic art. It combines traditional Indian craftsmanship with a vintage, lantern-style design, making it an ideal choice for adding ethnic charm and a "boho-chic" vibe to your home decor.',
      materials: 'quartz stone powder',
      hsnCode: '94052010',
      productCode: 'NA-048',
      mainImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=500&auto=format&fit=crop',
      addImg1: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=400&auto=format&fit=crop',
      craftsmanship: 'Luxury Decorative Collections'
    },
    {
      category: 'Handcrafted Blue Pottery',
      productName: 'Agarbatti Stand',
      tag: 'NEW ARRIVAL',
      description: 'This handcrafted set of agarbatti stands is a beautiful example of Jaipur Blue Pottery, combining spiritual symbolism with traditional Rajasthani artistry. Shaped like the Hamza hand (or Hand of Fatima), these stands are designed to bring a sense of peace and protection to your home or prayer space.',
      materials: 'quartz stone powder',
      hsnCode: '69139000',
      productCode: 'NA-043',
      mainImage: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=500&auto=format&fit=crop',
      craftsmanship: 'Luxury Garden & Lifestyle'
    }
  ];
  await Product.insertMany(products);
  console.log('Products seeded successfully');
};

const seedArtisans = async () => {
  await Artisan.deleteMany();
  const artisans = [
    {
      title: 'Surajmal & team',
      description: 'Handcrafted Wooden categories',
      text: 'Surajmal is a skilled artisan known for his expertise in crafting high-quality handcrafted wooden categories. With years of experience in traditional woodworking, he combines time-honored techniques with creative design to produce unique and elegant wooden handicrafts.\n\nHis craftsmanship reflects patience, precision, and a deep respect for natural materials. Each wooden piece created by Surajmal is carefully shaped, carved, and finished by hand, ensuring durability, beauty, and authenticity. His work often features traditional patterns and artistic detailing that represent the rich heritage of Indian handicrafts.',
      preview: 'http://localhost:3000/uploads/artisan1.png', 
    },
    {
      title: 'Ahmad Ali & team',
      description: 'Handcrafted Blue Pottery',
      text: 'Ahmad Ali is a skilled artisan specializing in the traditional art of handcrafted Blue Pottery, a craft deeply rooted in the rich cultural heritage of Rajasthan. With years of experience and dedication to this unique ceramic art form, he has mastered the intricate techniques of shaping, glazing, and decorating exquisite blue pottery pieces.\n\nHis work reflects the beauty of traditional craftsmanship combined with artistic precision. Each piece created by Ahmad Ali carries distinctive patterns, vibrant blue hues, and detailed hand-painted designs that represent the timeless elegance of Rajasthani heritage.',
      preview: 'http://localhost:3000/uploads/artisan2.jpg',
    }
  ];
  await Artisan.insertMany(artisans);
  console.log('Artisans seeded successfully');
};

const seedTestimonials = async () => {
  await Testimonial.deleteMany();
  const testimonials = [
    {
      userName: "Business Man",
      userDesignation: "CEO",
      city: "Japan , Tokyo",
      message: "I recently purchased a beautiful handicraft from Hieil Company, and I am deeply impressed by the skill involved. In Japan, we deeply respect the 'Takumi' (artisan) spirit, and I see that same dedication in Hieil’s categories. The balance of tradition and quality is excellent. It is a wonderful addition to my collection in Tokyo.",
      rating: 5,
      status: "APPROVED"
    }
  ];
  await Testimonial.insertMany(testimonials);
  console.log('Testimonials seeded successfully');
};

const seedBlogs = async () => {
  await Blog.deleteMany();
  const blogs = [
    {
      category: 'Handmade Painting Art',
      title: 'The Art of Handmade Paintings',
      tag: 'Art',
      description: 'Discover the beauty and intricacy of handmade paintings that bring walls to life.',
      image: 'http://localhost:3000/uploads/blog1.png',
      content: 'Handmade paintings are a true reflection of the artist\'s soul. They bring warmth, texture, and a unique character to any space. In an era of mass production, these pieces stand out for their authenticity and the sheer effort involved in creating them.'
    },
    {
      category: 'Handcrafted Wooden categories',
      title: 'Preserving Traditional Woodcrafts',
      tag: 'Woodcraft',
      description: 'Learn about the techniques used by master artisans to create timeless wooden decor.',
      image: 'http://localhost:3000/uploads/blog2.png',
      content: 'Woodcrafting is a tradition passed down through generations. The intricate carvings and the careful selection of wood ensure that each piece is not only beautiful but also durable. By supporting these artisans, we help preserve a vital part of our cultural heritage.'
    }
  ];
  await Blog.insertMany(blogs);
  console.log('Blogs seeded successfully');
};

const seedLeaders = async () => {
  const Leader = require('./src/models/Leader');
  await Leader.deleteMany();
  const leaders = [
    {
      photo: 'http://localhost:3000/uploads/narendra.jpeg',
      name: 'Narendra Singh',
      role: 'French Language Expert/International Liaison Officer',
      description: 'French Language Expert/International Liaison Officer ,Narendra Singh is a French Language Expert. He is also a translator.He has a lot of experience in language services.His work helps people communicate across countries and cultures.He knows the language very well.He also knows global language standards.Narendra has made a career of helping people translate text.His translations are accurate and professional.They are also sensitive, to cultures.'
    },
    {
      photo: 'http://localhost:3000/uploads/harsh.png',
      name: 'Mr. Harsh Vijay',
      role: 'Head of Design & Development',
      description: 'Head of Design & Development Mr. Harsh Vijay is the Head of Design & Development. He brings creativity and innovation to the organization.He has a design vision.With an eye for detail he understands traditional craftsmanship and modern design trends.Harsh Vijay plays a role in creating unique product collections that are ready for the market.In his role Harsh Vijay leads design and development.He works closely with artisans and production teams.They transform concepts into high-quality handcrafted products.His focus is on mixing artistry with modern aesthetics.This helps create designs that appeal to both international markets.Harsh Vijay and his team make sure products are of quality.The designs are a mix of modern styles.This makes them attractive, to customers everywhere.'
    },
    {
      photo: 'http://localhost:3000/uploads/rahoul.png',
      name: 'Mr. Rahoul Chouhan',
      role: 'Strategic Country Advisor',
      description: 'Mr. Rahoul Chauhan.Strategic Country Advisor.Rahoul Chauhan is a leader. He is known for working and thinking ahead. He wants to make businesses grow and do well.He leads by example. Makes sure things are done properly. Rahoul Chauhan builds relationships that last. He gets results and makes sure they are of high quality.Rahoul Chauhan is good, at planning. Thinks about the future. He likes to try things.'
    }
  ];
  await Leader.insertMany(leaders);
  console.log('Leaders seeded successfully');
};

const seedCertifications = async () => {
  const Certification = require('./src/models/Certification');
  await Certification.deleteMany();
  const certs = [
    {
      title: 'Importer Exporter Code',
      subtitle: 'IEC Certificate',
      description: 'Officially registered with DGFT for international trade operations.',
      icon: 'FileCheck2'
    },
    {
      title: 'PAN Card',
      subtitle: 'Tax Identity',
      description: 'Permanent Account Number issued by the Income Tax Department of India.',
      icon: 'Landmark'
    },
    {
      title: 'Udyam Registration',
      subtitle: 'MSME Certified',
      description: 'Recognized as a Micro, Small & Medium Enterprise by Govt. of India.',
      icon: 'BadgeCheck'
    },
    {
      title: 'Income Tax (ITR)',
      subtitle: 'Tax Compliance',
      description: 'Fully compliant with Indian taxation laws and annual return filings.',
      icon: 'ShieldCheck'
    }
  ];
  await Certification.insertMany(certs);
  console.log('Certifications seeded successfully');
};

const runSeeder = async () => {
  await seedAdmin();
  await seedCategories();
  await seedProducts();
  await seedArtisans();
  await seedTestimonials();
  await seedBlogs();
  await seedLeaders();
  await seedCertifications();
  
  console.log('Data seeding completed!');
};

if (require.main === module) {
  // Connect to DB only if run directly
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB Connected');
      runSeeder().then(() => process.exit());
    })
    .catch(err => console.log(err));
}

module.exports = { runSeeder };
