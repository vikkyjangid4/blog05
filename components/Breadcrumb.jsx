import React from 'react';
import Link from 'next/link';

/**
 * Breadcrumb Component - Production-Ready Responsive Truncation
 * 
 * Features:
 * - Full responsive truncation with ellipsis on mobile
 * - Prevents overflow and layout breaking
 * - SEO-friendly structured markup
 * - Optimized for all mobile breakpoints (320px - 768px+)
 * - No text overflow, single-line guarantee
 * 
 * @param {Array} items - Array of breadcrumb items
 *   Each item: { label: string, href?: string, current?: boolean }
 * @example
 * <Breadcrumb 
 *   items={[
 *     { label: 'Blog', href: '/' },
 *     { label: 'Technology', href: '/category/technology' },
 *     { label: 'Your Long Article Title Here', current: true }
 *   ]}
 * />
 */
const Breadcrumb = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      className="breadcrumb-nav bg-gray-50 py-3 sm:py-4 border-b border-gray-200"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wrapper to control overflow and ensure single line */}
        <div className="breadcrumb-wrapper">
          <ol className="breadcrumb-list">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <li className="breadcrumb-item">
                  {item.href && !item.current ? (
                    <Link
                      href={item.href}
                      className="breadcrumb-link"
                    >
                      <span className="breadcrumb-text">{item.label}</span>
                    </Link>
                  ) : (
                    <span 
                      className={`breadcrumb-text ${
                        item.current 
                          ? 'breadcrumb-text--current' 
                          : 'breadcrumb-text--static'
                      }`}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                </li>
                
                {/* Separator - only render if not the last item */}
                {index < items.length - 1 && (
                  <li className="breadcrumb-separator" aria-hidden="true">/</li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
