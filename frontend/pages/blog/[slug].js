import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Calendar, Eye, Tag, ExternalLink, ChevronRight, Share2, Twitter, Facebook, Linkedin, MessageSquare, Copy, Clock, ThumbsUp, ThumbsDown, User, Heart, BookOpen } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { blogAPI, utils } from '../../utils/api'

const BlogDetailPage = ({ blog: initialBlog, relatedArticles }) => {
  const router = useRouter()
  const { slug } = router.query
  const [blog, setBlog] = useState(initialBlog)
  const [relatedBooks, setRelatedBooks] = useState(initialBlog?.related_books || [])
  const [loading, setLoading] = useState(!initialBlog)
  const [error, setError] = useState(null)
  const [tableOfContents, setTableOfContents] = useState([])
  const [showMoreRelated, setShowMoreRelated] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    if (!initialBlog && slug) {
      fetchBlogDetail()
    }
  }, [slug, initialBlog])

  useEffect(() => {
    if (blog) {
      generateTableOfContents()
    }
  }, [blog])

  const fetchBlogDetail = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await blogAPI.getBlogBySlug(slug)
      setBlog(response.blog)
      setRelatedBooks(response.blog.related_books || [])
    } catch (err) {
      if (err.status === 404) {
        setError('Blog post not found')
      } else {
        setError('Failed to load blog post. Please try again.')
      }
      console.error('Error fetching blog:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateTableOfContents = () => {
    if (!blog || !blog.content) return

    // Extract h2 and h3 tags from content
    const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
    const headings = []
    let match

    while ((match = headingRegex.exec(blog.content)) !== null) {
      const level = parseInt(match[1])
      const text = match[2].replace(/<[^>]*>/g, '') // Remove any HTML tags
      const id = utils.generateSlug(text)
      
      headings.push({
        level,
        text,
        id
      })
    }

    setTableOfContents(headings)
  }

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleTagClick = (tag) => {
    router.push(`/tag/${encodeURIComponent(tag.trim())}`)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = blog ? blog.title : ''

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleFeedback = (type) => {
    setFeedback(type)
    // You can implement API call to save feedback here
  }

  // Process content to add IDs to headings
  const processContent = (content) => {
    return content.replace(/<h([23])[^>]*>(.*?)<\/h[23]>/gi, (match, level, text) => {
      const cleanText = text.replace(/<[^>]*>/g, '')
      const id = utils.generateSlug(cleanText)
      return `<h${level} id="${id}" className="scroll-mt-24">${text}</h${level}>`
    })
  }

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200
    const words = content?.replace(/<[^>]*>/g, '').split(' ').length || 0
    return Math.ceil(words / wordsPerMinute)
  }

  // Display only 3 related articles by default
  const displayedRelatedArticles = showMoreRelated ? relatedArticles : relatedArticles?.slice(0, 3) || []

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... - Boganto</title>
        </Head>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error - Boganto</title>
        </Head>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-4">{error}</h2>
            <p className="text-navy-600 mb-6">The blog post you're looking for might have been moved or deleted.</p>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!blog) {
    return null
  }

  const defaultImage = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  const readTime = calculateReadTime(blog.content)

  return (
    <>
      <Head>
        <title>{blog.title} - Boganto</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.title} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.featured_image || defaultImage} />
        <meta property="article:published_time" content={blog.created_at} />
        <meta property="article:author" content="Boganto" />
        {blog.tags && blog.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag.trim()} />
        ))}
        <link rel="canonical" href={`https://boganto.com/blog/${blog.slug}`} />
      </Head>

      <div className="min-h-screen" style={{ backgroundColor: '#f7fafc' }}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-lg" style={{
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                }}></div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    <span style={{ color: '#f97316' }}>Bo</span>ganto
                  </h1>
                  <p className="text-xs text-gray-500">Premium Bookstore</p>
                </div>
              </div>
              <nav className="flex items-center space-x-6 text-sm text-gray-600">
                <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                <Link href="/" className="hover:text-gray-900 transition-colors">Articles</Link>
                <Link href="/admin" className="hover:text-gray-900 transition-colors">About</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Blog Post Article */}
          <article className="bg-white rounded-xl p-9 shadow-sm" style={{ 
            boxShadow: '0 6px 18px rgba(15,23,42,0.06)' 
          }}>
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <strong className="text-gray-900">Literary Desk</strong>
                </div>
                <div>•</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{utils.formatDate(blog.created_at)}</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{readTime} min read</span>
                </div>
              </div>

              {/* Hero Image */}
              <div className="mt-6 mb-6">
                <div 
                  className="w-full h-56 rounded-lg border bg-gradient-to-b from-blue-50 to-green-50"
                  style={{
                    backgroundImage: blog.featured_image ? `url(${blog.featured_image})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {!blog.featured_image && (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-sm">Featured Image Placeholder</span>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: processContent(blog.content) }}
              />

              {/* Blockquote Styling */}
              <style jsx>{`
                .prose blockquote {
                  margin: 2rem 0;
                  padding: 1rem 1.5rem;
                  border-left: 4px solid #7c3aed;
                  background-color: #fafafa;
                  color: #374151;
                  border-radius: 6px;
                  font-style: italic;
                }
                .prose h2 {
                  font-size: 1.5rem;
                  margin-top: 3rem;
                  margin-bottom: 1rem;
                  color: #111827;
                  font-weight: 600;
                }
                .prose h3 {
                  font-size: 1.25rem;
                  margin-top: 2rem;
                  margin-bottom: 0.75rem;
                  color: #111827;
                  font-weight: 600;
                }
                .prose p {
                  margin-bottom: 1.5rem;
                  line-height: 1.75;
                }
              `}</style>
            </div>

            {/* Article Actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <Link 
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Read more posts
                </Link>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <footer className="mt-8 pt-4 text-sm text-gray-500 border-t border-gray-100">
              <div>Published by Boganto Literary</div>
            </footer>
          </article>

          {/* Related Books Sidebar */}
          {relatedBooks.length > 0 && (
            <aside className="mt-12">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-orange-500 text-white px-6 py-4">
                  <h3 className="text-lg font-semibold">Related Books</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedBooks.map((book) => (
                      <div key={book.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-18 bg-gray-200 rounded flex-shrink-0 shadow-sm"></div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-tight">
                            {book.title}
                          </h4>
                          {book.price && (
                            <p className="text-sm font-semibold text-orange-500">{book.price}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Simple Feedback Section */}
          <section className="mt-12 text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Was this article helpful?</h3>
              
              {feedback ? (
                <div className="p-4 bg-gray-50 rounded-lg text-teal-600 font-medium">
                  Thank you for your feedback! 
                  {feedback === 'yes' ? ' We\'re glad you found it helpful.' : ' We\'ll work on improving our content.'}
                </div>
              ) : (
                <div className="flex justify-center gap-4 mb-4">
                  <button
                    onClick={() => handleFeedback('yes')}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-500 hover:text-white transition-all"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    Yes, helpful
                  </button>
                  <button
                    onClick={() => handleFeedback('no')}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-all"
                  >
                    <ThumbsDown className="w-5 h-5" />
                    No, not helpful
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

// Use SSR for blog posts to avoid build issues
export async function getServerSideProps({ params }) {
  return {
    props: {
      blog: null,
      relatedArticles: []
    }
  }
}

export default BlogDetailPage