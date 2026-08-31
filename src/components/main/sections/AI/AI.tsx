import React from 'react'
import "./ai.css";
import Image from 'next/image';
import { siteData } from "./data";

function AI() {
  return (
    <div>
      <section id="ai" className="ai">
        <div className="section-header">
          <div className="section-header-badge">
            <div className="section-header-badge-text">
              {siteData.ai.badgeText}
            </div>
          </div>
          <h2 className="section-header-title section-header-title-h2">
            <div className="section-header-title-desktop">
              <span>{siteData.ai.titleDesktop}</span>
            </div>
            <div className="section-header-title-mobile">
              {siteData.ai.titleMobile.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
          </h2>
          <p className="section-header-description">
            {siteData.ai.description}
          </p>
        </div>

        <div className="ai-background-wrapper">
          <div className="ai-background">
            <div className="rising-stars">
              <div style={{ height: '1px', width: '1px' }}></div>
              <div style={{ height: '2px', width: '2px' }}></div>
              <div style={{ height: '1px', width: '1px' }}></div>
            </div>

            <img src="/assets/ai_bg2.png" height="1" width="1" alt="" className="lazy-image" />

            <div className="ai-showcase">
              <div className="ai-showcase-outer-starlights">
                <div className="ai-showcase-outer-starlight"></div>
                <div className="ai-showcase-outer-starlight"></div>
                <div className="ai-showcase-outer-starlight"></div>
                <div className="ai-showcase-outer-starlight"></div>
                <div className="ai-showcase-outer-starlight"></div>
              </div>
              <div className="ai-showcase-inner">
                <div className="ai-showcase-inner-starlight"></div>
                <div className="ai-showcase-inner-starlight"></div>
                <div className="ai-showcase-title">{siteData.ai.showcase.title}</div>
                <div className="ai-showcase-text">
                  <span className="dot"></span>
                  <div>
                    {siteData.ai.showcase.text}
                  </div>
                </div>
                <button aria-label="Click to see AI magic" className="ai-showcase-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.75 13C14 13 14 7.75 14 7.75C14 7.75 14 13 18.25 13C14 13 14 18.25 14 18.25C14 18.25 14 13 9.75 13Z" fill="#fa5fff" />
                    <path d="M5.75 8C8 8 8 5.75 8 5.75C8 5.75 8 8 10.25 8C8 8 8 10.25 8 10.25C8 10.25 8 8 5.75 8Z" fill="#fa5fff" />
                    <path d="M7.75 16.25H7.76M18.25 5.75H18.26M18.25 18.25H18.26M14 7.75C14 7.75 14 13 9.75 13C14 13 14 18.25 14 18.25C14 18.25 14 13 18.25 13C14 13 14 7.75 14 7.75ZM8 5.75C8 5.75 8 8 5.75 8C8 8 8 10.25 8 10.25C8 10.25 8 8 10.25 8C8 8 8 5.75 8 5.75Z" stroke="#fa5fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="ai-showcase-button-text">{siteData.ai.showcase.buttonText}</div>
                </button>
              </div>
                
            <div className="ai-showcase-animation">
              <div className="ai-showcase-animation-text-selection"></div>

              <div className="ai-showcase-animation-tooltip">
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18C8.89543 18 8 17.1046 8 16V8C8 6.89543 8.89543 6 10 6H12.4114C13.2219 6 13.898 6.13086 14.4396 6.39258C14.9811 6.6543 15.3882 7.01758 15.6608 7.48242C15.9333 7.94336 16.0696 8.47461 16.0696 9.07617C16.0696 9.54492 15.9835 9.95703 15.8114 10.3125C15.6392 10.6641 15.4025 10.9531 15.1013 11.1797C14.8036 11.4023 14.4629 11.5605 14.0791 11.6543V11.7715C14.4987 11.791 14.8915 11.9199 15.2573 12.1582C15.6267 12.3965 15.9262 12.7305 16.1557 13.1602C16.3852 13.5859 16.5 14.0938 16.5 14.6836C16.5 15.3203 16.3547 15.8887 16.0642 16.3887C15.7773 16.8848 15.3523 17.2773 14.7892 17.5664C14.2262 17.8555 13.3916 18 12.5667 18H10ZM10 15.9258H12.3832C13.0324 15.9258 13.5058 15.791 13.8035 15.5215C14.1012 15.248 14.25 14.8848 14.25 14.4316C14.25 14.0996 14.1765 13.8066 14.0294 13.5527C13.8824 13.2988 13.6726 13.0996 13.4 12.9551C13.131 12.8105 12.81 12.7383 12.437 12.7383H10V15.9258ZM10 11.0215H12.2111C12.5303 11.0215 12.8136 10.9609 13.0611 10.8398C13.3121 10.7148 13.5094 10.5391 13.6528 10.3125C13.7999 10.0859 13.8734 9.81445 13.8734 9.49805C13.8734 9.06445 13.7318 8.71484 13.4484 8.44922C13.1687 8.18359 12.7706 8.05078 12.2541 8.05078H10V11.0215Z" fill="white" fillOpacity="0.12" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.25 6.75L10.75 17.25M13.25 6.75H10.75M13.25 6.75H15.25M10.75 17.25H8.75M10.75 17.25H13.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.75 7.65909L7.18182 9.25C7.81818 6.54545 9.25 5.75 9.25 5.75" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.75 16.6591L7.18182 18.25C7.81818 15.5455 9.25 14.75 9.25 14.75" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.75 7.75H18.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.75 16.25H18.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.75 7.75V12.25M5.75 16.25V12.25M11.25 7.75V12.25M11.25 16.25V12.25M5.75 12.25H11.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.75 11.25L16.25 9.75V16.25M16.25 16.25H14.75M16.25 16.25H18.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.75 7.75V12.25M5.75 16.25V12.25M11.25 7.75V12.25M11.25 16.25V12.25M5.75 12.25H11.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.25 16.25H14.75V16.1221C14.75 15.566 14.9816 15.035 15.3891 14.6566L17.3155 12.8677C17.9114 12.3144 18.25 11.538 18.25 10.7248V10.7248C18.25 10.1864 17.8136 9.75 17.2752 9.75H15.75C15.1977 9.75 14.75 10.1977 14.75 10.75V11.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.75 16.25V15.75C5.75 15.1977 6.19772 14.75 6.75 14.75H7.25C7.80228 14.75 8.25 15.1977 8.25 15.75V16.25C8.25 16.8023 7.80228 17.25 7.25 17.25H6.75C6.19772 17.25 5.75 16.8023 5.75 16.25Z" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.75 8.25V7.75C5.75 7.19772 6.19772 6.75 6.75 6.75H7.25C7.80228 6.75 8.25 7.19772 8.25 7.75V8.25C8.25 8.80228 7.80228 9.25 7.25 9.25H6.75C6.19772 9.25 5.75 8.80228 5.75 8.25Z" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.75 7.75H18.25" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 16.25H18.5" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7093 6.25089C13.3771 4.58304 16.0812 4.58303 17.7491 6.25089C19.417 7.91875 19.417 10.6229 17.7491 12.2907L16.2595 13.7803C15.9666 14.0732 15.4917 14.0732 15.1989 13.7803C14.906 13.4874 14.906 13.0126 15.1989 12.7197L16.6884 11.2301C17.7705 10.148 17.7705 8.39362 16.6884 7.31155C15.6064 6.22948 13.852 6.22948 12.7699 7.31155L11.2803 8.80115C10.9874 9.09404 10.5126 9.09404 10.2197 8.80115C9.92678 8.50825 9.92678 8.03338 10.2197 7.74049L11.7093 6.25089ZM14.7803 9.21967C15.0732 9.51256 15.0732 9.98744 14.7803 10.2803L10.2803 14.7803C9.98744 15.0732 9.51256 15.0732 9.21967 14.7803C8.92678 14.4874 8.92678 14.0126 9.21967 13.7197L13.7197 9.21967C14.0126 8.92678 14.4874 8.92678 14.7803 9.21967ZM8.80115 10.2197C9.09404 10.5126 9.09404 10.9874 8.80115 11.2803L7.31155 12.7699C6.22948 13.852 6.22948 15.6064 7.31155 16.6884C8.39362 17.7705 10.148 17.7705 11.2301 16.6884L12.7197 15.1989C13.0126 14.906 13.4874 14.906 13.7803 15.1989C14.0732 15.4917 14.0732 15.9666 13.7803 16.2595L12.2907 17.7491C10.6229 19.417 7.91875 19.417 6.25089 17.7491C4.58303 16.0812 4.58304 13.3771 6.25089 11.7093L7.74049 10.2197C8.03338 9.92678 8.50825 9.92678 8.80115 10.2197Z" fill="white" fillOpacity="0.12" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-tooltip-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.75 13C14 13 14 7.75 14 7.75C14 7.75 14 13 18.25 13C14 13 14 18.25 14 18.25C14 18.25 14 13 9.75 13Z" fill="url(#paint0_linear_111_26671)" />
                    <path d="M5.75 8C8 8 8 5.75 8 5.75C8 5.75 8 8 10.25 8C8 8 8 10.25 8 10.25C8 10.25 8 8 5.75 8Z" fill="url(#paint1_linear_111_26671)" />
                    <path d="M7.75 16.25H7.76M18.25 5.75H18.26M18.25 18.25H18.26M14 7.75C14 7.75 14 13 9.75 13C14 13 14 18.25 14 18.25C14 18.25 14 13 18.25 13C14 13 14 7.75 14 7.75ZM8 5.75C8 5.75 8 8 5.75 8C8 8 8 10.25 8 10.25C8 10.25 8 8 10.25 8C8 8 8 5.75 8 5.75Z" stroke="url(#paint2_linear_111_26671)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="paint0_linear_111_26671" x1="12.005" y1="5.75" x2="12.005" y2="18.25" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9382FF" />
                        <stop offset="1" stopColor="#D782FF" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_111_26671" x1="12.005" y1="5.75" x2="12.005" y2="18.25" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9382FF" />
                        <stop offset="1" stopColor="#D782FF" />
                      </linearGradient>
                      <linearGradient id="paint2_linear_111_26671" x1="12.005" y1="5.75" x2="12.005" y2="18.25" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9382FF" />
                        <stop offset="1" stopColor="#D782FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="ai-showcase-animation-menu">
                <div className="ai-showcase-animation-menu-item">
                  <div className="ai-showcase-animation-menu-input">{siteData.ai.menu.input}</div>
                </div>
                <div className="ai-showcase-animation-menu-item">
                  <div className="ai-showcase-animation-menu-category">{siteData.ai.menu.category}</div>
                </div>
                <div className="ai-showcase-animation-menu-item">
                  <div className="ai-showcase-animation-menu-recommended">{siteData.ai.menu.recommended}</div>
                </div>
              </div>

              <div className="ai-showcase-animation-answer">
                <div className="ai-showcase-animation-answer-heading">
                  <div className="ai-showcase-animation-answer-title">{siteData.ai.menu.recommended}</div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.25 10.75L12 14.25L8.75 10.75" stroke="white" strokeOpacity="0.32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ai-showcase-animation-answer-body">
                  <div className="ai-showcase-animation-answer-body-inner"></div>
                </div>
                <div className="ai-showcase-animation-answer-footer">
                  <div>
                    <button disabled className="ai-showcase-animation-answer-button ai-showcase-animation-answer-button-re-run">
                      Re-run<div className="ai-showcase-animation-answer-button-shortcut">R</div>
                    </button>
                    <button disabled className="ai-showcase-animation-answer-button ai-showcase-animation-answer-button-insert">
                      Insert<div className="ai-showcase-animation-answer-button-shortcut">I</div>
                    </button>
                    <button disabled className="ai-showcase-animation-answer-button ai-showcase-animation-answer-button-copy">
                      Copy<div className="ai-showcase-animation-answer-button-shortcut">C</div>
                    </button>
                  </div>
                  <div>
                    <button className="ai-showcase-animation-answer-button">
                      Replace<div className="ai-showcase-animation-answer-button-shortcut">⌘↩</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


        <div className="ai-cards">
        <div className="section-header">
          <h3 className="section-header-title section-header-title-h5">
            <div className="section-header-title-desktop">
              <span>{siteData.ai.cardsTitleDesktop}</span>
            </div>
            <div className="section-header-title-mobile">
              {siteData.ai.cardsTitleMobile.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
          </h3>
        </div>
        <div className="ai-cards-items">
          <div className="ai-cards-item">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.0032 25.9992V34.3992M20.0032 25.9992C23.5565 25.9992 26.659 24.0687 28.3189 21.1992M20.0032 25.9992C16.4498 25.9992 13.3474 24.0687 11.6875 21.1992M14.0029 34.3992L26.0029 34.3992" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="14" y="5.59961" width="12" height="16.8" rx="6" fill="url(#paint0_linear_120_26933)" fillOpacity="0.2" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M24 14.5294H23L22.4 13.2353L21.5 15L20 13L19.1 15L17.9 13.4706L17 14.6471H16" stroke="#0a84ff" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_120_26933" x1="20" y1="5.59961" x2="20" y2="22.3996" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a84ff" stopOpacity="0" />
                  <stop offset="1" stopColor="#0a84ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ai-cards-item-title">{siteData.ai.cards[0].title}</div>
            <div className="ai-cards-item-description">{siteData.ai.cards[0].description}</div>
          </div>
          <div className="ai-cards-item">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31 8V25V32C31 32.7956 30.6839 33.5587 30.1213 34.1213C29.5587 34.6839 28.7956 35 28 35H12C11.2044 35 10.4413 34.6839 9.87868 34.1213C9.31607 33.5587 9 32.7956 9 32V8C9 7.20435 9.31607 6.44129 9.87868 5.87868C10.4413 5.31607 11.2044 5 12 5H28C28.7956 5 29.5587 5.31607 30.1213 5.87868C30.6839 6.44129 31 7.20435 31 8Z" fill="url(#paint0_linear_120_26919)" fillOpacity="0.15" />
              <path d="M24 5L16 5M28 5C28.7957 5 29.5587 5.31607 30.1213 5.87868C30.6839 6.44129 31 7.20435 31 8L31 32C31 32.7957 30.6839 33.5587 30.1213 34.1213C29.5587 34.6839 28.7956 35 28 35L12 35C11.2044 35 10.4413 34.6839 9.87868 34.1213C9.31607 33.5587 9 32.7956 9 32L9 8C9 7.20435 9.31607 6.44129 9.87868 5.87868C10.4413 5.31607 11.2044 5 12 5" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path opacity="0.4" d="M13 12L15 10L17 12L19 11L20 12H27" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path opacity="0.6" d="M13 16H27" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 20H27" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 28.25C16.25 28.25 16.25 26 16.25 26C16.25 26 16.25 28.25 18.5 28.25C16.25 28.25 16.25 30.5 16.25 30.5C16.25 30.5 16.25 28.25 14 28.25Z" fill="#0a84ff" />
              <path d="M26.5 26H26.51M16.25 26C16.25 26 16.25 28.25 14 28.25C16.25 28.25 16.25 30.5 16.25 30.5C16.25 30.5 16.25 28.25 18.5 28.25C16.25 28.25 16.25 26 16.25 26Z" stroke="#0a84ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_120_26919" x1="20" y1="5" x2="20" y2="35" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a84ff" stopOpacity="0" />
                  <stop offset="1" stopColor="#0a84ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ai-cards-item-title">{siteData.ai.cards[1].title}</div>
            <div className="ai-cards-item-description">{siteData.ai.cards[1].description}</div>
          </div>
          <div className="ai-cards-item">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.1213 6.87868C30.6839 7.44129 31 8.20435 31 9V21.5V22.2899C30.3663 22.1013 29.695 22 29 22C25.134 22 22 25.134 22 29C22 30.9587 22.8045 32.7295 24.101 34H19H12C11.2044 34 10.4413 33.6839 9.87868 33.1213C9.31607 32.5587 9 31.7956 9 31V9C9 8.20435 9.31607 7.44129 9.87868 6.87868C10.4413 6.31607 11.2044 6 12 6H28C28.7956 6 29.5587 6.31607 30.1213 6.87868Z" fill="url(#paint0_linear_120_26910)" fillOpacity="0.15" />
              <path d="M31 18V9C31 8.20435 30.6839 7.44129 30.1213 6.87868C29.5587 6.31607 28.7956 6 28 6H12C11.2044 6 10.4413 6.31607 9.87868 6.87868C9.31607 7.44129 9 8.20435 9 9V31C9 31.7956 9.31607 32.5587 9.87868 33.1213C10.4413 33.6839 11.2044 34 12 34H19" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M36 29C36 30.7135 35.3843 32.2832 34.3621 33.5C33.078 35.0285 31.1525 36 29 36C25.134 36 22 32.866 22 29C22 25.134 25.134 22 29 22C32.866 22 36 25.134 36 29Z" fill="url(#paint1_linear_120_26910)" fillOpacity="0.15" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 17V15H27V17H13Z" fill="#0a84ff" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path opacity="0.4" d="M13 11H27" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path opacity="0.4" d="M13 21H20" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26 29L28 31L32 27" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_120_26910" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a84ff" stopOpacity="0" />
                  <stop offset="1" stopColor="#0a84ff" />
                </linearGradient>
                <linearGradient id="paint1_linear_120_26910" x1="29" y1="22" x2="29" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a84ff" stopOpacity="0" />
                  <stop offset="1" stopColor="#0a84ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ai-cards-item-title">{siteData.ai.cards[2].title}</div>
            <div className="ai-cards-item-description">{siteData.ai.cards[2].description}</div>
          </div>
          <div className="ai-cards-item">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5H32C32.7956 5 33.5587 5.31607 34.1213 5.87868C34.6839 6.44129 35 7.20435 35 8V27C35 27.7956 34.6839 28.5587 34.1213 29.1213C33.5587 29.6839 32.7956 30 32 30H26.7101C26.8987 29.3663 27 28.695 27 28C27 24.134 23.866 21 20 21C16.134 21 13 24.134 13 28C13 28.695 13.1013 29.3663 13.2899 30H8C7.20435 30 6.44129 29.6839 5.87868 29.1213C5.31607 28.5587 5 27.7956 5 27V8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5Z" fill="url(#paint0_linear_120_26891)" fillOpacity="0.15" />
              <path d="M8 30C7.20435 30 6.44129 29.6839 5.87868 29.1213C5.31607 28.5587 5 27.7956 5 27V8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5H32C32.7956 5 33.5587 5.31607 34.1213 5.87868C34.6839 6.44129 35 7.20435 35 8V27C35 27.7956 34.6839 28.5587 34.1213 29.1213C33.5587 29.6839 32.7956 30 32 30" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <g opacity="0.6">
                <path d="M25.5258 16.5791C25.9986 16.8597 26.5351 17 27.1354 17C27.5149 17 27.8663 16.9451 28.1898 16.8353C28.5164 16.7224 28.8041 16.5654 29.0529 16.3641C29.3048 16.1597 29.5117 15.9187 29.6734 15.6412C29.8352 15.3606 29.944 15.051 30 14.7124H28.9456C28.899 14.932 28.8196 15.1257 28.7077 15.2935C28.5988 15.4582 28.4635 15.5985 28.3018 15.7144C28.14 15.8303 27.9612 15.9172 27.7653 15.9752C27.5693 16.0331 27.3625 16.0621 27.1448 16.0621C26.7466 16.0621 26.3889 15.9645 26.0717 15.7693C25.7544 15.5741 25.5041 15.2874 25.3206 14.9092C25.1371 14.5279 25.0453 14.0597 25.0453 13.5046C25.0453 12.9525 25.1371 12.4858 25.3206 12.1046C25.5041 11.7203 25.7544 11.4305 26.0717 11.2353C26.3889 11.037 26.7466 10.9379 27.1448 10.9379C27.3656 10.9379 27.574 10.9684 27.7699 11.0294C27.969 11.0874 28.1478 11.1758 28.3064 11.2948C28.4682 11.4107 28.6035 11.554 28.7123 11.7248C28.8243 11.8926 28.9021 12.0878 28.9456 12.3105H30C29.9409 11.9475 29.8274 11.6227 29.6594 11.3359C29.4946 11.0492 29.2846 10.8068 29.0296 10.6085C28.7745 10.4102 28.4853 10.2593 28.1618 10.1556C27.8415 10.0519 27.4993 10 27.1354 10C26.5382 10 26.0033 10.1403 25.5305 10.4209C25.0577 10.7015 24.6861 11.1041 24.4155 11.6288C24.1449 12.1503 24.0096 12.7756 24.0096 13.5046C24.0096 14.2275 24.1433 14.8512 24.4108 15.3758C24.6814 15.8974 25.0531 16.2985 25.5258 16.5791Z" fill="#0a84ff" />
                <path fillRule="evenodd" clipRule="evenodd" d="M11.75 15.1013L11.115 16.9085H10L12.5053 10.0915H13.7137L16.2097 16.9085H15.0993L14.4614 15.1013H11.75ZM13.1305 11.3314L14.1577 14.2412H12.0522L13.0745 11.3314H13.1305Z" fill="#0a84ff" />
                <path fillRule="evenodd" clipRule="evenodd" d="M21.5886 16.666C21.2433 16.8277 20.8001 16.9085 20.2589 16.9085H17.595V10.0915H20.147C20.6384 10.0915 21.0458 10.1708 21.3693 10.3294C21.6928 10.488 21.9338 10.7031 22.0925 10.9745C22.2542 11.2429 22.3351 11.5449 22.3351 11.8804C22.3351 12.1641 22.2806 12.4035 22.1718 12.5987C22.066 12.7939 21.9245 12.9495 21.7472 13.0654C21.5699 13.1813 21.3755 13.2667 21.164 13.3216V13.3856C21.3942 13.3978 21.6197 13.471 21.8405 13.6052C22.0613 13.7394 22.2433 13.9301 22.3864 14.1771C22.5326 14.4211 22.6056 14.72 22.6056 15.0739C22.6056 15.4216 22.5217 15.7342 22.3537 16.0118C22.1889 16.2863 21.9338 16.5044 21.5886 16.666ZM20.9261 14.0033C20.7208 13.8965 20.4798 13.8431 20.2029 13.8431H18.6447V16.0301H20.1563C20.6602 16.0301 21.021 15.934 21.2387 15.7418C21.4564 15.5497 21.5653 15.3102 21.5653 15.0235C21.5653 14.807 21.5093 14.6102 21.3973 14.4333C21.2884 14.2534 21.1314 14.11 20.9261 14.0033ZM21.0007 11.2582C20.8017 11.066 20.4953 10.9699 20.0816 10.9699H18.6447V13.0425H20.0537C20.2869 13.0425 20.4984 12.9983 20.6882 12.9098C20.8779 12.8214 21.0272 12.6963 21.136 12.5346C21.248 12.3699 21.304 12.1793 21.304 11.9627C21.304 11.6821 21.2029 11.4473 21.0007 11.2582Z" fill="#0a84ff" />
              </g>
              <path d="M27 28C27 29.7135 26.3843 31.2832 25.3621 32.5C24.078 34.0285 22.1525 35 20 35C16.134 35 13 31.866 13 28C13 24.134 16.134 21 20 21C23.866 21 27 24.134 27 28Z" fill="url(#paint1_linear_120_26891)" fillOpacity="0.15" />
              <path d="M25.3621 32.5C26.3843 31.2832 27 29.7135 27 28C27 24.134 23.866 21 20 21C16.134 21 13 24.134 13 28C13 31.866 16.134 35 20 35C22.1525 35 24.078 34.0285 25.3621 32.5ZM25.3621 32.5L28.8621 36" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 28L19 30L23 26" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_120_26891" x1="20" y1="5" x2="20" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a84ff" stopOpacity="0" />
                  <stop offset="1" stopColor="#0a84ff" />
                </linearGradient>
                <linearGradient id="paint1_linear_120_26891" x1="20" y1="21" x2="20" y2="35" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a84ff" stopOpacity="0" />
                  <stop offset="1" stopColor="#0a84ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ai-cards-item-title">{siteData.ai.cards[3].title}</div>
            <div className="ai-cards-item-description">{siteData.ai.cards[3].description}</div>
          </div>
          <div className="ai-cards-item">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9H13C13.5523 9 14 9.44772 14 10V14C14 14.5523 14.4477 15 15 15H21C21.5523 15 22 14.5523 22 14V10C22 9.44772 22.4477 9 23 9H25L29.8284 13.8284C30.5786 14.5786 31 15.596 31 16.6569V28C31 28.7956 30.6839 29.5587 30.1213 30.1213C29.5587 30.6839 28.7956 31 28 31H12C10.3431 31 9 29.6569 9 28V12C9 11.2044 9.31607 10.4413 9.87868 9.87868Z" fill="url(#paint0_linear_120_26898)" fillOpacity="0.15" />
              <path d="M9 18V12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9H13C13.5523 9 14 9.44772 14 10V14C14 14.5523 14.4477 15 15 15H21C21.5523 15 22 14.5523 22 14V10C22 9.44772 22.4477 9 23 9H24.1716C24.702 9 25.2107 9.21071 25.5858 9.58579L29.8284 13.8284C30.5786 14.5786 31 15.596 31 16.6569V21V28C31 28.7956 30.6839 29.5587 30.1213 30.1213C29.5587 30.6839 28.7956 31 28 31H23" stroke="#0a84ff" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 29.25C13.25 29.25 13.25 24 13.25 24C13.25 24 13.25 29.25 17.5 29.25C13.25 29.25 13.25 34.5 13.25 34.5C13.25 34.5 13.25 29.25 9 29.25Z" fill="#0a84ff" />
              <path d="M5 24.25C7.25 24.25 7.25 22 7.25 22C7.25 22 7.25 24.25 9.5 24.25C7.25 24.25 7.25 26.5 7.25 26.5C7.25 26.5 7.25 24.25 5 24.25Z" fill="#0a84ff" />
              <path d="M7 32.5H7.01M17.5 22H17.51M17.5 34.5H17.51M13.25 24C13.25 24 13.25 29.25 9 29.25C13.25 29.25 13.25 34.5 13.25 34.5C13.25 34.5 13.25 29.25 17.5 29.25C13.25 29.25 13.25 24 13.25 24ZM7.25 22C7.25 22 7.25 24.25 5 24.25C7.25 24.25 7.25 22 7.25 22C7.25 22 7.25 24.25 9.5 24.25C7.25 24.25 7.25 26.5 7.25 26.5C7.25 26.5 7.25 24.25 5 24.25Z" stroke="#0a84ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect opacity="0.4" x="18" y="9" width="2" height="4" rx="0.5" fill="#0a84ff" />
              <defs>
                <linearGradient id="paint0_linear_120_26898" x1="20" y1="9" x2="20" y2="31" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0a84ff" stopOpacity="0" />
                  <stop offset="1" stopColor="#0a84ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="ai-cards-item-title">{siteData.ai.cards[4].title}</div>
            <div className="ai-cards-item-description">{siteData.ai.cards[4].description}</div>
          </div>
        </div>
      </div>
    </section>
</div>
  );
}

export default AI;
