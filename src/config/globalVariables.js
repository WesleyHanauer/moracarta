/**
 * This is where the application is setup with your custom information
 * It is recommened you first open the template on your browser
 * to understand what each variable does then change each variable
 * with your own information.
 */

const LANGUAGE = "en"; // Set the main language for the application: "pt-BR" or "en"

/**
 * Optional, this has to be on the url for the page to open
 * It's meant primarily to stop unwanted casual users
 * from randomly/accidently accessing your website.
 * Bear in mind anyone can see this variables through inspecting the website's
 * Javascript but it should be enough to stop most casuals.
 * You could also have a backend server do authentication
 * but this app is meant to be simple and static.
 * url example: .../views.index.html?your_password_1=your_password_2
 * (? and = signals aren't optional)
 * Set USE_PASSWORD to false if this is not something you want in your application
 * Default = false
 */
const USE_PASSWORD = false;
const PASSWORD1 = "";
const PASSWORD2 = "";

/**
 * The music feature allows you set a different song to play on each letter
 * You can select the song inside /assets/music
 * Then set it's path on src/data/letters.js for each separate letter
 * You may also setup if you want a song to play on the main page separately below.
 * Default = true
 */
const MUSIC = true;
// Set USE_MAIN_PAGE_MUSIC to true in order to play music on index
const USE_MAIN_PAGE_MUSIC = true;
// Use the path of a song inside assets/music referenced from main.view.html
const MAIN_PAGE_MUSIC_PATH = "https://pixabay.com/music/beautiful-plays-romantic-romantic-music-573992/";

const TEXT_TOP = "Here you can put a custom message";
const TEXT_BOTTOM = "Here you can put another custom message"
const YOUR_NAME = "— Name ♡"; // Your first name, goes below the bottom text

// These lines will appear on the paper inside the envelope on the envelope animation
const CLOSED_LETTER_TEXT_TOP_LINE = "&#10084;&#65039; To Mary Jane &#10084;&#65039;";
const CLOSED_LETTER_TEXT_BOTTOM_LINE = "&#10084;&#65039; I love you &#10084;&#65039";

const globalVariables = {
    LANGUAGE,
    YOUR_NAME,
    USE_PASSWORD,
    PASSWORD1,
    PASSWORD2,
    MUSIC,
    USE_MAIN_PAGE_MUSIC,
    MAIN_PAGE_MUSIC_PATH,
    TEXT_TOP,
    TEXT_BOTTOM,
    CLOSED_LETTER_TEXT_TOP_LINE,
    CLOSED_LETTER_TEXT_BOTTOM_LINE
}

export default globalVariables;