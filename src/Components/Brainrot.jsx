import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';

//const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;    // API Key from .env file. Uncomment if you have it.
const API_KEY="fakekeyfornow"                               // Placeholder API Key for testing. Keep if you don't have .env

// List of youtube search queries. Feel free to add as many queries as you want to this.
let SEARCH_QUERIES = ["brainrot shorts", "satisfying shorts", "subway surfers brainrot", "roblox brainrot",
    "top ten cat moments shorts", "skibidi sigma rizz ohio", "AI brainrot shorts", "brainrot shorts with ai voice",
    "funny shorts", "brainrot top 10 shorts", "gen alpha humor shorts", "tiktok shorts", "instagram reels shorts",
    "funny videos from discord shorts", "funny shorts that used to be vines", "low effort brainrot shorts"]

// Randomly selects a search query in order to add shorts variety
let SEARCH_QUERY = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];

// Backup Brainrot Shorts (Video IDs)
const backups = [
    "cCT3xvpsdBQ",
    "Ayy8vG9EMFY",
    "CwawqpDLidQ",
    "NDt1nOZan9s",
    "V0sB9sGhwJw",
    "92lWmYOTWKQ",
    "NWoyK6LrZXI"
]

// Main Brainrot API Function
function Brainrot() {
    const[shortIDs, setShortIDs] = useState([]);    // Short video ID from Youtube for identification

    useEffect(() => {
        setShortIDs([]);
        const fetchShorts = async () => {
            // Gets the video data from the search query using the API
            try {
                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=7&type=video&videoDuration=short&q=${encodeURIComponent(
                    SEARCH_QUERY
                    )}&key=${API_KEY}`;
                const results = await fetch (url);
                
                // Waits for a result and stores the video IDs
                const searchResults = await results.json();
                const brainrotIDs = searchResults.items.map((item) => item.id.videoId);
                setShortIDs(brainrotIDs);
            }
            catch (error) {
                // Occurs if the API is unable to find shorts. Plays backup videos.
                console.error("Brainrot Acquisition Failed. Time to touch some grass!", error)
                setShortIDs(backups);
            }
        };
        fetchShorts();
    }, []); 

    // TBI Scrolling Shorts
    return(
        <div>
            <h2>Take a brain break!</h2>
            <Swiper
                direction={'vertical'}
                slidesPerView={1}
                style={{ height: '700px', width: '500px'}}
                pagination={{ clickable: true}}
                mousewheel={true}
                modules={[Mousewheel, Pagination]}
                >
                {shortIDs.map((id) => (
                    <SwiperSlide key={id}>
                        <iframe
                            width="450"
                            height="650"
                            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`}
                            allowFullScreen
                        />
                    </SwiperSlide>
                ))}     
            </Swiper>
        </div>

    );
};

export default Brainrot;