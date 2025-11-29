import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  articlesPerPage = 6 
}) => {
  // Generate page numbers array with ellipsis
  const generatePageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5 // Number of pages to show around current page
    
    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page
      pages.push(1)
      
      // Determine range around current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)
      
      // Add ellipsis before if needed
      if (startPage > 2) {
        pages.push('...')
      }
      
      // Add pages around current
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      
      // Add ellipsis after if needed
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      
      // Show last page
      pages.push(totalPages)
    }
    
    return pages
  }

  const pages = generatePageNumbers()
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePageClick = (page) => {
    if (typeof page === 'number') {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex items-center gap-2 sm:gap-4 px-4 py-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-navy-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm font-medium">Previous</span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-2">
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 sm:px-3 py-2 text-navy-400 text-sm sm:text-base"
                >
                  …
                </span>
              )
            }

            const isActive = page === currentPage

            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`min-w-[2.5rem] sm:min-w-[2.75rem] h-10 flex items-center justify-center rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-navy-700 border-2 border-navy-700 shadow-sm'
                    : 'text-navy-600 hover:bg-gray-50 border border-transparent'
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-gray-200"></div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-navy-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          title="Next page"
        >
          <span className="hidden sm:inline text-sm font-medium">Next</span>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  )
}

export default Pagination
