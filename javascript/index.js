<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RuPaul's Drag Race Simulator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Custom Styles for a more Drag-tastic feel */
        body {
            font-family: 'Inter', sans-serif;
            background-color: #1a1a1a;
            color: #f3f4f6;
            background-image: url('https://www.transparenttextures.com/patterns/glamorous.png');
        }
        .main-container {
            background-color: rgba(26, 26, 26, 0.9);
            backdrop-filter: blur(10px);
        }
        .header {
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .btn-primary {
            background: linear-gradient(to right, #da4453, #89216b);
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(218, 68, 83, 0.5);
        }
        .btn-secondary {
            background-color: #4a5568;
        }
        .btn-secondary:hover {
            background-color: #2d3748;
        }
        .queen-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .queen-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
        }
        .modal {
            background-color: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background-color: #2d2d2d;
        }
        .track-record-table {
            background-color: rgba(45, 45, 45, 0.8);
            border-collapse: separate;
            border-spacing: 0;
            overflow: hidden;
            width: 100%;
        }
        .track-record-table th, .track-record-table td {
            border: 1px solid #4a4a4a;
            padding: 8px;
            text-align: center;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #2d2d2d;
        }
        ::-webkit-scrollbar-thumb {
            background: #89216b;
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #da4453;
        }
        /* Color classes for track records */
        .tr-win { background-color: #4A90E2; color: white; font-weight: bold; }
        .tr-top2 { background-color: #2dd4bf; color: #1a1a1a; font-weight: bold; } /* Cyan for LSFYL loser */
        .tr-high { background-color: #BDE5F8; color: #1a1a1a; }
        .tr-safe { background-color: #FFFFFF; color: #1a1a1a; }
        .tr-safe-immune { background-color: #FFFFFF; color: #1a1a1a; border: 2px solid #8b5cf6 !important; }
        .tr-low { background-color: #F8C471; color: #1a1a1a; }
        .tr-btm { background-color: #F5B7B1; color: #1a1a1a; }
        .tr-elim, .tr-semi-finals { background-color: #E74C3C; color: white; font-weight: bold; }
        .tr-guest { background-color: #9E9E9E; color: white; }
        .tr-block { background-color: #7f1d1d; color: white; }
        .tr-special, .tr-choc, .tr-rtrn, .tr-star, .tr-qosdadh, .tr-star-gift { background-color: #A569BD; color: white; font-weight: bold; }
        .tr-winner { background-color: gold; color: #1a1a1a; font-weight: bold;}
        .tr-runner-up { background-color: silver; color: #1a1a1a; font-weight: bold;}
        .hide { display: none; }
        .tab-button.active {
            background-color: #89216b;
        }
    </style>
</head>
<body class="min-h-screen">

    <div id="app-container" class="main-container max-w-7xl mx-auto p-4 md:p-8 rounded-lg my-8">
        <header class="text-center mb-8">
            <h1 class="header text-4xl md:text-6xl font-bold tracking-tight">RuPaul's Drag Race Simulator</h1>
            <p class="text-gray-400 mt-2 text-lg">Shantay, you stay... and simulate!</p>
        </header>

        <main id="main-content">
            <!-- Initial Setup Screen -->
            <div id="setup-screen">
                <div class="bg-gray-800 p-6 rounded-lg shadow-2xl">
                    <h2 class="text-2xl font-semibold mb-4 text-center">Create Your Season</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label for="cast-size" class="block mb-2 text-sm font-medium text-gray-300">Number of Queens</label>
                            <input type="number" id="cast-size" class="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-2.5" value="0" min="5" max="20" readonly>
                        </div>
                        <div>
                            <label for="format" class="block mb-2 text-sm font-medium text-gray-300">Season Format</label>
                            <select id="format" class="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-2.5">
                                <option value="regular">Regular Season</option>
                                <option value="all-stars">All Stars</option>
                                <option value="lipsync-assassin">All Stars (Lipsync Assassin)</option>
                                <option value="all-winners">All Winners (max 8 queens)</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-300">Special Twists</label>
                        <div class="flex flex-wrap gap-4">
                            <label class="flex items-center">
                                <input type="checkbox" id="immunity" class="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500">
                                <span class="ml-2 text-sm text-gray-300">Immunity Twist</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" id="chocolate-bar" class="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500">
                                <span class="ml-2 text-sm text-gray-300">Golden Chocolate Bar</span>
                            </label>
                            <label class="flex items-center">
                                <input type="checkbox" id="riggory" class="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-pink-500">
                                <span class="ml-2 text-sm text-gray-300">Producer Riggory</span>
                            </label>
                        </div>
                    </div>
                     <div class="mt-6">
                        <h3 class="text-xl font-semibold mb-3">Your Cast (<span id="selected-queen-count">0</span>)</h3>
                        <div id="current-cast-display" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 min-h-[50px] p-2 bg-gray-900 rounded-lg">
                           <!-- Selected queens will be displayed here -->
                        </div>
                        <div class="flex justify-center space-x-2 my-4">
                            <button id="predefined-tab-btn" class="tab-button btn-secondary text-white font-bold py-2 px-4 rounded-full active">Predefined Casts</button>
                            <button id="search-tab-btn" class="tab-button btn-secondary text-white font-bold py-2 px-4 rounded-full">Search Queens</button>
                        </div>

                        <div id="predefined-casts-tab">
                             <div id="predefined-casts-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-80 overflow-y-auto p-2 bg-gray-900/50 rounded-lg">
                                <!-- Predefined cast buttons will be populated here -->
                             </div>
                        </div>

                        <div id="search-queens-tab" class="hidden">
                            <input type="search" id="queen-search-input" class="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-2.5 mb-2" placeholder="Search for a queen...">
                            <div id="search-results-container" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-80 overflow-y-auto p-2 bg-gray-900/50 rounded-lg">
                                <!-- Search results will appear here -->
                            </div>
                             <button id="add-random-queen-btn" class="btn-secondary text-white font-bold py-2 px-4 rounded-full text-sm mt-4">Add Random Queen</button>
                        </div>
                    </div>
                    <div class="mt-6 text-center">
                        <button id="start-simulation-btn" class="btn-primary text-white font-bold py-3 px-8 rounded-full text-lg">Start Simulation</button>
                    </div>
                </div>
            </div>

            <!-- Simulation Screen -->
            <div id="simulation-screen" class="hidden">
                 <div id="episode-content" class="bg-gray-800 p-6 rounded-lg shadow-2xl">
                     <!-- Content will be dynamically added here -->
                 </div>
                 <div class="mt-6 text-center">
                     <button id="next-episode-btn" class="btn-primary text-white font-bold py-3 px-8 rounded-full text-lg">Proceed</button>
                 </div>
            </div>
            
            <!-- Results Screen -->
            <div id="results-screen" class="hidden">
                <div class="bg-gray-800 p-6 rounded-lg shadow-2xl">
                    <h2 class="text-3xl font-bold text-center mb-4 header">Season Results</h2>
                    <div id="winner-display" class="text-center mb-6"></div>
                    <div id="track-record-container" class="overflow-x-auto">
                        <!-- Track record table will be rendered here -->
                    </div>
                    <div id="stats-container" class="mt-6">
                       <!-- Extra stats will be here -->
                    </div>
                    <div class="mt-8 text-center">
                        <button id="simulate-again-btn" class="btn-primary text-white font-bold py-2 px-6 rounded-full mr-4">Simulate Again</button>
                        <button id="new-season-btn" class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full">New Season</button>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Modal for Messages -->
    <div id="message-modal" class="fixed inset-0 z-50 hidden items-center justify-center modal">
        <div class="modal-content rounded-lg shadow-xl p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <h3 id="modal-title" class="text-xl font-bold mb-4"></h3>
            <p id="modal-message"></p>
            <div class="text-right mt-6">
                <button id="modal-close-btn" class="bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-full">Close</button>
            </div>
        </div>
    </div>


    <script>
        // --- DATA ---
        const ALL_QUEENS_DATA = [
             // Season 1
            { name: "Akashia", stats: { acting: 3, comedy: 2, dance: 7, design: 3, improv: 2, runway: 7, lipsync: 11 } },
            { name: "BeBe Zahara Benet", stats: { acting: 8, comedy: 10, dance: 8, design: 6, improv: 6, runway: 10, lipsync: 12 } },
            { name: "Jade Sotomayor", stats: { acting: 3, comedy: 3, dance: 8, design: 7, improv: 3, runway: 7, lipsync: 9 } },
            { name: "Nina Flowers", stats: { acting: 7, comedy: 5, dance: 8, design: 11, improv: 6, runway: 12, lipsync: 8 } },
            { name: "Ongina", stats: { acting: 9, comedy: 8, dance: 7, design: 9, improv: 10, runway: 9, lipsync: 8 } },
            { name: "Rebecca Glasscock", stats: { acting: 3, comedy: 3, dance: 6, design: 4, improv: 2, runway: 6, lipsync: 5 } },
            { name: "Shannel", stats: { acting: 7, comedy: 7, dance: 8, design: 9, improv: 6, runway: 11, lipsync: 10 } },
            { name: "Tammie Brown", stats: { acting: 15, comedy: 15, dance: 5, design: 7, improv: 15, runway: 7, lipsync: 6 } },
            { name: "Victoria 'Porkchop' Parker", stats: { acting: 3, comedy: 6, dance: 4, design: 3, improv: 6, runway: 5, lipsync: 4 } },
            // Season 2
            { name: "Jessica Wild", stats: { acting: 10, comedy: 12, dance: 10, design: 10, improv: 10, runway: 9, lipsync: 11 } },
            { name: "Jujubee", stats: { acting: 9, comedy: 11, dance: 7, design: 8, improv: 12, runway: 6, lipsync: 12 } },
            { name: "Morgan McMichaels", stats: { acting: 6, comedy: 6, dance: 10, design: 9, improv: 5, runway: 10, lipsync: 10 } },
            { name: "Mystique Summers", stats: { acting: 4, comedy: 5, dance: 3, design: 3, improv: 3, runway: 5, lipsync: 6 } },
            { name: "Nicole Paige Brooks", stats: { acting: 4, comedy: 8, dance: 4, design: 6, improv: 4, runway: 7, lipsync: 6 } },
            { name: "Pandora Boxx", stats: { acting: 12, comedy: 11, dance: 6, design: 8, improv: 10, runway: 8, lipsync: 7 } },
            { name: "Sahara Davenport", stats: { acting: 6, comedy: 6, dance: 10, design: 4, improv: 6, runway: 7, lipsync: 10 } },
            { name: "Shangela", stats: { acting: 14, comedy: 13, dance: 10, design: 3, improv: 9, runway: 9, lipsync: 12 } },
            { name: "Kylie Sonique Love", stats: { acting: 11, comedy: 10, dance: 10, design: 10, improv: 10, runway: 11, lipsync: 11 } },
            { name: "Tatianna", stats: { acting: 8, comedy: 11, dance: 8, design: 8, improv: 10, runway: 8, lipsync: 10 } },
            { name: "King Tyra", stats: { acting: 11, comedy: 7, dance: 8, design: 12, improv: 8, runway: 10, lipsync: 10 } },
            // Season 3
            { name: "Alexis Mateo", stats: { acting: 14, comedy: 12, dance: 11, design: 9, improv: 10, runway: 10, lipsync: 12 } },
            { name: "Carmen Carrera", stats: { acting: 3, comedy: 8, dance: 6, design: 4, improv: 3, runway: 7, lipsync: 7 } },
            { name: "Delta Work", stats: { acting: 8, comedy: 9, dance: 5, design: 5, improv: 5, runway: 7, lipsync: 7 } },
            { name: "India Ferrah", stats: { acting: 6, comedy: 4, dance: 15, design: 6, improv: 3, runway: 10, lipsync: 12 } },
            { name: "Manila Luzon", stats: { acting: 12, comedy: 11, dance: 7, design: 14, improv: 10, runway: 13, lipsync: 9 } },
            { name: "Mariah Paris Balenciaga", stats: { acting: 6, comedy: 9, dance: 7, design: 8, improv: 4, runway: 12, lipsync: 8 } },
            { name: "Mimi Imfurst", stats: { acting: 11, comedy: 6, dance: 6, design: 10, improv: 7, runway: 8, lipsync: 6 } },
            { name: "Phoenix", stats: { acting: 3, comedy: 3, dance: 6, design: 5, improv: 3, runway: 5, lipsync: 4 } },
            { name: "Raja", stats: { acting: 11, comedy: 13, dance: 6, design: 15, improv: 12, runway: 15, lipsync: 9 } },
            { name: "Stacy Layne Matthews", stats: { acting: 6, comedy: 11, dance: 5, design: 4, improv: 10, runway: 5, lipsync: 8 } },
            { name: "Venus D-Lite", stats: { acting: 4, comedy: 5, dance: 8, design: 2, improv: 3, runway: 5, lipsync: 2 } },
            { name: "Yara Sofia", stats: { acting: 11, comedy: 9, dance: 9, design: 14, improv: 7, runway: 10, lipsync: 8 } },
            // Season 4
            { name: "Alisa Summers", stats: { acting: 4, comedy: 4, dance: 5, design: 2, improv: 3, runway: 5, lipsync: 4 } },
            { name: "Chad Michaels", stats: { acting: 11, comedy: 10, dance: 8, design: 9, improv: 12, runway: 10, lipsync: 8 } },
            { name: "Dida Ritz", stats: { acting: 8, comedy: 7, dance: 13, design: 5, improv: 7, runway: 7, lipsync: 14 } },
            { name: "Jiggly Caliente", stats: { acting: 4, comedy: 6, dance: 9, design: 4, improv: 6, runway: 7, lipsync: 10 } },
            { name: "Kenya Olivera", stats: { acting: 9, comedy: 8, dance: 6, design: 8, improv: 8, runway: 7, lipsync: 9 } },
            { name: "Lashauwn Beyond", stats: { acting: 4, comedy: 4, dance: 7, design: 15, improv: 5, runway: 10, lipsync: 8 } },
            { name: "Latrice Royale", stats: { acting: 11, comedy: 8, dance: 9, design: 8, improv: 7, runway: 9, lipsync: 13 } },
            { name: "Madame LaQueer", stats: { acting: 4, comedy: 7, dance: 6, design: 5, improv: 9, runway: 7, lipsync: 6 } },
            { name: "Milan", stats: { acting: 4, comedy: 5, dance: 12, design: 7, improv: 5, runway: 8, lipsync: 10 } },
            { name: "Jaremi Carey", stats: { acting: 13, comedy: 9, dance: 8, design: 13, improv: 10, runway: 10, lipsync: 8 } },
            { name: "The Princess", stats: { acting: 4, comedy: 4, dance: 5, design: 7, improv: 4, runway: 7, lipsync: 7 } },
            { name: "Willam", stats: { acting: 15, comedy: 12, dance: 9, design: 10, improv: 12, runway: 9, lipsync: 8 } },
            // Season 5
            { name: "Alaska", stats: { acting: 15, comedy: 14, dance: 7, design: 8, improv: 14, runway: 10, lipsync: 11 } },
            { name: "Alyssa Edwards", stats: { acting: 4, comedy: 11, dance: 15, design: 6, improv: 10, runway: 9, lipsync: 12 } },
            { name: "Coco Montrese", stats: { acting: 10, comedy: 11, dance: 11, design: 9, improv: 7, runway: 9, lipsync: 15 } },
            { name: "Detox", stats: { acting: 10, comedy: 12, dance: 9, design: 9, improv: 8, runway: 12, lipsync: 11 } },
            { name: "Honey Mahogany", stats: { acting: 10, comedy: 3, dance: 3, design: 6, improv: 6, runway: 8, lipsync: 4 } },
            { name: "Ivy Winters", stats: { acting: 11, comedy: 4, dance: 8, design: 12, improv: 7, runway: 10, lipsync: 7 } },
            { name: "Jade Jolie", stats: { acting: 5, comedy: 7, dance: 8, design: 7, improv: 8, runway: 10, lipsync: 8 } },
            { name: "Jinkx Monsoon", stats: { acting: 15, comedy: 15, dance: 7, design: 6, improv: 15, runway: 9, lipsync: 8 } },
            { name: "Lineysha Sparx", stats: { acting: 10, comedy: 4, dance: 7, design: 12, improv: 5, runway: 10, lipsync: 8 } },
            { name: "Monica Beverly Hillz", stats: { acting: 4, comedy: 4, dance: 7, design: 6, improv: 3, runway: 8, lipsync: 8 } },
            { name: "Penny Tration", stats: { acting: 4, comedy: 5, dance: 4, design: 5, improv: 5, runway: 5, lipsync: 4 } },
            { name: "Roxxxy Andrews", stats: { acting: 8, comedy: 8, dance: 10, design: 13, improv: 8, runway: 12, lipsync: 15 } },
            { name: "Serena ChaCha", stats: { acting: 3, comedy: 3, dance: 7, design: 4, improv: 5, runway: 5, lipsync: 8 } },
            { name: "Vivienne Pinay", stats: { acting: 7, comedy: 3, dance: 4, design: 5, improv: 3, runway: 6, lipsync: 4 } },
            // Season 6
            { name: "Adore Delano", stats: { acting: 9, comedy: 11, dance: 9, design: 6, improv: 9, runway: 8, lipsync: 11 } },
            { name: "April Carrión", stats: { acting: 5, comedy: 5, dance: 6, design: 9, improv: 5, runway: 9, lipsync: 8 } },
            { name: "BenDeLaCreme", stats: { acting: 12, comedy: 12, dance: 8, design: 10, improv: 15, runway: 10, lipsync: 9 } },
            { name: "Bianca Del Rio", stats: { acting: 11, comedy: 15, dance: 6, design: 13, improv: 15, runway: 10, lipsync: 5 } },
            { name: "Courtney Act", stats: { acting: 11, comedy: 8, dance: 10, design: 10, improv: 10, runway: 12, lipsync: 9 } },
            { name: "Darienne Lake", stats: { acting: 11, comedy: 8, dance: 7, design: 4, improv: 9, runway: 8, lipsync: 13 } },
            { name: "Gia Gunn", stats: { acting: 10, comedy: 4, dance: 12, design: 8, improv: 4, runway: 10, lipsync: 12 } },
            { name: "Joslyn Fox", stats: { acting: 6, comedy: 9, dance: 8, design: 6, improv: 8, runway: 8, lipsync: 11 } },
            { name: "Kelly Mantle", stats: { acting: 15, comedy: 10, dance: 5, design: 5, improv: 10, runway: 7, lipsync: 4 } },
            { name: "Laganja Estranja", stats: { acting: 9, comedy: 5, dance: 14, design: 8, improv: 6, runway: 10, lipsync: 15 } },
            { name: "Magnolia Crawford", stats: { acting: 4, comedy: 5, dance: 6, design: 4, improv: 5, runway: 7, lipsync: 4 } },
            { name: "Milk", stats: { acting: 6, comedy: 6, dance: 7, design: 11, improv: 8, runway: 13, lipsync: 7 } },
            { name: "Trinity K. Bonet", stats: { acting: 9, comedy: 9, dance: 13, design: 12, improv: 4, runway: 10, lipsync: 15 } },
            { name: "Vivacious", stats: { acting: 4, comedy: 5, dance: 10, design: 4, improv: 4, runway: 7, lipsync: 12 } },
             // Season 7
            { name: "Ginger Minj", stats: { acting: 14, comedy: 12, dance: 8, design: 9, improv: 15, runway: 7, lipsync: 9 } },
            { name: "Jaidynn Diore Fierce", stats: { acting: 9, comedy: 9, dance: 12, design: 6, improv: 6, runway: 7, lipsync: 13 } },
            { name: "Jasmine Masters", stats: { acting: 3, comedy: 10, dance: 6, design: 5, improv: 2, runway: 7, lipsync: 9 } },
            { name: "Kandy Ho", stats: { acting: 4, comedy: 4, dance: 12, design: 5, improv: 4, runway: 7, lipsync: 10 } },
            { name: "Katya", stats: { acting: 9, comedy: 12, dance: 9, design: 7, improv: 12, runway: 10, lipsync: 10 } },
            { name: "Kennedy Davenport", stats: { acting: 9, comedy: 11, dance: 15, design: 8, improv: 11, runway: 10, lipsync: 15 } },
            { name: "Max", stats: { acting: 10, comedy: 7, dance: 5, design: 8, improv: 4, runway: 8, lipsync: 5 } },
            { name: "Miss Fame", stats: { acting: 8, comedy: 4, dance: 5, design: 11, improv: 3, runway: 13, lipsync: 5 } },
            { name: "Mrs. Kasha Davis", stats: { acting: 11, comedy: 10, dance: 7, design: 4, improv: 6, runway: 8, lipsync: 8 } },
            { name: "Pearl", stats: { acting: 7, comedy: 10, dance: 8, design: 9, improv: 10, runway: 9, lipsync: 5 } },
            { name: "Frisbee Jenkins", stats: { acting: 6, comedy: 6, dance: 4, design: 4, improv: 6, runway: 6, lipsync: 4 } },
            { name: "Tempest DuJour", stats: { acting: 6, comedy: 6, dance: 5, design: 3, improv: 6, runway: 7, lipsync: 4 } },
            { name: "Trixie Mattel", stats: { acting: 13, comedy: 10, dance: 6, design: 10, improv: 11, runway: 10, lipsync: 5 } },
            { name: "Violet Chachki", stats: { acting: 6, comedy: 7, dance: 8, design: 15, improv: 8, runway: 13, lipsync: 8 } },
             // Season 8
            { name: "Acid Betty", stats: { acting: 10, comedy: 5, dance: 8, design: 15, improv: 5, runway: 13, lipsync: 7 } },
            { name: "Bob The Drag Queen", stats: { acting: 15, comedy: 15, dance: 8, design: 8, improv: 15, runway: 8, lipsync: 10 } },
            { name: "Chi Chi DeVayne", stats: { acting: 8, comedy: 4, dance: 13, design: 8, improv: 6, runway: 8, lipsync: 13 } },
            { name: "Cynthia Lee Fontaine", stats: { acting: 4, comedy: 4, dance: 7, design: 6, improv: 4, runway: 7, lipsync: 6 } },
            { name: "Dax ExclamationPoint", stats: { acting: 5, comedy: 6, dance: 6, design: 5, improv: 6, runway: 5, lipsync: 4 } },
            { name: "Derrick Barry", stats: { acting: 7, comedy: 7, dance: 8, design: 8, improv: 9, runway: 7, lipsync: 8 } },
            { name: "Kim Chi", stats: { acting: 10, comedy: 7, dance: 4, design: 15, improv: 8, runway: 13, lipsync: 4 } },
            { name: "Laila McQueen", stats: { acting: 6, comedy: 6, dance: 4, design: 7, improv: 6, runway: 8, lipsync: 7 } },
            { name: "Naomi Smalls", stats: { acting: 9, comedy: 7, dance: 10, design: 14, improv: 10, runway: 12, lipsync: 11 } },
            { name: "Naysha Lopez", stats: { acting: 6, comedy: 4, dance: 8, design: 4, improv: 5, runway: 9, lipsync: 8 } },
            { name: "Robbie Turner", stats: { acting: 4, comedy: 5, dance: 6, design: 4, improv: 3, runway: 6, lipsync: 6 } },
            { name: "Thorgy Thor", stats: { acting: 14, comedy: 12, dance: 6, design: 9, improv: 14, runway: 9, lipsync: 8 } },
             // Season 9
            { name: "Aja", stats: { acting: 4, comedy: 8, dance: 14, design: 11, improv: 9, runway: 10, lipsync: 13 } },
            { name: "Alexis Michelle", stats: { acting: 13, comedy: 8, dance: 8, design: 8, improv: 13, runway: 7, lipsync: 10 } },
            { name: "Eureka!", stats: { acting: 9, comedy: 11, dance: 8, design: 10, improv: 13, runway: 10, lipsync: 12 } },
            { name: "Farrah Moan", stats: { acting: 9, comedy: 4, dance: 7, design: 3, improv: 6, runway: 8, lipsync: 7 } },
            { name: "Jaymes Mansfield", stats: { acting: 10, comedy: 9, dance: 3, design: 8, improv: 9, runway: 10, lipsync: 5 } },
            { name: "Kimora Blac", stats: { acting: 5, comedy: 5, dance: 4, design: 6, improv: 5, runway: 8, lipsync: 7 } },
            { name: "Nina Bo'nina Brown", stats: { acting: 4, comedy: 10, dance: 10, design: 15, improv: 10, runway: 10, lipsync: 11 } },
            { name: "Peppermint", stats: { acting: 11, comedy: 9, dance: 10, design: 9, improv: 4, runway: 8, lipsync: 13 } },
            { name: "Sasha Velour", stats: { acting: 9, comedy: 10, dance: 8, design: 10, improv: 11, runway: 15, lipsync: 11 } },
            { name: "Shea Couleé", stats: { acting: 10, comedy: 12, dance: 15, design: 13, improv: 11, runway: 15, lipsync: 15 } },
            { name: "Trinity The Tuck", stats: { acting: 13, comedy: 11, dance: 9, design: 15, improv: 10, runway: 13, lipsync: 11 } },
            { name: "Valentina", stats: { acting: 11, comedy: 7, dance: 10, design: 9, improv: 9, runway: 9, lipsync: 10 } },
            // US Season 10
            { name: "Aquaria", stats: { acting: 6, comedy: 11, dance: 8, design: 15, improv: 12, runway: 14, lipsync: 9 } },
            { name: "Asia O'Hara", stats: { acting: 11, comedy: 9, dance: 8, design: 7, improv: 7, runway: 12, lipsync: 9 } },
            { name: "Blair St. Clair", stats: { acting: 9, comedy: 8, dance: 6, design: 10, improv: 8, runway: 8, lipsync: 7 } },
            { name: "Dusty Ray Bottoms", stats: { acting: 8, comedy: 8, dance: 6, design: 7, improv: 6, runway: 7, lipsync: 6 } },
            { name: "Kalorie K. Williams", stats: { acting: 6, comedy: 6, dance: 6, design: 5, improv: 7, runway: 7, lipsync: 8 } },
            { name: "Kameron Michaels", stats: { acting: 5, comedy: 8, dance: 14, design: 10, improv: 8, runway: 8, lipsync: 15 } },
            { name: "Mayhem Miller", stats: { acting: 6, comedy: 8, dance: 9, design: 13, improv: 7, runway: 9, lipsync: 10 } },
            { name: "Miz Cracker", stats: { acting: 11, comedy: 11, dance: 5, design: 10, improv: 9, runway: 9, lipsync: 8 } },
            { name: "Monét X Change", stats: { acting: 13, comedy: 13, dance: 14, design: 9, improv: 11, runway: 11, lipsync: 15 } },
            { name: "Mo Heart", stats: { acting: 12, comedy: 10, dance: 9, design: 12, improv: 13, runway: 12, lipsync: 11 } },
            { name: "Vanessa 'Vanjie' Mateo", stats: { acting: 9, comedy: 11, dance: 9, design: 8, improv: 9, runway: 7, lipsync: 11 } },
            { name: "The Vixen", stats: { acting: 5, comedy: 4, dance: 12, design: 9, improv: 3, runway: 8, lipsync: 12 } },
            { name: "Yuhua Hamasaki", stats: { acting: 4, comedy: 4, dance: 6, design: 12, improv: 6, runway: 7, lipsync: 7 } },
            // US Season 11
            { name: "A'keria C. Davenport", stats: { acting: 11, comedy: 10, dance: 11, design: 8, improv: 13, runway: 13, lipsync: 10 } },
            { name: "Ariel Versace", stats: { acting: 8, comedy: 6, dance: 6, design: 7, improv: 5, runway: 8, lipsync: 6 } },
            { name: "Brooke Lynn Hytes", stats: { acting: 8, comedy: 8, dance: 13, design: 12, improv: 8, runway: 14, lipsync: 13 } },
            { name: "Honey Davenport", stats: { acting: 4, comedy: 6, dance: 8, design: 4, improv: 4, runway: 9, lipsync: 4 } },
            { name: "Kahanna Montrese", stats: { acting: 4, comedy: 5, dance: 12, design: 9, improv: 5, runway: 13, lipsync: 11 } },
            { name: "Mercedes Iman Diamond", stats: { acting: 4, comedy: 6, dance: 8, design: 8, improv: 6, runway: 10, lipsync: 8 } },
            { name: "Nina West", stats: { acting: 12, comedy: 11, dance: 6, design: 8, improv: 11, runway: 8, lipsync: 6 } },
            { name: "Plastique Tiara", stats: { acting: 10, comedy: 9, dance: 10, design: 15, improv: 6, runway: 13, lipsync: 9 } },
            { name: "Ra'Jah O'Hara", stats: { acting: 8, comedy: 8, dance: 13, design: 15, improv: 10, runway: 12, lipsync: 13 } },
            { name: "Scarlet Envy", stats: { acting: 13, comedy: 10, dance: 7, design: 13, improv: 9, runway: 10, lipsync: 7 } },
            { name: "Shuga Cain", stats: { acting: 10, comedy: 9, dance: 7, design: 6, improv: 7, runway: 10, lipsync: 7 } },
            { name: "Silky Nutmeg Ganache", stats: { acting: 10, comedy: 15, dance: 12, design: 9, improv: 10, runway: 10, lipsync: 12 } },
            { name: "Yvie Oddly", stats: { acting: 12, comedy: 7, dance: 13, design: 12, improv: 9, runway: 12, lipsync: 15 } },
            // US Season 12
            { name: "Aiden Zhane", stats: { acting: 9, comedy: 3, dance: 6, design: 4, improv: 3, runway: 6, lipsync: 6 } },
            { name: "Brita", stats: { acting: 7, comedy: 8, dance: 10, design: 4, improv: 6, runway: 8, lipsync: 11 } },
            { name: "Crystal Methyd", stats: { acting: 6, comedy: 8, dance: 8, design: 13, improv: 8, runway: 12, lipsync: 6 } },
            { name: "Dahlia Sin", stats: { acting: 4, comedy: 4, dance: 6, design: 5, improv: 5, runway: 10, lipsync: 4 } },
            { name: "Gigi Goode", stats: { acting: 9, comedy: 9, dance: 11, design: 10, improv: 9, runway: 12, lipsync: 8 } },
            { name: "Heidi N Closet", stats: { acting: 10, comedy: 9, dance: 11, design: 8, improv: 12, runway: 9, lipsync: 13 } },
            { name: "Jackie Cox", stats: { acting: 11, comedy: 12, dance: 6, design: 6, improv: 13, runway: 9, lipsync: 8 } },
            { name: "Jaida Essence Hall", stats: { acting: 8, comedy: 5, dance: 10, design: 15, improv: 7, runway: 13, lipsync: 12 } },
            { name: "Jan", stats: { acting: 8, comedy: 4, dance: 7, design: 9, improv: 5, runway: 10, lipsync: 9 } },
            { name: "Nicky Doll", stats: { acting: 4, comedy: 4, dance: 5, design: 12, improv: 3, runway: 11, lipsync: 5 } },
            { name: "Rock M. Sakura", stats: { acting: 6, comedy: 6, dance: 6, design: 4, improv: 8, runway: 8, lipsync: 7 } },
            { name: "Widow Von'Du", stats: { acting: 11, comedy: 7, dance: 13, design: 8, improv: 11, runway: 10, lipsync: 15 } },
             // US Season 13
            { name: "Denali", stats: { acting: 4, comedy: 8, dance: 14, design: 9, improv: 10, runway: 8, lipsync: 13 } },
            { name: "Gottmik", stats: { acting: 8, comedy: 11, dance: 6, design: 13, improv: 12, runway: 13, lipsync: 6 } },
            { name: "Joey Jay", stats: { acting: 6, comedy: 7, dance: 6, design: 5, improv: 5, runway: 7, lipsync: 7 } },
            { name: "Kahmora Hall", stats: { acting: 3, comedy: 4, dance: 3, design: 5, improv: 4, runway: 12, lipsync: 4 } },
            { name: "Kandy Muse", stats: { acting: 9, comedy: 10, dance: 9, design: 6, improv: 10, runway: 7, lipsync: 11 } },
            { name: "LaLa Ri", stats: { acting: 8, comedy: 10, dance: 15, design: 6, improv: 10, runway: 8, lipsync: 15 } },
            { name: "Olivia Lux", stats: { acting: 11, comedy: 5, dance: 11, design: 10, improv: 8, runway: 11, lipsync: 8 } },
            { name: "Rosé", stats: { acting: 12, comedy: 11, dance: 6, design: 8, improv: 10, runway: 10, lipsync: 6 } },
            { name: "Symone", stats: { acting: 14, comedy: 7, dance: 7, design: 9, improv: 12, runway: 13, lipsync: 13 } },
            { name: "Tamisha Iman", stats: { acting: 7, comedy: 6, dance: 7, design: 5, improv: 6, runway: 7, lipsync: 10 } },
            { name: "Tina Burner", stats: { acting: 6, comedy: 6, dance: 10, design: 5, improv: 6, runway: 8, lipsync: 9 } },
            { name: "Utica Queen", stats: { acting: 7, comedy: 4, dance: 6, design: 15, improv: 5, runway: 15, lipsync: 11 } },
            // US Season 14
            { name: "Alyssa Hunter", stats: { acting: 5, comedy: 6, dance: 7, design: 10, improv: 7, runway: 13, lipsync: 8 } },
            { name: "Angeria Paris VanMicheals", stats: { acting: 11, comedy: 10, dance: 9, design: 12, improv: 8, runway: 11, lipsync: 8 } },
            { name: "Bosco", stats: { acting: 11, comedy: 7, dance: 6, design: 7, improv: 8, runway: 11, lipsync: 9 } },
            { name: "Daya Betty", stats: { acting: 9, comedy: 8, dance: 9, design: 9, improv: 9, runway: 10, lipsync: 7 } },
            { name: "DeJa Skye", stats: { acting: 9, comedy: 8, dance: 11, design: 8, improv: 13, runway: 8, lipsync: 9 } },
            { name: "Jasmine Kennedie", stats: { acting: 8, comedy: 7, dance: 13, design: 7, improv: 6, runway: 10, lipsync: 14 } },
            { name: "Jorgeous", stats: { acting: 5, comedy: 5, dance: 15, design: 10, improv: 5, runway: 10, lipsync: 15 } },
            { name: "June Jambalaya", stats: { acting: 5, comedy: 6, dance: 6, design: 4, improv: 5, runway: 6, lipsync: 6 } },
            { name: "Kerri Colby", stats: { acting: 6, comedy: 6, dance: 5, design: 5, improv: 6, runway: 9, lipsync: 6 } },
            { name: "Kornbread Jeté", stats: { acting: 9, comedy: 12, dance: 8, design: 5, improv: 10, runway: 8, lipsync: 10 } },
            { name: "Lady Camden", stats: { acting: 12, comedy: 11, dance: 12, design: 11, improv: 7, runway: 10, lipsync: 11 } },
            { name: "Maddy Morphosis", stats: { acting: 9, comedy: 12, dance: 6, design: 8, improv: 10, runway: 9, lipsync: 7 } },
            { name: "Orion Story", stats: { acting: 4, comedy: 6, dance: 6, design: 9, improv: 6, runway: 6, lipsync: 5 } },
            { name: "Willow Pill", stats: { acting: 11, comedy: 11, dance: 7, design: 12, improv: 8, runway: 13, lipsync: 8 } },
            // US Season 15
            { name: "Amethyst", stats: { acting: 4, comedy: 9, dance: 8, design: 5, improv: 10, runway: 7, lipsync: 9 } },
            { name: "Anetra", stats: { acting: 8, comedy: 9, dance: 12, design: 10, improv: 8, runway: 9, lipsync: 14 } },
            { name: "Aura Mayari", stats: { acting: 5, comedy: 5, dance: 6, design: 7, improv: 6, runway: 9, lipsync: 7 } },
            { name: "Irene Dubois", stats: { acting: 4, comedy: 5, dance: 4, design: 4, improv: 4, runway: 8, lipsync: 6 } },
            { name: "Jax", stats: { acting: 5, comedy: 7, dance: 15, design: 9, improv: 6, runway: 8, lipsync: 15 } },
            { name: "Loosey LaDuca", stats: { acting: 11, comedy: 13, dance: 6, design: 8, improv: 13, runway: 8, lipsync: 6 } },
            { name: "Luxx Noir London", stats: { acting: 10, comedy: 11, dance: 9, design: 15, improv: 9, runway: 14, lipsync: 10 } },
            { name: "Malaysia Babydoll Foxx", stats: { acting: 9, comedy: 8, dance: 7, design: 8, improv: 7, runway: 9, lipsync: 8 } },
            { name: "Marcia Marcia Marcia", stats: { acting: 9, comedy: 9, dance: 8, design: 8, improv: 9, runway: 8, lipsync: 9 } },
            { name: "Mistress Isabelle Brooks", stats: { acting: 8, comedy: 15, dance: 8, design: 13, improv: 12, runway: 13, lipsync: 9 } },
            { name: "Robin Fierce", stats: { acting: 7, comedy: 7, dance: 11, design: 10, improv: 6, runway: 10, lipsync: 11 } },
            { name: "Salina EsTitties", stats: { acting: 9, comedy: 8, dance: 8, design: 8, improv: 8, runway: 6, lipsync: 11 } },
            { name: "Sasha Colby", stats: { acting: 9, comedy: 10, dance: 15, design: 13, improv: 9, runway: 15, lipsync: 15 } },
            { name: "Spice", stats: { acting: 8, comedy: 6, dance: 5, design: 8, improv: 5, runway: 10, lipsync: 5 } },
            { name: "Sugar", stats: { acting: 9, comedy: 7, dance: 5, design: 6, improv: 5, runway: 12, lipsync: 5 } },
             // US Season 16
            { name: "Amanda Tori Meating", stats: { acting: 7, comedy: 9, dance: 9, design: 6, improv: 8, runway: 5, lipsync: 8 } },
            { name: "Dawn", stats: { acting: 6, comedy: 6, dance: 6, design: 10, improv: 5, runway: 10, lipsync: 6 } },
            { name: "Geneva Karr", stats: { acting: 6, comedy: 6, dance: 9, design: 5, improv: 6, runway: 8, lipsync: 8 } },
            { name: "Hershii LiqCour-Jeté", stats: { acting: 4, comedy: 10, dance: 7, design: 6, improv: 8, runway: 7, lipsync: 6 } },
            { name: "Megami", stats: { acting: 7, comedy: 6, dance: 9, design: 10, improv: 6, runway: 8, lipsync: 8 } },
            { name: "Mhi'ya Iman Le'Paige", stats: { acting: 6, comedy: 7, dance: 11, design: 6, improv: 7, runway: 8, lipsync: 13 } },
            { name: "Mirage", stats: { acting: 5, comedy: 6, dance: 12, design: 7, improv: 6, runway: 6, lipsync: 10 } },
            { name: "Morphine Love Dion", stats: { acting: 6, comedy: 8, dance: 10, design: 8, improv: 6, runway: 10, lipsync: 12 } },
            { name: "Nymphia Wind", stats: { acting: 7, comedy: 8, dance: 9, design: 15, improv: 5, runway: 13, lipsync: 8 } },
            { name: "Plane Jane", stats: { acting: 10, comedy: 11, dance: 9, design: 9, improv: 12, runway: 11, lipsync: 10 } },
            { name: "Plasma", stats: { acting: 11, comedy: 9, dance: 8, design: 6, improv: 9, runway: 9, lipsync: 8 } },
            { name: "Q", stats: { acting: 9, comedy: 8, dance: 4, design: 15, improv: 8, runway: 12, lipsync: 5 } },
            { name: "Sapphira Cristál", stats: { acting: 11, comedy: 12, dance: 9, design: 11, improv: 11, runway: 12, lipsync: 9 } },
            { name: "Xunami Muse", stats: { acting: 6, comedy: 5, dance: 8, design: 7, improv: 5, runway: 10, lipsync: 8 } },
            // UK Season 1
            { name: "Baga Chipz", stats: { acting: 13, comedy: 12, dance: 5, design: 5, improv: 13, runway: 8, lipsync: 7 } },
            { name: "Blu Hydrangea", stats: { acting: 5, comedy: 8, dance: 6, design: 10, improv: 10, runway: 12, lipsync: 7 } },
            { name: "Cheryl Hole", stats: { acting: 5, comedy: 9, dance: 8, design: 5, improv: 9, runway: 7, lipsync: 9 } },
            { name: "Crystal (UK)", stats: { acting: 6, comedy: 5, dance: 6, design: 9, improv: 4, runway: 8, lipsync: 6 } },
            { name: "Divina De Campo", stats: { acting: 11, comedy: 6, dance: 9, design: 12, improv: 9, runway: 9, lipsync: 9 } },
            { name: "Gothy Kendoll", stats: { acting: 5, comedy: 4, dance: 4, design: 8, improv: 2, runway: 9, lipsync: 4 } },
            { name: "Scaredy Kat", stats: { acting: 3, comedy: 5, dance: 6, design: 4, improv: 4, runway: 7, lipsync: 4 } },
            { name: "Sum Ting Wong", stats: { acting: 8, comedy: 6, dance: 6, design: 7, improv: 6, runway: 9, lipsync: 8 } },
            { name: "The Vivienne", stats: { acting: 12, comedy: 13, dance: 8, design: 10, improv: 14, runway: 11, lipsync: 12 } },
            { name: "Vinegar Strokes", stats: { acting: 7, comedy: 6, dance: 6, design: 4, improv: 4, runway: 6, lipsync: 6 } },
             // UK Season 2
            { name: "A'Whora", stats: { acting: 7, comedy: 5, dance: 8, design: 15, improv: 10, runway: 10, lipsync: 8 } },
            { name: "Asttina Mandella", stats: { acting: 6, comedy: 6, dance: 13, design: 8, improv: 6, runway: 10, lipsync: 12 } },
            { name: "Bimini", stats: { acting: 11, comedy: 14, dance: 10, design: 7, improv: 11, runway: 11, lipsync: 11 } },
            { name: "Cherry Valentine", stats: { acting: 5, comedy: 6, dance: 5, design: 7, improv: 6, runway: 11, lipsync: 4 } },
            { name: "Ellie Diamond", stats: { acting: 10, comedy: 6, dance: 7, design: 11, improv: 8, runway: 9, lipsync: 8 } },
            { name: "Ginny Lemon", stats: { acting: 6, comedy: 6, dance: 5, design: 5, improv: 5, runway: 8, lipsync: 4 } },
            { name: "Joe Black", stats: { acting: 5, comedy: 5, dance: 4, design: 5, improv: 4, runway: 8, lipsync: 5 } },
            { name: "Lawrence Chaney", stats: { acting: 13, comedy: 12, dance: 7, design: 12, improv: 9, runway: 11, lipsync: 10 } },
            { name: "Sister Sister", stats: { acting: 6, comedy: 8, dance: 6, design: 4, improv: 7, runway: 8, lipsync: 9 } },
            { name: "Tayce", stats: { acting: 10, comedy: 9, dance: 10, design: 5, improv: 9, runway: 12, lipsync: 11 } },
            { name: "Tia Kofi", stats: { acting: 9, comedy: 13, dance: 9, design: 6, improv: 11, runway: 8, lipsync: 10 } },
            { name: "Veronica Green", stats: { acting: 10, comedy: 9, dance: 6, design: 8, improv: 9, runway: 7, lipsync: 9 } },
            // UK Season 3
            { name: "Anubis", stats: { acting: 5, comedy: 5, dance: 5, design: 4, improv: 5, runway: 4, lipsync: 4 } },
            { name: "Charity Kase", stats: { acting: 8, comedy: 6, dance: 4, design: 12, improv: 6, runway: 13, lipsync: 8 } },
            { name: "Choriza May", stats: { acting: 9, comedy: 10, dance: 6, design: 7, improv: 6, runway: 10, lipsync: 7 } },
            { name: "Elektra Fence", stats: { acting: 5, comedy: 6, dance: 10, design: 4, improv: 5, runway: 8, lipsync: 10 } },
            { name: "Ella Vaday", stats: { acting: 9, comedy: 12, dance: 6, design: 10, improv: 12, runway: 9, lipsync: 5 } },
            { name: "Kitty Scott-Claus", stats: { acting: 12, comedy: 13, dance: 7, design: 8, improv: 10, runway: 9, lipsync: 7 } },
            { name: "Krystal Versace", stats: { acting: 8, comedy: 6, dance: 11, design: 9, improv: 7, runway: 15, lipsync: 12 } },
            { name: "River Medway", stats: { acting: 8, comedy: 9, dance: 5, design: 9, improv: 5, runway: 7, lipsync: 6 } },
            { name: "Scarlett Harlett", stats: { acting: 7, comedy: 10, dance: 6, design: 11, improv: 9, runway: 11, lipsync: 9 } },
            { name: "Vanity Milan", stats: { acting: 8, comedy: 8, dance: 15, design: 7, improv: 8, runway: 10, lipsync: 15 } },
            { name: "Victoria Scone", stats: { acting: 11, comedy: 10, dance: 8, design: 10, improv: 8, runway: 10, lipsync: 9 } },
            // UK Season 4
            { name: "Baby", stats: { acting: 6, comedy: 6, dance: 9, design: 10, improv: 4, runway: 9, lipsync: 11 } },
            { name: "Black Peppa", stats: { acting: 5, comedy: 4, dance: 11, design: 4, runway: 13, lipsync: 13 } },
            { name: "Cheddar Gorgeous", stats: { acting: 12, comedy: 9, dance: 7, design: 10, improv: 13, runway: 14, lipsync: 8 } },
            { name: "Copper Topp", stats: { acting: 5, comedy: 4, dance: 9, design: 7, improv: 6, runway: 7, lipsync: 8 } },
            { name: "Dakota Schiffer", stats: { acting: 6, comedy: 9, dance: 9, design: 10, improv: 9, runway: 11, lipsync: 8 } },
            { name: "Danny Beard", stats: { acting: 12, comedy: 10, dance: 11, design: 8, improv: 11, runway: 13, lipsync: 9 } },
            { name: "Jonbers Blonde", stats: { acting: 5, comedy: 10, dance: 8, design: 7, improv: 9, runway: 9, lipsync: 9 } },
            { name: "Just May", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 4 } },
            { name: "Le Fil", stats: { acting: 6, comedy: 5, dance: 8, design: 9, improv: 5, runway: 12, lipsync: 9 } },
            { name: "Pixie Polite", stats: { acting: 7, comedy: 5, dance: 9, design: 8, improv: 8, runway: 9, lipsync: 9 } },
            { name: "Sminty Drop", stats: { acting: 5, comedy: 6, dance: 5, design: 9, improv: 4, runway: 14, lipsync: 8 } },
            { name: "Starlet", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 13, lipsync: 5 } },
             // UK Season 5
            { name: "Alexis Saint-Pete", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 8, lipsync: 7 } },
            { name: "Banksie", stats: { acting: 6, comedy: 6, dance: 6, design: 11, improv: 7, runway: 12, lipsync: 7 } },
            { name: "Cara Melle", stats: { acting: 5, comedy: 5, dance: 12, design: 8, improv: 7, runway: 13, lipsync: 12 } },
            { name: "DeDeLicious", stats: { acting: 8, comedy: 5, dance: 8, design: 13, improv: 6, runway: 10, lipsync: 12 } },
            { name: "Ginger Johnson", stats: { acting: 11, comedy: 12, dance: 11, design: 9, improv: 13, runway: 10, lipsync: 8 } },
            { name: "Kate Butch", stats: { acting: 10, comedy: 9, dance: 9, design: 8, improv: 9, runway: 8, lipsync: 8 } },
            { name: "Michael Marouli", stats: { acting: 6, comedy: 10, dance: 9, design: 8, improv: 10, runway: 12, lipsync: 10 } },
            { name: "Miss Naomi Carter", stats: { acting: 6, comedy: 6, dance: 8, design: 4, improv: 6, runway: 9, lipsync: 9 } },
            { name: "Tomara Thomas", stats: { acting: 8, comedy: 8, dance: 15, design: 7, improv: 10, runway: 9, lipsync: 12 } },
            { name: "Vicki Vivacious", stats: { acting: 7, comedy: 6, dance: 7, design: 10, improv: 5, runway: 11, lipsync: 7 } },
            // CAN Season 1
            { name: "Anastarzia Anaquway", stats: { acting: 7, comedy: 6, dance: 4, design: 13, improv: 6, runway: 8, lipsync: 9 } },
            { name: "BOA", stats: { acting: 6, comedy: 6, dance: 5, design: 5, improv: 6, runway: 7, lipsync: 7 } },
            { name: "Ilona Verley", stats: { acting: 5, comedy: 8, dance: 5, design: 8, improv: 9, runway: 10, lipsync: 10 } },
            { name: "Jimbo", stats: { acting: 10, comedy: 13, dance: 2, design: 13, improv: 15, runway: 11, lipsync: 2 } },
            { name: "Juice Boxx", stats: { acting: 6, comedy: 6, dance: 6, design: 4, improv: 6, runway: 6, lipsync: 10 } },
            { name: "Kiara", stats: { acting: 10, comedy: 6, dance: 8, design: 11, improv: 6, runway: 9, lipsync: 11 } },
            { name: "Kyne", stats: { acting: 8, comedy: 6, dance: 6, design: 7, improv: 6, runway: 6, lipsync: 7 } },
            { name: "Lemon", stats: { acting: 10, comedy: 9, dance: 12, design: 6, improv: 11, runway: 9, lipsync: 12 } },
            { name: "Priyanka", stats: { acting: 14, comedy: 12, dance: 12, design: 5, improv: 6, runway: 10, lipsync: 13 } },
            { name: "Rita Baga", stats: { acting: 11, comedy: 10, dance: 8, design: 3, improv: 10, runway: 7, lipsync: 7 } },
            { name: "Scarlett BoBo", stats: { acting: 6, comedy: 8, dance: 15, design: 12, improv: 10, runway: 10, lipsync: 15 } },
            { name: "Tynomi Banks", stats: { acting: 5, comedy: 6, dance: 15, design: 7, improv: 5, runway: 7, lipsync: 13 } },
            // CAN Season 2
            { name: "Adriana", stats: { acting: 9, comedy: 7, dance: 7, design: 6, improv: 6, runway: 10, lipsync: 7 } },
            { name: "Beth", stats: { acting: 5, comedy: 5, dance: 6, design: 3, improv: 6, runway: 5, lipsync: 4 } },
            { name: "Eve 6000", stats: { acting: 10, comedy: 5, dance: 5, design: 6, improv: 6, runway: 8, lipsync: 8 } },
            { name: "Gia Metric", stats: { acting: 11, comedy: 10, dance: 8, design: 7, improv: 10, runway: 9, lipsync: 7 } },
            { name: "Icesis Couture", stats: { acting: 8, comedy: 11, dance: 9, design: 15, improv: 12, runway: 15, lipsync: 14 } },
            { name: "Kendall Gender", stats: { acting: 6, comedy: 7, dance: 10, design: 6, improv: 7, runway: 10, lipsync: 10 } },
            { name: "Kimora Amour", stats: { acting: 6, comedy: 5, dance: 6, design: 7, improv: 7, runway: 10, lipsync: 5 } },
            { name: "Océane Aqua-Black", stats: { acting: 6, comedy: 9, dance: 9, design: 7, improv: 7, runway: 7, lipsync: 10 } },
            { name: "Pythia", stats: { acting: 8, comedy: 9, dance: 6, design: 14, improv: 9, runway: 13, lipsync: 7 } },
            { name: "Stephanie Prince", stats: { acting: 7, comedy: 7, dance: 12, design: 12, improv: 5, runway: 11, lipsync: 10 } },
            { name: "Suki Doll", stats: { acting: 8, comedy: 10, dance: 6, design: 15, improv: 5, runway: 10, lipsync: 5 } },
            { name: "Synthia Kiss", stats: { acting: 9, comedy: 9, dance: 11, design: 7, improv: 9, runway: 6, lipsync: 12 } },
             // CAN Season 3
            { name: "Bombae", stats: { acting: 5, comedy: 7, dance: 6, design: 8, improv: 6, runway: 7, lipsync: 7 } },
            { name: "Chelazon Leroux", stats: { acting: 4, comedy: 10, dance: 4, design: 7, improv: 5, runway: 7, lipsync: 8 } },
            { name: "Gisèle Lullaby", stats: { acting: 9, comedy: 12, dance: 8, design: 12, improv: 10, runway: 12, lipsync: 9 } },
            { name: "Halal Bae", stats: { acting: 4, comedy: 4, dance: 3, design: 3, improv: 4, runway: 7, lipsync: 5 } },
            { name: "Irma Gerd", stats: { acting: 5, comedy: 7, dance: 7, design: 8, improv: 10, runway: 9, lipsync: 7 } },
            { name: "Jada Shada Hudson", stats: { acting: 9, comedy: 11, dance: 9, design: 7, improv: 8, runway: 8, lipsync: 14 } },
            { name: "Kaos", stats: { acting: 5, comedy: 7, dance: 5, design: 5, improv: 5, runway: 9, lipsync: 9 } },
            { name: "Kimmy Couture", stats: { acting: 7, comedy: 9, dance: 12, design: 9, improv: 6, runway: 11, lipsync: 15 } },
            { name: "Lady Boom Boom", stats: { acting: 8, comedy: 12, dance: 12, design: 14, improv: 8, runway: 12, lipsync: 10 } },
            { name: "Miss Fiercalicious", stats: { acting: 11, comedy: 13, dance: 9, design: 8, improv: 7, runway: 11, lipsync: 9 } },
            { name: "Miss Moço", stats: { acting: 5, comedy: 4, dance: 6, design: 4, improv: 4, runway: 7, lipsync: 9 } },
            { name: "Vivian Vanderpuss", stats: { acting: 9, comedy: 9, dance: 9, design: 9, improv: 9, runway: 9, lipsync: 7 } },
            // CAN Season 4
            { name: "Aimee Yonce Shennel", stats: { acting: 8, comedy: 6, dance: 7, design: 6, improv: 6, runway: 11, lipsync: 8 } },
            { name: "Aurora Matrix", stats: { acting: 8, comedy: 7, dance: 12, design: 8, improv: 6, runway: 12, lipsync: 13 } },
            { name: "Denim", stats: { acting: 6, comedy: 7, dance: 6, design: 10, improv: 5, runway: 12, lipsync: 6 } },
            { name: "Kiki Coe", stats: { acting: 6, comedy: 6, dance: 7, design: 15, improv: 4, runway: 15, lipsync: 11 } },
            { name: "Kitten Kaboodle", stats: { acting: 10, comedy: 10, dance: 6, design: 10, improv: 10, runway: 9, lipsync: 7 } },
            { name: "Luna DuBois", stats: { acting: 5, comedy: 6, dance: 8, design: 9, improv: 6, runway: 10, lipsync: 7 } },
            { name: "Melinda Verga", stats: { acting: 9, comedy: 10, dance: 10, design: 7, improv: 8, runway: 7, lipsync: 10 } },
            { name: "Nearah Nuff", stats: { acting: 7, comedy: 6, dance: 15, design: 7, improv: 6, runway: 9, lipsync: 15 } },
            { name: "Sisi Superstar", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 4 } },
            { name: "The Girlfriend Experience", stats: { acting: 5, comedy: 5, dance: 5, design: 6, improv: 6, runway: 9, lipsync: 8 } },
            { name: "Venus", stats: { acting: 10, comedy: 10, dance: 10, design: 9, improv: 10, runway: 12, lipsync: 9 } },
            // DRAG RACE HOLLAND SEASON 1
            { name: "Chelsea Boy", stats: { acting: 9, comedy: 10, dance: 15, design: 7, improv: 8, runway: 15, lipsync: 9 } },
            { name: "Envy Peru", stats: { acting: 11, comedy: 11, dance: 11, design: 8, improv: 11, runway: 13, lipsync: 8 } },
            { name: "Janey Jacké", stats: { acting: 7, comedy: 6, dance: 13, design: 12, improv: 6, runway: 13, lipsync: 13 } },
            { name: "Madame Madness", stats: { acting: 8, comedy: 6, dance: 5, design: 6, improv: 5, runway: 8, lipsync: 7 } },
            { name: "Ma'Ma Queen", stats: { acting: 9, comedy: 6, dance: 5, design: 6, improv: 6, runway: 10, lipsync: 7 } },
            { name: "Megan Schoonbrood", stats: { acting: 7, comedy: 6, dance: 6, design: 5, improv: 6, runway: 9, lipsync: 12 } },
            { name: "Miss Abby OMG", stats: { acting: 5, comedy: 6, dance: 11, design: 6, improv: 5, runway: 8, lipsync: 14 } },
            { name: "Patty Pam-Pam", stats: { acting: 5, comedy: 6, dance: 6, design: 6, improv: 5, runway: 9, lipsync: 7 } },
            { name: "Roem", stats: { acting: 6, comedy: 6, dance: 5, design: 5, improv: 5, runway: 6, lipsync: 5 } },
            { name: "Sederginne", stats: { acting: 7, comedy: 6, dance: 6, design: 7, improv: 5, runway: 13, lipsync: 5 } },
            // DRAG RACE HOLLAND SEASON 2
            { name: "Ivy-Elyse", stats: { acting: 6, comedy: 8, dance: 5, design: 4, improv: 8, runway: 5, lipsync: 10 } },
            { name: "Juicy Kouture", stats: { acting: 5, comedy: 6, dance: 5, design: 5, improv: 4, runway: 4, lipsync: 5 } },
            { name: "Keta Minaj", stats: { acting: 9, comedy: 8, dance: 11, design: 11, improv: 8, runway: 12, lipsync: 10 } },
            { name: "Love Masisi", stats: { acting: 6, comedy: 5, dance: 6, design: 8, improv: 5, runway: 10, lipsync: 7 } },
            { name: "My Little Puny", stats: { acting: 10, comedy: 10, dance: 10, design: 7, improv: 9, runway: 10, lipsync: 10 } },
            { name: "Reggy B", stats: { acting: 6, comedy: 6, dance: 6, design: 5, improv: 6, runway: 8, lipsync: 8 } },
            { name: "Tabitha", stats: { acting: 6, comedy: 7, dance: 8, design: 6, improv: 5, runway: 7, lipsync: 8 } },
            { name: "The Countess", stats: { acting: 7, comedy: 5, dance: 4, design: 10, improv: 6, runway: 12, lipsync: 5 } },
            { name: "Vanessa Van Cartier", stats: { acting: 7, comedy: 5, dance: 6, design: 8, improv: 5, runway: 12, lipsync: 8 } },
            { name: "Vivaldi", stats: { acting: 8, comedy: 8, dance: 8, design: 7, improv: 8, runway: 12, lipsync: 8 } },
            // DRT SEASON 1
            { name: "Amadiva", stats: { acting: 7, comedy: 6, dance: 7, design: 9, improv: 4, runway: 9, lipsync: 8 } },
            { name: "Anneé Maywong", stats: { acting: 10, comedy: 9, dance: 7, design: 12, improv: 8, runway: 11, lipsync: 9 } },
            { name: "B Ella", stats: { acting: 11, comedy: 7, dance: 6, design: 7, improv: 7, runway: 7, lipsync: 7 } },
            { name: "Bunny Be Fly", stats: { acting: 6, comedy: 5, dance: 5, design: 7, improv: 5, runway: 6, lipsync: 5 } },
            { name: "Dearis Doll", stats: { acting: 8, comedy: 11, dance: 7, design: 8, improv: 10, runway: 10, lipsync: 10 } },
            { name: "JAJA", stats: { acting: 7, comedy: 5, dance: 7, design: 6, improv: 5, runway: 9, lipsync: 9 } },
            { name: "Meannie Minaj", stats: { acting: 5, comedy: 5, dance: 5, design: 4, improv: 5, runway: 5, lipsync: 4 } },
            { name: "Morrigan", stats: { acting: 5, comedy: 4, dance: 6, design: 4, improv: 6, runway: 7, lipsync: 6 } },
            { name: "Natalia Pliacam", stats: { acting: 8, comedy: 12, dance: 7, design: 9, improv: 12, runway: 10, lipsync: 9 } },
            { name: "Petchra", stats: { acting: 6, comedy: 5, dance: 6, design: 8, improv: 6, runway: 7, lipsync: 8 } },
            // DRT SEASON 2
            { name: "Angele Anang", stats: { acting: 8, comedy: 8, dance: 9, design: 11, improv: 9, runway: 9, lipsync: 12 } },
            { name: "Bandit", stats: { acting: 7, comedy: 8, dance: 7, design: 8, improv: 7, runway: 8, lipsync: 7 } },
            { name: "Genie", stats: { acting: 10, comedy: 7, dance: 7, design: 7, improv: 8, runway: 8, lipsync: 7 } },
            { name: "Kana Warrior", stats: { acting: 9, comedy: 7, dance: 8, design: 6, improv: 8, runway: 7, lipsync: 12 } },
            { name: "Kandy Zyanide", stats: { acting: 7, comedy: 7, dance: 10, design: 8, improv: 9, runway: 10, lipsync: 8 } },
            { name: "Katy Killer", stats: { acting: 6, comedy: 6, dance: 7, design: 6, improv: 7, runway: 9, lipsync: 6 } },
            { name: "M Stranger Fox", stats: { acting: 5, comedy: 6, dance: 5, design: 6, improv: 6, runway: 5, lipsync: 5 } },
            { name: "Maya B'Haro", stats: { acting: 5, comedy: 6, dance: 6, design: 8, improv: 7, runway: 8, lipsync: 7 } },
            { name: "Mocha Diva", stats: { acting: 9, comedy: 9, dance: 6, design: 8, improv: 9, runway: 7, lipsync: 9 } },
            { name: "Miss Gimhuay", stats: { acting: 8, comedy: 7, dance: 7, design: 9, improv: 8, runway: 11, lipsync: 8 } },
            { name: "Silver Sonic", stats: { acting: 5, comedy: 5, dance: 6, design: 6, improv: 5, runway: 7, lipsync: 6 } },
            { name: "Srimala", stats: { acting: 7, comedy: 10, dance: 8, design: 8, improv: 7, runway: 7, lipsync: 8 } },
            { name: "Tormai", stats: { acting: 6, comedy: 5, dance: 5, design: 6, improv: 5, runway: 7, lipsync: 7 } },
            { name: "Vanda Miss Joaquim", stats: { acting: 11, comedy: 10, dance: 8, design: 8, improv: 9, runway: 9, lipsync: 9 } },
             // DRAG RACE DOWN UNDER SEASON 1
            { name: "Anita Wigl'it", stats: { acting: 6, comedy: 12, dance: 6, design: 6, improv: 10, runway: 8, lipsync: 5 } },
            { name: "Art Simone", stats: { acting: 6, comedy: 12, dance: 5, design: 10, improv: 4, runway: 10, lipsync: 6 } },
            { name: "Coco Jumbo", stats: { acting: 6, comedy: 5, dance: 10, design: 6, improv: 5, runway: 8, lipsync: 12 } },
            { name: "Elektra Shock (DU)", stats: { acting: 10, comedy: 8, dance: 15, design: 8, improv: 8, runway: 5, lipsync: 12 } },
            { name: "Etcetera Etcetera", stats: { acting: 8, comedy: 10, dance: 7, design: 9, improv: 8, runway: 8, lipsync: 8 } },
            { name: "Jojo Zaho", stats: { acting: 5, comedy: 5, dance: 5, design: 5, improv: 5, runway: 6, lipsync: 6 } },
            { name: "Kita Mean", stats: { acting: 9, comedy: 9, dance: 7, design: 7, improv: 9, runway: 9, lipsync: 8 } },
            { name: "Maxi Shield", stats: { acting: 6, comedy: 6, dance: 5, design: 9, improv: 7, runway: 8, lipsync: 8 } },
            // DRAG RACE DOWN UNDER SEASON 2
            { name: "Aubrey Haive", stats: { acting: 5, comedy: 4, dance: 5, design: 7, improv: 4, runway: 8, lipsync: 7 } },
            { name: "Beverly Kills", stats: { acting: 8, comedy: 4, dance: 10, design: 9, improv: 5, runway: 9, lipsync: 10 } },
            { name: "Faúx Fúr", stats: { acting: 4, comedy: 5, dance: 4, design: 5, improv: 4, runway: 5, lipsync: 6 } },
            { name: "Hannah Conda", stats: { acting: 11, comedy: 12, dance: 8, design: 8, improv: 11, runway: 11, lipsync: 8 } },
            { name: "Kween Kong", stats: { acting: 5, comedy: 9, dance: 12, design: 5, improv: 8, runway: 10, lipsync: 11 } },
            { name: "Minnie Cooper", stats: { acting: 9, comedy: 8, dance: 5, design: 6, improv: 6, runway: 9, lipsync: 7 } },
            { name: "Molly Poppinz", stats: { acting: 8, comedy: 7, dance: 6, design: 9, improv: 7, runway: 10, lipsync: 9 } },
            { name: "Pomara Fifth", stats: { acting: 8, comedy: 5, dance: 5, design: 7, improv: 5, runway: 9, lipsync: 8 } },
            { name: "Spankie Jackzon", stats: { acting: 11, comedy: 11, dance: 8, design: 5, improv: 8, runway: 7, lipsync: 9 } },
            { name: "Yuri Guaii", stats: { acting: 6, comedy: 11, dance: 6, design: 14, improv: 9, runway: 13, lipsync: 9 } },
             // DRAG RACE DOWN UNDER SEASON 3
            { name: "Amyl", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 4 } },
            { name: "Ashley Madison", stats: { acting: 7, comedy: 10, dance: 5, design: 8, improv: 10, runway: 9, lipsync: 6 } },
            { name: "Bumpa Love", stats: { acting: 7, comedy: 7, dance: 6, design: 8, improv: 8, runway: 7, lipsync: 9 } },
            { name: "Flor", stats: { acting: 7, comedy: 6, dance: 9, design: 8, improv: 8, runway: 10, lipsync: 9 } },
            { name: "Gabriella Labucci", stats: { acting: 7, comedy: 10, dance: 9, design: 7, improv: 10, runway: 8, lipsync: 10 } },
            { name: "Hollywould Star", stats: { acting: 7, comedy: 7, dance: 11, design: 9, improv: 8, runway: 10, lipsync: 9 } },
            { name: "Isis Avis Loren", stats: { acting: 8, comedy: 10, dance: 10, design: 11, improv: 9, runway: 11, lipsync: 10 } },
            { name: "Ivanna Drink", stats: { acting: 6, comedy: 6, dance: 7, design: 6, improv: 6, runway: 8, lipsync: 8 } },
            { name: "Ivory Glaze", stats: { acting: 4, comedy: 4, dance: 5, design: 5, improv: 4, runway: 6, lipsync: 7 } },
            { name: "Rita Menu", stats: { acting: 6, comedy: 6, dance: 7, design: 6, improv: 5, runway: 7, lipsync: 7 } },
             // DRAG RACE ESPAÑA 1
            { name: "Arantxa Castilla La Mancha", stats: { acting: 6, comedy: 10, dance: 6, design: 6, improv: 8, runway: 9, lipsync: 7 } },
            { name: "Carmen Farala", stats: { acting: 10, comedy: 10, dance: 10, design: 14, improv: 8, runway: 13, lipsync: 10 } },
            { name: "Dovima Nurmi", stats: { acting: 8, comedy: 7, dance: 5, design: 7, improv: 8, runway: 10, lipsync: 6 } },
            { name: "Drag Vulcano", stats: { acting: 6, comedy: 6, dance: 5, design: 7, improv: 6, runway: 9, lipsync: 6 } },
            { name: "Hugáceo Crujiente", stats: { acting: 5, comedy: 5, dance: 5, design: 12, improv: 6, runway: 12, lipsync: 8 } },
            { name: "Inti", stats: { acting: 6, comedy: 6, dance: 6, design: 7, improv: 5, runway: 11, lipsync: 6 } },
            { name: "Killer Queen", stats: { acting: 6, comedy: 10, dance: 8, design: 9, improv: 11, runway: 9, lipsync: 8 } },
            { name: "Pupi Poisson", stats: { acting: 10, comedy: 11, dance: 7, design: 5, improv: 11, runway: 6, lipsync: 7 } },
            { name: "Sagittaria", stats: { acting: 7, comedy: 8, dance: 8, design: 11, improv: 7, runway: 12, lipsync: 9 } },
            { name: "The Macarena", stats: { acting: 5, comedy: 5, dance: 6, design: 4, improv: 5, runway: 5, lipsync: 5 } },
            // DRAG RACE ESPAÑA 2
            { name: "Ariel Rec", stats: { acting: 5, comedy: 5, dance: 7, design: 4, improv: 5, runway: 9, lipsync: 5 } },
            { name: "Diamante Merybrown", stats: { acting: 7, comedy: 6, dance: 10, design: 5, improv: 5, runway: 8, lipsync: 10 } },
            { name: "Drag Sethlas", stats: { acting: 8, comedy: 10, dance: 12, design: 9, improv: 9, runway: 12, lipsync: 11 } },
            { name: "Estrella Xtravaganza", stats: { acting: 10, comedy: 7, dance: 7, design: 5, improv: 9, runway: 8, lipsync: 8 } },
            { name: "Jota Carajota", stats: { acting: 4, comedy: 5, dance: 6, design: 4, improv: 4, runway: 8, lipsync: 7 } },
            { name: "Juriji Der Klee", stats: { acting: 8, comedy: 9, dance: 7, design: 11, improv: 10, runway: 10, lipsync: 9 } },
            { name: "Marina", stats: { acting: 6, comedy: 10, dance: 8, design: 7, improv: 7, runway: 8, lipsync: 11 } },
            { name: "Marisa Prisa", stats: { acting: 4, comedy: 4, dance: 3, design: 2, improv: 4, runway: 4, lipsync: 4 } },
            { name: "Onyx", stats: { acting: 6, comedy: 6, dance: 6, design: 7, improv: 6, runway: 13, lipsync: 7 } },
            { name: "Samantha Ballentines", stats: { acting: 8, comedy: 10, dance: 6, design: 5, improv: 8, runway: 8, lipsync: 7 } },
            { name: "Venedita Von Däsh", stats: { acting: 9, comedy: 9, dance: 9, design: 9, improv: 9, runway: 10, lipsync: 9 } },
             // DRAG RACE ESPAÑA S3
            { name: "Bestiah", stats: { acting: 8, comedy: 7, dance: 9, design: 10, improv: 5, runway: 13, lipsync: 9 } },
            { name: "Chanel Anorex", stats: { acting: 6, comedy: 6, dance: 8, design: 5, improv: 6, runway: 10, lipsync: 8 } },
            { name: "Clover Bish", stats: { acting: 5, comedy: 9, dance: 11, design: 8, improv: 8, runway: 9, lipsync: 10 } },
            { name: "Drag Chuchi", stats: { acting: 6, comedy: 6, dance: 9, design: 6, improv: 6, runway: 6, lipsync: 10 } },
            { name: "Hornella Góngora", stats: { acting: 9, comedy: 9, dance: 9, design: 7, improv: 9, runway: 8, lipsync: 8 } },
            { name: "María Edília", stats: { acting: 4, comedy: 6, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 5 } },
            { name: "Kelly Roller", stats: { acting: 5, comedy: 10, dance: 9, design: 6, improv: 8, runway: 6, lipsync: 7 } },
            { name: "Pakita", stats: { acting: 9, comedy: 5, dance: 9, design: 11, improv: 6, runway: 10, lipsync: 9 } },
            { name: "Pink Chadora", stats: { acting: 8, comedy: 8, dance: 8, design: 7, improv: 11, runway: 10, lipsync: 9 } },
            { name: "Pitita", stats: { acting: 11, comedy: 6, dance: 8, design: 13, improv: 10, runway: 11, lipsync: 8 } },
            { name: "Vania Vainilla", stats: { acting: 8, comedy: 12, dance: 8, design: 10, improv: 8, runway: 9, lipsync: 9 } },
            { name: "Visa", stats: { acting: 7, comedy: 8, dance: 8, design: 9, improv: 9, runway: 12, lipsync: 12 } },
            // DRAG RACE ITALIA S1
            { name: "Ava Hangar", stats: { acting: 8, comedy: 7, dance: 5, design: 5, improv: 6, runway: 6, lipsync: 6 } },
            { name: "Divinity", stats: { acting: 9, comedy: 6, dance: 8, design: 7, improv: 6, runway: 8, lipsync: 7 } },
            { name: "Elecktra Bionic", stats: { acting: 7, comedy: 8, dance: 8, design: 8, improv: 9, runway: 9, lipsync: 8 } },
            { name: "Enorma Jean", stats: { acting: 8, comedy: 8, dance: 6, design: 6, improv: 8, runway: 7, lipsync: 6 } },
            { name: "Farida Kant", stats: { acting: 7, comedy: 6, dance: 8, design: 11, improv: 5, runway: 11, lipsync: 8 } },
            { name: "Ivana Vamp", stats: { acting: 6, comedy: 5, dance: 6, design: 6, improv: 6, runway: 6, lipsync: 5 } },
            { name: "Le Riche", stats: { acting: 6, comedy: 8, dance: 6, design: 8, improv: 9, runway: 8, lipsync: 7 } },
            { name: "Luquisha Lubamba", stats: { acting: 7, comedy: 6, dance: 6, design: 5, improv: 7, runway: 6, lipsync: 7 } },
            // DRAG RACE ITALIA 2
            { name: "Aura Eternal", stats: { acting: 11, comedy: 9, dance: 9, design: 6, improv: 5, runway: 9, lipsync: 8 } },
            { name: "Gioffré", stats: { acting: 6, comedy: 8, dance: 5, design: 7, improv: 5, runway: 8, lipsync: 8 } },
            { name: "La Diamond", stats: { acting: 10, comedy: 12, dance: 8, design: 12, improv: 11, runway: 13, lipsync: 9 } },
            { name: "La Petite Noire", stats: { acting: 10, comedy: 5, dance: 10, design: 8, improv: 7, runway: 11, lipsync: 11 } },
            { name: "Narciso", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 4 } },
            { name: "Nehellenia", stats: { acting: 11, comedy: 12, dance: 12, design: 9, improv: 11, runway: 13, lipsync: 10 } },
            { name: "Obama", stats: { acting: 5, comedy: 9, dance: 6, design: 8, improv: 9, runway: 8, lipsync: 8 } },
            { name: "Panthera Virus", stats: { acting: 7, comedy: 5, dance: 6, design: 6, improv: 5, runway: 8, lipsync: 9 } },
            { name: "Skandalove", stats: { acting: 9, comedy: 7, dance: 8, design: 8, improv: 7, runway: 9, lipsync: 9 } },
            { name: "Tanissa Yoncè", stats: { acting: 5, comedy: 6, dance: 6, design: 10, improv: 6, runway: 9, lipsync: 7 } },
            // DRAG RACE FRANCE
            { name: "Elips", stats: { acting: 7, comedy: 9, dance: 8, design: 8, improv: 8, runway: 8, lipsync: 7 } },
            { name: "Kam Hugh", stats: { acting: 7, comedy: 5, dance: 6, design: 9, improv: 4, runway: 13, lipsync: 7 } },
            { name: "La Big Bertha", stats: { acting: 7, comedy: 6, dance: 7, design: 6, improv: 6, runway: 8, lipsync: 9 } },
            { name: "La Briochée", stats: { acting: 6, comedy: 6, dance: 6, design: 5, improv: 6, runway: 8, lipsync: 5 } },
            { name: "La Grande Dame", stats: { acting: 10, comedy: 12, dance: 7, design: 12, improv: 8, runway: 13, lipsync: 8 } },
            { name: "La Kahena", stats: { acting: 5, comedy: 6, dance: 3, design: 3, improv: 5, runway: 4, lipsync: 5 } },
            { name: "Lolita Banana", stats: { acting: 9, comedy: 7, dance: 13, design: 11, improv: 6, runway: 9, lipsync: 12 } },
            { name: "Lova Ladiva", stats: { acting: 5, comedy: 5, dance: 6, design: 4, improv: 6, runway: 6, lipsync: 5 } },
            { name: "Paloma", stats: { acting: 11, comedy: 11, dance: 6, design: 7, improv: 9, runway: 9, lipsync: 8 } },
            { name: "Soa de Muse", stats: { acting: 9, comedy: 8, dance: 10, design: 8, improv: 8, runway: 9, lipsync: 11 } },
            // DRAG RACE FRANCE 2
            { name: "Cookie Kunty", stats: { acting: 8, comedy: 6, dance: 8, design: 10, improv: 5, runway: 11, lipsync: 10 } },
            { name: "Ginger Bitch", stats: { acting: 7, comedy: 6, dance: 7, design: 6, improv: 8, runway: 8, lipsync: 9 } },
            { name: "Keiona", stats: { acting: 11, comedy: 10, dance: 15, design: 11, improv: 11, runway: 13, lipsync: 13 } },
            { name: "Kitty Space", stats: { acting: 6, comedy: 6, dance: 6, design: 5, improv: 6, runway: 9, lipsync: 9 } },
            { name: "Mami Watta", stats: { acting: 9, comedy: 7, dance: 9, design: 9, improv: 8, runway: 10, lipsync: 9 } },
            { name: "Moon", stats: { acting: 9, comedy: 9, dance: 9, design: 6, improv: 8, runway: 10, lipsync: 8 } },
            { name: "Piche", stats: { acting: 7, comedy: 7, dance: 11, design: 7, improv: 8, runway: 9, lipsync: 11 } },
            { name: "Punani", stats: { acting: 8, comedy: 10, dance: 8, design: 9, improv: 10, runway: 10, lipsync: 10 } },
            { name: "Rose", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 4 } },
            { name: "Sara Forever", stats: { acting: 8, comedy: 7, dance: 11, design: 6, improv: 10, runway: 10, lipsync: 10 } },
            { name: "Vespi", stats: { acting: 6, comedy: 6, dance: 5, design: 6, improv: 6, runway: 10, lipsync: 7 } },
            // DRAG RACE PHILIPPINES
            { name: "Brigiding", stats: { acting: 6, comedy: 5, dance: 8, design: 8, improv: 4, runway: 9, lipsync: 10 } },
            { name: "Corazon", stats: { acting: 4, comedy: 5, dance: 4, design: 3, improv: 4, runway: 7, lipsync: 5 } },
            { name: "Eva Le Queen", stats: { acting: 6, comedy: 9, dance: 8, design: 7, improv: 8, runway: 10, lipsync: 8 } },
            { name: "Gigi Era", stats: { acting: 5, comedy: 5, dance: 4, design: 5, improv: 5, runway: 6, lipsync: 7 } },
            { name: "Lady Morgana", stats: { acting: 6, comedy: 6, dance: 7, design: 7, improv: 5, runway: 8, lipsync: 11 } },
            { name: "Marina Summers", stats: { acting: 8, comedy: 9, dance: 12, design: 11, improv: 8, runway: 12, lipsync: 10 } },
            { name: "Minty Fresh", stats: { acting: 6, comedy: 5, dance: 4, design: 12, improv: 4, runway: 11, lipsync: 9 } },
            { name: "Precious Paula Nicole", stats: { acting: 8, comedy: 8, dance: 10, design: 7, improv: 9, runway: 9, lipsync: 9 } },
            { name: "Prince", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 7, lipsync: 4 } },
            { name: "Turing", stats: { acting: 6, comedy: 6, dance: 9, design: 6, improv: 6, runway: 7, lipsync: 9 } },
            { name: "Viñas DeLuxe", stats: { acting: 6, comedy: 8, dance: 8, design: 10, improv: 8, runway: 11, lipsync: 7 } },
            { name: "Xilhouete", stats: { acting: 6, comedy: 10, dance: 6, design: 8, improv: 11, runway: 10, lipsync: 8 } },
            // DRAG RACE PHILIPPINES 2
            { name: "Arizona Brandy", stats: { acting: 8, comedy: 9, dance: 9, design: 6, improv: 10, runway: 8, lipsync: 11 } },
            { name: "Astrid Mercury", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 4 } },
            { name: "Bernie", stats: { acting: 8, comedy: 7, dance: 11, design: 9, improv: 10, runway: 13, lipsync: 11 } },
            { name: "DeeDee Marié Holliday", stats: { acting: 6, comedy: 6, dance: 10, design: 9, improv: 6, runway: 9, lipsync: 8 } },
            { name: "Hana Beshie", stats: { acting: 9, comedy: 9, dance: 6, design: 9, improv: 9, runway: 10, lipsync: 9 } },
            { name: "M1ss Jade So", stats: { acting: 7, comedy: 9, dance: 9, design: 9, improv: 8, runway: 11, lipsync: 10 } },
            { name: "Matilduh", stats: { acting: 6, comedy: 6, dance: 9, design: 9, improv: 6, runway: 9, lipsync: 9 } },
            { name: "Nicole Pardaux", stats: { acting: 4, comedy: 4, dance: 4, design: 4, improv: 4, runway: 4, lipsync: 8 } },
            { name: "OV Cünt", stats: { acting: 10, comedy: 10, dance: 8, design: 7, improv: 9, runway: 9, lipsync: 7 } },
            { name: "Tiny Deluxe", stats: { acting: 6, comedy: 6, dance: 6, design: 6, improv: 6, runway: 7, lipsync: 8 } },
            { name: "Angel", stats: { acting: 8, comedy: 12, dance: 9, design: 6, improv: 11, runway: 11, lipsync: 8 }},
            { name: "J Quinn", stats: { acting: 7, comedy: 6, dance: 6, design: 8, improv: 5, runway: 10, lipsync: 8 }},
            { name: "John Fedellaga", stats: { acting: 8, comedy: 9, dance: 8, design: 8, improv: 10, runway: 12, lipsync: 8 }},
            { name: "Khianna", stats: { acting: 10, comedy: 8, dance: 11, design: 10, improv: 9, runway: 12, lipsync: 10 }},
            { name: "Maxie", stats: { acting: 10, comedy: 9, dance: 12, design: 9, improv: 11, runway: 11, lipsync: 12 }},
            { name: "Myx Chanel", stats: { acting: 9, comedy: 7, dance: 7, design: 10, improv: 7, runway: 11, lipsync: 10 }},
            { name: "Popstar Bench", stats: { acting: 8, comedy: 7, dance: 10, design: 8, improv: 7, runway: 9, lipsync: 11 }},
            { name: "Tita Bench", stats: { acting: 9, comedy: 12, dance: 9, design: 7, improv: 10, runway: 9, lipsync: 12 }},
            { name: "Versex", stats: { acting: 6, comedy: 5, dance: 5, design: 5, improv: 5, runway: 8, lipsync: 5 }},
            { name: "Yudipota", stats: { acting: 9, comedy: 7, dance: 6, design: 10, improv: 6, runway: 8, lipsync: 5 }},
            { name: "Zymba Ding", stats: { acting: 10, comedy: 6, dance: 13, design: 10, improv: 7, runway: 10, lipsync: 13 }}
        ].sort((a, b) => a.name.localeCompare(b.name)).map(q => ({...q, image: `https://placehold.co/105x105/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${q.name.split(' ')[0]}`}));

        const ALL_CHALLENGES = [
            'Ball Challenge', 'Commercial Challenge', 'Design Challenge', 'Girl Group Challenge', 'Improv Challenge',
            'Lip Sync Challenge', 'Makeover Challenge', 'Music Video Challenge', 'Photoshoot Challenge',
            'Rumix Challenge', 'Runway Challenge', 'Singing Challenge', 'Snatch Game', 'Stand-Up Challenge', 'Talent Show'
        ];
        
        // --- GLOBAL STATE & CACHE ---
        let originalCastData = [];
        let state = {};

        function resetState() {
             state = {
                currentCast: originalCastData.map(qData => new Queen(qData)),
                eliminatedCast: [],
                episodeCount: 0,
                seasonFormat: document.getElementById('format').value,
                specialTwists: {
                    immunity: document.getElementById('immunity').checked,
                    chocolateBar: document.getElementById('chocolate-bar').checked,
                    riggory: document.getElementById('riggory').checked,
                    chocolateBarUsed: false,
                },
                challengeLog: [],
                usedChallenges: [],
                isFinale: false,
                lastLipsyncWinner: null,
            };
            // Initialize queen properties
             state.currentCast.forEach(queen => {
                queen.isImmune = false;
                queen.isBlocked = false;
                queen.hasGoldenChocolateBar = false;
                queen.newlyImmune = false;
                queen.recievedGiftedStar = false;
                queen.stars = 0;
                queen.trackRecord = [];
                queen.bottoms = 0;
                queen.wins = 0;
                queen.relationships = {};
                state.currentCast.forEach(otherQueen => {
                    if (queen.name !== otherQueen.name) {
                        queen.relationships[otherQueen.name] = 0;
                    }
                });
            });

            if(state.specialTwists.chocolateBar) {
                const luckyQueenIndex = Math.floor(Math.random() * state.currentCast.length);
                state.currentCast[luckyQueenIndex].hasGoldenChocolateBar = true;
            }
        }
        
        // --- DOM ELEMENTS ---
        const setupScreen = document.getElementById('setup-screen');
        const simulationScreen = document.getElementById('simulation-screen');
        const resultsScreen = document.getElementById('results-screen');
        const startBtn = document.getElementById('start-simulation-btn');
        const castSizeInput = document.getElementById('cast-size');
        const formatSelect = document.getElementById('format');
        const episodeContent = document.getElementById('episode-content');
        const nextEpisodeBtn = document.getElementById('next-episode-btn');
        const trackRecordContainer = document.getElementById('track-record-container');
        const simulateAgainBtn = document.getElementById('simulate-again-btn');
        const newSeasonBtn = document.getElementById('new-season-btn');
        const winnerDisplay = document.getElementById('winner-display');
        const selectedQueenCountEl = document.getElementById('selected-queen-count');
        const addRandomBtn = document.getElementById('add-random-queen-btn');
        const predefinedCastsContainer = document.getElementById('predefined-casts-container');
        const searchResultsContainer = document.getElementById('search-results-container');
        const currentCastDisplay = document.getElementById('current-cast-display');
        const queenSearchInput = document.getElementById('queen-search-input');
        const predefinedTabBtn = document.getElementById('predefined-tab-btn');
        const searchTabBtn = document.getElementById('search-tab-btn');
        const predefinedCastsTab = document.getElementById('predefined-casts-tab');
        const searchQueensTab = document.getElementById('search-queens-tab');

        // --- CLASSES ---
        class Queen {
            constructor(data) {
                this.name = data.name;
                this.image = data.image;
                this.stats = data.stats;
                this.trackRecord = [];
                this.ppe = 0;
                this.wins = 0;
                this.bottoms = 0;
                this.favoritism = 0;
                this.relationships = {};
                this.performanceScore = 0;
                this.lipsyncScore = 0;
                this.isImmune = false;
                this.newlyImmune = false;
                this.hasGoldenChocolateBar = false;
                this.wasImmuneAndSaved = false;
                this.isBlocked = false;
                this.newlyBlocked = false;
                this.recievedGiftedStar = false;
                this.stars = 0;
            }

            getPerformance(challengeType) {
                let baseScore = 0;
                const statKeys = Object.keys(this.stats);
                const randomStat1 = statKeys[Math.floor(Math.random() * statKeys.length)];
                const randomStat2 = statKeys[Math.floor(Math.random() * statKeys.length)];

                switch (challengeType) {
                    case 'Acting': baseScore = this.stats.acting * 1.5 + this.stats.improv; break;
                    case 'Comedy':
                    case 'Stand-Up Challenge': baseScore = this.stats.comedy * 1.5 + this.stats.improv; break;
                    case 'Dance': 
                    case 'Lip Sync Challenge': baseScore = this.stats.dance * 1.5 + this.stats.lipsync; break;
                    case 'Design Challenge': 
                    case 'Ball Challenge': baseScore = this.stats.design * 1.5 + this.stats.runway; break;
                    case 'Commercial Challenge': baseScore = (this.stats.acting + this.stats.comedy) / 2; break;
                    case 'Girl Group Challenge':
                    case 'Music Video Challenge':
                    case 'Rumix Challenge': baseScore = (this.stats.dance + this.stats.lipsync + this.stats.acting) / 3; break;
                    case 'Makeover Challenge': baseScore = (this.stats.design + this.stats.runway) / 1.5; break;
                    case 'Photoshoot Challenge':
                    case 'Runway Challenge': baseScore = this.stats.runway * 2; break;
                    case 'Singing Challenge': baseScore = this.stats.lipsync * 2; break;
                    case 'Snatch Game': baseScore = this.stats.improv * 2 + this.stats.comedy; break;
                    case 'Talent Show': baseScore = (this.stats[randomStat1] + this.stats[randomStat2] + this.stats.lipsync) / 3; break;
                    default: baseScore = (this.stats[randomStat1] + this.stats[randomStat2]) / 2;
                }
                const randomFactor = (Math.random() - 0.5) * 5;
                let storylineBoost = (this.wins === 0 && state.episodeCount > 3) ? (Math.random() * 1.5) : 0;
                return baseScore + randomFactor + (state.specialTwists.riggory ? this.favoritism : 0) + storylineBoost;
            }

            getLipsyncPerformance() {
                 let performance = (this.stats.lipsync * 1.5) + ((Math.random() - 0.5) * 4);
                 performance += (this.wins * 0.5) - (this.bottoms * 1);
                 return performance + (state.specialTwists.riggory ? this.favoritism * 0.5 : 0);
            }

            addToTrackRecord(placement) {
                this.trackRecord[state.episodeCount - 1] = placement;
            }
        }
        
        // --- SIMULATION LOGIC ---
        function runNextEpisode() {
            if (state.isFinale) return;
            state.episodeCount++;
             if (state.seasonFormat === 'all-winners' && state.episodeCount > 7) { 
                showAllWinnersFinale();
                return;
            }
             if (state.currentCast.length <= 4 && state.seasonFormat !== 'all-winners') {
                runFinaleEpisode();
                return;
            }
            
            state.currentCast.forEach(q => {
                 if (!q.newlyImmune) q.isImmune = false;
                 if (!q.newlyBlocked) q.isBlocked = false;
                 q.newlyImmune = false;
                 q.newlyBlocked = false;
                 q.wasImmuneAndSaved = false;
                 q.recievedGiftedStar = false;
            });
            
            switch(state.seasonFormat) {
                case 'all-stars':
                case 'lipsync-assassin':
                    runAllStarsEpisode();
                    break;
                case 'all-winners':
                    runAllWinnersEpisode();
                    break;
                default:
                    runRegularEpisode();
            }
        }

        function runRegularEpisode() {
            const results = {};
            results.miniChallengeWinner = state.currentCast[Math.floor(Math.random() * state.currentCast.length)];
            results.miniChallengeWinner.favoritism += 0.5;

            let availableChallenges = ALL_CHALLENGES.filter(c => !state.usedChallenges.includes(c) || state.usedChallenges.filter(used => used === c).length < 2);
            if (availableChallenges.length === 0) { // Reset if all challenges used twice
                state.usedChallenges = [];
                availableChallenges = [...ALL_CHALLENGES];
            }
            results.currentChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
            state.challengeLog.push(results.currentChallenge);
            state.usedChallenges.push(results.currentChallenge);
            
            state.currentCast.forEach(queen => queen.performanceScore = queen.getPerformance(results.currentChallenge));
            
            state.currentCast.sort((a, b) => b.performanceScore - a.performanceScore);
            results.tops = state.currentCast.slice(0, 3);
            
            const nonTopQueens = state.currentCast.slice(3);
            nonTopQueens.forEach(q => {
                 if (q.isImmune) {
                    q.wasImmuneAndSaved = true;
                }
            });

            const eligibleForBottom = nonTopQueens.filter(q => !q.isImmune);
            eligibleForBottom.sort((a,b) => a.performanceScore - b.performanceScore);
            
            if (eligibleForBottom.length < 2) {
                results.lipSyncWinner = null;
                results.eliminatedQueen = null;
                results.savedByChocolate = false;
                results.bottoms = nonTopQueens; 
                results.lipSyncers = [];
            } else {
                results.lipSyncers = eligibleForBottom.slice(0, 2);
                results.bottoms = nonTopQueens; 

                results.lipSyncWinner = results.lipSyncers[0].getLipsyncPerformance() > results.lipSyncers[1].getLipsyncPerformance() ? results.lipSyncers[0] : results.lipSyncers[1];
                results.eliminatedQueen = results.lipSyncers.find(q => q !== results.lipSyncWinner);
                
                results.savedByChocolate = false;
                if (state.specialTwists.chocolateBar && !state.specialTwists.chocolateBarUsed && results.eliminatedQueen.hasGoldenChocolateBar) {
                    results.savedByChocolate = true;
                    state.specialTwists.chocolateBarUsed = true;
                } else {
                     state.eliminatedCast.push(results.eliminatedQueen);
                     state.currentCast = state.currentCast.filter(q => q.name !== results.eliminatedQueen.name);
                }
            }

            updateTrackRecords(results.tops, nonTopQueens, results.lipSyncers, results.eliminatedQueen, results.savedByChocolate);
            if (state.specialTwists.immunity) {
                results.tops[0].isImmune = true;
                results.tops[0].newlyImmune = true; 
            }
            
            displayEpisodeResults(results);
        }

        function runAllStarsEpisode() {
            const results = {};
            results.miniChallengeWinner = state.currentCast[Math.floor(Math.random() * state.currentCast.length)];
            results.miniChallengeWinner.favoritism += 0.5;

            let availableChallenges = ALL_CHALLENGES.filter(c => !state.usedChallenges.includes(c) || state.usedChallenges.filter(used => used === c).length < 2);
            if (availableChallenges.length === 0) { // Reset if all challenges used twice
                state.usedChallenges = [];
                availableChallenges = [...ALL_CHALLENGES];
            }
            results.currentChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
            state.challengeLog.push(results.currentChallenge);
            state.usedChallenges.push(results.currentChallenge);
            
            state.currentCast.forEach(queen => queen.performanceScore = queen.getPerformance(results.currentChallenge));

            state.currentCast.sort((a, b) => b.performanceScore - a.performanceScore);
            results.tops = state.currentCast.slice(0, 2);
            results.bottoms = state.currentCast.slice(-3);
            
            const lipSyncResult = results.tops[0].getLipsyncPerformance() > results.tops[1].getLipsyncPerformance() 
                ? { winner: results.tops[0], loser: results.tops[1] } 
                : { winner: results.tops[1], loser: results.tops[0] };

            results.lipSyncWinner = lipSyncResult.winner;
            results.lipSyncLoser = lipSyncResult.loser;
            
            results.bottoms.sort((a,b) => a.performanceScore - b.performanceScore);
            results.eliminatedQueen = results.bottoms[0];

            updateTrackRecords(results.tops, results.bottoms, results.bottoms, results.eliminatedQueen, false, true, results.lipSyncLoser);
            state.eliminatedCast.push(results.eliminatedQueen);
            state.currentCast = state.currentCast.filter(q => q.name !== results.eliminatedQueen.name);

            displayEpisodeResults(results);
        }
        
        function runAllWinnersEpisode() {
            const results = {};
            state.currentCast.forEach(q => { if(!q.newlyBlocked) q.isBlocked = false; }); 

            results.miniChallengeWinner = state.currentCast[Math.floor(Math.random() * state.currentCast.length)];
            
            results.currentChallenge = (state.episodeCount === 7) ? 'Talent Show' : ['acting', 'comedy', 'dance', 'design', 'marketing', 'rusical', 'ball'][Math.floor(Math.random() * 7)];
            state.challengeLog.push(results.currentChallenge);
            
            state.currentCast.forEach(queen => queen.performanceScore = queen.getPerformance(results.currentChallenge));
            state.currentCast.sort((a, b) => b.performanceScore - a.performanceScore);

            results.tops = state.currentCast.slice(0, 2);
            results.highs = state.currentCast.slice(2, 4);

            const starWinners = state.currentCast.filter(q => !q.isBlocked).slice(0, 2);
            const starsToAdd = results.currentChallenge === 'Talent Show' ? 3 : 1;
            starWinners.forEach(q => q.stars += starsToAdd);
            results.starWinners = starWinners;
            
            const lipSyncResult = results.tops[0].getLipsyncPerformance() > results.tops[1].getLipsyncPerformance() 
                ? { winner: results.tops[0], loser: results.tops[1] } 
                : { winner: results.tops[1], loser: results.tops[0] };
            results.lipSyncWinner = lipSyncResult.winner;
            results.lipSyncLoser = lipSyncResult.loser;

            const safeQueens = state.currentCast.filter(q => !results.tops.includes(q) && !results.highs.includes(q));
            if (safeQueens.length > 0) {
                 safeQueens.sort((a, b) => b.stars - a.stars);
                 const queenToBlock = safeQueens[0];
                 queenToBlock.isBlocked = true;
                 queenToBlock.newlyBlocked = true;
                 results.blockedQueen = queenToBlock;
            } else {
                results.blockedQueen = null;
            }

            if (state.episodeCount === 4 && state.lastLipsyncWinner) {
                const eligibleForGift = state.currentCast.filter(q => q.name !== state.lastLipsyncWinner.name && !results.tops.includes(q) && !results.highs.includes(q));
                if (eligibleForGift.length > 0) {
                    const giftedQueen = eligibleForGift[Math.floor(Math.random() * eligibleForGift.length)];
                    giftedQueen.stars++;
                    giftedQueen.recievedGiftedStar = true;
                    results.giftedQueen = giftedQueen;
                    results.giftingQueen = state.lastLipsyncWinner;
                }
            }

            state.lastLipsyncWinner = results.lipSyncWinner;
            updateAllWinnersTrackRecords(results);
            displayEpisodeResults(results);
        }
        
        function showAllWinnersFinale() {
            state.isFinale = true;
            nextEpisodeBtn.classList.add('hidden');
            simulationScreen.classList.add('hidden');
            resultsScreen.classList.remove('hidden');

            state.currentCast.sort((a,b) => b.stars - a.stars);
            const topFinalists = state.currentCast.slice(0, 4);
            const otherFinalists = state.currentCast.slice(4);
            const eliminated = [];

            let qosdadhWinner = null;
            if(otherFinalists.length > 0) {
                 const qos_ls1_winner = otherFinalists.length > 1 ? (otherFinalists[0].getLipsyncPerformance() > otherFinalists[otherFinalists.length - 1].getLipsyncPerformance() ? otherFinalists[0] : otherFinalists[otherFinalists.length - 1]) : otherFinalists[0];
                 const qos_ls2_winner = otherFinalists.length > 2 ? (otherFinalists[1].getLipsyncPerformance() > otherFinalists[otherFinalists.length - 2].getLipsyncPerformance() ? otherFinalists[1] : otherFinalists[otherFinalists.length - 2]) : null;
                 qosdadhWinner = qos_ls2_winner ? (qos_ls1_winner.getLipsyncPerformance() > qos_ls2_winner.getLipsyncPerformance() ? qos_ls1_winner : qos_ls2_winner) : qos_ls1_winner;
                 qosdadhWinner.addToTrackRecord("QoSDADH");
                 otherFinalists.filter(q => q !== qosdadhWinner).forEach(q => {
                     q.addToTrackRecord("ELIM");
                     eliminated.push(q);
                });
            }

            const ls1_winner = topFinalists[0].getLipsyncPerformance() > topFinalists[3].getLipsyncPerformance() ? topFinalists[0] : topFinalists[3];
            const ls1_loser = topFinalists.find(q => q !== ls1_winner && (q === topFinalists[0] || q === topFinalists[3]));
            
            const ls2_winner = topFinalists[1].getLipsyncPerformance() > topFinalists[2].getLipsyncPerformance() ? topFinalists[1] : topFinalists[2];
            const ls2_loser = topFinalists.find(q => q !== ls2_winner && (q === topFinalists[1] || q === topFinalists[2]));
            
            const winner = ls1_winner.getLipsyncPerformance() > ls2_winner.getLipsyncPerformance() ? ls1_winner : ls2_winner;
            const runnerUp = winner === ls1_winner ? ls2_winner : ls1_winner;

            winner.addToTrackRecord("WINNER");
            runnerUp.addToTrackRecord("RUNNER-UP");
            [ls1_loser, ls2_loser].forEach(q => q.addToTrackRecord("SEMI-FINALS"));
            
            let winnerHtml = `<div class="text-center">
                <h3 class="text-4xl font-bold text-yellow-400 mb-4">The Queen of All Queens is...</h3>
                <img src="${winner.image}" class="w-40 h-40 rounded-full mx-auto border-4 border-yellow-400 shadow-lg">
                <p class="text-3xl font-bold mt-4">${winner.name}!</p>`;

            if (qosdadhWinner) {
                winnerHtml += `<p class="text-xl text-gray-300 mt-6">and the Queen of She Done Already Done Had Herses is...</p>
                               <p class="text-2xl font-semibold mt-2">${qosdadhWinner.name}!</p>`;
            }
            winnerHtml += `</div>`;
            winnerDisplay.innerHTML = winnerHtml;
            
            let finalCastOrder = [winner, runnerUp, ls1_loser, ls2_loser];
            if (qosdadhWinner) {
                finalCastOrder.push(qosdadhWinner);
                const remainingOthers = otherFinalists.filter(q => q !== qosdadhWinner).sort((a,b) => b.stars - a.stars);
                finalCastOrder.push(...remainingOthers);
            }
            state.currentCast = [winner];
            state.eliminatedCast = finalCastOrder.filter(q => q.name !== winner.name);

            renderTrackRecord(finalCastOrder, true);
        }
        
        function updateAllWinnersTrackRecords(results) {
             state.currentCast.forEach(queen => {
                let placement = 'SAFE';
                if (results.tops.includes(queen)) {
                    placement = queen.name === results.lipSyncWinner.name ? 'WIN' : 'TOP2';
                } else if (results.highs.includes(queen)) {
                     placement = 'HIGH';
                } 
                
                if (queen.isBlocked) {
                     placement = 'BLOCK';
                }
                if (queen.recievedGiftedStar) {
                    placement = 'STAR (GIFT)';
                }
                queen.addToTrackRecord(placement);
            });
        }

        function updateTrackRecords(tops, bottoms, lipSyncers, eliminated, savedByChocolate, isAllStars = false, lsLoser = null) {
            if (isAllStars) {
                tops.forEach(q => q.addToTrackRecord(q.name === lsLoser.name ? "TOP2" : "WIN"));
                tops.find(q => q.name !== lsLoser.name).wins++;
            } else {
                tops[0].addToTrackRecord("WIN");
                tops[0].wins++;
                tops.slice(1).forEach(q => q.addToTrackRecord("HIGH"));
            }
            
            bottoms.forEach(q => {
                if (q.wasImmuneAndSaved) {
                    q.addToTrackRecord("SAFE (Immune)");
                    return;
                }
                if(eliminated && q.name === eliminated.name && !savedByChocolate) {
                    q.addToTrackRecord("ELIM");
                } else if (lipSyncers && lipSyncers.some(l => l.name === q.name)) {
                     q.addToTrackRecord(savedByChocolate && q.name === eliminated.name ? "CHOC" : "BTM");
                     q.bottoms++;
                } else {
                    q.addToTrackRecord("LOW");
                }
            });

            state.currentCast.forEach(q => {
                if (!q.trackRecord[state.episodeCount - 1]) {
                     q.addToTrackRecord("SAFE");
                }
            });
        }
        
        function displayEpisodeResults(results) {
            let content = `<h2 class="text-3xl font-bold mb-4 header">Episode ${state.episodeCount}</h2>`;
            content += `<p class="mb-2"><strong class="text-pink-400">Mini Challenge Winner:</strong> ${results.miniChallengeWinner.name}</p>`;
            content += `<p class="mb-4"><strong class="text-pink-400">Maxi Challenge:</strong> A fierce ${results.currentChallenge} challenge!</p>`;
            
            content += `<h3 class="text-xl font-semibold mt-4 mb-2">Critiques</h3>`;
             if (state.seasonFormat.includes('all-stars') && state.seasonFormat !== 'all-winners') {
                content += `<p><strong class="text-blue-400">Top 2:</strong> ${results.tops.map(q => q.name).join(' & ')}</p>`;
                content += `<p><strong class="text-red-400">Bottoms:</strong> ${results.bottoms.map(q => q.name).join(', ')}</p>`;
                content += `<h3 class="text-xl font-semibold mt-4 mb-2">Lip Sync For Your Legacy</h3>`;
                content += `<p>${results.tops[0].name} vs. ${results.tops[1].name}</p>`;
                content += `<p class="mt-2"><strong class="text-yellow-400">${results.lipSyncWinner.name}</strong> is the winner of the lip sync!</p>`;
            } else if(state.seasonFormat === 'all-winners') {
                content += `<p><strong class="text-blue-400">Top Queens:</strong> ${[...results.tops, ...results.highs].map(q => q.name).join(', ')}</p>`;
                content += `<p class="text-yellow-300 mt-2">⭐ <strong >Star Winners:</strong> ${results.starWinners.map(q => q.name).join(' & ')} ⭐</p>`;
                content += `<h3 class="text-xl font-semibold mt-4 mb-2">Lip Sync For The Win</h3>`;
                content += `<p>${results.tops[0].name} vs. ${results.tops[1].name}</p>`;
                content += `<p class="mt-2"><strong class="text-yellow-400">${results.lipSyncWinner.name}</strong> is the winner of the lip sync!</p>`;
                if (results.blockedQueen) {
                    content += `<p class="mt-2 text-red-500"><strong>${results.lipSyncWinner.name}</strong> has blocked <strong>${results.blockedQueen.name}</strong> from receiving a star next week.</p>`;
                }
                if (results.giftedQueen) {
                    content += `<p class="mt-2 text-green-400"><strong>${results.giftingQueen.name}</strong> has gifted a Legendary Legend Star to <strong>${results.giftedQueen.name}</strong>!</p>`
                }
            }
            else {
                const lowQueen = results.bottoms.find(q => results.lipSyncers && !results.lipSyncers.some(l => l.name === q.name) && !q.wasImmuneAndSaved);
                content += `<p><strong class="text-blue-400">Winner:</strong> ${results.tops[0].name}</p>`;
                content += `<p><strong class="text-blue-300">High:</strong> ${results.tops.slice(1).map(q => q.name).join(', ')}</p>`;
                if (lowQueen) {
                    content += `<p><strong class="text-yellow-400">Low:</strong> ${lowQueen.name}</p>`;
                }
                if (results.lipSyncers && results.lipSyncers.length > 0) {
                    content += `<p><strong class="text-red-400">Bottom 2:</strong> ${results.lipSyncers.map(q => q.name).join(' & ')}</p>`;
                    content += `<h3 class="text-xl font-semibold mt-4 mb-2">Lip Sync For Your Life</h3>`;
                }
            }
            
            if (results.eliminatedQueen) {
                if (!state.seasonFormat.includes('all-stars') && state.seasonFormat !== 'all-winners') {
                    content += `<p>${results.lipSyncers[0].name} vs. ${results.lipSyncers[1].name}</p>`;
                    content += `<p class="mt-2"><strong class="text-green-400">${results.lipSyncWinner.name}</strong>, shantay you stay.</p>`;
                }
                if (results.savedByChocolate) {
                    content += `<p class="mt-4 text-yellow-300 font-bold">BUT WAIT! ${results.eliminatedQueen.name} reveals the Golden Chocolate Bar! She is saved!</p>`;
                } else {
                    content += `<p class="mt-1"><strong class="text-red-500">${results.eliminatedQueen.name}</strong>, sashay away.</p>`;
                }
            } else if (state.seasonFormat === 'regular' && (!results.lipSyncers || results.lipSyncers.length < 2)) {
                 content += `<p class="mt-2 text-green-400 font-bold">Due to immunity, no one is going home this week!</p>`;
            }
            
            episodeContent.innerHTML = content;
        }

        function runFinaleEpisode() {
            showFinale();
        }

        function showFinale() {
            state.isFinale = true;
            nextEpisodeBtn.classList.add('hidden');
            simulationScreen.classList.add('hidden');
            resultsScreen.classList.remove('hidden');

            // Top 4 Smackdown
            if(state.currentCast.length === 4) {
                state.currentCast.sort((a,b) => b.wins - a.wins || b.ppe - a.ppe); // Seed based on performance
                const semifinal1 = [state.currentCast[0], state.currentCast[3]];
                const semifinal2 = [state.currentCast[1], state.currentCast[2]];

                const winner1 = semifinal1[0].getLipsyncPerformance() > semifinal1[1].getLipsyncPerformance() ? semifinal1[0] : semifinal1[1];
                const winner2 = semifinal2[0].getLipsyncPerformance() > semifinal2[1].getLipsyncPerformance() ? semifinal2[0] : semifinal2[1];
                
                const winner = winner1.getLipsyncPerformance() > winner2.getLipsyncPerformance() ? winner1 : winner2;
                const runnerUp = winner === winner1 ? winner2 : winner1;

                const semiFinalists = state.currentCast.filter(q => q.name !== winner.name && q.name !== runnerUp.name);

                winner.addToTrackRecord("WINNER");
                runnerUp.addToTrackRecord("RUNNER-UP");
                semiFinalists.forEach(q => q.addToTrackRecord("SEMI-FINALS"));

                state.eliminatedCast.push(...[runnerUp, ...semiFinalists]);
                state.currentCast = [winner];
            } else { // Top 3 Finale
                state.currentCast.sort((a,b) => b.performanceScore - a.performanceScore);
                const winner = state.currentCast[0];
                const runnerUps = state.currentCast.slice(1);
                winner.addToTrackRecord("WINNER");
                runnerUps.forEach(q => q.addToTrackRecord("RUNNER-UP"));
                state.eliminatedCast.push(...runnerUps);
                state.currentCast = [winner];
            }
            
            const winner = state.currentCast[0];
            winnerDisplay.innerHTML = `<div class="text-center">
                <h3 class="text-4xl font-bold text-yellow-400 mb-4">And the winner is...</h3>
                <img src="${winner.image}" class="w-40 h-40 rounded-full mx-auto border-4 border-yellow-400 shadow-lg">
                <p class="text-3xl font-bold mt-4">${winner.name}!</p>
                <p class="text-xl text-gray-400 mt-2">Condragulations, you're a winner, baby!</p>
            </div>`;
            
            renderTrackRecord();
        }

        function renderTrackRecord(preSortedCast = null, isAllWinners = false) {
            let finalCast = preSortedCast;
            if (!finalCast) {
                finalCast = isAllWinners ? [...state.currentCast] : [...state.currentCast, ...state.eliminatedCast.reverse()];
                if (isAllWinners) {
                    finalCast.sort((a,b) => b.stars - a.stars);
                }
            }
            
            let tableHTML = `<table class="track-record-table"><thead><tr><th>Queen</th>`;
            if (isAllWinners) {
                tableHTML += `<th>Stars</th>`;
            }
            for(let i=1; i<= state.episodeCount; i++) { 
                const challengeName = state.challengeLog[i - 1] || '';
                const formattedChallenge = challengeName.charAt(0).toUpperCase() + challengeName.slice(1);
                tableHTML += `<th><div class="font-semibold">Ep ${i}</div><div class="text-xs font-normal normal-case">${formattedChallenge}</div></th>`;
            }
            tableHTML += `</tr></thead><tbody>`;

            finalCast.forEach(queen => {
                tableHTML += `<tr><td class="font-semibold text-left p-2">${queen.name}</td>`;
                 if (isAllWinners) {
                    tableHTML += `<td>${queen.stars} ⭐</td>`;
                }
                queen.trackRecord.forEach(placement => {
                    let placementText = placement || 'SAFE';
                    let placementClass = `tr-${placementText.toLowerCase().split(' ')[0].replace(/[^a-z0-9-]/g, '')}`;
                    if(placement === "SAFE (Immune)") {
                        placementClass = "tr-safe-immune";
                        placementText = "SAFE";
                    }
                     if(placement === "STAR (GIFT)") {
                        placementClass = "tr-special";
                        placementText = "STAR (GIFT)";
                    }
                    tableHTML += `<td class="${placementClass}">${placementText}</td>`;
                });
                tableHTML += `</tr>`;
            });

            tableHTML += `</tbody></table>`;
            trackRecordContainer.innerHTML = tableHTML;
        }
        
        // --- EVENT HANDLERS & INITIALIZATION ---
        function initializeApp() {
            // Event Listeners for tabs and buttons are here
            predefinedTabBtn.addEventListener('click', () => {
                predefinedCastsTab.classList.remove('hidden');
                searchQueensTab.classList.add('hidden');
                predefinedTabBtn.classList.add('active');
                searchTabBtn.classList.remove('active');
            });

            searchTabBtn.addEventListener('click', () => {
                predefinedCastsTab.classList.add('hidden');
                searchQueensTab.classList.remove('hidden');
                predefinedTabBtn.classList.remove('active');
                searchTabBtn.classList.add('active');
            });

            startBtn.addEventListener('click', startSimulation);
            newSeasonBtn.addEventListener('click', resetToSetup);
            nextEpisodeBtn.addEventListener('click', runNextEpisode);
            simulateAgainBtn.addEventListener('click', startSimulation); 
            addRandomBtn.addEventListener('click', addRandomQueen);

            queenSearchInput.addEventListener('input', (e) => {
                // Search logic here
            });
        }

        function toggleQueenSelection(queenData) {
            const isSelected = originalCastData.some(q => q.name === queenData.name);

            if (!isSelected) {
                originalCastData.push(queenData);
            } else {
                originalCastData = originalCastData.filter(q => q.name !== queenData.name);
            }
            updateCurrentCastDisplay();
        }

        function addRandomQueen() {
            const availableQueens = ALL_QUEENS_DATA.filter(fullQueen => 
                !originalCastData.some(castQueen => castQueen.name === fullQueen.name)
            );

            if(availableQueens.length === 0) {
                showMessage('No More Queens', 'All available queens have been selected.');
                return;
            }
            
            const randomQueenData = availableQueens[Math.floor(Math.random() * availableQueens.length)];
            toggleQueenSelection(randomQueenData);
        }
        
        function updateCurrentCastDisplay() {
            currentCastDisplay.innerHTML = '';
            originalCastData.forEach(qData => {
                const card = document.createElement('div');
                card.className = 'queen-card bg-pink-900/50 rounded-lg p-1 text-center shadow-lg';
                card.dataset.queenName = qData.name;
                card.innerHTML = `<p class="text-xs font-medium">${qData.name}</p>`;
                card.addEventListener('click', () => toggleQueenSelection(qData));
                currentCastDisplay.appendChild(card);
            });
            castSizeInput.value = originalCastData.length;
            selectedQueenCountEl.textContent = originalCastData.length;
        }

        function startSimulation() {
            if (originalCastData.length < 5) {
                showMessage('Cast Too Small', 'Please select at least 5 queens to start.');
                return;
            }
            if (formatSelect.value === 'all-winners' && originalCastData.length > 8) {
                showMessage('Invalid Format Choice', 'The All Winners format is only available for 8 or fewer queens.');
                return;
            }
            resetState();
            setupScreen.classList.add('hidden');
            resultsScreen.classList.add('hidden');
            simulationScreen.classList.remove('hidden');
            nextEpisodeBtn.classList.remove('hidden');
            runNextEpisode();
        }

        function resetToSetup() {
            setupScreen.classList.remove('hidden');
            simulationScreen.classList.add('hidden');
            resultsScreen.classList.add('hidden');
            originalCastData = [];
            currentCastDisplay.innerHTML = '';
            selectedQueenCountEl.textContent = 0;
            castSizeInput.value = 0;
        }
        
        function showMessage(title, message) {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-message').innerText = message;
            const modal = document.getElementById('message-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
        
        document.getElementById('modal-close-btn').addEventListener('click', () => {
             const modal = document.getElementById('message-modal');
             modal.classList.add('hidden');
             modal.classList.remove('flex');
        });

        document.addEventListener('DOMContentLoaded', initializeApp);
    </script>
</body>
</html>
