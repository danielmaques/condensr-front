"use client";

import PageIllustration from "@/components/page-illustration";
import Avatar01 from "@/public/images/avatar-01.jpg";
import Avatar02 from "@/public/images/avatar-02.jpg";
import Avatar03 from "@/public/images/avatar-03.jpg";
import Avatar04 from "@/public/images/avatar-04.jpg";
import Avatar05 from "@/public/images/avatar-05.jpg";
import Avatar06 from "@/public/images/avatar-06.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroHome() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formFocused, setFormFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setShortUrl(`condensr.app/${alias || 'random-' + Math.random().toString(36).substring(2, 8)}`);
      setIsProcessing(false);
    }, 800);
  };

  const resetForm = () => {
    setShortUrl("");
    setUrl("");
    setAlias("");
    setCopySuccess(false);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shortUrl}`);
    setCopySuccess(true);
    
    // Reset copy success message after 2 seconds
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };
  
  // Reset form focus state when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setFormFocused(false);
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="mb-6 border-y [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]"
              data-aos="zoom-y-out"
            >
              <div className="-mx-0.5 flex justify-center -space-x-3">
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar01}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar02}
                  width={32}
                  height={32}
                  alt="Avatar 01"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar03}
                  width={32}
                  height={32}
                  alt="Avatar 02"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar04}
                  width={32}
                  height={32}
                  alt="Avatar 03"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar05}
                  width={32}
                  height={32}
                  alt="Avatar 04"
                />
                <Image
                  className="box-content rounded-full border-2 border-gray-50"
                  src={Avatar06}
                  width={32}
                  height={32}
                  alt="Avatar 05"
                />
              </div>
            </div>
            <h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Intelligent links for <br className="max-lg:hidden" />
              extraordinary results
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Condensr is an advanced URL shortening platform powered by AI
                that revolutionizes how companies manage, analyze and optimize their links.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#0"
                  >
                    <span className="relative inline-flex items-center">
                      Start For Free{" "}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero image - Interactive link shortener */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className={`relative rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 ${formFocused ? 'shadow-blue-100' : ''}`}
                 onMouseDown={(e) => {
                   e.stopPropagation();
                   setFormFocused(true);
                 }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Try it now
              </div>

              {shortUrl ? (
                <div className="text-center space-y-5 py-4">
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg inline-flex items-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg font-medium">Link shortened successfully!</span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                    <p className="text-gray-700 text-base mb-3 font-medium">Your shortened URL:</p>
                    <div className="flex shadow-sm rounded-lg overflow-hidden">
                      <input 
                        type="text"
                        value={`https://${shortUrl}`}
                        readOnly
                        className="flex-grow bg-white border-2 border-r-0 border-blue-200 rounded-l-lg py-3 px-4 text-blue-600 font-medium text-center focus:outline-none"
                      />
                      <button
                        onClick={handleCopy}
                        className={`${copySuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-r-lg px-6 transition-colors duration-300 flex items-center justify-center min-w-[120px]`}
                      >
                        {copySuccess ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-amber-600 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        This link is valid for 7 days
                      </p>
                      <div className="text-blue-600 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Track statistics
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={resetForm}
                    className="mt-5 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-200 font-medium rounded-lg px-6 py-3 transition-colors inline-flex items-center group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Create another link
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 py-4">
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                      Enter the URL you want to shorten
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        id="url"
                        placeholder="https://example.com/your-long-url"
                        className="w-full border-2 border-gray-200 rounded-lg py-3 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                      Customize link (optional)
                    </label>
                    <div className="flex shadow-sm rounded-lg overflow-hidden">
                      <span className="inline-flex items-center px-4 rounded-l-md border-2 border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                        condensr.app/
                </span>
                      <input
                        type="text"
                        id="alias"
                        placeholder="my-link"
                        className="flex-1 min-w-0 block w-full border-2 border-gray-200 rounded-r-lg py-3 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-1">If left blank, a random alias will be generated</p>
                  </div>
                  
                  <div className="pt-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <p className="text-amber-600 text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Links valid for 7 days
                      </p>
                      <button
                        type="submit"
                        disabled={isProcessing || !url}
                        className={`${
                          isProcessing || !url 
                            ? 'bg-blue-300 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white rounded-lg px-6 py-3 font-medium transition-all duration-300 shadow-sm hover:shadow w-full sm:w-auto flex items-center justify-center`}
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Shorten URL
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
              
              <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                <div className="bg-gray-100 rounded-full h-1.5 w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
