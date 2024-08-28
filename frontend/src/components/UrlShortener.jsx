import React from 'react';

function URLShortener() {

const [url, setUrl] = React.useState('')
const [shortenedUrl, setShortenedUrl] = React.useState(0)

  const handleShortenURL= async (event) => {
    console.log("URL: ", url)
            fetch()

            try {
                const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/shorturl`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ url: url }),
                });
          
                const result = await response.json();

                if (result.error) throw Error(result.error)

                setShortenedUrl(result.short_url)
                console.log(result);
                // You can handle the response here, such as displaying the shortened URL
              } catch (error) {
                console.error('Error:', error);
                setShortenedUrl(-1)
              }
  } 
  
  
  return (
    <div className="">
     

        <div className="mt-6 w-4/12 mx-auto">

        <h1 className="text-3xl font-bold mt-32">URL Shortener Microservice</h1>
        
           <div className="flex gap-2 mt-8">
           <label className="input input-bordered flex items-center w-full">
              <input
                type="text"
                className="grow"
                name="url_input"
                id="url_input"
                onChange={(event) => setUrl(event.target.value)}
                autoComplete="url"
                placeholder="URL e.g https://wikipedia.com"
              />
             
            
            </label>
            <button 
            
            onClick={handleShortenURL}
            className="btn btn-primary ">
              Shorten
            </button>
           </div>
          


            {shortenedUrl > 0 && <div target="_blank" href="" className="bg-green-100 mt-6 py-3">Result: <a target="_blank" className="underline"  href={`${import.meta.env.VITE_API_ENDPOINT}/api/shorturl/${shortenedUrl}`}>{import.meta.env.VITE_API_ENDPOINT}/api/shorturl/{shortenedUrl}</a></div> }
            {shortenedUrl == -1 && <p className="text-red-500 mt-4">Error: Couldnt shorten the URL</p>}
        </div>
    </div>
  );
}

export default URLShortener;
