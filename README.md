# Hunger Games 🍽️

## Inspiration 💡
We felt inspired by a problem we all faced too often - wanting to enjoy a nice meal out with your friends only to end up hangry (hangry: the act of becoming angry from being too hungry) after spending too long trying to decide on a place to go. 😡 -> 😋

## What it does 👀
Our app is the industry leading solution to hangry-ness by turning choosing a restaurant to eat out at into a fun and simple process. 👀
As the host, create a lobby by selecting the max price and distance from your current location for restaurants. 📌
Invite the friends you're eating out with to play with a lobby codes. 👥 
The 24 top rated restaurants that match the entered criteria are randomly put against each other in 1v1s, where each user gets to pick what they would prefer. 🍴
Through world cup style rounds, restaurants accumulate points for winning or are eliminated for losing. 🏆
After everyone has finished their rounds, a leaderboard of the top 3 preferred restaurants amongst everyone are presented. 🥇

## How we built it 💻
Our app is built with a Python backend and a Typescript and Next.JS frontend. Our data is stored in a MongoDB Atlas database. We used the Google Places API to fetch restaurant data. Our code is deployed via DetaSpace for our backend and Vercel for our frontend + MLH PorkBun + GoDaddy Domain hungergames.select.

## Challenges we ran into 😳
1. CORS Conundrum 🌐
Communicating between our Python backend and the frontend was like navigating a CORS labyrinth. Cross-Origin Resource Sharing (CORS) issues left us scratching our heads, and the struggle to establish seamless communication added an extra layer of complexity. 🧩

2. React State Puzzles 🎭
Navigating the intricate landscape of React states proved to be a challenging dance. The newness of React states left us momentarily disoriented on how to gracefully load and render our components. Untangling the web of state management became a learning curve we had to conquer. 💃🕺

3. TypeScript Typing Tango 🕵️‍♂️
The TypeScript typing adventure threw us into a quick-paced tango. Initially, we stumbled over the dance steps, grappling with typing issues. However, with determination and some quick footwork, we swiftly adapted and learned to dance in harmony with TypeScript's type system. 💃🕺

4. Mysterious TypeScript TXS 👻
As we delved into the depths of TypeScript (TSX), we encountered an invisible maze of issues. What seemed to work seamlessly in npm run dev turned into a haunting mystery when the builder disapproved. Unraveling these hidden issues became a ghost hunt, where the ghosts were invisible problems lurking in the TSX shadows. 👻🔍

Despite these challenges, we emerged victorious, having conquered the CORS beast, mastered the React state dance, tamed TypeScript's wild typings, and unraveled the mysteries of the invisible TypeScript issues. Each challenge became a stepping stone in our journey towards creating an exceptional app experience! 🚀💪

## Accomplishments that we're proud of 💖
1. Mastering the Art of React Hooks 🎣
In our journey, we delved into the world of React Hooks and emerged as Hook aficionados! Learning and implementing React Hooks enriched our game system, providing a solid foundation for an engaging and dynamic user experience. 🚀

2. Flawless Backend API Communication 🌐
Our backend API communication was a shining star in our development saga. The HTTP requests worked seamlessly, showcasing reliability and efficiency. Well, almost seamlessly – CORS threw in a challenge, but when it wasn't meddling, our backend API requests were flawlessly executed. 💻

3. Deployment Triumph 🚀
The joy of seeing our project deployed was immeasurable! We successfully navigated the deployment process, ensuring that our app is accessible and playable on any device. The feeling of accomplishment in achieving this milestone is truly exhilarating. 🌐📱

4. Teamwork Triumphs 💪🤝
One of our proudest achievements is the synergy we achieved as a team. Despite not knowing each other beforehand, we collaborated seamlessly, combining our individual strengths to create an excellent project. This camaraderie not only fueled the success of our app but also emphasized how teamwork can bring people together to create lasting memories. 🤗👥
## What we learned
1. CORS Chronicles 🌐
Our journey into the intricacies of CORS was an enlightening adventure. We faced challenges in cross-origin resource sharing and learned to navigate the nuances of allowing or restricting resource access between our frontend and backend. This understanding became pivotal in resolving communication hurdles and ensuring a secure and seamless connection. 🚧🔄

2. React's Adaptive Rendering 🔄
React's flexibility in rendering based on different states became a cornerstone of our development process. We discovered the art of conditional rendering, adapting our components dynamically to the changing states retrieved from our API. This approach not only enhanced user experience but also streamlined the display of information based on real-time data. 🎨💡

3. Domain Deployment Drama 🌐🚀
Setting up a domain was a novel experience, and our journey involved navigating the realms of Porkbun and Vercel. From registering a domain to configuring DNS settings, we embraced the challenges that came with establishing a solid online presence. The triumphant moment of seeing our app live on its own domain was a testament to our newfound skills in domain management. 🌐🚀

4. Node Novice No More 🚀🚀
Venturing into the world of Node was a significant milestone for Vivivan. As a newcomer, she embraced the power of Node.js for server-side scripting. It became a key player in facilitating communication between our frontend and backend, bridging the gap and enhancing the overall functionality of our application. 🌐🔗

5. Vercel Victory Lap 🏁
Our deployment journey reached its peak with Vercel. Leveraging the platform's seamless deployment capabilities, we witnessed our app go live effortlessly. Vercel's user-friendly interface and robust features turned the deployment process into a victory lap, leaving us with a reliable, scalable, and easily accessible application for users on any device. 🚀🎉

## What's next for Hunger Games 🚀
There are many features we planned to build but never got around to. For example,
1. User Accounts📱
- Allow users to create accounts
- Save user choices from games to give better initial restaurant recommendation
  2. Add preferred + banned restaurant types 🍕🚫
  - Allow users to only be shown restaurants that serve the type food in a customized list
  - Allow users to not be shown any restaurants that serve the type food in a customized list
3. Add customizable location filter 📍
- Allows user to search for restaurants within a certain location
4. Add more detailed results at the end of voting 🕵️‍♂️🗳️
- Allow users to see who voted for what
- Eg. see which imposter do big trolling
5. Better Security 🔒
- To log into a game is very easy as right now we are doing incremented numbers for our gameIds
- There maybe flaws in our server as our posts and gets are non password protected

# To install backend dependencies, run
pip install -r requirements.txt

