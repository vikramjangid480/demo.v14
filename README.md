# Boganto - Premium Bookstore Blog

A comprehensive full-stack blog website built with Next.js, PHP, and MySQL, featuring responsive design, advanced filtering, and a user-friendly admin panel.

![Boganto Preview](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🎯 Project Overview

**Boganto** is a modern, responsive blog website designed for book lovers and literary enthusiasts. It combines elegant design with powerful functionality to create an engaging reading experience.

### ✨ Key Features

- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎠 Auto-scroll Banner**: Interactive carousel with 4-5 featured articles
- **🗂️ Advanced Filtering**: 50+ categories with expandable filter system
- **📚 Rich Content**: Featured and latest articles with clean card design
- **📖 Detailed Blog Pages**: Clean, modern blog post layout with social sharing
- **⚙️ Admin Panel**: Beautiful admin login with proper error handling
- **🛒 Related Books**: External purchase links for book recommendations
- **🔍 Search Functionality**: Full-text search across all content
- **🏷️ Tag System**: Clickable tags for content discovery

## 🚀 Quick Start

### Prerequisites

Before starting, ensure you have the following installed on your system:

- **PHP 7.4+** (with extensions: PDO, mysqli, mbstring, json)
- **MySQL 5.7+** or **MariaDB 10.3+**
- **Node.js 16+** 
- **npm 7+** or **Yarn 1.22+**
- **Composer 2.0+** (PHP package manager)

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd webapp
```

#### 2. Database Setup
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE boganto_blog;
USE boganto_blog;

# Import database schema
SOURCE backend/database.sql;

# Exit MySQL
exit
```

#### 3. Backend Configuration
```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies (if composer.json exists)
composer install

# Copy and configure database settings
cp config.example.php config.php
```

Edit `backend/config.php` with your database credentials:
```php
<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'boganto_blog';
    private $username = 'root';        // Your MySQL username
    private $password = 'your_password'; // Your MySQL password
    private $conn;
    // ... rest of the configuration
}
?>
```

#### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
# OR if you prefer Yarn
yarn install
```

#### 5. Start the Backend Server
```bash
# From project root directory
chmod +x start-backend.sh
./start-backend.sh

# OR manually:
cd backend && php -S localhost:8000
```
**Backend will be available at: http://localhost:8000**

#### 6. Start the Frontend Development Server
```bash
# From project root directory  
chmod +x start-frontend.sh
./start-frontend.sh

# OR manually:
cd frontend && npm run dev
```
**Frontend will be available at: http://localhost:3000**

## 🎨 Design & Technology

### Frontend Stack
- **Next.js 13+**: React framework with SSR/SSG capabilities
- **TailwindCSS**: Utility-first CSS framework
- **React 18**: Modern UI library with hooks
- **Axios**: HTTP client for API calls
- **Lucide React**: Beautiful icon library
- **TypeScript** (optional): Type safety

### Backend Stack
- **PHP 8**: Server-side scripting
- **MySQL**: Relational database
- **PDO**: Database abstraction layer
- **RESTful APIs**: Clean API architecture

### Key Design Elements
- **Color Palette**: Warm orange primary (#ff5722) with navy accents (#1e3a8a)
- **Typography**: Clean, modern fonts optimized for readability
- **Layout**: Card-based design with subtle shadows and clean lines
- **Responsive**: Mobile-first approach with breakpoints

## 📋 Admin Panel Features

### Default Admin Credentials
- **Username**: `admin123`
- **Password**: `secure@123`

### Enhanced Error Handling
- **Incorrect Password**: Shows "Incorrect password" message
- **Invalid Login**: Shows "Invalid login credentials" message
- **Network Issues**: Shows "Login failed. Please try again." message

### Admin Panel Access
Navigate to `/admin` to access the admin login page with the new design featuring:
- Modern orange gradient header
- Clean form design with icons
- Password visibility toggle
- Remember me functionality
- Demo credentials display

## 📋 Updated Features

### 🏠 Homepage Features
- **Hero Banner**: Auto-scrolling carousel with manual controls
- **Category Filter**: Expandable sidebar with all categories
- **Featured Articles**: Clean card design without author names, includes "See More" button
- **Latest Articles**: Modern card layout without icons or yellow dots, includes "See More" button
- **Responsive Design**: Optimized for mobile and desktop

### 📄 Blog Detail Features - NEW DESIGN
- **Clean Layout**: Inspired by modern blog design patterns
- **Simplified Header**: Clean typography with essential meta information
- **Hero Image**: Single featured image with placeholder support
- **Readable Content**: Optimized typography and spacing
- **Social Sharing**: Share and "Read more posts" buttons
- **Tag System**: Clean tag display with hover effects
- **Related Books**: Sidebar with book recommendations and pricing
- **Feedback Section**: Simple thumbs up/down feedback system

### ⚙️ Admin Panel Features - UPDATED DESIGN
- **Modern Login**: Beautiful orange-themed login page
- **Enhanced Security**: Proper error handling for different login scenarios
- **User Experience**: Password visibility toggle, remember me option
- **Visual Design**: Gradient backgrounds, clean form design
- **Demo Access**: Clear display of demo credentials

### 🎯 Design Improvements Made
- ✅ **Removed Icons**: Eliminated unnecessary icons from article cards
- ✅ **Removed Blur Effects**: Clean, sharp card designs
- ✅ **No Author Names**: Streamlined card content without author information
- ✅ **No Yellow Dots**: Removed indicator dots for cleaner appearance
- ✅ **See More Buttons**: Added to both Featured and Latest Articles sections
- ✅ **Mobile Responsive**: Enhanced footer and overall mobile experience

## 🗂️ Project Structure

```
webapp/
├── 📁 frontend/           # React application
│   ├── 📁 src/
│   │   ├── 📁 components/ # Reusable UI components
│   │   ├── 📁 pages/      # Main page components
│   │   └── 📁 utils/      # API and utility functions
│   ├── 📁 public/         # Static assets
│   └── 📄 package.json    # Dependencies and scripts
├── 📁 backend/            # PHP API server
│   ├── 📄 config.php      # Database configuration
│   ├── 📄 getBlogs.php    # Blog retrieval API
│   ├── 📄 addBlog.php     # Blog management API
│   ├── 📄 getCategories.php # Categories API
│   └── 📄 database.sql    # Database schema
├── 📁 uploads/            # File storage
├── 📁 docs/               # Documentation
├── 📄 start-backend.sh    # Backend startup script
├── 📄 start-frontend.sh   # Frontend startup script
└── 📄 README.md           # This file
```

## 🌐 API Endpoints

### Blog APIs
- `GET /api/blogs` - List all blogs with filtering
- `GET /api/blogs/{id}` - Get specific blog by ID
- `GET /api/blogs/slug/{slug}` - Get blog by URL slug
- `POST /api/admin/blogs` - Create new blog
- `PUT /api/admin/blogs` - Update existing blog
- `DELETE /api/admin/blogs?id={id}` - Delete blog

### Category APIs
- `GET /api/categories` - List all categories with counts
- `GET /api/categories?limit=4` - Get limited categories

### Banner APIs
- `GET /api/banner` - Get carousel banner images

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile (< 768px)**: Single column layout
- **Tablet (768px - 1024px)**: Two column layout
- **Desktop (> 1024px)**: Full multi-column layout

### Mobile Optimizations
- Touch-friendly navigation
- Collapsible sidebar
- Optimized image sizes
- Smooth scrolling
- Gesture support

## 🔧 Configuration

### Frontend Configuration
```javascript
// vite.config.js - Development proxy
server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

### Backend Configuration
```php
// config.php - Database settings
private $host = 'localhost';
private $db_name = 'boganto_blog';
private $username = 'root';
private $password = 'your_password';
```

## 🛡️ Security Features

- **SQL Injection Protection**: Prepared statements
- **XSS Prevention**: Input sanitization
- **File Upload Security**: Type and size validation
- **CORS Configuration**: Proper cross-origin handling
- **Error Handling**: Graceful error responses

## 📈 Performance Optimizations

### Frontend
- Code splitting with Vite
- Lazy loading for images
- Efficient component re-rendering
- Optimized bundle size

### Backend
- Database indexing
- Efficient SQL queries
- Image compression
- Caching headers

## 🚀 Deployment

### Production Build
```bash
# Frontend build
cd frontend && npm run build

# Backend deployment
# Copy backend files to web server
# Update database configuration
# Set proper file permissions
```

### Hosting Requirements
- **Web Server**: Apache/Nginx
- **PHP**: 7.4+ with PDO extension
- **MySQL**: 5.7+ database server
- **SSL**: HTTPS recommended

## 📊 Current Status

### ✅ Completed Features
- Responsive React frontend with TailwindCSS
- PHP backend with RESTful APIs
- MySQL database with comprehensive schema
- Admin panel for content management
- Category filtering system
- Blog detail pages with rich features
- Image upload and management
- Search functionality
- Social sharing integration

### 🚧 Recommended Next Steps
1. **SEO Optimization**: Add meta tags and structured data
2. **Performance**: Implement caching strategies
3. **Analytics**: Add Google Analytics integration
4. **Comments**: User comment system
5. **Newsletter**: Email subscription functionality
6. **RSS Feed**: XML feed generation
7. **PWA**: Progressive Web App features

## 🔗 URLs and Access

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:3000/admin
- **Admin Login Credentials**:
  - Username: `admin123`
  - Password: `secure@123`

## 🚨 Error Handling

### Admin Login Error Messages
- **Incorrect Password**: "Incorrect password"
- **Invalid Credentials**: "Invalid login credentials" 
- **Network/Server Issues**: "Login failed. Please try again."

### Troubleshooting Common Issues

#### Frontend Won't Start
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### Backend Database Connection Issues
1. Check MySQL is running: `sudo service mysql start`
2. Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`
3. Check credentials in `backend/config.php`
4. Ensure MySQL user has proper permissions

#### Port Already in Use
```bash
# Kill processes on specific ports
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:8000 | xargs kill -9  # Backend
```

## 📚 Category System

The platform supports 50+ categories including:
- Fiction, History, Science, Self-Help
- Children's Fiction & Nonfiction
- Business & Economics, Health & Fitness
- Technology & Engineering, Travel & Tourism
- And many more specialized categories

## 🎯 Target Audience

- Book enthusiasts and readers
- Literary bloggers and content creators
- Bookstore owners and managers
- Educational institutions
- Publishing companies

## 🔧 Development Commands

### Frontend Commands (in `/frontend` directory)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Backend Commands (in `/backend` directory)  
```bash
php -S localhost:8000                    # Start PHP development server
php artisan migrate                      # Run database migrations (if using Laravel)
composer install                        # Install PHP dependencies
composer dump-autoload                  # Regenerate autoloader
```

### Database Commands
```bash
mysql -u root -p boganto_blog           # Connect to database
mysqldump -u root -p boganto_blog > backup.sql  # Create backup
mysql -u root -p boganto_blog < backup.sql      # Restore backup
```

## 🚀 Deployment

### Production Build
```bash
# Frontend production build
cd frontend
npm run build
npm run start

# Backend deployment
# Copy backend files to web server
# Update database configuration for production
# Set proper file permissions (755 for directories, 644 for files)
```

### Environment Variables
Create `.env` files for different environments:

**Frontend `.env.local`**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend `.env`** (if applicable):
```env
DB_HOST=localhost
DB_NAME=boganto_blog
DB_USER=root
DB_PASS=your_password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For setup assistance or technical questions:
- Check the troubleshooting section above
- Review API documentation in backend files
- Ensure all prerequisites are installed correctly
- Verify database and server configurations match your environment

### Common Setup Issues
1. **Node.js Version**: Use Node.js 16+ for best compatibility
2. **PHP Extensions**: Ensure PDO, mysqli extensions are enabled
3. **Database Permissions**: MySQL user needs CREATE, SELECT, INSERT, UPDATE, DELETE permissions
4. **Port Conflicts**: Default ports 3000 (frontend) and 8000 (backend) should be available

---

**🎨 Redesigned with modern UI/UX principles**

**📚 Boganto - Where literary excellence meets beautiful design**